<div align="center">

<h1>🗺️ Fable Travel</h1>

<p align="center">这个skill,让你一句话，生成一份能直接出发的旅游攻略</p>

<p>
  <img src="https://img.shields.io/badge/旅行研究-fable--travel-34A853?style=flat-square" alt="fable-travel">
  <img src="https://img.shields.io/badge/Codex%20Skill-v3.0-blue?style=flat-square" alt="Codex Skill">
  <img src="https://img.shields.io/badge/Claude%20Skill-v3.0-CC785C?style=flat-square" alt="Claude Skill">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license">
</p>

</div>

---


**恭喜你，发现了隐藏宝石**

想去一个城市：打开小红书刷 2 小时，收藏 30 篇笔记，然后忘了收藏在哪。打开点评看看餐厅评分，再去豆瓣找深度内容，去携程看酒店位置——信息散落在 6 个平台，没有一份能装进口袋的行程。

Fable Travel 就是来解决这个头疼事的。你只需输入“西安 4 天”或“洛阳周末2天”，背后的 3 个 AI 小助手便会同时忙活起来——一个专挖博物馆和考古发现，一个钻进本地人爱逛的街区和咖啡馆，一个火眼金睛地筛出真正好吃的店和有深度的好内容。接着，你就获得了清晰的旅游攻略，外加两张轻便、随手就能存图分享的 旅游卡片.png。

**整个过程你只说一句话，其余是 AI 的事。**
![alt text](合肥旅行研究_路线速查.png)
---


## 安装

```bash
# 1. 克隆主仓库
git clone https://github.com/your-username/fable-travel.git
cd fable-travel

# 2. 安装 fable-card 依赖（生成 PNG 卡片需要）
cd fable-card
npm install
npx playwright install chromium
cd ..
```

"把上面这段话复制给你的agent即安装成功"

---


## 谁需要这个

- **独立旅行者**——自己做攻略，不想跟团也不想看流水线攻略
- **周末出发的上班族**——时间有限，想高效利用每一段空闲
- **city walk 爱好者**——不满足于大众景点，想走本地人走的路线
- **文化深度游的人**——要博物馆、要考古、要看镇馆之宝，但不想牺牲好吃的

如果你出发前会做功课，这就是你的工具。

---


## 它解决了什么

| 痛点 | Fable Travel 的做法 |
|------|-------------------|
| 信息散落在 6 个平台，看完就忘 | 一个入口，三路 AI 并发搜索，结果汇入一份文档 |
| 博物馆推荐和 city walk 路线互相不认识 | 文化侧 ~70% + 潮生活 ~30%，按地理聚合而非按主题分类 |
| 列了一堆想去的地方，不知道怎么串成路线 | 自动打地理标签 → 按区域聚合 → 不走回头路 |
| 攻略纯文字，到了还得翻 | 自动生成便携 PNG 路线卡，存手机就能用 |
| 单篇攻略只讲一类内容 | 三路 Agent 并行：文物考古 × 新潮生活 × 探店深度，互不依赖 |
| 不知道从哪里开始做功课 | 自然语言输入，不需要记任何参数格式 |

---


## 怎么用

### 一句话触发

直接在 agent 对话中说：
"我要去的城市是西安，计划天数2天"


### 你会拿到什么

```text
════ 旅行研究完成 ═══════════════════════
🏙️ 城市: 西安
📝 知识文档: travel-notes/西安旅行研究_2026-07-01.md
🖼️ 城市概览卡: downloads/西安_城市概览.png
🖼️ 路线速查卡: downloads/西安_路线速查.png
📍 路线: 3 条 | 🏛️ 博物馆: 5 个 | 🍜 探店: 7 家
📎 深度内容: 3 个视频 | 2 篇文章
```



<div align="center">
  <img src="./合肥旅行研究_路线速查.png" width="640" alt="合肥旅行研究路线速查卡">
  <p><em>fable-travel 自动生成的路线速查卡 · 合肥 2 天</em></p>
</div>

---


### 输出示例

<div align="center">
  <img src="./合肥旅行研究_路线速查.png" width="640" alt="合肥旅行研究路线速查卡">
  <p><em>fable-travel 自动生成的路线速查卡 · 合肥 2 天</em></p>
</div>

---


---


## 设计理念

**不是旅行攻略，是旅行工具。**

大多数旅行内容平台解决的是"怎么去"——交通、住宿、门票。Fable Travel 解决的是"怎么玩"——一个城市的文化骨架在哪里，年轻人真正在去的街角在哪里，好吃的在不经意的巷子里。

三路 Agent 不是功能炫技，是结构性的必需品：一个城市的文化深度、日常呼吸、生活味道——这三个面向无法由单一路径覆盖。只有让它们各自独立搜索、最后合在一起，才接近一个真实的城市切片。

---


## License

MIT — 随意使用，欢迎贡献。

---


<div align="center">
  <sub>说一个城市名字，拿走一份能直接出发的旅行攻略。</sub>
</div>
