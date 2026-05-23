// 节点树数据
//
// 文案规则（v11，"从效果反推原理"）：
//   - 每个 page 开头先讲"做这个能让用户看到 / 体验到什么"
//   - 再说"背后用到 X"
//   - 短句、不堆英文全名、不用 JSON/endpoint 这种用户不一定懂的词
//
// 字段说明：
//   id, emoji, title, pages, concept, children, lightbulb
//   笔记本按 concept.name 去重
//   children[0] = 主路径；children[i>0] 加 lightbulb: true 是灯泡支线
//   pages 里 <em>术语</em> 自动可点击查 TERM_GLOSSARY 里的解释

const SHARED_NODES = {
  "shared-server": {
    id: "shared-server",
    emoji: "🖥️",
    title: "服务器",
    concept: { name: "服务器", explain: "一台一直开着、连着公网的电脑——你的程序跑上去。" },
    pages: [
      { html: `
        <p>网站、API、bot 要 24 小时挂着——你电脑会关，所以得有一台一直开的电脑。</p>
        <div class="emoji-illust">
          <span class="ei-emoji">💻</span><span class="ei-label">你电脑（会关）</span>
          <span class="ei-arrow">vs</span>
          <span class="ei-emoji">🏢</span><span class="ei-label">服务器（一直开）</span>
        </div>
        <p>这种一直开着、连着公网的电脑，叫<em>服务器</em>。</p>
        <p>租云服务几块到几十块 / 月（阿里云、<em>Cloudflare Pages</em>、<em>Vercel</em>、<em>Railway</em>）。</p>
      ` },
    ],
    children: [],
  },
};

const node_dns = {
  id: "dns",
  emoji: "🔗",
  title: "网址",
  lightbulb: true,
  concept: { name: "域名 / IP / DNS", explain: "域名是人记的名字、IP 是电脑编号、DNS 是翻译电话本。" },
  pages: [
    { html: `
      <p>想让用户敲 <em>example.com</em> 这种好记的网址打开你的网站？</p>
      <div class="emoji-illust">
        <span class="ei-label">example.com</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📒</span>
        <span class="ei-label">DNS 电话本</span>
        <span class="ei-arrow">→</span>
        <span class="ei-label">142.250.4.100</span>
      </div>
      <p>每台电脑其实有真实编号叫 <em>IP</em>（142.250.4.100 这种）。</p>
      <p>给人记的名字叫<em>域名</em>。</p>
      <p>把域名翻成 IP 的电话本，叫 <em>DNS</em>。</p>
    ` },
  ],
  children: [],
};

const node_framework = {
  id: "framework",
  emoji: "🧱",
  title: "前端框架",
  lightbulb: true,
  concept: { name: "前端框架", explain: "帮你管页面状态、拆组件的工具。" },
  pages: [
    { html: `
      <p>页面一复杂——「现在选中哪个」「输入框里有什么」「侧栏开没开」「购物车有几件」——这些"状态"开始难管。</p>
      <p>帮你管这些状态、把页面拆成组件的工具叫<em>前端框架</em>。</p>
      <p>主流：<em>React</em>、<em>Vue</em>、<em>Svelte</em>。</p>
    ` },
  ],
  children: [],
};

const node_deploy_web = {
  id: "deploy-web",
  emoji: "🚀",
  title: "部署",
  concept: { name: "部署", explain: "把网页放到一直开着的服务器、绑一个网址，让别人能访问。" },
  pages: [
    { html: `
      <p>你电脑上的网页打开能看，但别人访问不到——你电脑不会一直开，也没公开网址。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">💻</span>
        <span class="ei-arrow">📤</span>
        <span class="ei-emoji">☁️</span>
        <span class="ei-arrow">🔗</span>
        <span class="ei-emoji">🌐</span>
        <span class="ei-label">用户能访问</span>
      </div>
      <p>把网页传到一台一直开着的服务器、绑一个网址——这一步叫<em>部署</em>。</p>
      <p>免费现成的：<em>Cloudflare Pages</em>、<em>Vercel</em>、<em>Netlify</em>。绑 GitHub，每次提交自动部署。</p>
    ` },
  ],
  children: [{ ref: "shared-server" }],
};

const node_auth_web = {
  id: "auth-web",
  emoji: "🔐",
  title: "登录",
  concept: { name: "认证 / 授权", explain: "认证 = 你是谁；授权 = 你能干什么。" },
  pages: [
    { html: `
      <p>想让用户登录后看到自己的内容？想让管理员能删帖、普通用户不能？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🪪</span>
        <span class="ei-label">认证（你是谁）</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔑</span>
        <span class="ei-label">授权（能干什么）</span>
      </div>
      <p><em>认证</em>：验证你是谁（密码、短信验证码、用微信 / Google 登录都是）。</p>
      <p><em>授权</em>：决定你能干什么（管理员 / 普通用户的权限）。</p>
      <p>容易写漏洞——用 <em>Supabase Auth</em> / <em>Clerk</em> / <em>Auth0</em> 接现成的更稳。</p>
    ` },
  ],
  children: [node_deploy_web],
};

const node_database_web = {
  id: "database-web",
  emoji: "🗃️",
  title: "数据库",
  concept: { name: "数据库", explain: "专门存数据、能快速找到的程序。" },
  pages: [
    { html: `
      <p>想保存用户评论、订单、上传的图、好友列表？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📝</span>
        <span class="ei-label">用户数据</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🗃️</span>
        <span class="ei-label">数据库（建索引）</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🔍</span>
        <span class="ei-label">瞬间找到</span>
      </div>
      <p>用 txt 文件存太慢——百万条数据找一条要扫一遍。</p>
      <p>专门存数据 + 能快速找的程序叫<em>数据库</em>。</p>
      <p>常见：<em>SQLite</em>、<em>MySQL</em>、<em>PostgreSQL</em>。</p>
    ` },
  ],
  children: [node_auth_web],
};

const node_api_http = {
  id: "api-http",
  emoji: "🔌",
  title: "API / HTTP",
  concept: { name: "API / HTTP", explain: "API 是约定的请求格式；HTTP 是底下的对话协议。" },
  pages: [
    { html: `
      <p>想让你的网页接 GPT、发微信、查天气、收支付？</p>
      <div class="fe-be-game">
        <div class="actor"><div class="actor-emoji">📱</div><div class="actor-label">你的应用</div></div>
        <div class="msg-track">
          <div class="msg msg-req">/weather?city=北京</div>
          <div class="msg msg-res">{ temp: 25°C }</div>
        </div>
        <div class="actor"><div class="actor-emoji">🤖</div><div class="actor-label">天气服务</div></div>
      </div>
      <p>你按对方提供的格式发请求，对方按格式回——这种约定叫 <em>API</em>。</p>
      <p>底下用的对话协议叫 <em>HTTP</em>。网址前的 http:// 就是它。</p>
      <p>这是 vc 创作者最魔法的部分——会调 API 就能用上几百个公司的服务。</p>
    ` },
  ],
  children: [node_database_web],
};

const node_fe_be = {
  id: "fe-be",
  emoji: "🔁",
  title: "前端 / 后端",
  concept: { name: "前端 / 后端", explain: "前端是用户看到的；后端是服务器上跑、用户看不到的。" },
  pages: [
    { html: `
      <p>想让用户登录、想存评论 / 订单、想多人共享数据、想接微信付款——光在浏览器里跑的代码做不到。</p>
      <div class="fe-be-game">
        <div class="actor">
          <div class="actor-emoji">📱</div>
          <div class="actor-label">前端</div>
        </div>
        <div class="msg-track">
          <div class="msg msg-req">"我要登录"</div>
          <div class="msg msg-res">"欢迎你！"</div>
        </div>
        <div class="actor">
          <div class="actor-emoji">🖥️</div>
          <div class="actor-label">后端</div>
        </div>
      </div>
      <p><em>前端</em>：用户看到的部分，跑在浏览器里（<em>HTML</em> / <em>CSS</em> / <em>JS</em> 写的）。</p>
      <p><em>后端</em>：用户看不到的部分，跑在你的服务器上，管账号、存数据、收钱。</p>
      <p>做纯展示工具（番茄钟、计算器）只要前端就够。要存数据 / 多人共享 / 收钱就要加后端。</p>
    ` },
  ],
  children: [node_api_http],
};

const node_web_trio = {
  id: "web-trio",
  emoji: "🌐",
  title: "HTML / CSS / JS",
  concept: { name: "HTML / CSS / JavaScript", explain: "做网页的三件套：HTML 骨架、CSS 外观、JS 逻辑。" },
  pages: [
    { html: `
      <p>用户在你网页上看到的所有东西——文字、按钮、图、输入框——都是这三件套合起来的。</p>
      <div class="web-stack-game">
        <div class="stack-mock">
          <div class="stack-layer html"><div class="mock-title">我的页面</div><span class="mock-btn">按钮</span></div>
          <div class="stack-layer css" style="position:absolute;inset:8px;"><div class="mock-title styled">我的页面</div><span class="mock-btn styled">按钮</span></div>
          <div class="stack-layer js" style="position:absolute;bottom:6px;left:8px;font-size:9.5px;color:#c97b4a;">⚡ 点了按钮 → 弹个窗</div>
        </div>
        <div class="stack-labels">
          <span>📄 HTML 骨架</span>
          <span>🎨 +CSS 变好看</span>
          <span>⚡ +JS 能互动</span>
        </div>
      </div>
      <p><em>HTML</em>：写"页面里有什么"（标题、段落、按钮、图、输入框）。</p>
      <p><em>CSS</em>：写"长什么样"（颜色、字体、布局、间距、圆角）。</p>
      <p><em>JavaScript</em>：写"怎么响应"（点了按钮做什么、输了字算什么）。</p>
    ` },
  ],
  children: [node_fe_be, node_framework],
};

const node_where_web = {
  id: "where-web",
  emoji: "🌐",
  title: "在浏览器里打开",
  concept: { name: "浏览器", explain: "运行网页的程序——Chrome、Safari、Edge。" },
  pages: [
    { html: `
      <p>想让用户敲一个网址就能用上你做的东西？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">⌨️</span>
        <span class="ei-label">敲网址</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🌐</span>
        <span class="ei-label">网页打开</span>
      </div>
      <p>用户在 <em>浏览器</em>（Chrome / Safari / Edge）里打开，不用装东西、不用更新，手机电脑都能开。</p>
      <p>vc 创作者最容易出活的一条路。</p>
    ` },
  ],
  children: [node_web_trio, node_dns],
};

// ====== 电脑分支链 ======

const node_electron = {
  id: "electron",
  emoji: "🌐",
  title: "Electron / Tauri",
  concept: { name: "Electron / Tauri", explain: "把网页代码包成桌面 App 的工具。" },
  pages: [
    { html: `
      <p>会写网页（<em>HTML</em> / <em>CSS</em> / <em>JS</em>）就想做桌面 App？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📄+🎨+⚡</span>
        <span class="ei-label">网页代码</span>
        <span class="ei-arrow">📦</span>
        <span class="ei-emoji">💻</span>
        <span class="ei-label">.exe / .app</span>
      </div>
      <p>VS Code、Slack、Discord、飞书桌面版——里面跑的其实是浏览器内核 + 网页代码。</p>
      <p>包成桌面 App 的工具：<em>Electron</em>（功能全但体积大）、<em>Tauri</em>（体积小，用系统自带浏览器）。</p>
    ` },
  ],
  children: [],
};

const node_compile = {
  id: "compile",
  emoji: "📦",
  title: "编译",
  concept: { name: "编译", explain: "把代码翻译成机器能跑的文件（.exe / .app）。" },
  pages: [
    { html: `
      <p>你写的代码是给人看的——电脑直接看不懂。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📝</span>
        <span class="ei-label">人写的代码</span>
        <span class="ei-arrow">⚙️</span>
        <span class="ei-emoji">💾</span>
        <span class="ei-label">.exe / .app</span>
      </div>
      <p>翻译成机器能跑的可执行文件，这一步叫<em>编译</em>。</p>
      <p>Windows 出 .exe、macOS 出 .app。每改一次都要重新编译。</p>
    ` },
  ],
  children: [node_electron],
};

const node_os = {
  id: "os",
  emoji: "🪟",
  title: "操作系统",
  concept: { name: "操作系统", explain: "管硬件、给程序提供运行环境的那一层。" },
  pages: [
    { html: `
      <p>你的桌面 App 装在用户电脑上要跑——但要看用户用什么系统。</p>
      <p>程序和硬件中间的那一层叫<em>操作系统</em>。</p>
      <p>三大主流：<em>Windows</em>（大部分 PC）、<em>macOS</em>（苹果）、<em>Linux</em>（开发者）。每种能跑的文件不一样。</p>
    ` },
  ],
  children: [node_compile],
};

const node_where_desktop = {
  id: "where-desktop",
  emoji: "💻",
  title: "在电脑里双击打开",
  concept: { name: "桌面应用", explain: "双击图标就打开的程序——Word、QQ、剪映。" },
  pages: [
    { html: `
      <p>想做用户在电脑上双击图标就打开的程序？像 Word、QQ、剪映那样。</p>
      <p>这类叫<em>桌面应用</em>。</p>
      <p><em>Windows</em> 和 <em>macOS</em> 是两套不通的系统，原生写不能两边都跑。</p>
    ` },
  ],
  children: [node_os],
};

// ====== 手机分支链 ======

const node_appstore = {
  id: "appstore",
  emoji: "🏪",
  title: "应用商店",
  concept: { name: "应用商店", explain: "手机 App 必须通过的分发门。" },
  pages: [
    { html: `
      <p>想让用户在手机商店搜到、下载你的 App？</p>
      <p>手机 App 不像网页能直接发——必须通过<em>应用商店</em>审核。</p>
      <p>苹果：<em>App Store</em>（$99 / 年 + 审核几天到几周）。安卓：国外 <em>Google Play</em>、国内华为 / 小米 / OPPO / vivo 各家。</p>
    ` },
  ],
  children: [],
};

const node_cross = {
  id: "cross",
  emoji: "↔️",
  title: "跨平台",
  concept: { name: "跨平台", explain: "一份代码生成 iOS 和 Android 两端。" },
  pages: [
    { html: `
      <p>想一份代码同时出 iOS 和 Android App？</p>
      <p>这叫<em>跨平台</em>。主流两种：<em>Flutter</em>（Dart 语言）、<em>React Native</em>（JS，会写网页快上手）。</p>
      <p>出活快。代价是偶尔撞性能瓶颈或最新系统功能支持不全。</p>
    ` },
  ],
  children: [node_appstore],
};

const node_native = {
  id: "native",
  emoji: "⚙️",
  title: "原生开发",
  concept: { name: "原生开发", explain: "针对单一系统写——iOS 用 Swift、Android 用 Kotlin。" },
  pages: [
    { html: `
      <p>想要 App 性能最好、体验最贴近系统？</p>
      <p>针对一个系统单独写：iOS 用 <em>Swift</em>、Android 用 <em>Kotlin</em>——叫<em>原生开发</em>。</p>
      <p>代价：要写两遍。大厂主力 App 基本都走这条。</p>
    ` },
  ],
  children: [node_cross],
};

const node_where_mobile = {
  id: "where-mobile",
  emoji: "📱",
  title: "在手机上用",
  concept: { name: "iOS / Android", explain: "两大手机系统，彼此不通。" },
  pages: [
    { html: `
      <p>想做用户能在手机上下载的 App？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🍎</span>
        <span class="ei-label">iOS（iPhone）</span>
        <span class="ei-arrow">vs</span>
        <span class="ei-emoji">🤖</span>
        <span class="ei-label">Android（其他厂）</span>
      </div>
      <p>手机有两套不通的系统：苹果的 <em>iOS</em>、其他厂的 <em>Android</em>。</p>
      <p>原生写要写两遍；或者用跨平台工具一份代码两端跑。</p>
    ` },
  ],
  children: [node_native],
};

// ====== 命令行分支链 ======

const node_cron = {
  id: "cron",
  emoji: "⏰",
  title: "定时任务",
  concept: { name: "定时任务", explain: "操作系统的时间表——告诉它几点跑什么。" },
  pages: [
    { html: `
      <p>想让脚本每天 9 点自己跑？每小时签到一次？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">⏰</span>
        <span class="ei-label">每天 9:00</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📜</span>
        <span class="ei-label">自动跑脚本</span>
      </div>
      <p>告诉系统「几点跑什么」——这叫<em>定时任务</em>。</p>
      <p>Linux / macOS 上叫 <em>cron</em>，Windows 上叫"计划任务"。</p>
    ` },
  ],
  children: [],
};

const node_pkg = {
  id: "pkg",
  emoji: "📦",
  title: "包管理器",
  concept: { name: "包管理器", explain: "装别人写好的代码库的工具。" },
  pages: [
    { html: `
      <p>想抓网页？读 Excel？解析 PDF？发邮件？</p>
      <p>别人写过的代码（叫"包"或"库"）一行命令装上就能用。</p>
      <p>装它们的工具叫<em>包管理器</em>——<em>Python</em> 用 <em>pip</em>、<em>Node.js</em> 用 <em>npm</em>。</p>
    ` },
  ],
  children: [node_cron],
};

const node_python = {
  id: "python",
  emoji: "🐍",
  title: "Python",
  concept: { name: "Python", explain: "写脚本和数据处理最常用的语言。" },
  pages: [
    { html: `
      <p>想做爬虫、数据分析、训练 AI、写自动化小工具？</p>
      <p><em>Python</em> 是这些用得最多的语言。</p>
      <p>语法接近英文，几行就跑通——常被推荐当"第一门编程语言"。</p>
    ` },
  ],
  children: [node_pkg],
};

const node_script = {
  id: "script",
  emoji: "📜",
  title: "脚本",
  concept: { name: "脚本", explain: "一段写好后可以反复跑的代码。" },
  pages: [
    { html: `
      <p>想让一段代码反复跑——批量处理文件、每天处理一次、写个 bot？</p>
      <p>这种代码叫<em>脚本</em>。</p>
      <p>不用安装，保存成 .py / .js / .sh 就能跑。</p>
    ` },
  ],
  children: [node_python],
};

const node_where_cli = {
  id: "where-cli",
  emoji: "⌨️",
  title: "在命令行里跑",
  concept: { name: "命令行", explain: "靠敲文字命令做事的黑窗口。" },
  pages: [
    { html: `
      <p>做"只给自己用"的小工具？批量处理文件？写个 bot？</p>
      <p><em>命令行</em>（黑窗口、敲文字命令）这条路上手最快，几行代码就跑。</p>
      <p>Mac / Linux 上叫 Terminal，Windows 上叫 cmd / PowerShell。</p>
    ` },
  ],
  children: [node_script],
};

// ====== 服务分支链 ======

const node_deploy_server = {
  id: "deploy-server",
  emoji: "🚀",
  title: "部署",
  concept: { name: "部署（服务端）", explain: "把服务程序传到服务器上一直跑。" },
  pages: [
    { html: `
      <p>想让你的 bot / API / 后端服务 24 小时不停？挂了能自动重启？</p>
      <p>把服务搬到服务器上让它一直跑——这一步叫<em>部署</em>。</p>
      <p>省心的：<em>Railway</em>、<em>Render</em>、<em>Fly.io</em>——绑 GitHub 自动部署。</p>
    ` },
  ],
  children: [{ ref: "shared-server" }],
};

const node_api_http_server = {
  id: "api-http-server",
  emoji: "🔌",
  title: "API / HTTP",
  concept: { name: "API / HTTP（服务端）", explain: "你的服务对外开放的接口 + 底层对话协议。" },
  pages: [
    { html: `
      <p>想让别人能调用你的服务（比如做个公开的 AI API、Webhook 接收器）？</p>
      <p>你按定好的格式接收请求 + 按格式回——这组接口叫 <em>API</em>，底下用 <em>HTTP</em>。</p>
      <p>要想：谁能调（鉴权）、调多频繁（限流）、出错怎么回（错误码）。</p>
    ` },
  ],
  children: [node_deploy_server],
};

const node_auth_server = {
  id: "auth-server",
  emoji: "🔐",
  title: "登录",
  concept: { name: "认证 / 授权", explain: "认证验证你是谁，授权决定你能干什么。" },
  pages: [
    { html: `
      <p>想让用户登录后才能用你的服务？</p>
      <p><em>认证</em>：验证你是谁（密码、短信验证码、第三方登录）。</p>
      <p><em>授权</em>：决定你能干什么（管理员 / 普通用户）。</p>
      <p>用 <em>Supabase Auth</em> / <em>Clerk</em> / <em>Auth0</em> 接现成更稳。</p>
    ` },
  ],
  children: [node_api_http_server],
};

const node_database_server = {
  id: "database-server",
  emoji: "🗃️",
  title: "数据库",
  concept: { name: "数据库", explain: "专门存数据、能快速找到的程序。" },
  pages: [
    { html: `
      <p>服务要保存账号、订单、签到记录、爬到的内容？</p>
      <p>用 txt 文件存太慢——百万条数据找一条要扫一遍。</p>
      <p>专门干这个的程序叫<em>数据库</em>——<em>SQLite</em>、<em>MySQL</em>、<em>PostgreSQL</em>。</p>
    ` },
  ],
  children: [node_auth_server],
};

const node_where_server = {
  id: "where-server",
  emoji: "☁️",
  title: "长期挂着自己跑",
  concept: { name: "后台服务", explain: "没界面、24 小时跑在服务器上的程序。" },
  pages: [
    { html: `
      <p>想做 Discord 机器人？AI 套壳后端？定时签到？爬虫一直跑？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🤖</span>
        <span class="ei-label">bot</span>
        <span class="ei-emoji">⏰</span>
        <span class="ei-label">签到</span>
        <span class="ei-emoji">🕷️</span>
        <span class="ei-label">爬虫</span>
        <span class="ei-emoji">🧠</span>
        <span class="ei-label">AI 后端</span>
      </div>
      <p>没有用户界面、自己在服务器上一直跑的程序，叫<em>后台服务</em>。</p>
      <p>用户不直接看到它，但它一直在工作。</p>
    ` },
  ],
  children: [node_database_server],
};

// ====== 硬件分支链 ======

const node_iot = {
  id: "iot",
  emoji: "🛰️",
  title: "物联网",
  concept: { name: "物联网", explain: "让小硬件能联网——往云端发数据 / 接收命令。" },
  pages: [
    { html: `
      <p>想用手机控制家里的灯？想看到家里温度？让你做的硬件接收远程命令？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span>
        <span class="ei-arrow">📶</span>
        <span class="ei-emoji">☁️</span>
        <span class="ei-arrow">📶</span>
        <span class="ei-emoji">💡</span>
        <span class="ei-label">远程开灯</span>
      </div>
      <p>硬件接 Wi-Fi / 蓝牙后能联网——这叫<em>物联网</em>（英文 IoT）。</p>
      <p>做物联网最方便的板子：<em>ESP32</em>（自带 Wi-Fi，几十块）。</p>
    ` },
  ],
  children: [],
};

const node_sensor = {
  id: "sensor",
  emoji: "🌡️",
  title: "传感器 / 执行器",
  concept: { name: "传感器 / 执行器", explain: "传感器读环境，执行器做动作。" },
  pages: [
    { html: `
      <p>想做"温度超过 28 度就开风扇"、"有人靠近就亮灯"这种？</p>
      <p>核心循环：</p>
      <div class="loop-flow">
        <div class="flow-step"><span class="flow-emoji">📡</span><span class="flow-name">传感器</span><span class="flow-role">读</span></div>
        <span class="flow-op">→</span>
        <div class="flow-step"><span class="flow-emoji">🧠</span><span class="flow-name">代码</span><span class="flow-role">判断</span></div>
        <span class="flow-op">→</span>
        <div class="flow-step"><span class="flow-emoji">💡</span><span class="flow-name">执行器</span><span class="flow-role">做</span></div>
      </div>
      <p><em>传感器</em>：读温度、湿度、距离、光、动作。</p>
      <p><em>执行器</em>：点灯、转马达、发声。</p>
    ` },
  ],
  children: [node_iot],
};

const node_board = {
  id: "board",
  emoji: "🔲",
  title: "开发板",
  concept: { name: "开发板", explain: "带芯片和接口的小板子。" },
  pages: [
    { html: `
      <p>做硬件项目，你需要一块带芯片和接口的板子——叫<em>开发板</em>。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">💻</span>
        <span class="ei-arrow">📤</span>
        <span class="ei-emoji">🔲</span>
        <span class="ei-label">代码烧进板子</span>
      </div>
      <p>写好代码用一根线连到电脑、把代码"烧"到板子上——板子自己就能跑。</p>
      <p>三种常用：<em>Arduino</em>（几十块，最入门）、<em>树莓派</em>（小型 Linux 电脑，能跑完整程序）、<em>ESP32</em>（自带 Wi-Fi，做物联网最方便）。</p>
    ` },
  ],
  children: [node_sensor],
};

const node_where_hardware = {
  id: "where-hardware",
  emoji: "🔌",
  title: "做真实的硬件",
  concept: { name: "嵌入式 / IoT", explain: "代码跑在小芯片上控制实物。" },
  pages: [
    { html: `
      <p>想做智能家居？温度计盒子？传感器项目？小机器人？</p>
      <p>代码跑在巴掌大的小芯片上控制电、灯、马达、传感器——这类项目叫<em>嵌入式</em>。</p>
      <p>联网之后叫<em>物联网</em>（IoT）。</p>
      <p>跟纯软件最大差别：要焊电路、烧固件，改一次成本高。</p>
    ` },
  ],
  children: [node_board],
};

// ====== 术语解释表 ======
const TERM_GLOSSARY = {
  "HTML": "一种标记语言。写网页骨架——决定页面里有什么（标题、按钮、图、输入框）。",
  "CSS": "一种样式语言。写网页外观——决定颜色、字体、大小、布局。",
  "JavaScript": "浏览器里能跑的编程语言。写网页逻辑——决定怎么响应、怎么动。",
  "JS": "JavaScript 的简称。",
  "浏览器": "运行网页的程序——Chrome、Safari、Edge 都是。",
  "前端": "用户能看到、能点的部分。跑在用户的浏览器里。",
  "后端": "用户看不到的部分。跑在你的服务器上，负责存数据、验证账号、收钱。",
  "API": "程序之间约定的请求格式。调 GPT、调微信、查天气都是按对方的 API 发请求。",
  "HTTP": "浏览器和服务器之间对话用的协议。网址前的 http:// 就是它。",
  "数据库": "专门存数据、能快速查找的程序。",
  "SQLite": "最简单的数据库。一个文件即数据库，适合小项目。",
  "MySQL": "开源主流数据库。多人同时读写、正经服务器用。",
  "PostgreSQL": "开源主流数据库。功能丰富、稳定。",
  "Redis": "极快的内存数据库，常做缓存。",
  "认证": "验证你是谁——密码、短信验证码、第三方登录都是。英文 Authentication。",
  "授权": "决定你能干什么——管理员 / 普通用户的权限。英文 Authorization。",
  "Supabase Auth": "现成的认证服务，免费起步。",
  "Clerk": "现成的认证服务，体验好但贵。",
  "Auth0": "老牌认证服务。",
  "部署": "把你的程序传到服务器上让别人能访问。",
  "服务器": "一台一直开着、连着公网的电脑。你的程序跑上去 24 小时不停。",
  "Cloudflare Pages": "免费静态网页部署服务。绑 GitHub 自动部署。",
  "Vercel": "免费网页部署服务。Next.js 官方推荐。",
  "Netlify": "免费网页部署服务。",
  "Railway": "服务程序部署平台。绑 GitHub 自动部署。",
  "Render": "服务程序部署平台。",
  "Fly.io": "服务程序部署平台。",
  "IP": "每台联网电脑的真实编号（像 142.250.4.100）。",
  "域名": "给人记的名字（example.com、bilibili.com）。",
  "DNS": "把域名翻成 IP 的电话本。",
  "前端框架": "帮你管页面状态、拆组件的工具。",
  "React": "Meta 做的前端框架。最流行。",
  "Vue": "华人 Evan You 做的前端框架。简单易上手。",
  "Svelte": "轻量新秀前端框架。",
  "桌面应用": "用户在电脑上双击图标就打开的程序——Word、QQ、剪映。",
  "操作系统": "管硬件、给程序提供运行环境的那一层。",
  "Windows": "微软的操作系统。大部分 PC 用。",
  "macOS": "苹果电脑的操作系统。",
  "Linux": "免费开源的操作系统。服务器和开发者用得多。",
  "编译": "把代码翻译成机器能跑的可执行文件（.exe / .app）。",
  "Electron": "把网页代码包成桌面 App 的工具。VS Code / Slack / Discord 都是用它做的。",
  "Tauri": "把网页代码包成桌面 App 的轻量工具。用系统自带浏览器内核，体积比 Electron 小。",
  "iOS": "苹果手机的操作系统。",
  "Android": "其他厂手机的操作系统（小米、华为、三星、Pixel）。",
  "原生开发": "针对单一系统单独写——iOS 用 Swift、Android 用 Kotlin。",
  "Swift": "iOS 主力开发语言。苹果做的。",
  "Kotlin": "Android 主力开发语言。",
  "跨平台": "一份代码生成 iOS 和 Android 两端 App。",
  "Flutter": "Google 做的跨平台 App 工具。用 Dart 语言。",
  "React Native": "用 JavaScript 写跨平台 App 的工具。",
  "应用商店": "手机 App 必须通过的分发门。",
  "App Store": "苹果的应用商店。$99 / 年 + 审核。",
  "Google Play": "安卓的国际应用商店。",
  "命令行": "黑窗口，靠敲文字命令做事。Terminal、cmd、PowerShell 都是。",
  "脚本": "一段写好后可以反复跑的代码。.py / .js / .sh 文件。",
  "Python": "写脚本和数据处理最常用的语言。语法接近英文。",
  "Node.js": "在电脑 / 服务器上跑 JavaScript 的环境。",
  "包管理器": "装别人写好的代码库的工具。",
  "pip": "Python 的包管理器。",
  "npm": "Node.js 的包管理器。",
  "定时任务": "操作系统的时间表——告诉它几点跑什么。",
  "cron": "Linux / macOS 的定时任务系统。",
  "后台服务": "没界面、24 小时跑在服务器上的程序——bot、爬虫、API 后端。",
  "嵌入式": "代码跑在小芯片上控制实物的项目。",
  "物联网": "让小硬件能联网——往云端发数据 / 接收命令。英文 IoT。",
  "IoT": "Internet of Things，物联网。",
  "开发板": "带芯片和接口的小板子。",
  "Arduino": "最入门的开发板，几十块。适合简单逻辑。",
  "树莓派": "巴掌大的小型 Linux 电脑，能跑完整程序。",
  "ESP32": "自带 Wi-Fi 的开发板，做物联网最方便。几十块。",
  "传感器": "读环境数据的硬件零件——温度、湿度、距离、光。",
  "执行器": "做动作的硬件零件——点灯、转马达、发声。",
};

// ====== root ======

const TREE_DATA = {
  id: "root",
  emoji: "💡",
  title: "我想做一个东西！",
  pages: [
    {
      html: `
        <p>想做的东西很多——番茄钟、博客、bot、AI 套壳、智能家居——但学的东西其实大多一样。</p>
        <p>真正分岔的第一个问题：<strong>你想让它跑在哪里？</strong></p>
        <p>下面 6 条路，挑一条往下走。每走一步会引出一个新概念。</p>
      `,
    },
  ],
  children: [
    node_where_web,
    node_where_desktop,
    node_where_mobile,
    node_where_cli,
    node_where_server,
    node_where_hardware,
  ],
};
