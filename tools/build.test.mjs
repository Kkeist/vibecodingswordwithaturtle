// 运行：node --test tools/build.test.mjs
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { WHITELIST, build, root } from './build.mjs'
import { FORBIDDEN_IN_COMMENTS, commentsOf, scanComments } from './comment-scan.mjs'

// 测试里要用到的「不该出现的词」从检查脚本的词表里取，不直接写汉字
const [NICK, PET] = FORBIDDEN_IN_COMMENTS
const CLAIM = FORBIDDEN_IN_COMMENTS[2]
const LOCAL = FORBIDDEN_IN_COMMENTS[10]

test('注释里的个人称呼、转述、本机路径都能查出来（js / css / html 三种）', () => {
  const js = `const a = 1 // ${NICK}要的\n/* ${CLAIM}：别删 */\nlet b = 2`
  const css = `.a { color: red } /* ${PET}说过 */`
  const html = `<div></div><!-- 路径 ${LOCAL}x -->\n<script>// ${NICK}\nvar x = 1</script><style>/* ${NICK} */</style>`
  const found = scanComments([['a.js', js], ['a.css', css], ['a.html', html]])
  assert.equal(found.length, 6, JSON.stringify(found))
  assert.deepEqual(found.map((f) => f.file).sort(), ['a.css', 'a.html', 'a.html', 'a.html', 'a.js', 'a.js'])
})

test('字符串、模板字面量、正则、页面文字里出现同样的词不算注释，不误伤', () => {
  const js = [
    `const s = "// ${NICK}"`,
    `const t = \`${PET} /* ${NICK} */ \${ "// ${NICK}" + 1 } // ${NICK}\``,
    `const r = /${NICK}\\/\\/${PET}/g`,
    `const d = a / b / c // 正常注释`,
    `const u = 'http://x.com/${NICK}'`,
  ].join('\n')
  assert.deepEqual(scanComments([['a.js', js]]), [])
  assert.deepEqual(commentsOf('a.js', js).map((c) => c.text), ['// 正常注释'])
  const html = `<p>${NICK}说：你好</p><script src="x.js"></script>`
  assert.deepEqual(scanComments([['a.html', html]]), [])
  const css = `.a::before { content: "/* ${NICK} */" }`
  assert.deepEqual(scanComments([['a.css', css]]), [])
})

test('出包：只拷白名单里的文件，dist 里没有别的；有问题的注释让自检失败', () => {
  const src = mkdtempSync(join(tmpdir(), 'vc-src-'))
  const dest = mkdtempSync(join(tmpdir(), 'vc-dest-'))
  try {
    for (const item of WHITELIST) {
      if (item === 'img') {
        mkdirSync(join(src, 'img'))
        writeFileSync(join(src, 'img', 'a.png'), 'x')
      } else if (item === 'index.html') writeFileSync(join(src, item), '<link href="style.css"><script src="app.js"></script>')
      else if (item === 'manifest.webmanifest') writeFileSync(join(src, item), '{"icons":[{"src":"icon-192.png"}]}')
      else writeFileSync(join(src, item), item.endsWith('.js') ? 'var a = 1' : 'x')
    }
    writeFileSync(join(src, '需求追踪清单.md'), '不该进包')
    mkdirSync(join(src, 'tools'))
    writeFileSync(join(src, 'tools', 'x.mjs'), 'x')
    const ok = build(src, dest)
    assert.deepEqual(ok.problems, [])
    assert.deepEqual(readdirSync(dest).sort(), [...WHITELIST].sort())

    writeFileSync(join(src, 'app.js'), `var a = 1 // ${NICK}${CLAIM}`)
    const bad = build(src, dest)
    assert.equal(bad.problems.length, 1)
    assert.match(bad.problems[0], /app\.js 第 1 行/)
  } finally {
    rmSync(src, { recursive: true, force: true })
    rmSync(dest, { recursive: true, force: true })
  }
})

test('这个项目当前的源码：出包自检通过（没有个人称呼和对话转述留在注释里）', () => {
  const dest = mkdtempSync(join(tmpdir(), 'vc-real-'))
  try {
    const { problems, count } = build(root, dest)
    assert.deepEqual(problems, [])
    assert.ok(count >= 9)
  } finally {
    rmSync(dest, { recursive: true, force: true })
  }
})
