// example HTML 批量注入（v14）—— 全部我自己写
// 铁律：(1) 绝不预设用户懂/不懂；(2) 绝不嘲讽；(3) 描述事实 + 场景，不评价用户
// 用法：index.html 在 data.js 后加载本文件，injectExamples 把 example 追加到对应节点 pages[0].html

const __EXAMPLE_BY_ID__ = {

  "basics-entry": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧩</span>代码基础 = <strong>变量 / 函数 / 数据类型 / 条件循环 / 报错调试</strong> 这几块拼图——所有项目底下都是这套</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>用户名要存起来 → 变量；点赞按钮要触发动作 → 函数；金额是数字、备注是字符串 → 数据类型</div>
      <div class="ex-line"><span class="ex-emoji">🔀</span>已登录才显示发帖按钮 → 条件；100 个评论挨个画出来 → 循环</div>
      <div class="ex-line"><span class="ex-emoji">🐛</span>页面白屏 → 看控制台报错；接口没数据 → log 调试</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🗣️</span>跟 AI 沟通用对术语 → 一次说清楚，少来回</div>
      <div class="ex-line"><span class="ex-emoji">🔍</span>AI 生成代码后能看个大概在做什么 → 知道哪里要调</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>这一块统称 <strong>编程基础</strong>（programming fundamentals），任何语言都通用</div>
    </div></div>
  </div></div>`,

  "console-log": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📣</span><strong>console.log</strong> = 让程序在跑的时候<strong>把某个变量的值喊出来</strong>给你看——浏览器/编辑器的"黑窗口"里显示</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛒</span>加购按钮没反应 → 在按钮里写 <code>console.log('点了', 商品ID)</code> → 看是真没触发还是触发了没执行</div>
      <div class="ex-line"><span class="ex-emoji">📡</span>接口返回数据格式怪 → log 整个 response 对象 → 一眼看出哪个字段缺了</div>
      <div class="ex-line"><span class="ex-emoji">📊</span>表单算总价不对 → log 每一步的中间值 → 找到第几步算错</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>零成本 debug：不用装工具，一行代码就开始排查</div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>缩小问题范围：log 到第几步停止 = bug 就在那一步</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>上线前删掉 / 用 <strong>console.debug</strong> 替代——避免生产环境刷屏</div>
    </div></div>
  </div></div>`,

  "error-debug": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📕</span>报错 = <strong>程序卡在某一行举手喊"这里有问题"</strong>——红字里通常已经写了 哪一行 + 什么类型的错</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔴</span>页面白屏 → F12 看控制台 → 找最上面的红字，那一行就是问题源头</div>
      <div class="ex-line"><span class="ex-emoji">📍</span><strong>调用栈</strong>（stack trace）从下往上读 = 函数 A 调了 B 调了 C，C 在最上面正在出错</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>整段错误信息复制问 AI → 比"我代码不工作"清晰 100 倍</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>修 bug 有套路：复现 → 看红字 → 定位行 → log 验证 → 改 → 再跑</div>
      <div class="ex-line"><span class="ex-emoji">🛠️</span>常见错对应方向：<code>undefined</code> 类 → 值是空的；<code>SyntaxError</code> → 拼写/括号；<code>404</code> → 网址错</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>更专业的工具：浏览器 <strong>F12 → Sources</strong> 设断点逐行跑，看每一步变量值</div>
    </div></div>
  </div></div>`,

  "control-flow": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🚦</span><strong>条件</strong>（if/else）= 按情况走不同分支；<strong>循环</strong>（for/while）= 同一段代码重复跑 N 次</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💰</span>结算页：<code>if 总价 ≥ 99 → 免运费 else → +8 元运费</code></div>
      <div class="ex-line"><span class="ex-emoji">📋</span>渲染 100 件商品列表：<code>for (商品 of 商品列表) → 画一张卡片</code></div>
      <div class="ex-line"><span class="ex-emoji">🔐</span>密码校验：<code>if 长度 &lt; 6 → 提示太短 / else if 没字母 → 提示太弱 / else → 通过</code></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>程序能"分情况"：根据数据 / 用户状态 / 时间走不同逻辑</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>批量处理：1000 条数据一个循环搞定，不用复制粘贴 1000 次</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>陷阱：<strong>死循环</strong>（while 条件永远满足）→ 浏览器卡死。写 while 一定留出口</div>
    </div></div>
  </div></div>`,

  "web-trio": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏠</span><strong>HTML</strong> = 房子的<strong>骨架</strong>（沙发放哪、电视放哪）+ <strong>CSS</strong> = <strong>装修</strong>（颜色、字体、间距）+ <strong>JS</strong> = <strong>家电开关</strong>（按按钮灯亮、点链接跳转）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📄</span>登录页 → HTML 写"邮箱框 + 密码框 + 登录按钮"</div>
      <div class="ex-line"><span class="ex-emoji">🎨</span>美化 → CSS 给输入框圆角、按钮变橙色、整体居中</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>能用 → JS 监听点击 → 拿输入值 → 调登录接口 → 跳首页</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>三件套是 Web 万物的根基：淘宝 / 抖音 / 微信小程序底下都是这三个</div>
      <div class="ex-line"><span class="ex-emoji">🧩</span>分工明确：UI / 样式 / 逻辑各管一摊，改哪个不串味</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>用 React / Vue 框架最后编译产物还是这三个，绕不开</div>
    </div></div>
  </div></div>`,

  "tools-entry": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛠️</span>一套标准开发工具组合：<strong>编辑器 + AI 助手 + 终端 + 包管理 + Git/GitHub</strong> 五样配齐，才能舒服做项目</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>编辑器</strong>（VS Code / Cursor）= 写代码的主界面</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span><strong>AI 助手</strong>（Cursor 内置 / Claude Code）= 帮写代码、找 bug</div>
      <div class="ex-line"><span class="ex-emoji">⬛</span><strong>终端</strong> + <strong>包管理</strong>（npm / pip）= 装别人写好的库、跑命令</div>
      <div class="ex-line"><span class="ex-emoji">💾</span><strong>Git + GitHub</strong> = 改动存档 + 云端备份，改炸了能回滚</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>五样配齐 = 完整开发环境，做任何项目都跑得起来</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>少一样就卡：没 Git 改炸了救不回来；没包管理装库到处出错</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>AI 教程说"配环境"= 把这套装齐 + 互相能通</div>
    </div></div>
  </div></div>`,

  "editor": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">✍️</span>编辑器 = <strong>写代码专用的 Word</strong>。比 Word 强：自动补全、错误标红、能跑代码、能装 AI 插件</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>VS Code</strong>：免费、轻量、生态最大、装插件能干任何事</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span><strong>Cursor</strong>（VS Code 加 AI 版）：Ctrl+K 选中代码让 AI 改，对话面板讨论方案</div>
      <div class="ex-line"><span class="ex-emoji">🧩</span>常用插件：ESLint 自动检查代码风格、GitLens 看代码历史、Prettier 自动格式化</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>写代码加速：输一半补全、按 F12 跳定义、Ctrl+Shift+F 全局搜</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>AI 加持：vibecoding 主力工具是 Cursor / Claude Code / Copilot</div>
      <div class="ex-line"><span class="ex-emoji">📐</span><strong>编辑器</strong> vs <strong>IDE</strong>：IDE 重，自带编译调试一条龙；编辑器轻，靠插件扩展</div>
    </div></div>
  </div></div>`,

  "ai-helper": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🤝</span>AI 编程助手 = <strong>能直接动你电脑里文件、跑命令、看错误的 AI</strong>——不是只在聊天框里写"建议代码"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💬</span>说："登录按钮点了没反应，修一下" → AI 自己翻相关文件读一遍 → 改代码 → 跑测试 → 告诉你结果</div>
      <div class="ex-line"><span class="ex-emoji">🛠️</span>主流工具：<strong>Cursor</strong>（最普及）、<strong>Claude Code</strong>（命令行版，能力强）、<strong>Cline</strong>（VS Code 插件）</div>
      <div class="ex-line"><span class="ex-emoji">📦</span>跟"复制代码到 ChatGPT 问"的区别：AI 助手自己读项目上下文，不用每次给它贴代码</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>速度：一句话替你做一组操作，省去手动改 / 测 / 看错的循环</div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>上下文一致：AI 看过整个项目，写的代码风格能跟现有代码对上</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>关键：AI 可能写错、可能编不存在的库 → 改完跑一遍 + 看实际效果</div>
    </div></div>
  </div></div>`,

  "terminal": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⌨️</span>终端 = <strong>黑底白字的小窗口，敲命令让电脑做事</strong>。一行命令 = 一个动作，比鼠标点菜单快很多</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span><code>npm install</code> → 装项目要用的所有库（鼠标点不出来这个动作）</div>
      <div class="ex-line"><span class="ex-emoji">▶️</span><code>npm run dev</code> → 把项目跑起来，浏览器就能打开看</div>
      <div class="ex-line"><span class="ex-emoji">📤</span><code>git push</code> → 把代码改动推到 GitHub 云端</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>很多操作根本没图形界面 → 只能在终端做</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>命令行可组合：A 的输出当 B 的输入，灵活</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>叫法：Mac/Linux 叫 <strong>Terminal / bash / zsh</strong>，Windows 叫 <strong>cmd / PowerShell</strong></div>
    </div></div>
  </div></div>`,

  "git": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💾</span>Git = <strong>代码的"另存为"系统</strong>——每次改完存一份带说明的快照，以后能翻回任何一个版本</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">✍️</span><strong>commit</strong>：改完一块功能 → 存档"加了登录功能"。以后无论怎么改坏都能回到这一刻</div>
      <div class="ex-line"><span class="ex-emoji">🌿</span><strong>branch</strong>：想试个新方案 → 开一个分支"试验夜间模式"。试坏了直接扔掉，主分支不受影响</div>
      <div class="ex-line"><span class="ex-emoji">↩️</span><strong>回滚</strong>：AI 改炸了 → <code>git reset</code> 回到上一个 commit，几秒救回</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛡️</span>改炸不慌：随时回滚到任一版本</div>
      <div class="ex-line"><span class="ex-emoji">📜</span>历史可查：3 个月后想知道"这段代码当时为啥这么写" → git log 查改动说明</div>
      <div class="ex-line"><span class="ex-emoji">🤝</span>多人协作必备：每人改一份，合并到一起不打架</div>
    </div></div>
  </div></div>`,

  "github": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">☁️</span>GitHub = <strong>代码的云端网盘 + 协作平台</strong>——本地用 Git 存档，推到 GitHub 就上了云端</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📤</span><strong>push</strong>：本地 commit 后推到 GitHub → 别的电脑能拉下来</div>
      <div class="ex-line"><span class="ex-emoji">📥</span><strong>pull</strong>：从 GitHub 拉别人最新改动到自己电脑</div>
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>PR</strong>（Pull Request）：改完一块新功能 → 发申请 → 项目维护者审过再合并</div>
      <div class="ex-line"><span class="ex-emoji">🌍</span>个人项目也用：当云端备份 + 换电脑 git clone 几秒拿回</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💾</span>电脑坏了代码还在云端</div>
      <div class="ex-line"><span class="ex-emoji">🚀</span>能直接连 Vercel / Netlify → push 自动部署，几分钟上线</div>
      <div class="ex-line"><span class="ex-emoji">🌐</span>全球开源生态在这：搜任何工具 / 库 / 教程都在 GitHub</div>
    </div></div>
  </div></div>`,

  "npm-pkg": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>依赖 = <strong>别人写好的代码包</strong>，<code>npm install xxx</code> 一行命令装到项目，立刻能用</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📅</span>要日期选择器 → <code>npm install dayjs</code>，3 秒装上现成的</div>
      <div class="ex-line"><span class="ex-emoji">📊</span>要画图表 → <code>npm install chart.js</code>，柱状/折线/饼图全有</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>调 OpenAI → <code>npm install openai</code>（JS）/ <code>pip install openai</code>（Python）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>百万开源包随便用，不重复造轮子</div>
      <div class="ex-line"><span class="ex-emoji">📋</span><strong>package.json</strong> 自动记录用了哪些包 → 换电脑 <code>npm install</code> 一次性补齐</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>各语言不同：JS 用 <strong>npm/pnpm</strong>、Python 用 <strong>pip</strong>、Rust 用 <strong>cargo</strong>、iOS 用 <strong>CocoaPods/SPM</strong></div>
    </div></div>
  </div></div>`,

  "ssh-auth": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔑</span>SSH key = <strong>一对钥匙</strong>（私钥锁电脑里、公钥贴 GitHub）。两个对上就免密码推代码</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💻</span>第一次配 GitHub → 生成 SSH 密钥对 → 公钥贴到 GitHub 设置页 → 之后 <code>git push</code> 不弹密码框</div>
      <div class="ex-line"><span class="ex-emoji">☁️</span>SSH 连云服务器 → <code>ssh root@1.2.3.4</code> → 不用反复输密码</div>
      <div class="ex-line"><span class="ex-emoji">🪙</span><strong>API token</strong>：调 OpenAI / 阿里云的钥匙 → 放 <code>.env</code> 文件，不能进 git 提交</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>免密码：日常操作不打断思路</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>比密码安全：钥匙难破解，泄露能立刻换新对</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>红线：<strong>私钥 / token 绝不进 git 提交</strong>。已经传了 → 立刻去对方平台撤销重发</div>
    </div></div>
  </div></div>`,

  "pkg": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛒</span>包管理器 = <strong>代码界的应用商店</strong>。一行 install 命令装好别人写的功能</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>JS / Node 项目用 <strong>npm</strong>（最常用）/ <strong>pnpm</strong>（更快）/ <strong>yarn</strong>（老选项）</div>
      <div class="ex-line"><span class="ex-emoji">🐍</span>Python 用 <strong>pip</strong>（数据 / AI 库全在这）</div>
      <div class="ex-line"><span class="ex-emoji">🦀</span>Rust 用 <strong>cargo</strong>、iOS Swift 用 <strong>CocoaPods / SPM</strong>、Go 用内置 <strong>go mod</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>不用造轮子：要啥功能搜一下大概率有现成包</div>
      <div class="ex-line"><span class="ex-emoji">📋</span>版本统一：项目里写明用什么版本，换人 / 换电脑装出来一样</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>风险：依赖太多 → 项目体积大、安全漏洞多。挑包看 star 数 + 更新时间</div>
    </div></div>
  </div></div>`,

  "cron": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⏰</span>定时任务 = <strong>给程序设个闹钟</strong>，到点服务器自动跑一遍——不需要人在旁边</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💾</span>每天凌晨 3 点自动备份数据库 → 写个脚本 + cron 规则，无人值守</div>
      <div class="ex-line"><span class="ex-emoji">📧</span>每周一早 9 点给所有用户发周报 → 脚本读用户表 → 循环发邮件</div>
      <div class="ex-line"><span class="ex-emoji">🧹</span>每小时清一次过期的临时文件 → 防止硬盘塞满</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>自动化：定时活儿不用人盯，半夜照样跑</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>Linux 上叫 <strong>cron</strong>（系统自带），云平台叫 <strong>scheduled job</strong>（如 Vercel Cron / GitHub Actions cron）</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>规则用"5 个数字"语法（分 时 日 月 周），不熟就让 AI 翻译："每天凌晨 3 点" → AI 给 cron 表达式</div>
    </div></div>
  </div></div>`,

  "lang-choice": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>选语言看目标平台 + 生态——做网页只能 JS、做 AI 首选 Python、做 iPhone App 用 Swift</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>网页 / 小程序 → <strong>JavaScript</strong>（浏览器只认它）</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>AI 应用 / 数据分析 / 爬虫 → <strong>Python</strong>（库最全）</div>
      <div class="ex-line"><span class="ex-emoji">📱</span>iPhone App → <strong>Swift</strong>；Android App → <strong>Kotlin</strong></div>
      <div class="ex-line"><span class="ex-emoji">🤷</span>没特别偏好 / 第一次学 → <strong>Python</strong> 或 <strong>JavaScript</strong>，资料多上手快</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>vibecoding 时让 AI 选就行——告诉 AI"做一个网页版的 X"，AI 自动用对的</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>知道每种语言长处 → 看 AI 推荐方案时心里有数，不被技术名词带偏</div>
    </div></div>
  </div></div>`,

  "platform-pick": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>挑平台 = 决定产品<strong>"跑在哪"</strong>——网页 / 手机 App / 小程序 / 桌面 / 服务端 / 硬件，规则不同</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span><strong>网页</strong>：浏览器输网址就用，免下载——最容易给陌生人用</div>
      <div class="ex-line"><span class="ex-emoji">📱</span><strong>手机 App</strong>：上架商店要审核，但能用相机 / 通知 / 推送</div>
      <div class="ex-line"><span class="ex-emoji">💬</span><strong>微信小程序</strong>：嵌微信里免下载，国内用户首选</div>
      <div class="ex-line"><span class="ex-emoji">💻</span><strong>桌面软件</strong>：能读电脑文件、长时间挂后台</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>平台定了才能定技术栈——同一个功能在网页 / App / 桌面上写法差很多</div>
      <div class="ex-line"><span class="ex-emoji">🗣️</span>跟 AI 说"做一个网页版的 X" → AI 知道用 HTML/JS；说"做 iOS App" → AI 用 Swift</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>vibecoding 起手建议<strong>先做网页</strong>验证想法，跑通了再考虑手机版</div>
    </div></div>
  </div></div>`,

  "where-web": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>网页 = 浏览器输网址 → 从服务器拿到 HTML/CSS/JS 文件 → 浏览器渲染成可点击的页面</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎨</span>做工具站（番茄钟 / 计算器 / 设计模板）→ 部署到 Vercel，免费拿个公网网址</div>
      <div class="ex-line"><span class="ex-emoji">📚</span>做内容站（博客 / 教程 / 作品集）→ 同样部署即用</div>
      <div class="ex-line"><span class="ex-emoji">🛒</span>做轻量 SaaS（团队协作 / 数据看板）→ 加上登录 + 数据库就能跑</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🚀</span>分发最快：发链接朋友打开就用，免下载免注册</div>
      <div class="ex-line"><span class="ex-emoji">💻</span>跨设备：手机 / 平板 / 电脑全能开</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>限制：不能像 App 那样调相机 / 后台运行 / 推送通知（需要"PWA"或包成 App 才能）</div>
    </div></div>
  </div></div>`,

  "where-desktop": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💻</span>桌面应用 = 在电脑双击打开（Win 是 .exe、Mac 是 .dmg/.app），能读文件 / 弹通知 / 托盘图标</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>vibecoding 起手做桌面 App → 用 <strong>Electron / Tauri</strong> 把网页打包成 .exe / .dmg</div>
      <div class="ex-line"><span class="ex-emoji">🎨</span>笔记 / 图片处理 / 录屏类工具 → 桌面端能直接读本地文件夹</div>
      <div class="ex-line"><span class="ex-emoji">🌐</span>分发：放官网下载 / 上 Mac App Store / Microsoft Store</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📌</span>用户体验更"软件感"：桌面图标 + 任务栏 + 离线可用</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>能调系统能力：摄像头 / 麦克风 / 文件系统全开放</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>痛点：要给 Win + Mac 都打包测试 / 用户得下载安装（不如网页"输网址即用"）</div>
    </div></div>
  </div></div>`,

  "where-mobile": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📱</span>手机 App = 装在 iPhone / Android 里 24 小时陪用户。iOS 和 Android 是两个完全不同的系统</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔔</span>聊天类 → 用<strong>推送通知</strong>提醒新消息（iOS 走 APNs / Android 走 FCM）</div>
      <div class="ex-line"><span class="ex-emoji">📍</span>用 GPS / 摄像头 / 联系人 → 系统会弹"是否允许"权限框</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>App 内卖东西 / 订阅 → iOS 必须用<strong>苹果内购</strong>（抽 30%），不能跳支付宝</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📌</span>用户粘性强：桌面图标 + 推送 + 离线可用</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>能用手机独占功能：陀螺仪 / 指纹 / 健康数据 / NFC</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>痛点：审核慢 + 苹果抽 30%。vibecoding 起手建议先做<strong>移动适配的网页</strong>验证需求</div>
    </div></div>
  </div></div>`,

  "where-cli": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⌨️</span>命令行工具 = <strong>没界面、靠打字驱动</strong>的小程序。一条命令一个动作</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛠️</span>做开发者工具："一键把文件夹里 PNG 全压缩" → 终端敲 <code>mytool ./images</code> 就跑</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>做自动化脚本：配合定时任务每天凌晨跑一次，无人值守</div>
      <div class="ex-line"><span class="ex-emoji">🔌</span>给程序员用户：git / npm / ffmpeg 都是 CLI</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>开发最快：不做界面，专心做功能</div>
      <div class="ex-line"><span class="ex-emoji">🔗</span>能组合：A 工具的输出当 B 工具的输入，灵活</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>受众窄：适合给开发者 / 自己用 / 服务器上跑</div>
    </div></div>
  </div></div>`,

  "where-server": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">☁️</span>服务端 = 程序<strong>跑在云端 24 小时不关机的电脑</strong>上——用户随时能访问，不靠本机</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🤖</span>做 Discord / Telegram bot → 部署到服务器，24 小时响应</div>
      <div class="ex-line"><span class="ex-emoji">🔌</span>做 API 服务 → 给手机 App / 网页 / 别人调用</div>
      <div class="ex-line"><span class="ex-emoji">⏰</span>做定时任务（每天爬数据 / 发邮件）→ 必须挂服务器</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>全球随时可访问：用户半夜也能用</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>逻辑保密：代码只在服务器跑，前端看不到</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>云平台选择：<strong>Vercel / Railway / Render</strong>（轻量、按用量付费）/ <strong>阿里云 / AWS</strong>（重型）</div>
    </div></div>
  </div></div>`,

  "where-hardware": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔌</span>嵌入式 = <strong>代码烧进小芯片让实体硬件动起来</strong>。智能音箱 / 扫地机 / 门锁内部都是这种代码</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌱</span>智能花盆 → Arduino + 湿度传感器 + 水泵，缺水自动浇</div>
      <div class="ex-line"><span class="ex-emoji">🚨</span>家庭警报 → ESP32 + 门磁，开门推送到手机</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>小型机器人 → 树莓派跑 Linux + Python，能视觉识别 + 联网</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎁</span>产品有实体：跟纯软件比差异化拉满</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>开发板便宜（¥20-¥300）+ 教程多 + AI 也会写</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>挑战：芯片内存少 / 调试难 / 量产涉及电路板 + 外壳模具，成本陡涨</div>
    </div></div>
  </div></div>`,

  "native": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>原生 = <strong>用平台官方语言写</strong>，iOS 用 Swift / Android 用 Kotlin。跟系统贴合最紧</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎮</span>3D 游戏 / 高性能 App → 必须原生，跨平台扛不动</div>
      <div class="ex-line"><span class="ex-emoji">📸</span>深度调用相机 / Apple Pencil / 健康数据 → 原生 API 最全</div>
      <div class="ex-line"><span class="ex-emoji">⌚</span>Apple Watch / iOS 桌面小组件 → 只能 Swift 原生</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>性能最强 / 体验最丝滑 / 系统新功能第一时间能用</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>代价：iOS Android 各写一套，开发量翻倍。vibecoding 简单 App 不推荐</div>
    </div></div>
  </div></div>`,

  "cross": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔁</span>跨平台 App 框架 = <strong>一份代码同时给 iOS + Android 跑</strong>。Flutter（谷歌）+ React Native（Meta）是主流</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📱</span>工具 / 阅读 / 笔记 / 社交类 App → 跨平台框架够用，开发量减半</div>
      <div class="ex-line"><span class="ex-emoji">⚛️</span>会 React → 选 <strong>React Native</strong>（迁移成本低，Instagram / 朋友圈都用）</div>
      <div class="ex-line"><span class="ex-emoji">🎨</span>看重 UI 一致 → 选 <strong>Flutter</strong>（用 Dart 语言，两端像素级一致）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>开发 + 维护成本砍半</div>
      <div class="ex-line"><span class="ex-emoji">🔥</span>热重载 → 改代码不重启 App，秒看效果</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>不如原生的地方：性能略差（3D / 动画）/ 最新系统功能滞后</div>
    </div></div>
  </div></div>`,

  "cross-platform": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔀</span>跨平台 = <strong>一份代码多个地方跑</strong>，不用 iOS / Android / Web 各写一遍</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📱</span>做 App 想同时上 iOS + Android → <strong>Flutter / React Native</strong></div>
      <div class="ex-line"><span class="ex-emoji">💻</span>做工具想同时支持 Win + Mac → <strong>Electron / Tauri</strong></div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>只做 iOS（用户都用 iPhone）→ 没必要跨平台，直接 Swift 质量更好</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>开发量减半：一人顶俩</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>改 bug 一次改完全平台修</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>代价：性能 / 体验比原生差一点点，深度调系统功能麻烦</div>
    </div></div>
  </div></div>`,

  "python": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🐍</span>Python = <strong>最接近英文的编程语言</strong>，AI / 数据 / 爬虫 / 自动化领域的扛把子</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🤖</span>AI 应用 → 调 OpenAI / 训模型 / 处理文本，<strong>PyTorch + LangChain</strong> 生态最强</div>
      <div class="ex-line"><span class="ex-emoji">📊</span>数据分析 → 读 Excel / 画图表 / 跑统计，<strong>pandas + matplotlib</strong> 几行搞定</div>
      <div class="ex-line"><span class="ex-emoji">🕷️</span>爬网站 → 自动收集商品价格 / 文章列表，<strong>requests + BeautifulSoup</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>语法简单：变量不用声明类型，AI 也最擅长写</div>
      <div class="ex-line"><span class="ex-emoji">🌐</span>生态最全：AI / 科学计算 / 数据处理领域几乎所有论文代码用 Python</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>短板：运行慢、不擅前端 UI。常和"前端 JS + 后端 Python"组合用</div>
    </div></div>
  </div></div>`,

  "script": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📜</span>脚本 = <strong>写好一段流程让电脑反复跑</strong>——不是大型 App，是干小事的工具</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🖼️</span>批量改 1000 张图片大小 → Python 脚本一行命令搞定</div>
      <div class="ex-line"><span class="ex-emoji">⏰</span>每天凌晨备份数据库 → shell 脚本 + cron 定时</div>
      <div class="ex-line"><span class="ex-emoji">📤</span>给所有用户群发邮件 → 脚本读用户表 → 循环发</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>解放双手：重复劳动写一次反复用</div>
      <div class="ex-line"><span class="ex-emoji">🚀</span>不要图形界面：命令行跑就行，门槛低</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>常用脚本语言：<strong>Python</strong>（最易读）/ <strong>Bash</strong>（系统操作）/ <strong>Node.js</strong>（前端生态友好）</div>
    </div></div>
  </div></div>`,

  "appstore": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏪</span>应用商店 = <strong>苹果 / 谷歌的"软件超市"</strong>——做的 App 想让用户装到手机，必须先过商店审核</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💳</span>注册<strong>开发者账号</strong>（苹果 ¥688/年 / 谷歌 $25 一次性）</div>
      <div class="ex-line"><span class="ex-emoji">📤</span>App 打包成 <strong>.ipa</strong>（iOS）/ <strong>.aab</strong>（Android）上传</div>
      <div class="ex-line"><span class="ex-emoji">📝</span>填资料 → 截图 + 描述 + 隐私政策 → 提交审核</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛡️</span>用户信任：商店下载更安心</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>自带分发 + 自动更新机制</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>痛点：审核慢（1-3 天）/ 规则多（内购 / 隐私 / 健康类格外严）/ 抽成 15-30%</div>
    </div></div>
  </div></div>`,

  "framework": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧩</span>前端框架 = <strong>页面拼搭的标准化积木</strong>。React / Vue 等让"数据变了页面自动跟着变"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🃏</span>商品卡片 → 写一个 <strong>ProductCard 组件</strong>，100 个商品复用 100 次，改样式改一处</div>
      <div class="ex-line"><span class="ex-emoji">🔔</span>购物车数量从 2 变 3 → 改一个状态，顶部角标 + 结算页 + 小红点自动跟着变</div>
      <div class="ex-line"><span class="ex-emoji">📋</span>输入框 / 按钮 / 弹窗 → 各做一个组件，全站统一</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>少 80% 重复代码：100 个卡片 = 1 个组件 + 100 份数据</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>数据驱动 UI：改数据自动刷新界面，不用手动找位置</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>这套思路叫 <strong>组件化 + 响应式</strong>（component-based + reactive）</div>
    </div></div>
  </div></div>`,

  "electron": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>Electron / Tauri = <strong>给网页套一个壳变成桌面软件</strong>。VS Code / 微信桌面版 / Discord 都是这么做的</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💬</span>做了网页版工具 → Electron 打包成 .exe / .dmg，用户桌面有图标</div>
      <div class="ex-line"><span class="ex-emoji">📁</span>能读硬盘文件、弹通知、托盘图标——网页做不到的事桌面壳能做</div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>选 <strong>Electron</strong>（成熟、生态大）或 <strong>Tauri</strong>（体积小、Rust 内核）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>一份代码：网页版 + Win + Mac + Linux 都能跑</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>能用电脑硬件 API：文件 / 通知 / 录屏 / 蓝牙</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>代价：Electron 每个 App 自带浏览器内核 → 占内存大（几百 MB）</div>
    </div></div>
  </div></div>`,

  "os": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏢</span>操作系统 = <strong>电脑里的物业管家</strong>。程序想用 CPU / 内存 / 硬盘 / 摄像头都得过它分配</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💾</span>保存用户文件 → 喊 OS"我要写硬盘"，OS 帮处理</div>
      <div class="ex-line"><span class="ex-emoji">📸</span>开摄像头 → OS 弹权限框，允许了才给用</div>
      <div class="ex-line"><span class="ex-emoji">🪟</span>窗口最小化 / 最大化按钮 → OS 提供的，不用自己画</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>不用关心硬件细节：OS 把硬盘 / 内存 / 网卡都包好了</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>同一份代码 Win/Mac/Linux 通用（多数场景下）</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>三大 OS：<strong>Windows</strong>（家用最多）/ <strong>macOS</strong>（设计师 / 程序员）/ <strong>Linux</strong>（服务器）</div>
    </div></div>
  </div></div>`,

  "compile": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔤</span>编译 = <strong>把人写的代码翻译成机器能直接执行的</strong>。代码是人话，机器只懂 0/1，编译器负责翻</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💻</span>桌面应用打包 → 代码被编译成 <strong>.exe</strong>，用户双击就跑、看不到源码</div>
      <div class="ex-line"><span class="ex-emoji">📱</span>iOS / Android 上架 → 必须先编译成 <strong>.ipa / .apk</strong> 才能传商店</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>写 TypeScript / Vue → 编译成 JavaScript 才能在浏览器跑</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>跑得快：编译后机器直接懂，不用边跑边翻</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>源码不暴露：编译产物难逆向</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>反面：<strong>解释执行</strong>（边读边跑，如 Python / JS）。启动快但运行慢</div>
    </div></div>
  </div></div>`,

  "dns": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📞</span>网址 = 通讯录里的好记名字（baidu.com），<strong>IP</strong> = 真实的数字地址（39.156.66.10）。<strong>DNS</strong> = 全球共享的通讯录</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>买个域名 <strong>mygame.com</strong> → 用户输网址访问，不用记数字</div>
      <div class="ex-line"><span class="ex-emoji">📮</span>把域名指向部署的服务器 IP → 换服务器搬家用户网址不变</div>
      <div class="ex-line"><span class="ex-emoji">📧</span>顺便配邮箱 <strong>hi@mygame.com</strong>，看起来专业</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>用户好记：域名比 IP 数字好传播 1000 倍</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>服务器换 IP，域名不用换，老用户不受影响</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>报错"DNS 解析失败" = 通讯录查不到，要么网址打错要么本机网炸了</div>
    </div></div>
  </div></div>`,

  "auth-web": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎫</span>登录 = <strong>第一次刷身份证换张手环（token）</strong>，之后做事刷手环就行，不用再翻身份证</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔐</span>用户填邮箱+密码 → 后端核对 → 发个 <strong>token</strong> 给浏览器存起来</div>
      <div class="ex-line"><span class="ex-emoji">📡</span>之后请求 → 浏览器自动带上 token → 后端看 token 知道是谁</div>
      <div class="ex-line"><span class="ex-emoji">🌐</span>第三方登录 → 接微信 / Google / Apple，用户不用再记一个密码（用 <strong>OAuth</strong>）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔒</span>密码只传一次：之后用 token，更安全</div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>权限分层：付费用户 / 普通 / 管理员，看 token 里的角色</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>报"401 未授权" = token 过期 / 没带 → 重新登录</div>
    </div></div>
  </div></div>`,

  "auth-server": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛂</span>服务端鉴权 = <strong>守门员检查每个请求的"通行证"</strong>，确认是谁 + 能不能干这事</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📝</span>登录接口 → 核对密码 → 生成 <strong>JWT token</strong> 返回（自带过期时间）</div>
      <div class="ex-line"><span class="ex-emoji">🛡️</span>其他接口 → 中间件先验 token → 没 token / 过期 → 直接 401 拦截</div>
      <div class="ex-line"><span class="ex-emoji">👑</span>管理员接口 → 验 token 后再看角色，普通用户进来 403</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔒</span>核心数据安全：没鉴权的接口等于开着大门让人随便拿</div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>细粒度控制：到每个接口 / 每个字段都能配权限</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>常用方案：<strong>JWT</strong>（自包含 token）/ <strong>session</strong>（服务端记录）/ <strong>OAuth</strong>（第三方登录）</div>
    </div></div>
  </div></div>`,

  "api-http-server": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🍽️</span>服务端 API = <strong>点餐窗口</strong>。前端发请求（点单）→ 后端查数据库（做菜）→ 把结果返回（端菜）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📋</span>商品列表 → 前端 <strong>GET /products</strong>，后端取数据库 100 件商品返回</div>
      <div class="ex-line"><span class="ex-emoji">📤</span>发帖 → 前端 <strong>POST /posts</strong> 带内容，后端写入数据库</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>点赞 → 前端 <strong>PUT /posts/123/like</strong>，后端那条记录 +1</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧩</span>前后端分工：前端管显示，后端管数据，各干各的</div>
      <div class="ex-line"><span class="ex-emoji">🔌</span>多端复用：网页 / iOS / Android 都调同一套 API</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>四大动作：<strong>GET</strong>（查）/ <strong>POST</strong>（增）/ <strong>PUT</strong>（改）/ <strong>DELETE</strong>（删）—— 叫 <strong>RESTful 风格</strong></div>
    </div></div>
  </div></div>`,

  "deploy-web": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🚀</span>部署 = <strong>把代码从本机搬到云端 24 小时不关机的服务器</strong>，全世界用户能访问</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💻</span>本地写好 → 推到 GitHub → <strong>Vercel</strong> 自动拉代码部署，几分钟拿到 xxx.vercel.app 网址</div>
      <div class="ex-line"><span class="ex-emoji">🌐</span>买个域名 mygame.com → 在 Vercel 配置 → 用户输自己域名能访问</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>之后每次推代码 → 自动重新部署，几分钟后线上更新</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌍</span>全球可访问：本机关了用户照样能用</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>自动化：push 代码 → 自动测试 → 自动上线（叫 <strong>CI/CD</strong>）</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>vibecoding 起步推荐 Vercel / Netlify：免费 + 零配置</div>
    </div></div>
  </div></div>`,

  "deploy-server": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">☁️</span>服务端部署 = <strong>把后端程序 + 数据库放到云服务器一直跑</strong>。比单纯部署前端复杂（要管数据库、配域名、配 HTTPS）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🚀</span>轻量后端 → 上 <strong>Railway / Render / Fly.io</strong>，连 GitHub 自动部署 + 自带数据库</div>
      <div class="ex-line"><span class="ex-emoji">🏗️</span>复杂后端 → 上 <strong>阿里云 / AWS / Cloudflare</strong>，自己配服务器 + 数据库 + 域名 + HTTPS</div>
      <div class="ex-line"><span class="ex-emoji">📦</span>用 <strong>Docker</strong> 把整个环境打包 → 一份配置任何服务器都能跑，避免"本机能跑服务器跑不起来"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>真正"上线"：后端 + 数据库都 24 小时在线</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>vibecoding 起步推荐 Railway：免费额度够、配置最少</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>流量大了再考虑迁到 AWS / 自建机房</div>
    </div></div>
  </div></div>`,

  "database-web": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>浏览器本地存储 = <strong>用户电脑上的小储物柜</strong>，网页关了再开数据还在，不用每次都问服务器要</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📝</span>笔记应用 → 写一半关掉浏览器，下次打开还在（存 <strong>localStorage / IndexedDB</strong>）</div>
      <div class="ex-line"><span class="ex-emoji">🌓</span>记住用户偏好 → 夜间模式 / 字号 / 收藏列表，再访问自动应用</div>
      <div class="ex-line"><span class="ex-emoji">🛒</span>不登录的购物车 → 商品先存浏览器，下单时再同步到服务器</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>不用搭服务器：纯前端就能做有"记忆"的产品</div>
      <div class="ex-line"><span class="ex-emoji">📴</span>离线可用：地铁里没网照样能写笔记</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>两种工具：<strong>localStorage</strong>（简单，5MB 上限）/ <strong>IndexedDB</strong>（结构化，几百 MB，能存图片视频）</div>
    </div></div>
  </div></div>`,

  "database-server": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏦</span>服务端数据库 = <strong>云端金库</strong>。所有用户的账号 / 订单 / 聊天记录都存这，后端跟它要数据</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">👤</span>用户注册 → 名字 / 密码 / 邮箱 存进 <strong>users 表</strong>，登录时核对</div>
      <div class="ex-line"><span class="ex-emoji">💬</span>聊天软件 → 每条消息进 <strong>messages 表</strong>，换设备能看历史</div>
      <div class="ex-line"><span class="ex-emoji">🛍️</span>电商订单 → 谁买了什么 / 多少钱 / 收件地址，进 <strong>orders 表</strong>永久存档</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🤝</span>多用户共享：用户 A 发的内容用户 B 也能看到</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>跨设备同步：手机存的笔记电脑也能看</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>两大类：<strong>关系型</strong>（PostgreSQL / MySQL，表结构强）/ <strong>NoSQL</strong>（MongoDB / Redis，灵活快速）</div>
    </div></div>
  </div></div>`,

  "big-arch": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏙️</span>大公司架构 = <strong>从夫妻小店升级成连锁集团</strong>。一台服务器扛不动 1 亿用户，就拆部门 / 加分店 / 设区域仓</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧩</span><strong>微服务</strong>：把"用户 / 订单 / 支付 / 商品"拆成 4 个独立小服务，互相调用</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span><strong>缓存（Redis）</strong>：热门商品页存内存里，不每次查数据库，快 100 倍</div>
      <div class="ex-line"><span class="ex-emoji">📚</span><strong>分库分表</strong>：用户太多一张表存不下 → 按 ID 分到 10 个数据库</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📈</span>能扛百万 / 千万级用户，不会一卡到底</div>
      <div class="ex-line"><span class="ex-emoji">👥</span>团队并行开发：支付组改支付 / 订单组改订单，互不影响</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>vibecoding 早期不用碰 —— 单服务器够用，过早搞复杂架构是自找麻烦</div>
    </div></div>
  </div></div>`,

  "other-web": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧩</span>这一类都是"<strong>在别人平台里跑网页技术</strong>"——Chrome 给扩展位置、微信给小程序壳子、浏览器给 Web 游戏舞台</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧰</span><strong>浏览器扩展</strong>：做"屏蔽广告" / "一键翻译" / "色卡取色" 的 Chrome 插件</div>
      <div class="ex-line"><span class="ex-emoji">💚</span><strong>微信小程序</strong>：嵌微信里免下载，工具 / 小游戏 / 内容类很合适</div>
      <div class="ex-line"><span class="ex-emoji">🎮</span><strong>Web 游戏</strong>：用 Phaser / PixiJS / Three.js 做，发链接就能玩</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>免安装：用户门槛极低</div>
      <div class="ex-line"><span class="ex-emoji">🌊</span>蹭平台流量：扩展商店 / 微信生态自带用户池</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>限制：扩展只在浏览器、小程序只在微信、性能比原生差一点</div>
    </div></div>
  </div></div>`,

  "iot": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📡</span>物联网 = <strong>家里小东西都能联网说话</strong>——灯 / 空调 / 门锁 / 花盆都有 WiFi，被手机控制</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💡</span>智能灯泡 App → 手机点一下 → 灯泡收到信号亮（中间走 WiFi + 云服务器中转）</div>
      <div class="ex-line"><span class="ex-emoji">🌡️</span>温湿度监测 → 客厅小盒子每分钟传数据到服务器，手机随时看</div>
      <div class="ex-line"><span class="ex-emoji">🚪</span>智能门锁 → 朋友到了远程开锁，门锁收指令"咔哒"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎁</span>产品有实体，跟纯软件比差异化拉满</div>
      <div class="ex-line"><span class="ex-emoji">🌍</span>能拿到真实世界数据：温度 / 位置 / 用电量</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>常用协议：<strong>MQTT</strong>（轻量消息）/ <strong>HTTP</strong>（通用）。小硬件爱用 MQTT 省电省流量</div>
    </div></div>
  </div></div>`,

  "sensor": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">👃</span>传感器 = <strong>硬件的鼻子 / 眼睛 / 耳朵</strong>（感知温度 / 光 / 声音 / 位置）；<strong>执行器</strong> = 手脚 / 嘴（电机转 / 灯亮 / 喇叭响）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌱</span>智能花盆 → <strong>土壤湿度传感器</strong>感知干 → <strong>水泵</strong>浇水</div>
      <div class="ex-line"><span class="ex-emoji">🚶</span>感应灯 → <strong>红外传感器</strong>检测到人 → <strong>LED 灯</strong>亮 30 秒</div>
      <div class="ex-line"><span class="ex-emoji">🔔</span>智能门铃 → <strong>按钮 + 摄像头</strong>感知 → <strong>喇叭 + 手机推送</strong>提醒</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔄</span>"感知 → 决定 → 行动"形成闭环，硬件自动干活</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>淘宝几十块买齐：温湿度 / 光照 / 距离 / 按钮 全部现成模块</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>专业说法：<strong>sensor</strong>（输入）+ <strong>actuator</strong>（输出），中间开发板做大脑</div>
    </div></div>
  </div></div>`,

  "board": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧠</span>开发板 = <strong>巴掌大的迷你电脑</strong>。比手机简单 100 倍，但 CPU / 内存 / 接口都有，能跑代码</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎛️</span>简单硬件原型 → <strong>Arduino</strong>（只跑一个程序，适合控灯 / 电机 / 传感器）</div>
      <div class="ex-line"><span class="ex-emoji">🖥️</span>家庭服务器 / 智能音箱 → <strong>树莓派</strong>（带 Linux 系统，能跑 Python，能联网接屏）</div>
      <div class="ex-line"><span class="ex-emoji">📷</span>WiFi 摄像头 → <strong>ESP32</strong>（自带 WiFi 蓝牙，¥20 一块）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>不用从零做电路：CPU / 内存 / 接口齐全，插传感器就行</div>
      <div class="ex-line"><span class="ex-emoji">🔌</span>调试方便：USB 线一插就能改代码 + 重启即生效</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>挑选：要 GUI / 联网 → <strong>树莓派</strong>；只控传感器 → <strong>Arduino</strong>；要 WiFi 小型 → <strong>ESP32</strong></div>
    </div></div>
  </div></div>`,

  "product-types": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🍱</span>不同产品需要不同<strong>"后端套餐"</strong>。社交要消息推送、电商要支付、AI 要算力 —— 按方向挑配料</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📝</span>笔记应用 → 数据库 + 登录 + 云同步就够</div>
      <div class="ex-line"><span class="ex-emoji">🛒</span>电商 → 还要加支付 / 订单 / 物流跟踪</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>AI 应用 → 重点是 LLM API + 算力账单 + prompt 工程</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>不重复造轮子：定产品类型 → 套现成方案 → 省 80% 时间</div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>挑技术栈不迷茫：知道自家产品要啥，不被新潮技术名词带偏</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>翻这个节点下的分支：每种产品类有专门的能力清单</div>
    </div></div>
  </div></div>`,
};

// 注入函数：data.js 加载后、app.js 启动前，把 example 追加到对应节点 pages[0].html
(function injectExamples() {
  if (typeof TREE_DATA === 'undefined' || typeof SHARED_NODES === 'undefined') return;
  const allNodes = {};
  function walk(d) {
    if (!d || !d.id || allNodes[d.id]) return;
    allNodes[d.id] = d;
    (d.children || []).forEach(c => walk(c.ref ? SHARED_NODES[c.ref] : c));
  }
  walk(TREE_DATA);
  Object.values(SHARED_NODES).forEach(walk);
  Object.entries(__EXAMPLE_BY_ID__).forEach(([id, html]) => {
    const n = allNodes[id];
    if (n && n.pages && n.pages.length > 0) {
      n.pages[0].html += html;
    }
  });
})();
