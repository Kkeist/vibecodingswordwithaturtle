// 只看「注释」：把 js / css / html 里的注释切出来，检查里面有没有不该被别人看到的个人称呼、对话转述、本机路径。
// 字符串、模板字面量、正则、页面上的教程文字里出现同样的词不算（那是内容，不是注释）。
// 词表用字符编码存放，不直接写成汉字，免得这份检查脚本自己成了泄露源。

const words = (...list) => list.map((cps) => String.fromCodePoint(...cps))

export const FORBIDDEN_IN_COMMENTS = [
  ...words(
    [23453, 23453],
    [23567, 29483],
    [21407, 35805],
    [38081, 24459],
    [29992, 25143, 21453, 39304],
    [29992, 25143, 35201, 27714],
    [25353, 20320, 35828, 30340],
    [26376, 20142, 35753, 25105, 24819, 36215, 20320],
    [21712, 21712, 35828],
  ),
  'C:\\Users',
  'D:\\Personal',
  'Claude',
  'Anthropic',
  'Co-Authored',
]

const lineOf = (text, index) => text.slice(0, index).split('\n').length

/** js：状态机逐字读，跳过字符串、模板字面量（含 ${} 嵌套）、正则，只收 // 和 块注释 */
export function jsComments(text) {
  const out = []
  const stack = [] // 模板字面量里进入 ${ 之后，记下当前花括号深度，遇到配对的 } 回到模板
  let i = 0
  let braces = 0
  let prev = '' // 上一个有意义的字符，用来判断 / 是除号还是正则开头
  let prevWord = ''
  const REGEX_AFTER_WORD = new Set(['return', 'typeof', 'case', 'in', 'of', 'delete', 'void', 'throw', 'new', 'else', 'do', 'instanceof', 'yield', 'await'])
  const readTemplate = () => {
    // 已经越过起始的 `；读到结束的 ` 或进入 ${
    while (i < text.length) {
      const c = text[i]
      if (c === '\\') i += 2
      else if (c === '`') {
        i++
        prev = '`'
        return
      } else if (c === '$' && text[i + 1] === '{') {
        i += 2
        stack.push(braces)
        braces = 0
        prev = '{'
        return
      } else i++
    }
  }
  while (i < text.length) {
    const c = text[i]
    const n = text[i + 1]
    if (c === '/' && n === '/') {
      const e = text.indexOf('\n', i)
      const end = e < 0 ? text.length : e
      out.push({ text: text.slice(i, end), line: lineOf(text, i) })
      i = end
    } else if (c === '/' && n === '*') {
      const e = text.indexOf('*/', i + 2)
      const end = e < 0 ? text.length : e + 2
      out.push({ text: text.slice(i, end), line: lineOf(text, i) })
      i = end
    } else if (c === '"' || c === "'") {
      i++
      while (i < text.length && text[i] !== c && text[i] !== '\n') i += text[i] === '\\' ? 2 : 1
      i++
      prev = c
      prevWord = ''
    } else if (c === '`') {
      i++
      readTemplate()
      prevWord = ''
    } else if (c === '/') {
      const regexStart = prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev) || REGEX_AFTER_WORD.has(prevWord)
      if (regexStart) {
        i++
        let inClass = false
        while (i < text.length && text[i] !== '\n') {
          const d = text[i]
          if (d === '\\') i += 2
          else if (d === '[') (inClass = true), i++
          else if (d === ']') (inClass = false), i++
          else if (d === '/' && !inClass) break
          else i++
        }
        i++
        while (/[a-z]/i.test(text[i] ?? '')) i++
        prev = '/'
        prevWord = ''
      } else {
        i++
        prev = '/'
        prevWord = ''
      }
    } else if (c === '{') {
      braces++
      prev = c
      prevWord = ''
      i++
    } else if (c === '}') {
      if (braces === 0 && stack.length) {
        braces = stack.pop()
        i++
        readTemplate()
      } else {
        braces--
        prev = c
        i++
      }
      prevWord = ''
    } else if (/\s/.test(c)) {
      i++
    } else if (/[A-Za-z_$]/.test(c)) {
      let j = i
      while (j < text.length && /[\w$]/.test(text[j])) j++
      prevWord = text.slice(i, j)
      prev = 'a'
      i = j
    } else {
      prev = c
      prevWord = ''
      i++
    }
  }
  return out
}

/** css：只有块注释；字符串里的 /* 不算 */
export function cssComments(text) {
  const out = []
  let i = 0
  while (i < text.length) {
    const c = text[i]
    if (c === '"' || c === "'") {
      i++
      while (i < text.length && text[i] !== c && text[i] !== '\n') i += text[i] === '\\' ? 2 : 1
      i++
    } else if (c === '/' && text[i + 1] === '*') {
      const e = text.indexOf('*/', i + 2)
      const end = e < 0 ? text.length : e + 2
      out.push({ text: text.slice(i, end), line: lineOf(text, i) })
      i = end
    } else i++
  }
  return out
}

/** html：<!-- --> 注释，加上页面里内嵌的 <script> 和 <style> 里面的注释 */
export function htmlComments(text) {
  const out = []
  for (const m of text.matchAll(/<!--([\s\S]*?)-->/g)) out.push({ text: m[0], line: lineOf(text, m.index) })
  for (const m of text.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    const base = lineOf(text, m.index + m[0].indexOf(m[1])) - 1
    for (const c of jsComments(m[1])) out.push({ text: c.text, line: base + c.line })
  }
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const base = lineOf(text, m.index + m[0].indexOf(m[1])) - 1
    for (const c of cssComments(m[1])) out.push({ text: c.text, line: base + c.line })
  }
  return out
}

export function commentsOf(name, text) {
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase()
  if (ext === '.js' || ext === '.mjs') return jsComments(text)
  if (ext === '.css') return cssComments(text)
  if (ext === '.html') return htmlComments(text)
  return []
}

/** 扫一批文件的注释，返回问题列表（文件、行号、命中的词、注释开头一小段） */
export function scanComments(files) {
  const problems = []
  for (const [name, text] of files) {
    for (const c of commentsOf(name, text)) {
      const hit = FORBIDDEN_IN_COMMENTS.filter((w) => c.text.includes(w))
      if (hit.length) problems.push({ file: name, line: c.line, word: hit.join('、'), snippet: c.text.slice(0, 40).replace(/\s+/g, ' ') })
    }
  }
  return problems
}
