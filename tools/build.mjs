// 出包：只把网页要用的文件用白名单拷进 dist/，拷完自检；自检不过就报错退出，不出包。
// 自检内容：页面引用的文件都在、dist 里没有白名单以外的文件、所有 js / css / html 的注释里没有个人称呼、对话转述和本机路径。
// 用法：node tools/build.mjs（Cloudflare 的构建命令，输出目录填 dist）
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanComments } from './comment-scan.mjs'

export const root = fileURLToPath(new URL('..', import.meta.url))

/** 白名单：网页本身要用的文件，其余（工具、截图、笔记、配置）一律不进包 */
export const WHITELIST = ['index.html', 'style.css', 'app.js', 'data.js', 'examples_inject.js', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'img']
const ALLOWED_EXT = new Set(['.html', '.css', '.js', '.webmanifest', '.png'])

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

/** 拷贝并自检，返回问题列表；src 和 dest 可以指到别处，测试里用 */
export function build(src = root, dest = join(root, 'dist')) {
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })
  const problems = []
  for (const item of WHITELIST) {
    const from = join(src, item)
    if (!existsSync(from)) problems.push(`白名单里的文件不存在：${item}`)
    else cpSync(from, join(dest, item), { recursive: true })
  }

  const files = walk(dest)
  for (const f of files) {
    if (!ALLOWED_EXT.has(extname(f).toLowerCase())) problems.push(`不该出现在包里的文件：${relative(dest, f)}`)
  }

  // 页面和清单里引用的本地文件都要在
  const refs = []
  const index = existsSync(join(dest, 'index.html')) ? readFileSync(join(dest, 'index.html'), 'utf8') : ''
  for (const m of index.matchAll(/(?:src|href)="([^"]+)"/g)) refs.push(m[1])
  if (existsSync(join(dest, 'manifest.webmanifest'))) {
    for (const icon of JSON.parse(readFileSync(join(dest, 'manifest.webmanifest'), 'utf8')).icons ?? []) refs.push(icon.src)
  }
  for (const r of refs) {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(r)) continue
    if (!existsSync(join(dest, r.split(/[?#]/)[0]))) problems.push(`页面引用了包里没有的文件：${r}`)
  }

  // 注释里不许有个人称呼、对话转述、本机路径
  const texts = files.filter((f) => ['.html', '.css', '.js'].includes(extname(f).toLowerCase())).map((f) => [relative(dest, f), readFileSync(f, 'utf8')])
  for (const p of scanComments(texts)) problems.push(`${p.file} 第 ${p.line} 行的注释里出现了不该发布的词：${p.snippet}…`)
  return { problems, count: files.length }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { problems, count } = build()
  if (problems.length) {
    console.error('出包自检没通过，不出包：\n' + problems.map((p) => '  - ' + p).join('\n'))
    process.exit(1)
  }
  console.log(`构建完成：dist/ 共 ${count} 个文件，自检通过`)
}
