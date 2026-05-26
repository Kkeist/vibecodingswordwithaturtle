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

  "pt-consumer": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💰</span>消费交易类 = <strong>用户花钱买东西</strong>，平台撮合买卖 + 保证交易不出错</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛒</span><strong>淘宝</strong>：搜东西 → 下单 → 付款 → 等快递</div>
      <div class="ex-line"><span class="ex-emoji">🍔</span><strong>美团</strong>：点外卖 → 商家接单 → 骑手送达</div>
      <div class="ex-line"><span class="ex-emoji">🚗</span><strong>滴滴</strong>：叫车 → 司机来 → 到目的地扣钱</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>钱不能算错 → <strong>事务</strong>（Transaction）保证"扣钱 + 发货"要么都成要么都退</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span>双 11 千万人同时抢 → <strong>分布式锁</strong> + <strong>消息队列</strong> 削峰</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>库存不能超卖 → <strong>乐观锁 / Redis 原子减</strong> 防最后一件被两人都买</div>
    </div></div>
  </div></div>`,

  "pt-social": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💬</span>社交内容类 = <strong>用户发内容 / 看别人内容 / 互相聊天</strong>，平台决定谁能看到什么</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📷</span><strong>小红书 / Instagram</strong>：发笔记 → 算法推给可能感兴趣的人</div>
      <div class="ex-line"><span class="ex-emoji">🎵</span><strong>抖音 / TikTok</strong>：刷视频 → 算法决定下一条放什么</div>
      <div class="ex-line"><span class="ex-emoji">💬</span><strong>微信 / QQ</strong>：发消息 → 对方手机马上响</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧠</span>推荐算法 → 根据看过 / 点过 / 停留时长猜兴趣</div>
      <div class="ex-line"><span class="ex-emoji">📮</span>消息送达 → <strong>长连接 + 离线推送</strong>，对方手机马上收到</div>
      <div class="ex-line"><span class="ex-emoji">📡</span>大 V 发一条全网刷到 → <strong>Feed 流分发</strong>（推 / 拉 / 推拉结合）</div>
    </div></div>
  </div></div>`,

  "pt-experience": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎮</span>强体验 / 内容生产类 = 用户要的是<strong>沉浸感</strong>——画面流畅、声音同步、延迟低到感觉不到</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚔️</span><strong>王者荣耀</strong>：5 个人同屏打架 → 操作 30 毫秒内同步到所有人</div>
      <div class="ex-line"><span class="ex-emoji">📺</span><strong>B 站直播</strong>：主播说话 → 几万人同时看，画面切碎传到全国</div>
      <div class="ex-line"><span class="ex-emoji">🎨</span><strong>剪映</strong>：剪视频 → 加特效 → 导出，后端扛大文件渲染</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>低延迟 → <strong>UDP / WebRTC</strong> 走快速传输不等确认</div>
      <div class="ex-line"><span class="ex-emoji">🌐</span>大文件分发 → <strong>对象存储 + CDN</strong> 视频切片预先放离用户近的地方</div>
      <div class="ex-line"><span class="ex-emoji">💸</span>算力贵 → <strong>GPU 集群 + 推理优化</strong> 让大模型跑得起还不亏钱</div>
    </div></div>
  </div></div>`,

  "pt-work": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📊</span>工作工具类 = <strong>帮人把工作做完</strong>——数据不能丢、多人改同一份不能打架、权限分清</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📊</span><strong>飞书 / 钉钉</strong>：多人同时改文档 → 每个人的光标实时可见</div>
      <div class="ex-line"><span class="ex-emoji">📈</span><strong>Notion / Logseq</strong>：建数据库 + 拖卡片 + 跨页引用</div>
      <div class="ex-line"><span class="ex-emoji">💼</span><strong>金蝶 / 用友</strong>：公司管账 + 进销存 + 报表，算钱不能差一分</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🤝</span>多人协同 → <strong>OT 算法 / CRDT</strong> 让大家改完合并不冲突</div>
      <div class="ex-line"><span class="ex-emoji">🏢</span>多租户隔离 → <strong>Schema 隔离 / Row Level Security</strong> 让 A 公司看不到 B 公司数据</div>
      <div class="ex-line"><span class="ex-emoji">🔑</span>权限细粒度 → <strong>RBAC</strong> 按角色配能看 / 能改什么</div>
    </div></div>
  </div></div>`,

  "pt-regulated": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚖️</span>强合规重型类 = 出一次错就上新闻——<strong>钱 / 命 / 身份证号</strong>一个都不能错，监管盯着</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏦</span><strong>支付宝 / 微信支付</strong>：转账 → 扣款 → 到账，不能错一分</div>
      <div class="ex-line"><span class="ex-emoji">🏥</span><strong>挂号网 / 平安好医生</strong>：挂号 → 看病 → 开药，病历存几十年不丢</div>
      <div class="ex-line"><span class="ex-emoji">🆔</span><strong>政务服务网</strong>：办身份证 → 查社保 → 报税，对接政府数据库</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💾</span>数据永不丢 → <strong>多机房备份 / 异地容灾</strong>，一城断电另一城顶上</div>
      <div class="ex-line"><span class="ex-emoji">📝</span>每笔留痕 → <strong>审计日志</strong>记下谁在什么时候做了什么</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>合规过审 → <strong>等保三级 / 金融级加密</strong> 满足监管要求</div>
    </div></div>
  </div></div>`,

  "pt-emerging": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔮</span>前沿 / 个人类 = 新技术 / 小工具——不追百万 DAU，追"能跑起来 + 玩出新花样"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🤖</span><strong>GPT 套壳应用</strong>：调 OpenAI + 加自家 prompt + 卖订阅</div>
      <div class="ex-line"><span class="ex-emoji">🔗</span><strong>OpenSea / Uniswap</strong>：买 NFT / 换币 → 上链记录，后端不存数据</div>
      <div class="ex-line"><span class="ex-emoji">🏠</span><strong>米家 / 小米生态</strong>：开灯 / 扫地机器人，后端管成千上万小设备</div>
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>Obsidian / Logseq</strong>：本地优先笔记，后端可有可无</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>调外部 API 要稳 → <strong>重试 + 降级</strong> 防 OpenAI 抽风时自己也挂</div>
      <div class="ex-line"><span class="ex-emoji">📡</span>小设备联网 → <strong>MQTT / 边缘计算</strong> 让低性能设备也能上云</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>个人项目省钱 → <strong>Serverless / Cloudflare Workers</strong> 按用量付费</div>
    </div></div>
  </div></div>`,

  "pt-ecommerce": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>把买家卖家撮合到一起，全程管好<strong>钱、货、单</strong>三件事</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛒</span><strong>淘宝 / 京东</strong>：搜东西 → 下单 → 付款，几亿商品的搜索 + 库存</div>
      <div class="ex-line"><span class="ex-emoji">💎</span><strong>拼多多</strong>：拉好友拼团 → 凑齐人数发货，未成团的钱先冻结</div>
      <div class="ex-line"><span class="ex-emoji">📺</span><strong>抖音电商</strong>：刷直播 → 点小黄车 → 直接付款，扛主播"3、2、1"的流量峰值</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>双 11 秒杀 → <strong>Redis 缓存 / 限流 / 队列削峰</strong> 防数据库被挤爆</div>
      <div class="ex-line"><span class="ex-emoji">🔍</span>商品搜索 → <strong>Elasticsearch</strong> 几亿商品关键词搜索</div>
      <div class="ex-line"><span class="ex-emoji">💸</span>钱不能错 → <strong>分布式事务</strong> 扣库存 / 扣钱 / 生成订单要么全成要么全退</div>
    </div></div>
  </div></div>`,

  "pt-delivery": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>把<strong>订单 / 商家 / 骑手</strong>三方实时匹配，让东西从 A 点送到 B 点最快</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🍔</span><strong>美团 / 饿了么</strong>：下单 → 派最近骑手 → 取餐送达，下午茶高峰一骑手送 5 单</div>
      <div class="ex-line"><span class="ex-emoji">📮</span><strong>顺丰 / 菜鸟</strong>：包裹经过分拣中心 → 卡车 → 快递员，追踪每个包裹位置</div>
      <div class="ex-line"><span class="ex-emoji">🛵</span><strong>达达 / 闪送</strong>：跑腿一小时到，30 秒派到接单率高的骑手</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📍</span>实时派单 → <strong>地理围栏 / Geo Hash</strong> 秒级找附近 1 公里骑手</div>
      <div class="ex-line"><span class="ex-emoji">🗺️</span>路径规划 → <strong>TSP 算法</strong> 算一骑手 5 单怎么走最短</div>
      <div class="ex-line"><span class="ex-emoji">📡</span>位置实时上报 → <strong>长连接</strong> 每秒上报骑手位置不耗电</div>
    </div></div>
  </div></div>`,

  "pt-travel": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>对接<strong>酒店 / 航司 / 景区</strong>，让用户能查能订能退，价格还实时</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">✈️</span><strong>携程 / 飞猪</strong>：搜机票 → 比价 → 下单，同时查几十家航司实时余票</div>
      <div class="ex-line"><span class="ex-emoji">🏨</span><strong>Booking / Airbnb</strong>：订酒店 → 占房间 → 付钱锁定，防"同间房同时被两人订"</div>
      <div class="ex-line"><span class="ex-emoji">🎫</span><strong>美团门票</strong>：买景区票 → 扫码入园，跟景区闸机对接</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>实时聚合多家供应商 → <strong>API 聚合 + 缓存</strong> 防查一次价等 10 秒</div>
      <div class="ex-line"><span class="ex-emoji">🪑</span>占库存 → <strong>预占 + 超时释放</strong>，没付款 15 分钟自动放出</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>价格频繁变 → <strong>价格订阅 + 消息推送</strong> 机票降价立刻通知</div>
    </div></div>
  </div></div>`,

  "pt-property": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>大宗物品发布 + 搜索 + 看图 + 联系卖家，重点是"<strong>真实房源 / 真实卖家</strong>"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏠</span><strong>贝壳找房</strong>：搜小区 → VR 看房 → 约经纪人，几百万套房的真实性</div>
      <div class="ex-line"><span class="ex-emoji">🚗</span><strong>瓜子二手车</strong>：搜车 → 看检测报告 → 试驾，每辆车几百项检测数据</div>
      <div class="ex-line"><span class="ex-emoji">📱</span><strong>闲鱼 / 转转</strong>：发闲置 → 聊价 → 担保交易</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🗺️</span>地图找房 → <strong>Elasticsearch 地理查询</strong> 按区域筛</div>
      <div class="ex-line"><span class="ex-emoji">🛡️</span>反虚假房源 → <strong>图片去重 + 文本相似度</strong> 识别一房多发</div>
      <div class="ex-line"><span class="ex-emoji">🥽</span>VR 看房 → <strong>3D 模型存储 + 全景图拼接</strong> 云看房</div>
    </div></div>
  </div></div>`,

  "pt-mobility": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>把<strong>人 / 车 / 路</strong>实时连起来——"现在去哪、怎么去、要多久"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🚖</span><strong>滴滴</strong>：叫车 → 5 秒内派到最近司机</div>
      <div class="ex-line"><span class="ex-emoji">🗺️</span><strong>高德 / 百度地图</strong>：搜目的地 → 导航 → 避开堵车，实时收百万车主位置算路况</div>
      <div class="ex-line"><span class="ex-emoji">🚲</span><strong>哈啰单车</strong>：扫码开锁 → 骑行 → 还车，管几百万辆车的开关锁状态</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📍</span>实时位置 → <strong>地理索引 + Geo Hash</strong> 秒级查附近的人 / 车</div>
      <div class="ex-line"><span class="ex-emoji">🧭</span>路径规划 → <strong>A* 算法 + 实时路况</strong> 算最快路线</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>春运抢票 → <strong>队列 + 限流</strong> 防系统被挤爆</div>
    </div></div>
  </div></div>`,

  "pt-social-feed": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>用户发内容 → <strong>推荐系统</strong>决定谁能看到 → 别人点赞评论形成关系</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📷</span><strong>小红书</strong>：发笔记 → 算法推给可能感兴趣的人</div>
      <div class="ex-line"><span class="ex-emoji">🐦</span><strong>微博</strong>：明星发一条 → 千万粉丝刷到</div>
      <div class="ex-line"><span class="ex-emoji">🎵</span><strong>抖音</strong>：刷视频 → 0.5 秒内选出下一条最爱看的</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧠</span>推荐算法 → <strong>协同过滤 + 深度学习</strong> 根据看过的猜兴趣</div>
      <div class="ex-line"><span class="ex-emoji">📡</span>Feed 流 → <strong>推 / 拉模型结合</strong>，普通人推到粉丝邮箱、大 V 让粉丝主动拉</div>
      <div class="ex-line"><span class="ex-emoji">🚫</span>内容审核 → <strong>图像识别 + NLP</strong> 自动过滤违规内容</div>
    </div></div>
  </div></div>`,

  "pt-im": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>消息从 A 发出 → <strong>必送到 B</strong>——不能丢、不能乱、不能慢</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💬</span><strong>微信 / QQ</strong>：发消息 → 对方马上响 → 历史能翻 3 年前</div>
      <div class="ex-line"><span class="ex-emoji">🏢</span><strong>钉钉 / 飞书</strong>：工作群 + 已读未读 + @某人</div>
      <div class="ex-line"><span class="ex-emoji">✈️</span><strong>Telegram</strong>：端到端加密，服务器也看不到内容</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📡</span>消息必达 → <strong>长连接 + ACK 确认 + 离线消息队列</strong></div>
      <div class="ex-line"><span class="ex-emoji">👥</span>群消息扩散 → <strong>写扩散 / 读扩散</strong> 按群大小选策略</div>
      <div class="ex-line"><span class="ex-emoji">🔐</span>端到端加密 → <strong>Signal 协议</strong> 服务器也解不开</div>
    </div></div>
  </div></div>`,

  "pt-video": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>把大文件 / 实时画面传给百万人——画面清晰、不卡顿、能拖进度</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📺</span><strong>B 站 / YouTube</strong>：上传视频 → 平台转码 → 几百万人看</div>
      <div class="ex-line"><span class="ex-emoji">🎬</span><strong>爱奇艺 / 优酷</strong>：拖进度条秒响应，从任意点开始播</div>
      <div class="ex-line"><span class="ex-emoji">🔴</span><strong>抖音直播</strong>：主播开播 → 1 秒内传到所有观众</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>视频要快 → <strong>CDN</strong> 把视频复制到全国机房，离用户近</div>
      <div class="ex-line"><span class="ex-emoji">📶</span>不同网速 → <strong>HLS / DASH</strong> 自适应码率，4G 标清 / WiFi 1080P</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>直播低延迟 → <strong>RTMP / WebRTC</strong> 让画面 1 秒内传到</div>
    </div></div>
  </div></div>`,

  "pt-news": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>采集 / 生产文字内容 → <strong>推给爱看的人</strong> → 让人多停留</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📰</span><strong>今日头条</strong>：刷资讯 → 算法推给感兴趣的人</div>
      <div class="ex-line"><span class="ex-emoji">📖</span><strong>掌阅 / 起点</strong>：看小说 → 翻页 → 收藏，管几百万本书和每人阅读进度</div>
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>微信公众号</strong>：作者发文 → 粉丝订阅 → 推送，管几亿订阅关系</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧠</span>个性化推荐 → <strong>用户画像 + 内容标签</strong> 匹配兴趣</div>
      <div class="ex-line"><span class="ex-emoji">🚫</span>内容审核 → <strong>敏感词过滤 + NLP</strong> 防违规内容上线</div>
      <div class="ex-line"><span class="ex-emoji">📍</span>阅读进度 → <strong>KV 存储</strong> 记每人看到哪一页</div>
    </div></div>
  </div></div>`,

  "pt-game": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>多玩家在同一世界里操作 → 服务器让<strong>所有人看到同一现实</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚔️</span><strong>王者荣耀</strong>：5v5 对战 → 技能 30ms 内同步</div>
      <div class="ex-line"><span class="ex-emoji">🔫</span><strong>和平精英</strong>：100 人吃鸡 → 每人位置实时同步</div>
      <div class="ex-line"><span class="ex-emoji">🏰</span><strong>原神</strong>：大世界探险 + 抽卡 → 后端存背包 / 好友 / 抽卡概率</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔄</span>状态同步 → <strong>帧同步 / 状态同步</strong> 所有人画面一致</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>低延迟 → <strong>UDP + 专用网络节点</strong> 让操作不卡</div>
      <div class="ex-line"><span class="ex-emoji">🛡️</span>反外挂 → <strong>服务器校验</strong> 关键计算放服务端不信任客户端</div>
    </div></div>
  </div></div>`,

  "pt-aigc": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>用户输入文字 / 图 → <strong>大模型生成新内容</strong> → 几秒到几分钟返回</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💬</span><strong>豆包 / 通义千问</strong>：提问 → 一个字一个字蹦出来</div>
      <div class="ex-line"><span class="ex-emoji">🎨</span><strong>Midjourney / 即梦</strong>：输描述 → 生成 4 张图</div>
      <div class="ex-line"><span class="ex-emoji">🎬</span><strong>可灵 / Sora</strong>：输文字 → 生成 5 秒视频，跑几分钟 GPU</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📡</span>流式输出 → <strong>SSE / WebSocket</strong> 让 AI 边算边返回</div>
      <div class="ex-line"><span class="ex-emoji">⏳</span>GPU 排队 → <strong>任务队列 + 优先级调度</strong> 让付费用户先跑</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>成本控制 → <strong>推理优化 + 模型量化</strong> 让一张卡跑更多请求</div>
    </div></div>
  </div></div>`,

  "pt-creator": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>给创作者一套工具 → 在浏览器 / App 里就能做出<strong>视频 / 图 / 设计</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎬</span><strong>剪映</strong>：剪视频 → 加特效 → 导出，云端素材库 + 导出渲染</div>
      <div class="ex-line"><span class="ex-emoji">🎨</span><strong>Figma</strong>：多人同时改设计稿 → 实时看对方光标</div>
      <div class="ex-line"><span class="ex-emoji">🖼️</span><strong>Canva</strong>：拖模板 → 改文字 → 一键导出海报，百万模板</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>大文件处理 → <strong>WebAssembly + Worker</strong> 让浏览器也能跑视频剪辑</div>
      <div class="ex-line"><span class="ex-emoji">🤝</span>协同编辑 → <strong>CRDT / OT</strong> 让多人同时改不冲突</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>素材版权 → <strong>DRM / 水印</strong> 防素材被盗用</div>
    </div></div>
  </div></div>`,

  "pt-saas": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>公司付费用产品 → 多人协作 → <strong>每家公司数据互相隔离</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📊</span><strong>飞书 / 钉钉</strong>：文档 / 表格 / IM / 会议一站式</div>
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>Notion</strong>：文档 + 数据库 + wiki，存"任意嵌套的内容块"</div>
      <div class="ex-line"><span class="ex-emoji">💼</span><strong>Salesforce</strong>：客户管理 CRM → 销售跟单</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏢</span>多租户 → <strong>Schema 隔离 / Row Level Security</strong> 让公司数据分开</div>
      <div class="ex-line"><span class="ex-emoji">🔑</span>权限 → <strong>RBAC</strong> 按角色分配能看 / 能改什么</div>
      <div class="ex-line"><span class="ex-emoji">🔐</span>SSO 登录 → <strong>OAuth / SAML</strong> 对接企业现有账号</div>
    </div></div>
  </div></div>`,

  "pt-b2b": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>给工厂 / 大公司用的内部系统——<strong>管订单 / 管库存 / 管财务</strong>，对接生产线</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏭</span><strong>SAP / 用友 / 金蝶</strong>：公司管账 + 进销存 + 报表</div>
      <div class="ex-line"><span class="ex-emoji">📦</span><strong>WMS 仓储</strong>：货物入库 → 上架 → 拣货 → 出库</div>
      <div class="ex-line"><span class="ex-emoji">🔧</span><strong>MES 制造执行</strong>：生产线 → 工序流转 → 质检，对接 PLC 工业控制器</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔄</span>复杂业务流程 → <strong>工作流引擎 / 状态机</strong> 管几十个状态流转</div>
      <div class="ex-line"><span class="ex-emoji">💸</span>财务对账 → <strong>分布式事务 + 双向记账</strong> 保证账平</div>
      <div class="ex-line"><span class="ex-emoji">🔌</span>对接老系统 → <strong>ETL + 消息队列</strong> 桥接几十年前的旧系统</div>
    </div></div>
  </div></div>`,

  "pt-bi": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>把<strong>海量数据加工成图表</strong>——老板一眼看懂业务状况</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📊</span><strong>帆软 / 观远 BI</strong>：拖拽生成报表 → 销售 / 库存图表</div>
      <div class="ex-line"><span class="ex-emoji">📈</span><strong>Tableau / PowerBI</strong>：连数据库 → 做仪表盘</div>
      <div class="ex-line"><span class="ex-emoji">📉</span><strong>阿里 DataV 大屏</strong>：双 11 交易额实时跳动</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>海量数据查询 → <strong>列式数据库 + OLAP 引擎</strong> 几亿行秒级出图</div>
      <div class="ex-line"><span class="ex-emoji">🌊</span>数据管道 → <strong>ETL + Flink / Spark</strong> 把零散数据加工成可分析的</div>
      <div class="ex-line"><span class="ex-emoji">⚙️</span>实时聚合 → <strong>物化视图 + 预聚合</strong> 让大屏秒级刷新</div>
    </div></div>
  </div></div>`,

  "pt-hr": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>把<strong>人和岗位匹配</strong>——简历投递 / HR 筛选 / 面试 / 入职</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💼</span><strong>BOSS 直聘</strong>：求职者和老板直接聊 + 投简历</div>
      <div class="ex-line"><span class="ex-emoji">📄</span><strong>智联 / 前程无忧</strong>：搜职位 → 投简历 → 算"简历和岗位匹配度"</div>
      <div class="ex-line"><span class="ex-emoji">📋</span><strong>北森 / Moka</strong>：企业 HR 系统 → 入职 / 考勤 / 离职</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧠</span>简历匹配 → <strong>NLP + 关键词提取</strong> 自动匹配岗位需求</div>
      <div class="ex-line"><span class="ex-emoji">🛡️</span>反虚假信息 → <strong>实名认证 + 企业核验</strong> 防假岗位</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>隐私保护 → <strong>字段脱敏</strong>，双方同意前 HR 看不到真实联系方式</div>
    </div></div>
  </div></div>`,

  "pt-edu": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>老师讲 → 学生学 → 做题 → 测验 → 反馈，<strong>全程在线完成</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📚</span><strong>作业帮 / 猿辅导</strong>：拍照搜题 → 看解析，识别手写公式</div>
      <div class="ex-line"><span class="ex-emoji">🎓</span><strong>网易云课堂</strong>：买课 → 看视频 → 做练习，管视频版权 + 学习进度</div>
      <div class="ex-line"><span class="ex-emoji">📖</span><strong>多邻国</strong>：每天 5 分钟学语言 → 闯关，算每人薄弱点</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧠</span>智能题库 → <strong>知识图谱 + 自适应学习</strong> 根据答对率推下一题</div>
      <div class="ex-line"><span class="ex-emoji">📡</span>直播互动 → <strong>低延迟直播 + 答题信令</strong> 实时收学生答案</div>
      <div class="ex-line"><span class="ex-emoji">🔍</span>OCR 识题 → <strong>图像识别</strong> 识别手写公式和文字</div>
    </div></div>
  </div></div>`,

  "pt-email": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span><strong>异步通讯 + 时间安排</strong>——邮件能送达、日历能提醒、跨人协调时间</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📧</span><strong>Gmail / QQ 邮箱</strong>：收发 + 反垃圾 + 搜 10 年前的邮件</div>
      <div class="ex-line"><span class="ex-emoji">📅</span><strong>Google 日历</strong>：约会议 → 自动找所有人空闲时段</div>
      <div class="ex-line"><span class="ex-emoji">⏰</span><strong>飞书日历</strong>：约会议 → 自动建腾讯会议链接</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🚫</span>反垃圾邮件 → <strong>贝叶斯分类 + 黑白名单</strong> 过滤几千万封</div>
      <div class="ex-line"><span class="ex-emoji">🔍</span>邮件搜索 → <strong>全文索引</strong> 搜十年前邮件秒级返回</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>多端同步 → <strong>IMAP + CalDAV</strong> 手机和电脑一致</div>
    </div></div>
  </div></div>`,

  "pt-search": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>把全网内容爬下来 → <strong>建索引</strong> → 搜什么瞬间返回最相关的</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔍</span><strong>百度 / Google</strong>：搜什么瞬间返回，爬几百亿网页 + 建倒排索引</div>
      <div class="ex-line"><span class="ex-emoji">🌐</span><strong>Chrome / Edge</strong>：浏览器同步书签 → 跨设备打开同一标签</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span><strong>Perplexity / 秘塔</strong>：AI 搜索 → 给答案 + 引用来源</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📚</span>倒排索引 → <strong>Lucene / Elasticsearch</strong> 让搜索从几亿文档毫秒返回</div>
      <div class="ex-line"><span class="ex-emoji">🕷️</span>爬虫调度 → <strong>分布式爬虫 + URL 去重</strong> 抓全网内容</div>
      <div class="ex-line"><span class="ex-emoji">🏆</span>排序算法 → <strong>PageRank + BM25</strong> 决定哪条结果排前</div>
    </div></div>
  </div></div>`,

  "pt-finance": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span><strong>钱的流转和管理</strong>——一分都不能错，监管盯着，每笔都要追溯</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💳</span><strong>支付宝 / 微信支付</strong>：扫码付款 → 秒到账</div>
      <div class="ex-line"><span class="ex-emoji">📈</span><strong>东方财富 / 雪球</strong>：看股票 → 下单交易，扛开盘瞬间流量</div>
      <div class="ex-line"><span class="ex-emoji">🏦</span><strong>招商银行 App</strong>：转账 + 理财 + 贷款，对接银行核心系统</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💸</span>资金一致 → <strong>分布式事务 + 两阶段提交</strong> 保证钱不凭空消失</div>
      <div class="ex-line"><span class="ex-emoji">🛡️</span>风控反欺诈 → <strong>实时风控引擎 + 机器学习</strong> 识别盗刷</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>金融级安全 → <strong>国密算法 + 等保四级</strong> 满足监管</div>
    </div></div>
  </div></div>`,

  "pt-medical": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>挂号 / 问诊 / 病历 / 处方 → 医生和病人在线协作，<strong>数据涉及生命不能错</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏥</span><strong>挂号网 / 微医</strong>：抢号 + 在线问诊，扛专家号秒抢</div>
      <div class="ex-line"><span class="ex-emoji">💊</span><strong>京东健康 / 平安好医生</strong>：网上买药 + 处方审核 + 配送</div>
      <div class="ex-line"><span class="ex-emoji">📋</span><strong>电子病历系统</strong>：病历 / 影像 / 化验单，存几十年不丢</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💾</span>数据永不丢 → <strong>多地容灾 + 冷热分层</strong> 存几十年病历</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>隐私合规 → <strong>字段加密 + 访问审计</strong> 满足医疗数据保护</div>
      <div class="ex-line"><span class="ex-emoji">📷</span>医疗影像 → <strong>DICOM + PACS 系统</strong> 存 CT / MRI 大图</div>
    </div></div>
  </div></div>`,

  "pt-govt": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span><strong>政府办事在线化</strong>——不用跑窗口，手机就能办身份证 / 社保 / 报税</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🆔</span><strong>政务服务网 / 粤省事</strong>：办身份证 / 查社保 / 申报，对接公安 / 社保 / 税务</div>
      <div class="ex-line"><span class="ex-emoji">🚦</span><strong>交管 12123</strong>：处理违章 + 学习扣分</div>
      <div class="ex-line"><span class="ex-emoji">💉</span><strong>国家医保 App</strong>：医保余额 + 异地报销</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔄</span>跨部门数据互通 → <strong>数据中台 + 政务交换平台</strong></div>
      <div class="ex-line"><span class="ex-emoji">👤</span>实名认证 → <strong>人脸识别 + 公安二要素</strong> 验证身份</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>等保三级 → <strong>国密加密 + 物理隔离</strong> 满足政务安全</div>
    </div></div>
  </div></div>`,

  "pt-ai-app": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>自己不训练模型 → 调 OpenAI / Claude 等 API → 加 prompt <strong>包装成产品</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💬</span><strong>各种 GPT 套壳助手</strong>：加自家 prompt → 调 GPT → 卖订阅</div>
      <div class="ex-line"><span class="ex-emoji">📚</span><strong>ChatPDF / Cursor</strong>：上传 PDF → 问问题，做 RAG 把 PDF 切片喂给 AI</div>
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>Notion AI / 写作猫</strong>：选中文字 → 改写 / 续写</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>调外部 API 要稳 → <strong>重试 + 降级 + 多供应商切换</strong></div>
      <div class="ex-line"><span class="ex-emoji">🔎</span>RAG 检索 → <strong>向量数据库 + Embedding</strong> 让 AI 能查私有知识库</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>成本控制 → <strong>token 缓存 + 模型路由</strong> 便宜模型先答、难的再上贵的</div>
    </div></div>
  </div></div>`,

  "pt-web3": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>数据不存自家服务器 → <strong>存区块链上</strong> → 没人能改，但每次写要付手续费</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🖼️</span><strong>OpenSea</strong>：买 NFT → 钱包付款 → 上链确认</div>
      <div class="ex-line"><span class="ex-emoji">💱</span><strong>Uniswap</strong>：去中心化交易所 → 钱包对钱包直接换币</div>
      <div class="ex-line"><span class="ex-emoji">👛</span><strong>MetaMask / imToken</strong>：管钱包私钥 + 签名交易</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📜</span>智能合约 → <strong>Solidity</strong> 写链上自动执行的代码</div>
      <div class="ex-line"><span class="ex-emoji">👛</span>钱包对接 → <strong>Web3.js / Ethers.js</strong> 让前端能调钱包签名</div>
      <div class="ex-line"><span class="ex-emoji">🔍</span>链上数据索引 → <strong>The Graph</strong> 让查链上数据像查数据库一样快</div>
    </div></div>
  </div></div>`,

  "pt-iot": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>千万小设备联网上报数据 + 接受指令——<strong>设备性能低、带宽小、要省电</strong></div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏠</span><strong>米家</strong>：手机开灯 → 灯瞬间响应，管几亿设备实时通讯</div>
      <div class="ex-line"><span class="ex-emoji">📷</span><strong>萤石云 / 海康威视</strong>：摄像头 → 云端存视频，扛百万摄像头同时推流</div>
      <div class="ex-line"><span class="ex-emoji">🚗</span><strong>特斯拉 / 蔚来车机</strong>：远程解锁 + OTA 升级</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📡</span>设备连接 → <strong>MQTT / CoAP</strong> 轻量协议比 HTTP 省电省流量</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>OTA 升级 → <strong>差分包 + 灰度发布</strong> 远程更新固件不变砖</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>边缘计算 → <strong>网关 + 边缘节点</strong> 让设备本地处理一部分不全靠云</div>
    </div></div>
  </div></div>`,

  "pt-personal-tool": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（这一类产品的核心）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>给个人用的小工具——<strong>本地优先 / 极简后端</strong>，重点是好用不是百万 DAU</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>真实产品 + 核心场景</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📝</span><strong>Obsidian / Logseq</strong>：记笔记 + 双向链接，数据存本地后端可没有</div>
      <div class="ex-line"><span class="ex-emoji">✅</span><strong>滴答清单 / Todoist</strong>：管待办 + 跨设备同步</div>
      <div class="ex-line"><span class="ex-emoji">📚</span><strong>欧路词典 / Anki</strong>：查单词 + 背单词卡片</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这类产品独有的技术挑战</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>本地优先 → <strong>IndexedDB / SQLite</strong> 数据存本地秒开</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>跨设备同步 → <strong>CRDT + 增量同步</strong> 让多设备改的不冲突</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>极简部署 → <strong>Serverless / Cloudflare Workers</strong> 按用量付费</div>
    </div></div>
  </div></div>`,

  "root": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🗺️</span>这是给 <strong>vibecoding 创作者</strong> 看的 CS 概念地图——从"我想做一个东西"一路点下去，遇到的概念自动收进右侧笔记本</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>怎么用这张地图</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>从头走 → 点"先理解代码本身" → 一路学到 vibecoding 全套基础</div>
      <div class="ex-line"><span class="ex-emoji">⤴</span>已经懂基础 → 点"挑平台" / "工具" / "产品类后端"任何一个跳过去</div>
      <div class="ex-line"><span class="ex-emoji">💡</span>每个节点都有"📖 看真实例子" → 弹独立卡片讲实际怎么用 + 有啥好处</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>这地图能帮你什么</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🗣️</span>跟 AI 沟通用对术语 → 一次说清楚，少来回</div>
      <div class="ex-line"><span class="ex-emoji">🎯</span>知道做某类产品要哪些技术 → 不被新潮名词带偏</div>
      <div class="ex-line"><span class="ex-emoji">📓</span>右上"笔记本"自动记你走过的概念 → 也能搜，回头复习方便</div>
    </div></div>
  </div></div>`,

  "vibe-prompt-craft": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>同样的需求，<strong>提示词写得越具体 AI 给的东西越接近想要的</strong>——模糊指令 → 模糊结果</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">❌</span>差："做个登录页" → AI 给 200 行模板，跟想要的不一样</div>
      <div class="ex-line"><span class="ex-emoji">✅</span>好："登录页：邮箱+密码 2 栏 + 按钮点了调 <code>/api/login</code> + 成功跳 <code>/dashboard</code> + 失败弹红字提示 + 用 Tailwind"</div>
      <div class="ex-line"><span class="ex-emoji">📸</span>有参考图就贴图："像微信那种气泡布局" 比纯文字描述清楚 10 倍</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>一次到位率 + 50%：少改 + 少返工</div>
      <div class="ex-line"><span class="ex-emoji">🪙</span>省 token 钱：精准 prompt 比反复修改总成本低</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>报错粘整段红字 + 截图 → AI 一眼定位问题</div>
    </div></div>
  </div></div>`,

  "vibe-split-task": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">✂️</span>一次给 AI <strong>一件小事</strong>比一次塞 10 件事效果好——大需求 AI 容易跑偏</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">❌</span>差："做一个微信级别的聊天软件" → AI 写一堆能跑不能用的代码</div>
      <div class="ex-line"><span class="ex-emoji">✅</span>好：拆成 ①两人能发文字 → ②消息存数据库 → ③在线状态 → ④图片表情 → ⑤群聊</div>
      <div class="ex-line"><span class="ex-emoji">💾</span>每完成一件 <code>git commit</code> 存档，下一件改炸了能秒回滚</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎯</span>每件验完再下一件 → 出 bug 知道是哪步引入</div>
      <div class="ex-line"><span class="ex-emoji">🛡️</span>大需求拆完不怕 AI 失忆：每件单独的 prompt 短，AI 上下文不挤</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>这种思路叫 <strong>增量开发</strong>（incremental development）</div>
    </div></div>
  </div></div>`,

  "vibe-review": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔍</span>AI 说"改好了"≠ 真好了——必须<strong>自己跑一遍 + 看 diff</strong>，否则 bug 累计到爆炸</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">👀</span><strong>看 diff</strong>：编辑器 / git 里看具体改了哪几行 → 发现"AI 改了我没让改的地方"立刻让它撤</div>
      <div class="ex-line"><span class="ex-emoji">🖱️</span><strong>真人跑一遍</strong>：打开页面操作一次，眼睛看是否符合预期</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span><strong>边界情况</strong>：空表单提交 / 超长字符 / 重复点 / 网断 → 这些通常 AI 不会想到</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛡️</span>AI 编不存在的函数 / 库（叫<strong>幻觉</strong>）→ 跑一次就抓到</div>
      <div class="ex-line"><span class="ex-emoji">💾</span>验过再 commit → 仓库历史每条都是"已知正常"的版本</div>
      <div class="ex-line"><span class="ex-emoji">⏱️</span>早期发现 bug 改的成本小，攒一堆再修是噩梦</div>
    </div></div>
  </div></div>`,

  "seo": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🔎</span>SEO = <strong>让搜索引擎把你的页面排前面</strong>，省下大量广告费——核心是 title + 内容质量 + 速度 + 别人链你</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🏷️</span>每页设独立 <code>&lt;title&gt;</code> + <code>&lt;meta description&gt;</code>——这俩就是搜索结果里显示的</div>
      <div class="ex-line"><span class="ex-emoji">🗺️</span>生成 <code>sitemap.xml</code> 列所有页面 → 提交到 <strong>Google Search Console</strong> / <strong>百度站长平台</strong></div>
      <div class="ex-line"><span class="ex-emoji">📊</span>看哪些关键词带来流量 → 围绕这些词加内容</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💰</span>免费流量：搜索引擎送的用户比投广告便宜很多</div>
      <div class="ex-line"><span class="ex-emoji">📈</span>长尾效应：1 篇好文章 / 工具页能源源不断带流量</div>
      <div class="ex-line"><span class="ex-emoji">⏰</span>SEO 见效慢：3-6 个月才能排到前面，越早做越好</div>
    </div></div>
  </div></div>`,

  "lighthouse": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🚥</span>Lighthouse = <strong>Google 的网页体检工具</strong>，F12 跑一次给 4 个维度打分（性能 / 无障碍 / 最佳实践 / SEO）+ 改进建议</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>Chrome 打开你的网站 → F12 → Lighthouse 标签 → 点 Analyze → 等 30 秒拿报告</div>
      <div class="ex-line"><span class="ex-emoji">📋</span>报告里"机会"那节列出具体可改进项 + 预计能省多少时间</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>把报告里高优先级问题贴给 AI → 让 AI 帮按建议改</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>性能涨 20-50 分常见改法：图片转 <strong>WebP</strong> / 加 <strong>lazy loading</strong> / 删没用的 JS</div>
      <div class="ex-line"><span class="ex-emoji">♿</span>无障碍改进：alt 属性 / 对比度 / 键盘导航——也是 SEO 加分项</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>核心指标：<strong>LCP</strong>（最大内容多快显示）/ <strong>CLS</strong>（页面布局抖动）/ <strong>FID</strong>（多快能交互）</div>
    </div></div>
  </div></div>`,

  "webhook": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🪝</span>Webhook = <strong>对方有事主动通知你</strong>（POST 到你的网址），不用你反复问"有动静吗"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💳</span>Stripe / 微信支付：用户付完款 → 平台 POST 到你的 <code>/webhook/pay</code> → 你才知道这笔订单已支付</div>
      <div class="ex-line"><span class="ex-emoji">🐙</span>GitHub：仓库有人推代码 → POST 到 <code>/webhook/github</code> → 触发自动部署</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>飞书 / 钉钉 bot：群里 @ bot → 平台 POST 给你 → 你回消息</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>实时性：事件发生即收到，不用每秒 polling 浪费两边资源</div>
      <div class="ex-line"><span class="ex-emoji">🔌</span>自动化：连接多个 SaaS 实现"A 触发 → B 反应"流程</div>
      <div class="ex-line"><span class="ex-emoji">🔒</span>必做 <strong>signature 验签</strong>：检查 POST 真的来自对方，防伪造</div>
    </div></div>
  </div></div>`,

  "oauth": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>OAuth = <strong>让用户用微信 / Google 账号登录你的产品</strong>。你不存密码，省事又安全</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">👆</span>用户点"微信登录" → 跳微信授权页 → 同意 → 跳回你产品自动登录</div>
      <div class="ex-line"><span class="ex-emoji">📦</span>你拿到：<strong>openid</strong>（用户唯一标识）+ 昵称 + 头像。<strong>拿不到</strong>密码</div>
      <div class="ex-line"><span class="ex-emoji">🛠️</span>vibecoding 用现成方案：<strong>Supabase Auth / Clerk / NextAuth</strong> 几行配好微信 / Google / Apple / GitHub 登录</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>用户体验好：不用再注册一遍 + 不用记新密码</div>
      <div class="ex-line"><span class="ex-emoji">🛡️</span>密码泄漏不用你担责：你压根没存</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>对方平台要先注册"开发者应用"拿 <strong>client_id / client_secret</strong>——微信审核尤其严</div>
    </div></div>
  </div></div>`,

  "pwa": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📲</span>PWA = <strong>让网页有 App 能力</strong>：能装桌面、能离线用、能推送通知</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📝</span>加 <code>manifest.json</code>（App 名 / 图标 / 启动色）→ 浏览器才提示"添加到主屏幕"</div>
      <div class="ex-line"><span class="ex-emoji">💾</span>加 <code>Service Worker</code> 缓存核心文件 → 断网也能开</div>
      <div class="ex-line"><span class="ex-emoji">🔔</span>注册推送 → 用户能在 App 没开时收到消息（iOS 16.4+ Safari 也支持了）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">⚡</span>不走应用商店：不审核、不抽 30%、即时上线</div>
      <div class="ex-line"><span class="ex-emoji">🖥️</span>跨平台 0 成本：iOS / Android / Win / Mac 都能装</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>现成框架：<strong>Next.js / Vite</strong> 配 PWA 插件几分钟搞定，必须 HTTPS</div>
    </div></div>
  </div></div>`,

  "i18n": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌏</span>i18n = <strong>把所有界面文字提到字典文件</strong>，按语言查字典渲染——不是写两份代码</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>建 zh.json / en.json 字典 → 代码里写 <code>t('welcome')</code> 而不是直接 "欢迎"</div>
      <div class="ex-line"><span class="ex-emoji">🔄</span>用户切语言 → 重查字典 → 整界面瞬间换</div>
      <div class="ex-line"><span class="ex-emoji">📅</span>日期 / 货币 / 数字 / 排序也要按地区变 → 叫 <strong>l10n</strong>（本地化）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌍</span>一份代码服务全球用户：海外市场 + 国内市场不用两套</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>AI 翻译初稿：把 zh.json 给 AI → 自动生成 en.json，人工微调即可</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>现成方案：<strong>i18next</strong>（最常用）/ react-intl / vue-i18n</div>
    </div></div>
  </div></div>`,

  "dark-mode": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌓</span>黑暗模式 = <strong>所有颜色用 CSS 变量定义</strong>，切换 <code>data-theme</code> 一行改完整套主题</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🎨</span><code>:root { --bg: white }</code> + <code>[data-theme="dark"] { --bg: #1a1a1a }</code></div>
      <div class="ex-line"><span class="ex-emoji">🖱️</span>JS 一行切换：<code>document.documentElement.setAttribute('data-theme', 'dark')</code></div>
      <div class="ex-line"><span class="ex-emoji">💾</span>用户选过 → 存 localStorage，下次记住；默认跟系统（<code>matchMedia</code>）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">👀</span>用户体验加分：晚上不刺眼，省电池（OLED 屏黑色省电）</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>开发省事：定义一套变量管所有主题，加第三套（如 高对比）也几行</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>坑：图片 / icon 也要适配 → SVG 用 <code>currentColor</code> 跟随文字色</div>
    </div></div>
  </div></div>`,

  "backup-monitor": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛟</span>产品上线"保命三件套"：<strong>备份</strong>（数据不丢）+ <strong>日志</strong>（出事查原因）+ <strong>监控</strong>（出事即时知道）</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">💾</span><strong>备份</strong>：数据库每天自动备份 → 存到另一个地方（Supabase / 阿里云 RDS 自带）</div>
      <div class="ex-line"><span class="ex-emoji">📋</span><strong>日志</strong>：用 <strong>Sentry</strong>（错误聚合）/ <strong>Logtail</strong>（日志查询），免费额度够小项目</div>
      <div class="ex-line"><span class="ex-emoji">🚨</span><strong>监控</strong>：<strong>UptimeRobot</strong>（监控网址在线）+ Sentry 设错误率告警，邮件 / Slack 通知</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🛡️</span>服务器宕机 / 数据库炸 / 被攻击 → 都不至于丢数据 + 自己睡觉时手机会响</div>
      <div class="ex-line"><span class="ex-emoji">🔍</span>用户报 bug → 翻 Sentry 找当时错误堆栈，比"重现 bug"快 10 倍</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>vibecoding 起步至少做：① 自动备份开启 ② Sentry 接错误 ③ UptimeRobot 监控网址</div>
    </div></div>
  </div></div>`,

  "vibe-refactor": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🧹</span>重构 = <strong>功能不变但代码变干净</strong>。AI 是重构利器，比手动整理快 100 倍</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📦</span>"把这段重复的逻辑抽成一个函数 / 组件"</div>
      <div class="ex-line"><span class="ex-emoji">📂</span>"把这个 800 行文件按功能拆成 3 个小文件"</div>
      <div class="ex-line"><span class="ex-emoji">✏️</span>"统一变量命名 camelCase / 把硬编码字符串提取成常量"</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">📖</span>代码读得懂：3 个月后回来看也能改</div>
      <div class="ex-line"><span class="ex-emoji">⚡</span>加新功能快：复用现成模块，少踩重复代码的坑</div>
      <div class="ex-line"><span class="ex-emoji">⚠️</span>重构前一定 <code>git commit</code>——AI 重构有时破坏功能，能秒回滚</div>
    </div></div>
  </div></div>`,

  "shared-server": `<div class="example-card"><button class="example-toggle">📖 看真实例子</button><div class="example-content" hidden>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">☁️</span>服务器 = <strong>一台 24 小时开着、连着公网的电脑</strong>。程序跑在它上面，全世界用户随时能访问</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌐</span>网站后端 → 部署到服务器，访客输网址就能用</div>
      <div class="ex-line"><span class="ex-emoji">🤖</span>Discord / Telegram bot → 挂服务器才能 24 小时响应</div>
      <div class="ex-line"><span class="ex-emoji">⏰</span>定时任务 / 爬虫 / 数据处理 → 必须挂在服务器跑</div>
    </div></div>
    <div class="ex-section"><div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div><div class="ex-story">
      <div class="ex-line"><span class="ex-emoji">🌍</span>全球可访问 + 7×24：用户半夜也能用，本机关了不受影响</div>
      <div class="ex-line"><span class="ex-emoji">💰</span>租云服务几块到几十块/月：阿里云 / Cloudflare Pages / Vercel / Railway</div>
      <div class="ex-line"><span class="ex-emoji">📐</span>vibecoding 起步选 <strong>Vercel / Railway</strong>：免费额度够、配置最少</div>
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
