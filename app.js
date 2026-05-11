/* eslint-disable no-alert */
/**
 * 妈妈语录 · 夸夸生成器
 * - 零依赖，静态网页即可运行
 * - 本地存储：收藏、历史、设置
 * - 可生成分享链接（URL 参数）与导出 PNG 海报
 */

const STORAGE_KEY = "mom-quotes-v2";

const I18N = {
  zh: {
    badge: "Mother’s Day Edition",
    title: "妈妈语录 · 夸夸生成器",
    subtitle: "抽一句“妈妈经典语录”，再生成你的温柔/沙雕/霸总式夸夸回应。还能一键导出海报。",
    motherLabel: "妈妈昵称",
    motherPh: "例如：女王大人",
    fromLabel: "你的署名",
    fromPh: "例如：小孩",
    categoryLabel: "语录分类",
    toneLabel: "夸夸语气",
    toneWarm: "温柔夸夸",
    toneFunny: "沙雕搞笑",
    toneBoss: "霸总宠妈",
    btnPick: "抽一句",
    btnReply: "生成夸夸",
    btnFav: "收藏",
    btnCopy: "复制文案",
    btnLink: "复制分享链接",
    btnPoster: "生成海报",
    hint: "点击“抽一句”开始",
    replyLabel: "你的夸夸：",
    tabFav: "收藏",
    tabHis: "历史",
    footer: "Built with TRAE · 送给每一位妈妈",
    btnReset: "重置本地数据",
    posterReady: "海报已生成",
    btnDownloadPoster: "下载 PNG",
    btnCopyPosterText: "复制海报文案",
    posterHint: "提示：手机端若无法直接下载，可长按图片保存。",
    easterTitle: "彩蛋：母亲节奖状",
    easterAward: "🏅 最强妈妈奖 🏅",
    easterReason: "理由：全年无休的爱与操心，冠军级的温柔与强大。",
    btnEasterPoster: "把奖状也做成海报",
    empty: "（这里还空空的）",
    emptySub: "去抽几句吧～",
    remove: "删除",
    use: "套用",
    copied: "已复制",
    removed: "已删除收藏",
    applied: "已套用到卡片",
    alreadySaved: "已收藏过啦",
    saved: "已收藏",
    confirmReset: "确定要清空本地收藏/历史/设置吗？",
    says: "说：",
    myReply: "我的夸夸",
    yourReply: "你的夸夸：",
    posterBottom: "Made with TRAE · 送给每一位妈妈",
    shareCopied: "链接已复制",
    toastOK: "好的",
  },
  en: {
    badge: "Mother’s Day Edition",
    title: "Mom Quotes Generator",
    subtitle: "Pick a classic mom quote, generate your sweet reply, and export a shareable poster.",
    motherLabel: "Mom’s name",
    motherPh: "e.g. Queen Mom",
    fromLabel: "From",
    fromPh: "e.g. Me",
    categoryLabel: "Category",
    toneLabel: "Tone",
    toneWarm: "Warm",
    toneFunny: "Funny",
    toneBoss: "Bossy",
    btnPick: "Pick",
    btnReply: "Generate",
    btnFav: "Save",
    btnCopy: "Copy text",
    btnLink: "Copy link",
    btnPoster: "Poster",
    hint: 'Click "Pick" to start',
    replyLabel: "Your reply:",
    tabFav: "Saved",
    tabHis: "History",
    footer: "Built with TRAE · For every mom",
    btnReset: "Reset",
    posterReady: "Poster ready",
    btnDownloadPoster: "Download PNG",
    btnCopyPosterText: "Copy poster text",
    posterHint: "Tip: on mobile, long-press the image to save.",
    easterTitle: "Easter Egg: Best Mom Award",
    easterAward: "🏅 Best Mom Award 🏅",
    easterReason: "Reason: endless love & care, champion-level strength.",
    btnEasterPoster: "Make poster",
    empty: "(Empty)",
    emptySub: "Pick some!",
    remove: "Remove",
    use: "Use",
    copied: "Copied",
    removed: "Removed",
    applied: "Applied",
    alreadySaved: "Already saved",
    saved: "Saved",
    confirmReset: "Reset saved/history/settings?",
    says: "says:",
    myReply: "My reply",
    yourReply: "Your reply:",
    posterBottom: "Made with TRAE · For every mom",
    shareCopied: "Link copied",
    toastOK: "OK",
  },
};

const CATEGORIES = [
  { key: "all", zh: "全部", en: "All" },
  { key: "care", zh: "关心", en: "Care" },
  { key: "health", zh: "养生", en: "Health" },
  { key: "money", zh: "省钱", en: "Money" },
  { key: "love", zh: "催婚", en: "Love" },
  { key: "work", zh: "学习/工作", en: "Work" },
  { key: "life", zh: "生活唠叨", en: "Life" },
];

const QUOTES = [
  // 关心
  { cat: "care", zh: "到家了吗？到了给我发个消息。", en: "Are you home yet? Text me when you arrive." },
  { cat: "care", zh: "别熬夜了，明天还要上班呢。", en: "Stop staying up late. You have work tomorrow." },
  { cat: "care", zh: "外面冷，多穿点，别逞强。", en: "It’s cold outside—dress warmly, don’t push it." },
  { cat: "care", zh: "吃饭了没？不吃饭胃受不了。", en: "Have you eaten? Your stomach can’t handle skipping meals." },
  { cat: "care", zh: "你声音怎么怪怪的，是不是感冒了？", en: "Your voice sounds off—are you getting a cold?" },
  // 养生
  { cat: "health", zh: "奶茶少喝点，都是糖。", en: "Less milk tea—it's basically sugar." },
  { cat: "health", zh: "你这作息再这样，迟早要去医院报道。", en: "Keep this schedule and you’ll be checking in at the hospital." },
  { cat: "health", zh: "少吃外卖，油太大了。", en: "Eat less takeout—it’s too oily." },
  { cat: "health", zh: "泡脚了吗？人要把自己照顾好。", en: "Did you soak your feet? Take good care of yourself." },
  { cat: "health", zh: "水果记得吃，别老吃零食。", en: "Have some fruit, not just snacks." },
  // 省钱
  { cat: "money", zh: "这东西家里不是有吗？买它干啥？", en: "Don’t we already have this at home? Why buy it?" },
  { cat: "money", zh: "钱要花在刀刃上，别乱买。", en: "Spend money wisely—don’t buy things randomly." },
  { cat: "money", zh: "双十一别冲动，先问问自己需不需要。", en: "Don’t impulse-buy. Ask yourself if you really need it." },
  { cat: "money", zh: "你赚的钱也不是大风刮来的。", en: "Money doesn’t grow on trees, you know." },
  { cat: "money", zh: "这个可以便宜点买，别急。", en: "You can get it cheaper—no rush." },
  // 催婚
  { cat: "love", zh: "你到底什么时候带个人回来给我看看？", en: "So… when are you bringing someone home?" },
  { cat: "love", zh: "你不着急，我都替你着急。", en: "You’re not worried, but I’m worried for you." },
  { cat: "love", zh: "谈恋爱别怕麻烦，合适最重要。", en: "Don’t fear relationships—being right matters most." },
  { cat: "love", zh: "你同学孩子都会打酱油了（开玩笑的）", en: "Your classmates already have kids… (just kidding)" },
  { cat: "love", zh: "别光工作，生活也要有个伴。", en: "Don’t just work—life deserves a companion too." },
  // 学习/工作
  { cat: "work", zh: "工作再忙也要吃饭，别把身体熬坏了。", en: "Even if you’re busy, eat. Don’t wreck your health." },
  { cat: "work", zh: "遇到困难别硬扛，记得和我说。", en: "Don’t carry it all alone—talk to me." },
  { cat: "work", zh: "别总说自己不行，你明明很厉害。", en: "Stop saying you can’t—you’re actually amazing." },
  { cat: "work", zh: "老板的话听一半就行，别委屈自己。", en: "Take your boss’s words with a grain of salt—don’t wrong yourself." },
  { cat: "work", zh: "慢慢来，不要急，路都是一步一步走出来的。", en: "Take it slow. The path is built step by step." },
  // 生活唠叨
  { cat: "life", zh: "房间要收拾，乱久了心也乱。", en: "Tidy your room—messy space, messy mind." },
  { cat: "life", zh: "出门记得带钥匙！", en: "Don’t forget your keys!" },
  { cat: "life", zh: "洗衣机里衣服别闷着，会有味道。", en: "Don’t leave clothes in the washer—they’ll smell." },
  { cat: "life", zh: "手机别老玩，眼睛会疼。", en: "Stop staring at your phone—your eyes will hurt." },
  { cat: "life", zh: "你看你又忘记带伞了吧。", en: "See? You forgot your umbrella again." },
];

const REPLIES = {
  warm: [
    { zh: "收到～我会好好照顾自己，因为我也想一直照顾你。", en: "Got it. I’ll take good care of myself—so I can take care of you too." },
    { zh: "你放心，我听话。你别太操心，我爱你。", en: "Don’t worry, I’ll listen. Please don’t stress—I love you." },
    { zh: "好嘞妈妈，我已经在努力把日子过得更好啦。", en: "Yes, Mom. I’m working hard to make life better." },
    { zh: "你说的我都记着呢。谢谢你一直把我放在第一位。", en: "I remember everything you said. Thank you for always putting me first." },
    { zh: "今天也想对你说：辛苦啦，你永远是我的底气。", en: "Just want to say: thank you for your hard work—you’re my strength." },
    { zh: "我会按时吃饭、按时睡觉，也会按时想你。", en: "I’ll eat and sleep on time—and think of you on time too." },
    { zh: "我知道你唠叨是因为爱，我也用我的方式爱你。", en: "I know your nagging is love—and I love you in my own way too." },
  ],
  funny: [
    { zh: "好的母后！臣这就去吃饭/穿秋裤/早睡，立刻执行！", en: "Yes, Your Majesty! I’ll eat/wear leggings/sleep early—right away!" },
    { zh: "收到！我现在的状态：听话程度 +1，健康值 +10。", en: "Received! Status: Obedience +1, Health +10." },
    { zh: "你说得对，我马上把自己当成你的宝贝来养。", en: "You’re right. I’ll take care of myself like your precious treasure." },
    { zh: "行！我决定把‘不熬夜’加入我的人生 KPI。", en: "Deal! ‘No late nights’ is now my life KPI." },
    { zh: "别担心，我已经把你的话设成了脑内循环播放。", en: "Don’t worry—I set your words on auto-repeat in my brain." },
    { zh: "我知道啦～你是关心界的天花板，我是被爱界的学霸。", en: "I know! You’re the ceiling of caring, and I’m the top student of being loved." },
    { zh: "我会乖的，但也会偷偷更爱你一点点。", en: "I’ll be good—but I’ll secretly love you a bit more too." },
  ],
  boss: [
    { zh: "这事我来安排。你只负责开开心心，其他交给我。", en: "I’ll handle it. You just stay happy—leave the rest to me." },
    { zh: "你放心，我不允许你为我担心太久。", en: "Relax. I won’t allow you to worry for too long." },
    { zh: "从今天起，你的快乐优先级排第一。", en: "From today on, your happiness is top priority." },
    { zh: "你已经很辛苦了。现在换我来当你的靠山。", en: "You’ve worked so hard. Now let me be your support." },
    { zh: "我会把自己照顾好，因为你值得一个安心的我。", en: "I’ll take good care of myself—because you deserve peace of mind." },
    { zh: "你把我养大，我把你宠回小孩。", en: "You raised me up—now I’ll spoil you back into a kid." },
    { zh: "我会越来越强大，让你越来越轻松。", en: "I’ll grow stronger, so you can live easier." },
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
  langToggle: $("langToggle"),
};

const state = {
  lang: "zh",
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
      lang: state.lang,
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

function tr(key) {
  const lang = state.lang === "en" ? "en" : "zh";
  return I18N[lang][key] ?? I18N.zh[key] ?? key;
}

function quoteText(q) {
  const lang = state.lang === "en" ? "en" : "zh";
  return lang === "en" ? q.en : q.zh;
}

function replyText(tone, idx) {
  const lang = state.lang === "en" ? "en" : "zh";
  const item = REPLIES[tone]?.[idx];
  if (!item) return "";
  return lang === "en" ? item.en : item.zh;
}

function formatCardText({ quoteIndex, replyIndex, tone }) {
  const cat = QUOTES[quoteIndex]?.cat ?? "all";
  const catObj = CATEGORIES.find((c) => c.key === cat);
  const catName = state.lang === "en" ? catObj?.en : catObj?.zh;
  const quote = QUOTES[quoteIndex] ? quoteText(QUOTES[quoteIndex]) : "";
  const reply = replyText(tone, replyIndex);
  const mom = state.motherName || "妈妈";
  const from = state.fromName || "我";
  if (state.lang === "en") {
    return `[${catName}] ${mom} ${tr("says")} ${quote}\n\n${tr("myReply")} (${toneName(tone)}): ${reply}\n\n— ${from}`;
  }
  return `【${catName}】${mom}${tr("says")}${quote}\n\n${tr("myReply")}（${toneName(tone)}）：${reply}\n\n— ${from}`;
}

function toneName(tone) {
  if (state.lang === "en") {
    return tone === "warm" ? "Warm" : tone === "funny" ? "Funny" : "Bossy";
  }
  return tone === "warm" ? "温柔夸夸" : tone === "funny" ? "沙雕搞笑" : "霸总宠妈";
}

function renderCategoryOptions() {
  const lang = state.lang === "en" ? "en" : "zh";
  els.category.innerHTML = CATEGORIES.map((c) => `<option value="${c.key}">${c[lang]}</option>`).join(
    "",
  );
}

function renderToneOptions() {
  const opts = els.tone.querySelectorAll("option");
  opts.forEach((o) => {
    if (o.value === "warm") o.textContent = tr("toneWarm");
    if (o.value === "funny") o.textContent = tr("toneFunny");
    if (o.value === "boss") o.textContent = tr("toneBoss");
  });
}

function applyI18nToDOM() {
  document.documentElement.lang = state.lang === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = tr(key);
  });
  // placeholders
  els.motherName.placeholder = tr("motherPh");
  els.fromName.placeholder = tr("fromPh");
  // toggle text
  els.langToggle.textContent = state.lang === "en" ? "中文" : "EN";
  // poster download filename
  els.btnDownloadPoster.setAttribute(
    "download",
    state.lang === "en" ? "mothers-day-poster.png" : "母亲节海报.png",
  );
  renderCategoryOptions();
  renderToneOptions();
}

function renderCard() {
  const mom = state.motherName || "妈妈";
  const from = state.fromName || "我";

  els.footerText.textContent = `— ${from}`;
  els.counterPill.textContent = `${state.streak} 连抽`;

  if (!state.current) {
    els.tag.textContent = "—";
    els.hint.textContent = tr("hint");
    return;
  }

  const { quoteIndex, replyIndex, tone } = state.current;
  const quote = QUOTES[quoteIndex] ? quoteText(QUOTES[quoteIndex]) : "";
  const cat = QUOTES[quoteIndex]?.cat ?? "all";
  const catObj = CATEGORIES.find((c) => c.key === cat);
  const catName = state.lang === "en" ? catObj?.en : catObj?.zh;

  els.tag.textContent = `${catName} · ${mom}`;
  els.hint.textContent = `${tr("toneLabel")}: ${toneName(tone)}`;
  els.quote.textContent = quote;
  els.reply.textContent = replyText(tone, replyIndex) || "";
}

function renderList(pane, list, { removable }) {
  if (!list.length) {
    pane.innerHTML = `<div class="item"><div class="itemText">${escapeHTML(tr("empty"))}</div><div class="itemSub">${escapeHTML(tr("emptySub"))}</div></div>`;
    return;
  }
  pane.innerHTML = list
    .slice(0, 20)
    .map((x, idx) => {
      const quote = QUOTES[x.quoteIndex] ? quoteText(QUOTES[x.quoteIndex]) : "";
      const reply = replyText(x.tone, x.replyIndex) || "";
      const cat = QUOTES[x.quoteIndex]?.cat ?? "all";
      const catObj = CATEGORIES.find((c) => c.key === cat);
      const catName = state.lang === "en" ? catObj?.en : catObj?.zh;
      const time = new Date(x.ts).toLocaleString();
      return `
      <div class="item">
        <div class="itemTop">
          <div class="itemTag">${catName} · ${toneName(x.tone)}</div>
          ${
            removable
              ? `<button class="itemBtn" data-action="remove" data-idx="${idx}" title="${escapeHTML(
                  tr("remove"),
                )}">${escapeHTML(tr("remove"))}</button>`
              : `<button class="itemBtn" data-action="use" data-idx="${idx}" title="${escapeHTML(
                  tr("use"),
                )}">${escapeHTML(tr("use"))}</button>`
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
    l: state.lang,
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
    state.lang = payload.l === "en" ? "en" : "zh";
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
    toast(tr("copied"));
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast(tr("copied"));
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
    const title = state.lang === "en" ? "Best Mom Award" : "最强妈妈奖";
    const content =
      state.lang === "en"
        ? `Awarded to: ${mom}\nReason: endless love & care, champion-level strength.`
        : `授予：${mom}\n理由：全年无休的爱与操心，冠军级的温柔与强大。`;
    const footer = `— ${from}`;
    const reply =
      state.lang === "en"
        ? "Happy Mother’s Day. Thank you for being there."
        : "母亲节快乐！谢谢你一直在。";
    const tag = state.lang === "en" ? "Easter Egg" : "彩蛋奖状";
    return { title, quote: content, reply, footer, tag };
  }

  if (!state.current) pickQuote();
  const { quoteIndex, replyIndex, tone } = state.current;
  const cat = QUOTES[quoteIndex]?.cat ?? "all";
  const catObj = CATEGORIES.find((c) => c.key === cat);
  const catName = state.lang === "en" ? catObj?.en : catObj?.zh;

  return {
    title: state.lang === "en" ? `Happy Mother’s Day, ${mom}` : `母亲节快乐，${mom}`,
    quote: state.lang === "en" ? `"${quoteText(QUOTES[quoteIndex])}"` : `“${quoteText(QUOTES[quoteIndex])}”`,
    reply: `${tr("myReply")}（${toneName(tone)}）：${replyText(tone, replyIndex)}`,
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
  ctx.fillText(state.lang === "en" ? "Your reply:" : "你的夸夸：", cardX + 42, y);
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
  ctx.fillText(tr("posterBottom"), pad, H - 70);

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
  els.easterText.textContent = state.lang === "en" ? `Awarded to: ${mom}` : `授予：${mom}`;
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
      toast(tr("removed"));
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
      toast(tr("applied"));
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
      toast(tr("alreadySaved"));
      return;
    }
    state.favorites.unshift({ ...curr, ts: Date.now() });
    state.favorites = state.favorites.slice(0, 30);
    saveLocal();
    renderSide();
    toast(tr("saved"));
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

  els.langToggle.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "zh" : "en";
    applyI18nToDOM();
    setInputsFromState();
    renderCard();
    renderSide();
    updateShareUrl();
    saveLocal();
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
  loadLocal();
  tryLoadFromUrl();
  applyI18nToDOM();
  setInputsFromState();
  renderCard();
  renderSide();
  bindTabs();
  bindLists();
  bindActions();
  saveLocal();
}

init();
