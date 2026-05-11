# 妈妈语录 · 夸夸生成器（Mother’s Day Edition）

一个零素材、零依赖的母亲节小网页：随机生成“妈妈经典语录” + 你的“夸夸回应”，并支持一键导出可分享的海报 PNG。  
（支持**中/英一键切换**：界面、语录、夸夸、海报都会随语言切换。）

## 功能

- 语录抽卡：按分类随机抽取（关心/养生/省钱/催婚/学习工作/生活唠叨）
- 夸夸生成：三种语气（温柔夸夸 / 沙雕搞笑 / 霸总宠妈）
- 收藏 & 历史：本地保存（LocalStorage）
- 复制文案：一键复制整段文案
- 分享链接：把当前卡片状态编码进 URL（朋友打开即可看到同一张卡）
- 海报导出：Canvas 生成 1080×1350 PNG（适合朋友圈/群聊分享）
- 彩蛋：连续抽卡 10 次解锁“最强妈妈奖”奖状

## English

A zero-asset, zero-dependency Mother’s Day web gift: generate classic mom quotes + your sweet replies, export a shareable PNG poster.  
One-click language switch (ZH/EN) for UI, quotes, replies, and posters.

## 运行方式（本地）

这是纯静态项目，任意方式打开都行：

### 方式 1：直接双击
直接打开 `index.html` 即可（某些浏览器对剪贴板权限限制较严格，建议用方式 2）。

### 方式 2：起一个本地静态服务器（推荐）

如果你有 Node.js：

```bash
npx serve .
```

或用 Python：

```bash
python3 -m http.server 5173
```

然后浏览器打开提示的地址即可。

## Demo 视频脚本（30–45 秒）

1. 打开页面：选择“养生类”→点【抽一句】
2. 切换“反击语气：沙雕搞笑”→点【生成反击】
3. 输入“妈妈昵称：女王大人”→卡片自动更新
4. 点【生成海报】→展示预览并下载 PNG
5. 打开右侧【收藏】→展示已收藏的 2–3 条

## 投稿用描述（可直接用）

> 我用 TRAE 做了一个母亲节小网页：随机生成“妈妈经典语录”和我的“夸夸反击”，还能把卡片一键生成可分享海报。没有用任何现成素材，全部用文字、配色和排版做出成品感，并支持分类抽取、收藏和本地保存。

（建议用“夸夸回应 / sweet reply”更温柔～）

## Submission blurb (EN)

> Built with TRAE: a Mother’s Day mini web app that generates “classic mom quotes” and my sweet replies. It supports category-based picking, local saved/history, shareable links, and one-click poster export (PNG) — no pre-made assets used.

## 推送到 GitHub（你还没有仓库的情况）

1) 先在 GitHub 新建一个空仓库（不要勾选 README/License，保持空仓库）

2) 在本地项目目录执行（把 `<YOUR_REPO_URL>` 换成你的仓库地址）：

```bash
git init
git add .
git commit -m "feat: mother's day quote & clapback generator"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

3) （可选）开启 GitHub Pages

- Settings → Pages
- Source 选择 `Deploy from a branch`
- Branch 选择 `main / (root)`

等待片刻即可得到一个可分享的在线链接（项目链接）。
