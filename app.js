// ============================================================
// 王八许愿池的宝剑 —— 主交互逻辑
// 零依赖、纯原生 JS
//
// 布局：垂直层次树（tidy tree layout）
//   root 在画布底部 → 第一层在上方一行 → 第二层继续向上
//   每个节点占用宽度 = 子树宽度（递归算）→ 兄弟之间不撞
// ============================================================

const STATE = {
  nodes: new Map(),
  links: new Map(),
  rootEntry: null,
  activeCardId: null,
  cardEl: null,
  canvasSize: { w: 0, h: 0 },
  viewTransform: { tx: 0, ty: 0, scale: 1 },
  notebook: [],      // [{ name, explain, fromNodeId }]
  notebookSeen: new Set(),  // 概念名去重
  termTooltipEl: null,      // 当前打开的术语 tooltip
};

const LAYOUT = {
  branchLenPC: 220,    // root → 一级分支距离（PC）
  branchLenMobile: 150,
  nodeLenPC: 150,      // 父 → 子节点距离（PC）
  nodeLenMobile: 110,
  fanStepPC: 32,       // 兄弟之间最小角度间隔（度）
  fanStepMobile: 40,
  fanWidthMax: 150,    // 扇形最大宽度（度）
  rootXRatio: 0.5,     // root x 在画布水平中心
  rootYRatio: 0.5,     // root y 在画布垂直中心
  padTop: 90,
  padBottom: 60,
  padX: 32,
};

// 一级 8 个分支固定方向（度数，0° = 上，顺时针 + ；不均匀分布以减弱"中心辐射"感）
// 顺序对应 TREE_DATA.children 顺序：basics / tools / where-web / where-desktop / where-mobile / where-cli / where-server / where-hardware
const ROOT_BRANCH_ANGLES = [
  -160,   // [0] 先理解代码本身 → 上偏左
  -100,   // [1] 写代码用什么工具 → 上偏左
  -55,    // [2] 浏览器 → 上偏右
  -15,    // [3] 电脑 → 上偏右
  25,     // [4] 手机 → 右上
  75,     // [5] 命令行 → 右
  125,    // [6] 服务 → 右下
  165,    // [7] 硬件 → 左下偏下
];

function isMobileView() {
  return window.matchMedia('(max-width: 720px)').matches;
}
function getNodeR() { return isMobileView() ? 40 : 50; }
// 一级分支距离 = 基础值 与「可用区域允许的最大距离」取小，保证一级分支不会被画面切掉
function getBranchLen() {
  const base = isMobileView() ? LAYOUT.branchLenMobile : LAYOUT.branchLenPC;
  if (!STATE.canvasSize || !STATE.canvasSize.w) return base;
  const area = getUsableArea();
  const nodeR = getNodeR();
  const maxByW = (area.w / 2) - nodeR - 12;
  const maxByH = (area.h / 2) - nodeR - 24;  // 下方留 title 高度
  return Math.max(70, Math.min(base, maxByW, maxByH));
}
function getNodeLen()   { return isMobileView() ? LAYOUT.nodeLenMobile   : LAYOUT.nodeLenPC; }
function getFanStep()   { return isMobileView() ? LAYOUT.fanStepMobile   : LAYOUT.fanStepPC; }

// ---------- 基础工具 ----------
function $(sel) { return document.querySelector(sel); }
function createSVG(tag) { return document.createElementNS('http://www.w3.org/2000/svg', tag); }

function getNodeSize(entry) {
  if (entry.el) {
    const cs = getComputedStyle(entry.el);
    return parseFloat(cs.width) || 96;
  }
  return entry.parent ? 96 : 120;
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// ---------- 节点条目 / DOM ----------
function createNodeEntry(data, parent, level) {
  const entry = {
    id: data.id,
    data,
    parent,                  // 主父（决定 layout 位置）
    refParents: [],          // 额外引用它的父（环环相扣 共享节点）
    children: [],
    level,
    x: 0, y: 0,
    expanded: false,
    visited: false,
    el: null,
    isLightbulbOption: false, // 是不是「灯泡支线」选项（spawn 时朝主路径侧面延伸）
    rootBranchAngle: null,    // root 的子节点 spawn 时固定的角度（保证位置稳定）
  };
  STATE.nodes.set(data.id, entry);
  if (parent) parent.children.push(entry);
  return entry;
}

function renderNode(entry, startX, startY) {
  const layer = $('#node-layer');
  const el = document.createElement('div');
  const classes = ['node'];
  if (!entry.parent) classes.push('root');
  if (entry.isLightbulbOption) classes.push('from-lightbulb');
  el.className = classes.join(' ');
  el.dataset.id = entry.id;
  el.style.left = (startX !== undefined ? startX : entry.x) + 'px';
  el.style.top  = (startY !== undefined ? startY : entry.y) + 'px';
  el.innerHTML = `
    <div class="node-disc"></div>
    <div class="node-emoji" aria-hidden="true">${entry.data.emoji}</div>
    <div class="node-title">${escapeHTML(entry.data.title)}</div>
  `;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    handleNodeClick(entry);
  });
  entry.el = el;
  layer.appendChild(el);
}

// ---------- 连线 ----------
// STATE.links 是 Map<childId, linkInfo[]>——一个共享节点可以被多个父连线（环环相扣）
function renderLink(parent, child) {
  const svg = $('#link-layer');
  const path = createSVG('path');
  path.classList.add('link-path');
  path.dataset.from = parent.id;
  path.dataset.to = child.id;
  path.setAttribute('d', `M ${parent.x} ${parent.y} L ${parent.x} ${parent.y}`);
  svg.appendChild(path);
  const info = { el: path, parent, child };
  if (!STATE.links.has(child.id)) STATE.links.set(child.id, []);
  STATE.links.get(child.id).push(info);
  return info;
}

function updateLinkPath(linkInfo) {
  const { el, parent, child } = linkInfo;
  const x1 = parent.x, y1 = parent.y;
  const x2 = child.x, y2 = child.y;
  // 三次贝塞尔：父向上出，子从下方进 —— 弧线感
  const dy = y2 - y1;
  const c1y = y1 + dy * 0.45;
  const c2y = y2 - dy * 0.45;
  el.setAttribute('d', `M ${x1} ${y1} C ${x1} ${c1y}, ${x2} ${c2y}, ${x2} ${y2}`);
}

// ---------- 点击节点 ----------
// 点节点 = 打开卡片。**不**自动 spawn 子节点。
// 子节点通过卡片里的选项点击逐个 spawn（chain 流程化）
function handleNodeClick(entry) {
  if (!entry.visited) {
    entry.visited = true;
    entry.el.classList.add('visited');
  }
  // 把所有进入它的连线（主父 + 所有 refParents）都点亮——展示「这条路也通到这里」
  const linkInfos = STATE.links.get(entry.id);
  if (linkInfos) linkInfos.forEach(li => li.el.classList.add('gold'));

  STATE.nodes.forEach(n => n.el && n.el.classList.remove('active'));
  entry.el.classList.add('active');

  addToNotebook(entry);

  openCard(entry.id);
}

// ---------- 卡片选项点击：spawn 对应子节点（或跳到已存在的） ----------
function handleOptionClick(parentEntry, optionIndex) {
  const item = parentEntry.data.children[optionIndex];
  if (!item) return;
  // 解析 ref（共享节点）
  const realData = item.ref ? SHARED_NODES[item.ref] : item;
  if (!realData) return;
  let childEntry = STATE.nodes.get(realData.id);
  if (childEntry) {
    // 已 spawn 过——加一条来自 parentEntry 的额外连线（如果还没有）+ 跳过去打开
    if (!Array.from(STATE.links.get(childEntry.id) || []).some(li => li.parent === parentEntry)) {
      childEntry.refParents.push(parentEntry);
      if (parentEntry.children.indexOf(childEntry) < 0) parentEntry.children.push(childEntry);
      renderLink(parentEntry, childEntry);
      applyLayoutToDOM();
    }
  } else {
    childEntry = spawnOneChild(parentEntry, item, optionIndex);
  }
  closeCard(true);
  setTimeout(() => handleNodeClick(childEntry), 60);
}

// ---------- spawn 单个子节点（不是全部） ----------
function spawnOneChild(parent, item, optionIndex) {
  const realData = item.ref ? SHARED_NODES[item.ref] : item;
  const childEntry = createNodeEntry(realData, parent, parent.level + 1);
  // 是不是灯泡选项？root 的所有 children 都是主选项；其他节点看 item.lightbulb 字段
  const isRoot = !parent.parent;
  childEntry.isLightbulbOption = !isRoot && !!item.lightbulb;
  // 给 root 的子节点固定一个分支角度（按 data 顺序，保证位置稳定）
  if (isRoot) {
    const dataIdx = parent.data.children.indexOf(item);
    childEntry.rootBranchAngle = ROOT_BRANCH_ANGLES[dataIdx % ROOT_BRANCH_ANGLES.length];
  }
  parent.expanded = true;
  childEntry.x = parent.x;
  childEntry.y = parent.y;
  renderNode(childEntry, parent.x, parent.y);
  renderLink(parent, childEntry);
  layoutTree();
  applyLayoutToDOM();
  setTimeout(fitToScreen, 720);
  return childEntry;
}

// ---------- 笔记本 ----------
function addToNotebook(entry) {
  const c = entry.data.concept;
  if (!c) return;
  if (STATE.notebookSeen.has(c.name)) return;
  STATE.notebookSeen.add(c.name);
  STATE.notebook.push({ ...c, fromNodeId: entry.id });
  renderNotebook();
  // 加入时小提示：笔记本 toggle 闪一下
  const toggle = $('.notebook-toggle');
  if (toggle) {
    toggle.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(0)' }],
      { duration: 350, easing: 'ease-out' }
    );
  }
}

function renderNotebook() {
  const list = $('.notebook-list');
  const countEl = $('.notebook-count');
  if (!list || !countEl) return;
  countEl.textContent = STATE.notebook.length;
  countEl.classList.toggle('empty', STATE.notebook.length === 0);
  if (STATE.notebook.length === 0) {
    list.innerHTML = '<li class="empty-hint">还没收集任何概念。<br>点开下方的圆圈开始走吧。</li>';
    return;
  }
  list.innerHTML = STATE.notebook.map(c => `
    <li>
      <div class="concept-name">${escapeHTML(c.name)}</div>
      <div class="concept-explain">${escapeHTML(c.explain)}</div>
    </li>
  `).join('');
}

function bindNotebook() {
  const aside = $('.notebook');
  const toggle = $('.notebook-toggle');
  if (!toggle || !aside) return;
  toggle.addEventListener('click', () => {
    const open = aside.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  renderNotebook();
}

// ---------- 展开子节点 ----------
// root 特殊：所有 children 都是「路径选项」（同时 spawn 全是主）
// 非 root：children[0] 是主路径下一节点；children[1+] 是灯泡支线（emoji=💡，朝侧面 spawn）
function expandChildren(parent) {
  parent.expanded = true;
  const childData = parent.data.children;
  if (!childData || childData.length === 0) return;
  const isRoot = !parent.parent;

  childData.forEach((item, i) => {
    const isSubQuestion = !isRoot && i > 0;

    // item.ref 引用共享节点（SHARED_NODES 池）—— 同一节点可被多个父连入
    if (item.ref) {
      const sharedData = SHARED_NODES[item.ref];
      if (!sharedData) return;
      const existing = STATE.nodes.get(sharedData.id);
      if (existing) {
        existing.refParents.push(parent);
        parent.children.push(existing);
        renderLink(parent, existing);
        return;
      }
      const newEntry = createNodeEntry(sharedData, parent, parent.level + 1);
      newEntry.isSubQuestion = isSubQuestion;
      newEntry.x = parent.x;
      newEntry.y = parent.y;
      renderNode(newEntry, parent.x, parent.y);
      renderLink(parent, newEntry);
      return;
    }
    // 普通节点
    const childEntry = createNodeEntry(item, parent, parent.level + 1);
    childEntry.isSubQuestion = isSubQuestion;
    childEntry.x = parent.x;
    childEntry.y = parent.y;
    renderNode(childEntry, parent.x, parent.y);
    renderLink(parent, childEntry);
  });

  layoutTree();
  applyLayoutToDOM();
  setTimeout(fitToScreen, 720);
}

// ---------- 任意方向地图布局 ----------
// root 在画布中心 → 一级 6 个分支朝 6 个固定方向辐射出去（不均匀，避免「花洒」感）
// 二级及以后：以「父 → 当前节点」的方向为主轴，兄弟扇形展开

// 极坐标放置 entry 的 children：parentAngle 是父 → 当前 entry 的方向（度）
// 区分主路径子（沿父方向延伸，链式）和灯泡支线子（朝侧面 ±90°）
// 共享节点：只在 primary parent 里 layout 一次（c.parent === entry）
function placeChildren(entry, parentAngle) {
  const ownChildren = entry.children.filter(c => c.parent === entry);
  if (ownChildren.length === 0) return;

  const mainChildren = ownChildren.filter(c => !c.isLightbulbOption);
  const lightbulbs = ownChildren.filter(c => c.isLightbulbOption);
  const baseLen = getNodeLen();

  if (mainChildren.length === 1) {
    const c = mainChildren[0];
    const rad = parentAngle * Math.PI / 180;
    c.x = entry.x + Math.sin(rad) * baseLen;
    c.y = entry.y - Math.cos(rad) * baseLen;
    placeChildren(c, parentAngle);
  } else if (mainChildren.length > 1) {
    const N = mainChildren.length;
    const step = getFanStep();
    const fanWidth = Math.min(LAYOUT.fanWidthMax, (N - 1) * step);
    const radius = baseLen * (1 + Math.max(0, N - 3) * 0.2);
    mainChildren.forEach((c, i) => {
      const t = (i / (N - 1)) - 0.5;
      const childAngle = parentAngle + t * fanWidth;
      const rad = childAngle * Math.PI / 180;
      c.x = entry.x + Math.sin(rad) * radius;
      c.y = entry.y - Math.cos(rad) * radius;
      placeChildren(c, childAngle);
    });
  }

  // 灯泡支线子：朝主路径侧面 ±90°，左右交替
  const sideLen = baseLen * 0.85;
  lightbulbs.forEach((c, i) => {
    const sideAngle = parentAngle + (i % 2 === 0 ? 90 : -90) + Math.floor(i / 2) * 18;
    const rad = sideAngle * Math.PI / 180;
    c.x = entry.x + Math.sin(rad) * sideLen;
    c.y = entry.y - Math.cos(rad) * sideLen;
    placeChildren(c, sideAngle);
  });
}

function layoutTree() {
  if (!STATE.rootEntry) return;
  const root = STATE.rootEntry;
  root.x = STATE.canvasSize.w * LAYOUT.rootXRatio;
  root.y = STATE.canvasSize.h * LAYOUT.rootYRatio;

  if (root.children.length === 0) return;

  // root 的子（一级分支）：用每个子节点自己的 rootBranchAngle（spawn 时固定）保证位置稳定
  const branchLen = getBranchLen();
  root.children.forEach((c, i) => {
    const angle = (typeof c.rootBranchAngle === 'number') ? c.rootBranchAngle : ROOT_BRANCH_ANGLES[i % ROOT_BRANCH_ANGLES.length];
    const rad = angle * Math.PI / 180;
    c.x = root.x + Math.sin(rad) * branchLen;
    c.y = root.y - Math.cos(rad) * branchLen;
    placeChildren(c, angle);
  });
}

// 把 layout 结果应用到 DOM，触发节点和连线动画
function applyLayoutToDOM() {
  STATE.nodes.forEach(entry => {
    if (!entry.el) return;
    entry.el.style.left = entry.x + 'px';
    entry.el.style.top  = entry.y + 'px';
    if (!entry.el.classList.contains('visible')) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => entry.el.classList.add('visible'));
      });
    }
  });
  // 连线同步：每个 child 可能有多条进入连线（共享节点）
  STATE.links.forEach(infoArr => {
    infoArr.forEach(info => {
      updateLinkPath(info);
      if (!info.el.classList.contains('visible')) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => info.el.classList.add('visible'));
        });
      }
    });
  });
}

// ---------- 视图可用区域：扣除 header 和笔记本 tab / 抽屉 ----------
function getUsableArea() {
  const headerEl = document.querySelector('.header');
  const headerH = headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 70;
  const isNoteOpen = document.querySelector('.notebook')?.classList?.contains('open');
  let rightReserve;
  if (isNoteOpen) {
    const panel = document.querySelector('.notebook-panel');
    rightReserve = panel ? Math.ceil(panel.getBoundingClientRect().width) : 320;
  } else {
    const tab = document.querySelector('.notebook-toggle');
    rightReserve = tab ? Math.ceil(tab.getBoundingClientRect().width) : 50;
  }
  return {
    x: 0,
    y: headerH,
    w: Math.max(200, STATE.canvasSize.w - rightReserve),
    h: Math.max(200, STATE.canvasSize.h - headerH - 16),
  };
}

// ---------- 视图平移（不缩放）：永远 scale=1，只 translate ----------
// 任意方向 layout + chain 模式下整图可能很大。fitToScreen 锚定当前 active 节点到「可用区域中心」
// 这样用户走到哪里、当前节点就在画面中央；整图比 viewport 大没关系，用户可以拖动看
function fitToScreen() {
  if (!STATE.rootEntry) return;
  const anchorEntry = (STATE.activeCardId && STATE.nodes.get(STATE.activeCardId)) || STATE.rootEntry;
  const area = getUsableArea();
  const targetCx = area.x + area.w / 2;
  const targetCy = area.y + area.h / 2;
  const tx = targetCx - anchorEntry.x;
  const ty = targetCy - anchorEntry.y;
  applyViewTransform(tx, ty, 1, true);
  if (STATE.activeCardId && STATE.cardEl) {
    setTimeout(() => positionCard(STATE.cardEl, STATE.nodes.get(STATE.activeCardId)), 420);
  }
}

function applyViewTransform(tx, ty, scale, animate) {
  const layer = $('#node-layer');
  const linkLayer = $('#link-layer');
  const t = `translate(${tx}px, ${ty}px)`;
  layer.style.transformOrigin = '0 0';
  linkLayer.style.transformOrigin = '0 0';
  layer.style.transform = t;
  linkLayer.style.transform = t;
  layer.style.transition = animate ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
  linkLayer.style.transition = animate ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
  STATE.viewTransform = { tx, ty, scale: 1 };
}

function toScreenXY(entry) {
  const t = STATE.viewTransform || { tx: 0, ty: 0, scale: 1 };
  return {
    x: entry.x * t.scale + t.tx,
    y: entry.y * t.scale + t.ty,
    size: getNodeSize(entry) * t.scale,
  };
}

// ---------- 气泡详情卡片 ----------
function openCard(nodeId) {
  const entry = STATE.nodes.get(nodeId);
  if (!entry) return;

  if (STATE.activeCardId === nodeId && STATE.cardEl) {
    positionCard(STATE.cardEl, entry);
    return;
  }

  closeCard(true);

  const data = entry.data;
  const pages = (data.pages && data.pages.length > 0) ? data.pages : [{ html: '<p>（这一页还没写，下一版会填上。）</p>' }];
  let pageIdx = 0;

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-tail" aria-hidden="true"></div>
    <div class="card-header">
      <div class="card-emoji" aria-hidden="true">${data.emoji}</div>
      <div class="card-title">${escapeHTML(data.title)}</div>
      <button class="card-close" type="button" aria-label="关闭">×</button>
    </div>
    <div class="card-body"></div>
    <div class="card-options"></div>
    <div class="card-footer">
      <span class="page-label"></span>
      <div class="card-pager">
        <button class="prev-btn" type="button" aria-label="上一页">‹</button>
        <span class="page-indicator"></span>
        <button class="next-btn" type="button" aria-label="下一页">›</button>
      </div>
    </div>
  `;

  const bodyEl = card.querySelector('.card-body');
  const optionsEl = card.querySelector('.card-options');
  const pageInd = card.querySelector('.page-indicator');
  const pageLabel = card.querySelector('.page-label');
  const prevBtn = card.querySelector('.prev-btn');
  const nextBtn = card.querySelector('.next-btn');
  const pagerEl = card.querySelector('.card-pager');

  // 渲染卡片底部「选项列表」：每个 child 是一个可点选项
  function renderOptions() {
    const items = data.children || [];
    if (items.length === 0) {
      optionsEl.innerHTML = '<div class="options-end">（这条路到这里就完了）</div>';
      return;
    }
    const isRoot = !entry.parent;
    optionsEl.innerHTML = '<div class="options-label">' + (isRoot ? '选一条路走：' : '接下来：') + '</div>' + items.map((item, i) => {
      const isLightbulb = !isRoot && !!item.lightbulb;
      const itemData = item.ref ? SHARED_NODES[item.ref] : item;
      const existing = itemData ? STATE.nodes.get(itemData.id) : null;
      const visited = !!(existing && existing.visited);
      const cls = ['option'];
      if (isLightbulb) cls.push('lightbulb');
      else cls.push('main');
      if (visited) cls.push('visited');
      const icon = isLightbulb ? '💡' : (itemData ? itemData.emoji : '');
      const label = itemData ? itemData.title : '?';
      const subhint = isLightbulb ? '<span class="opt-hint">支线</span>' : '';
      return `<button class="${cls.join(' ')}" data-idx="${i}" type="button"><span class="opt-icon">${icon}</span><span class="opt-label">${escapeHTML(label)}</span>${subhint}</button>`;
    }).join('');
    optionsEl.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        handleOptionClick(entry, idx);
      });
    });
  }

  function update() {
    bodyEl.innerHTML = pages[pageIdx].html;
    pageInd.textContent = `${pageIdx + 1} / ${pages.length}`;
    prevBtn.disabled = pageIdx === 0;
    nextBtn.disabled = pageIdx === pages.length - 1;
    const footerEl = card.querySelector('.card-footer');
    if (pages.length <= 1) {
      if (footerEl) footerEl.style.display = 'none';
      pagerEl.style.visibility = 'hidden';
      pageLabel.textContent = '';
    } else {
      if (footerEl) footerEl.style.display = '';
      pagerEl.style.visibility = '';
      pageLabel.textContent = '纸卷翻页';
    }
    // 重新绑定术语点击解释 + 互动 widget
    closeTermTooltip();
    bindTermClicks(bodyEl);
    bindInteractiveWidgets(bodyEl);
    // 翻页后内容高度变了，重新算 card 位置 + fitToScreen 锚定 active 节点
    requestAnimationFrame(() => {
      positionCard(card, entry);
      fitToScreen();
    });
  }
  update();
  renderOptions();

  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); if (pageIdx > 0) { pageIdx--; update(); } });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); if (pageIdx < pages.length - 1) { pageIdx++; update(); } });
  card.querySelector('.card-close').addEventListener('click', (e) => { e.stopPropagation(); closeCard(); });
  card.addEventListener('click', (e) => e.stopPropagation());

  $('#card-root').appendChild(card);
  positionCard(card, entry);

  STATE.cardEl = card;
  STATE.activeCardId = nodeId;

  requestAnimationFrame(() => card.classList.add('show'));
  // active 变了 → 把这个节点 fit 到画面中央，让卡片 + 节点在 viewport 里
  setTimeout(fitToScreen, 40);
}

function positionCard(card, entry) {
  if (!card || !entry) return;

  card.style.visibility = 'hidden';
  card.style.left = '0px';
  card.style.top = '0px';
  const rect = card.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  const screen = toScreenXY(entry);
  const cx = screen.x;
  const cy = screen.y;
  const halfNode = screen.size / 2;
  const gap = 14;

  const viewW = STATE.canvasSize.w;
  const viewH = STATE.canvasSize.h;
  const area = getUsableArea();
  const topReserve = area.y + 8;
  const bottomReserve = viewH - (area.y + area.h);
  const leftReserve = area.x + 8;
  const rightReserve = viewW - (area.x + area.w);

  const otherNodes = Array.from(STATE.nodes.values())
    .filter(n => n.id !== entry.id && n.el)
    .map(n => {
      const s = toScreenXY(n);
      return { x: s.x, y: s.y, r: s.size / 2 + 6 };
    });

  const candidates = [
    { side: 'top',    x: cx - w / 2,              y: cy - halfNode - gap - h, bias: 0 },
    { side: 'right',  x: cx + halfNode + gap,     y: cy - h / 2,              bias: 60 },
    { side: 'left',   x: cx - halfNode - gap - w, y: cy - h / 2,              bias: 60 },
    { side: 'bottom', x: cx - w / 2,              y: cy + halfNode + gap,     bias: 90 },
  ];

  function scoreFor(c) {
    let overflow =
      Math.max(0, leftReserve - c.x) +
      Math.max(0, c.x + w - (viewW - rightReserve)) +
      Math.max(0, topReserve - c.y) +
      Math.max(0, c.y + h - (viewH - bottomReserve));
    let hit = 0;
    for (const n of otherNodes) {
      const px = Math.max(c.x, Math.min(n.x, c.x + w));
      const py = Math.max(c.y, Math.min(n.y, c.y + h));
      const d = Math.hypot(n.x - px, n.y - py);
      if (d < n.r) hit += (n.r - d) * 30;
    }
    return overflow + hit + c.bias;
  }

  let best = candidates[0];
  let bestScore = scoreFor(candidates[0]);
  for (let i = 1; i < candidates.length; i++) {
    const s = scoreFor(candidates[i]);
    if (s < bestScore) { bestScore = s; best = candidates[i]; }
  }

  const finalX = Math.max(leftReserve, Math.min(viewW - rightReserve - w - 8, best.x));
  const finalY = Math.max(topReserve, Math.min(viewH - bottomReserve - h - 8, best.y));

  card.style.left = finalX + 'px';
  card.style.top = finalY + 'px';
  card.style.visibility = '';

  const tail = card.querySelector('.card-tail');
  if (tail) setTailPosition(tail, best.side, finalX, finalY, w, h, cx, cy);
}

function setTailPosition(tail, side, cardX, cardY, w, h, nodeX, nodeY) {
  tail.style.display = '';
  switch (side) {
    case 'top':
      tail.style.left = Math.max(10, Math.min(w - 22, nodeX - cardX - 7)) + 'px';
      tail.style.top = (h - 7) + 'px';
      tail.style.transform = 'rotate(225deg)';
      break;
    case 'bottom':
      tail.style.left = Math.max(10, Math.min(w - 22, nodeX - cardX - 7)) + 'px';
      tail.style.top = '-7px';
      tail.style.transform = 'rotate(45deg)';
      break;
    case 'right':
      tail.style.left = '-7px';
      tail.style.top = Math.max(10, Math.min(h - 22, nodeY - cardY - 7)) + 'px';
      tail.style.transform = 'rotate(-45deg)';
      break;
    case 'left':
      tail.style.left = (w - 7) + 'px';
      tail.style.top = Math.max(10, Math.min(h - 22, nodeY - cardY - 7)) + 'px';
      tail.style.transform = 'rotate(135deg)';
      break;
  }
}

function closeCard(silent) {
  if (STATE.cardEl) {
    const el = STATE.cardEl;
    el.classList.remove('show');
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, silent ? 0 : 250);
    STATE.cardEl = null;
    STATE.activeCardId = null;
  }
  STATE.nodes.forEach(n => n.el && n.el.classList.remove('active'));
  closeTermTooltip();
}

// ---------- 术语 tooltip（卡片里点击 em 标签弹一个小解释） ----------
function bindTermClicks(bodyEl) {
  if (!bodyEl || typeof TERM_GLOSSARY === 'undefined') return;
  bodyEl.querySelectorAll('em').forEach(termEl => {
    const text = termEl.textContent.trim();
    const def = TERM_GLOSSARY[text];
    if (!def) return;
    termEl.classList.add('term-clickable');
    termEl.addEventListener('click', (e) => {
      e.stopPropagation();
      showTermTooltip(termEl, text, def);
    });
  });
}

function showTermTooltip(anchor, term, definition) {
  closeTermTooltip();
  const tip = document.createElement('div');
  tip.className = 'term-tooltip';
  tip.innerHTML = `<div class="term-tip-name">${escapeHTML(term)}</div><div class="term-tip-desc">${escapeHTML(definition)}</div>`;
  document.body.appendChild(tip);
  // 位置：anchor 下方对齐
  const rect = anchor.getBoundingClientRect();
  // 等下一帧渲染才能拿到 tooltip 实际尺寸
  requestAnimationFrame(() => {
    const tipRect = tip.getBoundingClientRect();
    let left = rect.left;
    let top = rect.bottom + 6;
    // 防右溢出
    if (left + tipRect.width > window.innerWidth - 8) left = window.innerWidth - tipRect.width - 8;
    if (left < 8) left = 8;
    // 防下溢出 → 改放到 anchor 上方
    if (top + tipRect.height > window.innerHeight - 8) top = rect.top - tipRect.height - 6;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    tip.classList.add('show');
  });
  // 阻止 tooltip 内点击关闭
  tip.addEventListener('click', e => e.stopPropagation());
  STATE.termTooltipEl = tip;
}

function closeTermTooltip() {
  if (STATE.termTooltipEl) {
    const el = STATE.termTooltipEl;
    el.classList.remove('show');
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 180);
    STATE.termTooltipEl = null;
  }
}

// ---------- 互动小游戏 widget ----------
// 在卡片 body 渲染后调用：扫 .reveal-card / .matching-game / .quiz-card，bind 交互
function bindInteractiveWidgets(bodyEl) {
  if (!bodyEl) return;

  // (1) 点击揭晓 reveal-card
  bodyEl.querySelectorAll('.reveal-card').forEach(card => {
    const btn = card.querySelector('.reveal-btn');
    const answer = card.querySelector('.reveal-a');
    if (!btn || !answer) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.add('revealed');
      answer.hidden = false;
    });
  });

  // (2) 连连看 matching-game：左右两列，data-match 相同的算配对
  bodyEl.querySelectorAll('.matching-game').forEach(game => {
    let selected = null;  // 当前选中的 item
    const items = game.querySelectorAll('.match-item');
    const total = items.length / 2;
    let matchedCount = 0;
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        if (item.classList.contains('matched')) return;
        if (selected === item) {
          item.classList.remove('selected');
          selected = null;
          return;
        }
        if (!selected) {
          item.classList.add('selected');
          selected = item;
          return;
        }
        // 第二个点击——检查是否配对
        const a = selected, b = item;
        const sameSide = a.parentNode === b.parentNode;
        if (sameSide) {
          // 同列再点—— switch 选中
          a.classList.remove('selected');
          b.classList.add('selected');
          selected = b;
          return;
        }
        if (a.dataset.match === b.dataset.match) {
          a.classList.remove('selected');
          a.classList.add('matched');
          b.classList.add('matched');
          selected = null;
          matchedCount++;
          if (matchedCount === total) game.classList.add('done');
        } else {
          a.classList.add('wrong');
          b.classList.add('wrong');
          setTimeout(() => {
            a.classList.remove('wrong', 'selected');
            b.classList.remove('wrong');
          }, 350);
          selected = null;
        }
      });
    });
  });

  // (3) 场景选择题 quiz-card：data-correct="true" 是对的
  bodyEl.querySelectorAll('.quiz-card').forEach(quiz => {
    const opts = quiz.querySelectorAll('.quiz-opt');
    opts.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        if (quiz.classList.contains('answered')) return;
        quiz.classList.add('answered');
        const correct = opt.dataset.correct === 'true';
        opt.classList.add(correct ? 'correct' : 'wrong');
        // 不管选什么，正确答案都高亮
        opts.forEach(o => {
          if (o.dataset.correct === 'true') o.classList.add('correct');
        });
      });
    });
  });
}

// ---------- 重置 ----------
function resetAll() {
  closeCard(true);
  $('#node-layer').innerHTML = '';
  Array.from($('#link-layer').querySelectorAll('.link-path')).forEach(p => p.remove());
  STATE.nodes.clear();
  STATE.links.clear();
  STATE.viewTransform = { tx: 0, ty: 0, scale: 1 };
  STATE.rootEntry = null;
  STATE.notebook = [];
  STATE.notebookSeen.clear();
  renderNotebook();
  const layer = $('#node-layer');
  const linkLayer = $('#link-layer');
  layer.style.transform = '';
  linkLayer.style.transform = '';
  init();
}

// ---------- 启动 ----------
function init() {
  const wrapper = $('#canvas-wrapper');
  const rect = wrapper.getBoundingClientRect();
  STATE.canvasSize = { w: rect.width, h: rect.height };

  const rootEntry = createNodeEntry(TREE_DATA, null, 0);
  STATE.rootEntry = rootEntry;
  layoutTree();  // 仅 root → 算出 root 的 x/y
  renderNode(rootEntry, rootEntry.x, rootEntry.y);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => rootEntry.el.classList.add('visible'));
  });

  setTimeout(() => openCard(rootEntry.id), 700);
}

// ---------- 全局事件 ----------
function bindGlobalEvents() {
  const wrapper = $('#canvas-wrapper');

  // 画布空白处点击 → 关气泡（要区分点击 vs 拖动）
  let clickStart = null;
  wrapper.addEventListener('click', (e) => {
    if (clickStart && clickStart.moved) return;  // 是拖动不是点击
    if (e.target === wrapper || e.target.id === 'link-layer' || e.target.id === 'node-layer') {
      closeCard();
    }
  });

  $('.reset-btn').addEventListener('click', resetAll);
  window.addEventListener('resize', handleResize);

  // 点击 tooltip / 术语本身以外的地方 → 关 tooltip
  document.addEventListener('click', (e) => {
    if (!STATE.termTooltipEl) return;
    if (e.target.closest('.term-tooltip')) return;
    if (e.target.classList && e.target.classList.contains('term-clickable')) return;
    closeTermTooltip();
  }, true);

  // 拖动平移画布
  bindCanvasPan(wrapper, clickStart);

  // 笔记本抽屉
  bindNotebook();

  // 阻止双击放大（移动端）
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });
}

// ---------- 画布拖动平移 ----------
function bindCanvasPan(wrapper) {
  let dragging = false;
  let startClientX = 0, startClientY = 0;
  let startTx = 0, startTy = 0;
  let startCardLeft = 0, startCardTop = 0;  // 拖动开始时卡片位置（让卡片跟随平移）
  let moved = false;
  const moveThreshold = 4;

  function onDown(clientX, clientY, target) {
    if (target.closest('.node') || target.closest('.card') || target.closest('.notebook')) return;
    dragging = true;
    moved = false;
    startClientX = clientX;
    startClientY = clientY;
    startTx = STATE.viewTransform.tx;
    startTy = STATE.viewTransform.ty;
    // 记录卡片当前位置 —— 拖动时同步平移让卡片视觉上跟节点一起动
    if (STATE.cardEl) {
      startCardLeft = parseFloat(STATE.cardEl.style.left) || 0;
      startCardTop = parseFloat(STATE.cardEl.style.top) || 0;
    }
    wrapper.classList.add('dragging');
  }
  function onMove(clientX, clientY) {
    if (!dragging) return;
    const dx = clientX - startClientX;
    const dy = clientY - startClientY;
    if (!moved && Math.hypot(dx, dy) > moveThreshold) moved = true;
    if (moved) {
      applyViewTransform(startTx + dx, startTy + dy, 1, false);
      // 卡片跟节点一起平移（节点在 #node-layer 里随 transform 移动；卡片是 fixed 定位，需要手动同步）
      if (STATE.cardEl) {
        STATE.cardEl.style.left = (startCardLeft + dx) + 'px';
        STATE.cardEl.style.top  = (startCardTop + dy) + 'px';
      }
    }
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    wrapper.classList.remove('dragging');
    // 若发生过拖动，吞掉接下来的 click（防止误触发关气泡）
    if (moved) {
      const swallow = (e) => { e.stopPropagation(); wrapper.removeEventListener('click', swallow, true); };
      wrapper.addEventListener('click', swallow, true);
    }
  }

  wrapper.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY, e.target));
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onUp);

  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      onDown(t.clientX, t.clientY, e.target);
    }
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && dragging) {
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
    }
  }, { passive: true });
  window.addEventListener('touchend', onUp);
  window.addEventListener('touchcancel', onUp);
}

let resizeTimer = null;
function handleResize() {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const wrapper = $('#canvas-wrapper');
    const rect = wrapper.getBoundingClientRect();
    STATE.canvasSize = { w: rect.width, h: rect.height };
    layoutTree();
    applyLayoutToDOM();
    fitToScreen();
  }, 150);
}

window.addEventListener('DOMContentLoaded', () => {
  bindGlobalEvents();
  init();
});
