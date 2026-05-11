/* eslint-disable no-alert */
/**
 * 妈妈语录 · 夸夸生成器
 * - 零依赖，静态网页即可运行
 * - 本地存储：收藏、历史、设置
 * - 可生成分享链接（URL 参数）与导出 PNG 海报
 */

const STORAGE_KEY = "mom-quotes-v1";

const CATEGORIES = [
  { key: "all", name: "全部 / All" },
  { key: "care", name: "关心 / Care" },
  { key: "health", name: "养生 / Health" },
  { key: "money", name: "省钱 / Money" },
  { key: "love", name: "催婚 / Love" },
  { key: "work", name: "学习/工作 / Work" },
  { key: "life", name: "生活唠叨 / Life" },
];

const QUOTES = [
  // 关心
  { cat: "care", text: "到家了吗？到了给我发个消息。" },
  { cat: "care", text: "别熬夜了，明天还要上班呢。" },
  { cat: "care", text: "外面冷，多穿点，别逞强。" },
  { cat: "care", text: "吃饭了没？不吃饭胃受不了。" },
  { cat: "care", text: "你声音怎么怪怪的，是不是感冒了？" },
  // 养生
  { cat: "health", text: "奶茶少喝点，都是糖。" },
  { cat: "health", text: "你这作息再这样，迟早要去医院报道。" },
  { cat: "health", text: "少吃外卖，油太大了。" },
  { cat: "health", text: "泡脚了吗？人要把自己照顾好。" },
  { cat: "health", text: "水果记得吃，别老吃零食。" },
  // 省钱
  { cat: "money", text: "这东西家里不是有吗？买它干啥？" },
  { cat: "money", text: "钱要花在刀刃上，别乱买。" },
  { cat: "money", text: "双十一别冲动，先问问自己需不需要。" },
  { cat: "money", text: "你赚的钱也不是大风刮来的。" },
  { cat: "money", text: "这个可以便宜点买，别急。" },
  // 催婚
  { cat: "love", text: "你到底什么时候带个人回来给我看看？" },
  { cat: "love", text: "你不着急，我都替你着急。" },
  { cat: "love", text: "谈恋爱别怕麻烦，合适最重要。" },
  { cat: "love", text: "你同学孩子都会打酱油了（开玩笑的）" },
  { cat: "love", text: "别光工作，生活也要有个伴。" },
  // 学习/工作
  { cat: "work", text: "工作再忙也要吃饭，别把身体熬坏了。" },
  { cat: "work", text: "遇到困难别硬扛，记得和我说。" },
  { cat: "work", text: "别总说自己不行，你明明很厉害。" },
  { cat: "work", text: "老板的话听一半就行，别委屈自己。" },
  { cat: "work", text: "慢慢来，不要急，路都是一步一步走出来的。" },
  // 生活唠叨
  { cat: "life", text: "房间要收拾，乱久了心也乱。" },
  { cat: "life", text: "出门记得带钥匙！" },
  { cat: "life", text: "洗衣机里衣服别闷着，会有味道。" },
  { cat: "life", text: "手机别老玩，眼睛会疼。" },
  { cat: "life", text: "你看你又忘记带伞了吧。" },
];

const REPLIES = {
  warm: [
    "收到～我会好好照顾自己，因为我也想一直照顾你。",
    "你放心，我听话。你别太操心，我爱你。",
    "好嘞妈妈，我已经在努力把日子过得更好啦。",
    "你说的我都记着呢。谢谢你一直把我放在第一位。",
    "今天也想对你说：辛苦啦，你永远是我的底气。",
    "我会按时吃饭、按时睡觉，也会按时想你。",
    "我知道你唠叨是因为爱，我也用我的方式爱你。",
  ],
  funny: [
    "好的母后！臣这就去吃饭/穿秋裤/早睡，立刻执行！",
    "收到！我现在的状态：听话程度 +1，健康值 +10。",
    "你说得对，我马上把自己当成你的宝贝来养。",
    "行！我决定把‘不熬夜’加入我的人生 KPI。",
    "别担心，我已经把你的话设成了脑内循环播放。",
    "我知道啦～你是关心界的天花板，我是被爱界的学霸。",
    "我会乖的，但也会偷偷更爱你一点点。",
  ],
  boss: [
    "这事我来安排。你只负责开开心心，其他交给我。",
    "你放心，我不允许你为我担心太久。",
    "从今天起，你的快乐优先级排第一。",
    "你已经很辛苦了。现在换我来当你的靠山。",
    "我会把自己照顾好，因为你值得一个安心的我。",
    "你把我养大，我把你宠回小孩。",
    "我会越来越强大，让你越来越轻松。",
  ],
};

const $ = (id) => document.getElementById(id);

const els = {
  motherName: $("motherName"),
  fromName: $("fromName"),
  category: $("category"),
  tone: $("tone"),
  btnPick: $("btnPick"),
  btnReply: $("btnReply"),
  btnFav: $("btnFav"),
  btnCopy: $("btnCopy"),
  btnLink: $("btnLink"),
  btnPoster: $("btnPoster"),
  btnReset: $("btnReset"),
  tag: $("tag"),
  hint: $("hint"),
  quote: $("quote"),
  reply: $("reply"),
  footerText: $("footerText"),
  counterPill: $("counterPill"),
  paneFav: $("paneFav"),
  paneHis: $("paneHis"),
  posterDialog: $("posterDialog"),
  posterImg: $("posterImg"),
  btnCloseDialog: $("btnCloseDialog"),
  btnDownloadPoster: $("btnDownloadPoster"),
  btnCopyPosterText: $("btnCopyPosterText"),
  easterDialog: $("easterDialog"),
  btnCloseEaster: $("btnCloseEaster"),
  easterText: $("easterText"),
  btnEasterPoster: $("btnEasterPoster"),
};

const state = {
  motherName: "妈妈",
  fromName: "我",
  category: "all",
  tone: "warm",
  current: null, // {quoteIndex, replyIndex}
  favorites: [], // array of {quoteIndex, replyIndex, tone, ts}
  history: [], // same shape, newest first
  streak: 0,
};

function safeParseJSON(s, fallback) {
  try {
    return JSON.parse(s);
  } catch {
    return fallback;
  }
}

function loadLocal() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const data = safeParseJSON(raw, null);
  if (!data) return;
  Object.assign(state, data);
}

function saveLocal() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      motherName: state.motherName,
      fromName: state.fromName,
      category: state.category,
      tone: state.tone,
      current: state.current,
      favorites: state.favorites,
      history: state.history.slice(0, 40),
      streak: state.streak,
    }),
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function pickRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function getFilteredQuoteIndices(catKey) {
  if (!catKey || catKey === "all") return QUOTES.map((_, i) => i);
  return QUOTES.map((q, i) => ({ q, i })).filter((x) => x.q.cat === catKey).map((x) => x.i);
}

function formatCardText({ quoteIndex, replyIndex, tone }) {
  const cat = QUOTES[quoteIndex]?.cat ?? "all";
  const catName = CATEGORIES.find((c) => c.key === cat)?.name ?? "全部";
  const quote = QUOTES[quoteIndex]?.text ?? "（空）";
  const reply = REPLIES[tone]?.[replyIndex] ?? "（空）";
  const mom = state.motherName || "妈妈";
  const from = state.fromName || "我";
  return `【${catName}】${mom}说 / says：${quote}\n\n我的夸夸 / My reply（${toneName(tone)}）：${reply}\n\n— ${from}`;
}

function toneName(tone) {
  return tone === "warm"
    ? "温柔夸夸 / Warm"
    : tone === "funny"
      ? "沙雕搞笑 / Funny"
      : "霸总宠妈 / Bossy";
}

function renderCategoryOptions() {
  els.category.innerHTML = CATEGORIES.map((c) => `<option value="${c.key}">${c.name}</option>`).join("");
}

function renderCard() {
  const mom = state.motherName || "妈妈";
  const from = state.fromName || "我";

  els.footerText.textContent = `— ${from}`;
  els.counterPill.textContent = `${state.streak} 连抽`;

  if (!state.current) {
    els.tag.textContent = "—";
    els.hint.textContent = "点击“抽一句 / Pick”开始";
    return;
  }

  const { quoteIndex, replyIndex, tone } = state.current;
  const quote = QUOTES[quoteIndex]?.text ?? "（空）";
  const cat = QUOTES[quoteIndex]?.cat ?? "all";
  const catName = CATEGORIES.find((c) => c.key === cat)?.name ?? "全部";

  els.tag.textContent = `${catName} · ${mom}`;
  els.hint.textContent = `夸夸语气 / Tone：${toneName(tone)}`;
  els.quote.textContent = quote;
  els.reply.textContent = REPLIES[tone]?.[replyIndex] ?? "（空）";
}

function renderList(pane, list, { removable }) {
  if (!list.length) {
    pane.innerHTML = `<div class="item"><div class="itemText">（这里还空空的 / Empty）</div><div class="itemSub">去抽几句吧～ / Pick some!</div></div>`;
    return;
  }
  pane.innerHTML = list
    .slice(0, 20)
    .map((x, idx) => {
      const quote = QUOTES[x.quoteIndex]?.text ?? "";
      const reply = REPLIES[x.tone]?.[x.replyIndex] ?? "";
      const cat = QUOTES[x.quoteIndex]?.cat ?? "all";
      const catName = CATEGORIES.find((c) => c.key === cat)?.name ?? "全部";
      const time = new Date(x.ts).toLocaleString();
      return `
      <div class="item">
        <div class="itemTop">
          <div class="itemTag">${catName} · ${toneName(x.tone)}</div>
          ${
            removable
              ? `<button class="itemBtn" data-action="remove" data-idx="${idx}" title="删除">删除</button>`
              : `<button class="itemBtn" data-action="use" data-idx="${idx}" title="套用 / Use">套用 / Use</button>`
          }
        </div>
        <div class="itemText">${escapeHTML(quote)}</div>
        <div class="itemSub">${escapeHTML(reply)}<br/><span style="opacity:.8">${time}</span></div>
      </div>`;
    })
    .join("");
}

function escapeHTML(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderSide() {
  renderList(els.paneFav, state.favorites, { removable: true });
  renderList(els.paneHis, state.history, { removable: false });
}

function pushHistory(item) {
  state.history.unshift(item);
  state.history = state.history.slice(0, 40);
}

function isFavorited(current) {
  return state.favorites.some(
    (f) =>
      f.quoteIndex === current.quoteIndex &&
      f.replyIndex === current.replyIndex &&
      f.tone === current.tone,
  );
}

function setInputsFromState() {
  els.motherName.value = state.motherName ?? "";
  els.fromName.value = state.fromName ?? "";
  els.category.value = state.category ?? "all";
  els.tone.value = state.tone ?? "warm";
}

function readInputsToState() {
  state.motherName = (els.motherName.value || "妈妈").trim();
  state.fromName = (els.fromName.value || "我").trim();
  state.category = els.category.value;
  state.tone = els.tone.value;
}

function updateShareUrl() {
  if (!state.current) return;
  const payload = {
    m: state.motherName,
    f: state.fromName,
    c: state.category,
    t: state.current.tone,
    q: state.current.quoteIndex,
    r: state.current.replyIndex,
  };
  const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const url = new URL(window.location.href);
  url.searchParams.set("s", b64);
  window.history.replaceState({}, "", url.toString());
}

function tryLoadFromUrl() {
  const url = new URL(window.location.href);
  const s = url.searchParams.get("s");
  if (!s) return;
  try {
    const payload = safeParseJSON(decodeURIComponent(escape(atob(s))), null);
    if (!payload) return;
    state.motherName = payload.m || state.motherName;
    state.fromName = payload.f || state.fromName;
    state.category = payload.c || state.category;
    state.tone = payload.t || state.tone;
    const q = clamp(Number(payload.q), 0, QUOTES.length - 1);
    const rr = clamp(Number(payload.r), 0, (REPLIES[state.tone] || []).length - 1);
    state.current = { quoteIndex: q, replyIndex: rr, tone: payload.t || state.tone };
  } catch {
    // ignore
  }
}

function pickQuote() {
  readInputsToState();
  const indices = getFilteredQuoteIndices(state.category);
  const quoteIndex = indices[pickRandomIndex(indices)];
  const tone = state.tone;
  const replyIndex = pickRandomIndex(REPLIES[tone]);
  state.current = { quoteIndex, replyIndex, tone };
  state.streak += 1;

  const item = { quoteIndex, replyIndex, tone, ts: Date.now() };
  pushHistory(item);

  if (state.streak === 10) {
    showEaster();
  }
}

function regenReply() {
  if (!state.current) {
    pickQuote();
    return;
  }
  readInputsToState();
  const tone = state.tone;
  const replyIndex = pickRandomIndex(REPLIES[tone]);
  state.current = { ...state.current, tone, replyIndex };
  pushHistory({ quoteIndex: state.current.quoteIndex, replyIndex, tone, ts: Date.now() });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("已复制 / Copied");
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("已复制 / Copied");
  }
}

let toastTimer = null;
function toast(msg) {
  clearTimeout(toastTimer);
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.position = "fixed";
  el.style.left = "50%";
  el.style.bottom = "18px";
  el.style.transform = "translateX(-50%)";
  el.style.padding = "10px 12px";
  el.style.borderRadius = "12px";
  el.style.background = "rgba(20,20,40,.82)";
  el.style.color = "white";
  el.style.fontWeight = "800";
  el.style.zIndex = "9999";
  document.body.appendChild(el);
  toastTimer = setTimeout(() => el.remove(), 1200);
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 999) {
  const words = String(text).split("");
  let line = "";
  let lines = 0;
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i];
      y += lineHeight;
      lines += 1;
      if (lines >= maxLines) return y;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  return y + lineHeight;
}

function makePosterData({ mode }) {
  readInputsToState();
  const mom = state.motherName || "妈妈";
  const from = state.fromName || "我";

  if (mode === "easter") {
    const title = "最强妈妈奖";
    const content = `授予 / Awarded to：${mom}\n理由 / Reason：全年无休的爱与操心，冠军级的温柔与强大。`;
    const footer = `— ${from}`;
    return {
      title: "最强妈妈奖 / Best Mom Award",
      quote: content,
      reply: "母亲节快乐！谢谢你一直在。/ Happy Mother's Day. Thank you for being there.",
      footer,
      tag: "彩蛋奖状 / Easter Egg",
    };
  }

  if (!state.current) pickQuote();
  const { quoteIndex, replyIndex, tone } = state.current;
  const cat = QUOTES[quoteIndex]?.cat ?? "all";
  const catName = CATEGORIES.find((c) => c.key === cat)?.name ?? "全部";

  return {
    title: `母亲节快乐，${mom}`,
    quote: `“${QUOTES[quoteIndex]?.text ?? ""}”`,
    reply: `我的夸夸 / My reply（${toneName(tone)}）：${REPLIES[tone]?.[replyIndex] ?? ""}`,
    footer: `— ${from}`,
    tag: `${catName} · ${toneName(tone)}`,
  };
}

function renderPosterToDataURL(posterData) {
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  // background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#ffd6e5");
  bg.addColorStop(0.55, "#fff2c0");
  bg.addColorStop(1, "#cfefff");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // soft blobs
  ctx.globalAlpha = 0.26;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(260, 230, 320, 240, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(860, 220, 260, 210, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // card
  const pad = 86;
  const cardX = pad;
  const cardY = 250;
  const cardW = W - pad * 2;
  const cardH = 860;

  ctx.save();
  ctx.shadowColor = "rgba(20,20,40,0.22)";
  ctx.shadowBlur = 38;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  roundRect(ctx, cardX, cardY, cardW, cardH, 30);
  ctx.fill();
  ctx.restore();

  // top tag
  ctx.fillStyle = "rgba(31,34,48,0.08)";
  roundRect(ctx, cardX + 34, cardY + 34, 380, 56, 28);
  ctx.fill();
  ctx.fillStyle = "rgba(31,34,48,0.84)";
  ctx.font = "700 26px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, PingFang SC";
  ctx.fillText(posterData.tag, cardX + 56, cardY + 72);

  // title
  ctx.fillStyle = "#1f2230";
  ctx.font = "900 56px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, PingFang SC";
  wrapText(ctx, posterData.title, cardX + 42, cardY + 150, cardW - 84, 66, 2);

  // quote
  ctx.fillStyle = "rgba(31,34,48,0.92)";
  ctx.font = "900 52px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, PingFang SC";
  let y = wrapText(ctx, posterData.quote, cardX + 42, cardY + 300, cardW - 84, 64, 5);

  // divider
  y += 16;
  ctx.fillStyle = "rgba(31,34,48,0.12)";
  ctx.fillRect(cardX + 42, y, cardW - 84, 2);
  y += 46;

  // reply
  ctx.fillStyle = "rgba(31,34,48,0.72)";
  ctx.font = "800 28px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, PingFang SC";
  ctx.fillText("你的夸夸 / Your reply:", cardX + 42, y);
  y += 46;
  ctx.fillStyle = "rgba(31,34,48,0.86)";
  ctx.font = "800 34px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, PingFang SC";
  y = wrapText(ctx, posterData.reply, cardX + 42, y, cardW - 84, 48, 6);

  // footer
  ctx.fillStyle = "rgba(31,34,48,0.62)";
  ctx.font = "800 28px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, PingFang SC";
  ctx.fillText(posterData.footer, cardX + 42, cardY + cardH - 52);

  // bottom small
  ctx.fillStyle = "rgba(31,34,48,0.62)";
  ctx.font = "700 26px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, PingFang SC";
  ctx.fillText("Made with TRAE · 送给每一位妈妈 / For every mom", pad, H - 70);

  return canvas.toDataURL("image/png");
}

function showPosterDialog(dataUrl) {
  els.posterImg.src = dataUrl;
  els.btnDownloadPoster.href = dataUrl;
  if (typeof els.posterDialog.showModal === "function") els.posterDialog.showModal();
  else els.posterDialog.setAttribute("open", "open");
}

function closeDialog(dlg) {
  if (typeof dlg.close === "function") dlg.close();
  else dlg.removeAttribute("open");
}

function showEaster() {
  const mom = state.motherName || "妈妈";
  els.easterText.textContent = `授予：${mom}`;
  if (typeof els.easterDialog.showModal === "function") els.easterDialog.showModal();
  else els.easterDialog.setAttribute("open", "open");
}

function bindTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const paneMap = { fav: els.paneFav, his: els.paneHis };
  tabs.forEach((t) =>
    t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      const key = t.dataset.tab;
      Object.entries(paneMap).forEach(([k, pane]) => pane.classList.toggle("hidden", k !== key));
    }),
  );
}

function bindLists() {
  els.paneFav.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    if (Number.isNaN(idx)) return;
    if (btn.dataset.action === "remove") {
      state.favorites.splice(idx, 1);
      saveLocal();
      renderSide();
      toast("已删除收藏 / Removed");
    }
  });

  els.paneHis.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    if (Number.isNaN(idx)) return;
    if (btn.dataset.action === "use") {
      const item = state.history[idx];
      if (!item) return;
      state.current = { quoteIndex: item.quoteIndex, replyIndex: item.replyIndex, tone: item.tone };
      state.tone = item.tone;
      setInputsFromState();
      renderCard();
      updateShareUrl();
      saveLocal();
      toast("已套用到卡片 / Applied");
    }
  });
}

function bindActions() {
  els.btnPick.addEventListener("click", () => {
    pickQuote();
    renderCard();
    renderSide();
    updateShareUrl();
    saveLocal();
  });

  els.btnReply.addEventListener("click", () => {
    regenReply();
    renderCard();
    renderSide();
    updateShareUrl();
    saveLocal();
  });

  els.btnFav.addEventListener("click", () => {
    if (!state.current) pickQuote();
    const curr = state.current;
    if (isFavorited(curr)) {
      toast("已收藏过啦 / Already saved");
      return;
    }
    state.favorites.unshift({ ...curr, ts: Date.now() });
    state.favorites = state.favorites.slice(0, 30);
    saveLocal();
    renderSide();
    toast("已收藏 / Saved");
  });

  els.btnCopy.addEventListener("click", async () => {
    if (!state.current) pickQuote();
    const text = formatCardText(state.current);
    await copyText(text);
  });

  els.btnLink.addEventListener("click", async () => {
    if (!state.current) pickQuote();
    updateShareUrl();
    await copyText(window.location.href);
  });

  els.btnPoster.addEventListener("click", () => {
    if (!state.current) pickQuote();
    const posterData = makePosterData({ mode: "normal" });
    const url = renderPosterToDataURL(posterData);
    showPosterDialog(url);
    saveLocal();
  });

  els.btnCopyPosterText.addEventListener("click", async () => {
    if (!state.current) pickQuote();
    const text = formatCardText(state.current);
    await copyText(text);
  });

  els.btnCloseDialog.addEventListener("click", () => closeDialog(els.posterDialog));
  els.btnCloseEaster.addEventListener("click", () => closeDialog(els.easterDialog));

  els.btnEasterPoster.addEventListener("click", () => {
    const posterData = makePosterData({ mode: "easter" });
    const url = renderPosterToDataURL(posterData);
    closeDialog(els.easterDialog);
    showPosterDialog(url);
  });

  els.btnReset.addEventListener("click", () => {
    const ok = confirm("确定要清空本地收藏/历史/设置吗？\nReset saved/history/settings?");
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = window.location.pathname;
  });

  // persist inputs
  ["input", "change"].forEach((evt) => {
    els.motherName.addEventListener(evt, () => {
      readInputsToState();
      saveLocal();
      renderCard();
    });
    els.fromName.addEventListener(evt, () => {
      readInputsToState();
      saveLocal();
      renderCard();
    });
    els.category.addEventListener(evt, () => {
      readInputsToState();
      saveLocal();
    });
    els.tone.addEventListener(evt, () => {
      readInputsToState();
      saveLocal();
      if (state.current) {
        // change tone should update reply
        regenReply();
        renderCard();
        renderSide();
        updateShareUrl();
        saveLocal();
      }
    });
  });
}

function init() {
  renderCategoryOptions();
  loadLocal();
  tryLoadFromUrl();
  setInputsFromState();
  renderCard();
  renderSide();
  bindTabs();
  bindLists();
  bindActions();
  saveLocal();
}

init();
