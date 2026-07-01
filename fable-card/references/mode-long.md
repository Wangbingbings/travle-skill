# 模具：长图（-l / 默认）

## 步骤 1：读取模板

Read `assets/long_template.html`

## 步骤 2：内容预处理

- 识别标题行（`#`/`##`/`###` 开头，或独立短行）
- 识别引用块（`>` 开头）
- 识别加粗（`**text**`）
- **识别金句**：独立成段的短句（通常 < 25 字），承载核心洞察，用 `.highlight` 渲染
- 按空行分割为段落列表
- **不做切分**：所有内容放在一张卡内

## 步骤 2.5：色调感知

根据内容气质选择一组背景底色 + 强调色，让每张卡片和内容产生共振：

| 内容气质 | `{{BG_COLOR}}` | `{{ACCENT_COLOR}}` | 触发信号 |
|----------|---------------|-------------------|----------|
| 思辨/哲学 | `#FAF8F4` | `#7C6853` | 认知、思维、本质、意义、哲学 |
| 技术/工程 | `#F5F7FA` | `#3D5A80` | 架构、模型、算法、系统、代码 |
| 文学/叙事 | `#FBF9F1` | `#6B4E3D` | 故事、人物、写作、文字、诗 |
| 科学/研究 | `#F4F8F6` | `#2D6A4F` | 实验、数据、发现、论文、研究 |
| 默认 | `#FAFAF8` | `#4A4A4A` | 无法归类时 |

判断依据：扫描内容中的高频关键词和主题，匹配最贴近的一组。不需要精确——宁可用默认也不要错配。

## 步骤 3：格式化为 HTML

**基础元素：**
- 普通段落 → `<p>文本</p>`
- 章节标题（##/### 级别） → `<h2>标题</h2>`
- 引用 → `<blockquote><p>引用</p></blockquote>`
- 加粗 → `<strong>文本</strong>`
- 列表 → `<ul><li>...</li></ul>`

**路线速查专用（检测到路线结构时自动启用）：**

当内容包含多条路线（`## 路线` + `### 区域` + `📍` 列表项）时，使用路线速查布局：

```html
<div class="route-section">
  <div class="route-header">
    <h2>{路线名}</h2>
    <span class="route-time">{总时长}</span>
  </div>
  <div class="zone">
    <p class="zone-name">{区域名}</p>
    <div class="stop">
      <span class="stop-icon">📍</span>
      <div class="stop-body">
        <p class="stop-name">{地点名} <span class="stop-time">{停留时间}</span></p>
        <p class="stop-detail">{一句话看点}</p>
      </div>
    </div>
    <!-- 探店用 🍜 图标 -->
    <div class="stop">
      <span class="stop-icon">🍜</span>
      <div class="stop-body">
        <p class="stop-name">{店名} <span class="stop-time">{人均}</span></p>
        <p class="stop-detail">{推荐菜}</p>
      </div>
    </div>
  </div>
  <div class="transport-block">
    <strong>🚇 交通</strong>：{交通信息}
  </div>
</div>
```

检测规则：`##` 标题含"路线"，且下方有 `📍` 或 `🍜` 开头的列表项。

**旅行速查专用（检测到 Day 级行程时自动启用）：**

当内容包含 `## Day N` 格式的日程（N 为数字，如 `## Day 1 · 老城漫步`），使用 Day 级行程速查布局。此格式由 fable-travel 技能产生，按天组织、精确到时段。

检测规则：内容第一行为 `# {城市名}路线速查`，且包含 `## Day N` 标题。

**HTML 结构：**

```html
<!-- 顶部出发信息 -->
<div class="trip-info">
  <span class="trip-info-item">出发：{起点}</span>
  <span class="trip-info-sep">｜</span>
  <span class="trip-info-item">{日期范围}</span>
  <span class="trip-info-sep">｜</span>
  <span class="trip-info-item">{天气/人流量}</span>
</div>

<!-- Day 1 -->
<div class="day-block">
  <div class="day-header">
    <span class="day-num">Day N</span>
    <span class="day-title">{主题名}</span>
  </div>

  <!-- 上午/下午 -->
  <div class="period-block">
    <div class="period-header">
      <span class="period-icon">🌤️</span>
      <span class="period-name">{时段名}</span>
      <span class="period-duration">约{N}h | 全程步行</span>
    </div>

    <!-- 必去地点 -->
    <div class="trip-stop">
      <span class="trip-stop-pin">📍</span>
      <div class="trip-stop-body">
        <div class="trip-stop-head">
          <strong class="trip-stop-name">{地点名}</strong>
          <span class="trip-stop-time">{时间段}</span>
          <span class="trip-stop-priority priority-must">🔶必去</span>
        </div>
        <p class="trip-stop-action">{操作式看点}</p>
        <p class="trip-stop-transit">▶ 从前一个点沿{XX路}向{XX方向}步行{N}min（经过{地标}）</p>
      </div>
    </div>

    <!-- 可选地点 -->
    <div class="trip-stop">
      <span class="trip-stop-pin">📍</span>
      <div class="trip-stop-body">
        <div class="trip-stop-head">
          <strong class="trip-stop-name">{地点名}</strong>
          <span class="trip-stop-time">{时间段}</span>
          <span class="trip-stop-priority priority-optional">⚪可选</span>
        </div>
        <p class="trip-stop-action">{看点}</p>
        <p class="trip-stop-transit">▶ 沿{XX路}向{XX方向}步行{N}min</p>
      </div>
    </div>

    <!-- 歇脚咖啡 -->
    <div class="trip-stop">
      <span class="trip-stop-pin">🍜</span>
      <div class="trip-stop-body">
        <div class="trip-stop-head">
          <strong class="trip-stop-name">{店名}</strong>
          <span class="trip-stop-time">{时间段}</span>
          <span class="trip-stop-priority priority-rest">🔶歇脚必去</span>
        </div>
        <p class="trip-stop-action">{为什么值得停下来}</p>
        <p class="trip-stop-transit">▶ 沿{XX路}向{XX方向}步行{N}min</p>
      </div>
    </div>
  </div>

  <!-- 晚上 -->
  <div class="period-block">
    <div class="period-header">
      <span class="period-icon">🌙</span>
      <span class="period-name">晚上 · {子主题}</span>
      <span class="period-duration">约{N}h</span>
    </div>

    <!-- 交通接驳 -->
    <div class="trip-stop">
      <span class="trip-stop-pin">🚇</span>
      <div class="trip-stop-body">
        <div class="trip-stop-head">
          <strong class="trip-stop-name">交通换乘</strong>
        </div>
        <p class="trip-stop-transit">▶ {地铁站}→{N}号线→换乘{XX}号线→{目的地站}（约{XX}min）</p>
      </div>
    </div>

    <!-- 夜市/商圈 -->
    <div class="trip-stop">
      <span class="trip-stop-pin">📍</span>
      <div class="trip-stop-body">
        <div class="trip-stop-head">
          <strong class="trip-stop-name">{夜市/商圈}</strong>
          <span class="trip-stop-priority priority-must">🔶必去</span>
        </div>
        <p class="trip-stop-action">{看点}</p>
      </div>
    </div>
  </div>

  <!-- 正餐推荐 -->
  <div class="meal-rec">
    <span class="meal-rec-icon">🍜</span>
    <span class="meal-rec-text">午餐/晚餐推荐：{店名} | 推荐菜 | 人均¥{XX}</span>
  </div>
</div>
```

**优先级标签对照：**

| 输入标签 | CSS 类 |
|---------|--------|
| 🔶必去 | `priority-must` |
| ⚪可选 | `priority-optional` |
| 🔶歇脚必去 | `priority-rest` |
| 🍺特色推荐 | `priority-special` |

**渲染要求：**
- 保持时间槽在反引号中的样式（如 `09:00-10:30`），用 `.trip-stop-time` 渲染
- 避坑信息 ⚠️ 放在 `.trip-stop-action` 末尾，用 `.trip-stop-warning` 包裹
- 交通指引 ▶ 后面的内容用 `.trip-stop-transit` 渲染
- 如果某段没有地点（如没有晚上活动），整个 period-block 不生成

**金句（独立成段的核心洞察短句，视觉突出）：**
```html
<p class="highlight">金句文本</p>
```
判断标准：独立成段、< 25 字、承载关键洞察。用 `.highlight` 而非 `<p><strong>`。

**重点提示（绿底高亮，用于关键问句/提示）：**
```html
<p class="prompt">重点提示文本</p>
```
判断标准：需要让读者停下来、用力看的"提示性"内容。典型场景：
- Q&A 中的 **Question**（Answer 用普通段落）
- 关键追问（"那为什么 X 不是 Y？"）
- 阅读引导提示（"读到这里，请先停下想一想"）
- 召唤行动的指令句

视觉上以**淡绿底色 + 深绿左边线**呈现，与 `.highlight`（左边线+大字号）形成区分：
- `.highlight` = 作者下的金句结论
- `.prompt` = 抛给读者的问题/提示

一张卡内 `.prompt` 不超过 5 处，避免高亮泛滥。

**首字下沉（第一个正文段落）：**
第一个普通段落（非 `.subtitle`、`.highlight`、`.item`）添加 `dropcap` 类：
```html
<p class="dropcap">段落正文...</p>
```
仅首个正文段落使用，营造经典编辑排版的开篇仪式感。

**条目组（有标题+正文的并列条目）：**
```html
<div class="item">
  <p class="label">条目标题</p>
  <p>条目正文</p>
</div>
```

**副标题标签：**
```html
<p class="subtitle">标签文字</p>
```

**分割线（章节之间）：**
```html
<div class="divider"></div>
```

## 步骤 4：渲染模板

替换模板变量：

| 变量 | 规则 |
|------|------|
| `{{BG_COLOR}}` | 步骤 2.5 确定的背景底色 |
| `{{ACCENT_COLOR}}` | 步骤 2.5 确定的强调色 |
| `{{TITLE_BLOCK}}` | 有标题时：`<div class="title-area"><h1>标题</h1></div>`；无标题时：空字符串 |
| `{{BODY_HTML}}` | 步骤 3 生成的全部 HTML |
| `{{SOURCE_LINE}}` | 内容来源（可选）：`<span class="info-source">来源文字</span>`，无来源时空字符串 |

写入：`/tmp/fable_cast_long_{name}.html`

## 步骤 5：截图

```bash
node assets/capture.js /tmp/fable_cast_long_{name}.html ~/Downloads/{name}.png 1080 800 fullpage
```
