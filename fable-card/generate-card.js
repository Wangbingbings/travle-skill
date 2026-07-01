const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ========== CARD A: 城市概览信息图 ==========
function buildCardA(data) {
  return `<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; background: #0f172a; width: 1080px; min-height: 1920px; padding: 48px; color: #e2e8f0; }
.card { width: 100%; min-height: 1824px; background: linear-gradient(165deg, #0f172a 0%, #1e293b 40%, #0f172a 100%); border-radius: 32px; padding: 56px 48px; position: relative; overflow: hidden; }
.card::before { content: ''; position: absolute; top: -200px; right: -200px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%); border-radius: 50%; }
.card::after { content: ''; position: absolute; bottom: -150px; left: -150px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%); border-radius: 50%; }
.logo-row { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; position: relative; z-index: 1; }
.logo { width: 48px; height: 48px; border-radius: 12px; }
.logo-text { font-size: 14px; color: #94a3b8; letter-spacing: 2px; text-transform: uppercase; }
h1 { font-size: 56px; font-weight: 800; color: #f8fafc; line-height: 1.15; margin-bottom: 12px; position: relative; z-index: 1; }
h1 span { background: linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.tagline { font-size: 20px; color: #cbd5e1; line-height: 1.6; margin-bottom: 48px; max-width: 85%; position: relative; z-index: 1; padding: 20px 24px; background: rgba(255,255,255,0.04); border-radius: 16px; border-left: 4px solid #fbbf24; }
.stats { display: flex; gap: 16px; margin-bottom: 48px; position: relative; z-index: 1; flex-wrap: wrap; }
.stat { flex: 1; min-width: 140px; background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px 24px; text-align: center; border: 1px solid rgba(255,255,255,0.06); }
.stat-num { font-size: 36px; font-weight: 800; color: #fbbf24; }
.stat-label { font-size: 13px; color: #94a3b8; margin-top: 4px; }
h2 { font-size: 24px; font-weight: 700; color: #f1f5f9; margin-bottom: 20px; margin-top: 40px; position: relative; z-index: 1; }
h2 small { font-size: 14px; font-weight: 400; color: #64748b; margin-left: 12px; }
.route { background: rgba(255,255,255,0.04); border-radius: 20px; padding: 28px 32px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 1; }
.route-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.route-day { font-size: 12px; font-weight: 600; color: #fbbf24; background: rgba(251,191,36,0.12); padding: 4px 12px; border-radius: 20px; }
.route-title { font-size: 22px; font-weight: 700; color: #f1f5f9; }
.route-time { font-size: 14px; color: #64748b; }
.route-path { font-size: 15px; color: #94a3b8; line-height: 1.7; margin-bottom: 8px; }
.route-food { font-size: 14px; color: #fbbf24; }
.route-food strong { color: #f59e0b; }
.note { background: rgba(251,191,36,0.06); border-radius: 12px; padding: 16px 20px; font-size: 13px; color: #94a3b8; line-height: 1.6; margin-top: 12px; position: relative; z-index: 1; border: 1px solid rgba(251,191,36,0.1); }
.stops { font-size: 14px; color: #64748b; margin-top: 8px; line-height: 1.8; }
.stops span { display: inline-block; background: rgba(255,255,255,0.04); padding: 2px 10px; border-radius: 6px; margin: 2px 4px 2px 0; }
.footer { margin-top: 48px; text-align: center; font-size: 13px; color: #475569; position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 24px; }
</style></head><body>
<div class="card">
  <div class="logo-row">
    <div class="logo" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#0f172a;">F</div>
    <div class="logo-text">FABLE · TRAVEL</div>
  </div>
  <h1><span>${data.city}</span> 旅行研究</h1>
  <div class="tagline">${data.tagline}</div>
  <div class="stats">
    <div class="stat"><div class="stat-num">${data.stats.routes}</div><div class="stat-label">路线</div></div>
    <div class="stat"><div class="stat-num">${data.stats.museums}</div><div class="stat-label">博物馆</div></div>
    <div class="stat"><div class="stat-num">${data.stats.food}</div><div class="stat-label">探店</div></div>
    <div class="stat"><div class="stat-num">${data.stats.depth}</div><div class="stat-label">深度内容</div></div>
  </div>
  <h2>路线概览</h2>
  ${data.routes.map(r => `
  <div class="route">
    <div class="route-header">
      <div class="route-title">${r.name}</div>
      <div class="route-time">${r.duration}</div>
    </div>
    <div class="route-path"><strong>路线：</strong>${r.path}</div>
    <div class="route-food">🍜 ${r.food}</div>
    <div class="stops">${r.keyStops.map(s => `<span>${s}</span>`).join('')}</div>
  </div>`).join('')}
  <div class="note">💡 ${data.note}</div>
  <div class="footer">Fable Travel · ${data.date}</div>
</div></body></html>`;
}

// ========== CARD B: 路线速查长图 ==========
function buildCardB(data) {
  return `<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; background: #0f172a; width: 1080px; padding: 48px; color: #e2e8f0; }
.card { width: 100%; background: linear-gradient(165deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); border-radius: 32px; padding: 48px 40px; position: relative; overflow: hidden; }
.card::before { content: ''; position: absolute; top: -150px; right: -150px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%); border-radius: 50%; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; position: relative; z-index: 1; }
.header-left { display: flex; align-items: center; gap: 16px; }
.logo-badge { width: 40px; height: 40px; background: linear-gradient(135deg,#fbbf24,#f59e0b); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #0f172a; }
.city-name { font-size: 28px; font-weight: 700; color: #f8fafc; }
.meta { font-size: 13px; color: #64748b; text-align: right; line-height: 1.5; position: relative; z-index: 1; }
.day { margin-bottom: 36px; position: relative; z-index: 1; }
.day-header { background: linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,191,36,0.03)); border-radius: 14px; padding: 16px 20px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(251,191,36,0.1); }
.day-title { font-size: 20px; font-weight: 700; color: #fbbf24; }
.day-stats { font-size: 13px; color: #64748b; }
.item { display: flex; gap: 16px; padding: 14px 16px; margin-bottom: 4px; border-radius: 12px; transition: background 0.2s; }
.item:hover { background: rgba(255,255,255,0.03); }
.item-time { width: 80px; flex-shrink: 0; font-size: 13px; color: #64748b; font-weight: 500; padding-top: 2px; }
.item-body { flex: 1; }
.item-name { font-size: 16px; font-weight: 600; color: #f1f5f9; }
.item-name .badge { display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px; margin-left: 8px; vertical-align: middle; }
.badge-must { background: rgba(251,191,36,0.15); color: #fbbf24; }
.badge-optional { background: rgba(100,116,139,0.2); color: #94a3b8; }
.badge-rest { background: rgba(52,211,153,0.15); color: #34d399; }
.badge-drink { background: rgba(251,146,60,0.15); color: #fb923c; }
.item-desc { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-top: 4px; }
.item-transport { font-size: 13px; color: #64748b; margin-top: 4px; padding: 6px 10px; background: rgba(255,255,255,0.03); border-radius: 8px; display: inline-block; }
.section-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(251,191,36,0.15), transparent); margin: 24px 0; }
.food-section { background: rgba(255,255,255,0.03); border-radius: 14px; padding: 20px 24px; margin-top: 12px; border: 1px solid rgba(255,255,255,0.05); position: relative; z-index: 1; }
.food-title { font-size: 15px; font-weight: 600; color: #fbbf24; margin-bottom: 10px; }
.food-item { font-size: 14px; color: #94a3b8; line-height: 1.8; padding: 2px 0; }
.food-item strong { color: #e2e8f0; }
.footer { margin-top: 32px; text-align: center; font-size: 12px; color: #475569; position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
.time-icon { font-size: 14px; margin-right: 4px; }
</style></head><body>
<div class="card">
  <div class="header">
    <div class="header-left">
      <div class="logo-badge">F</div>
      <div class="city-name">${data.city}</div>
    </div>
    <div class="meta">${data.meta.startPoint}<br>${data.meta.dateRange}</div>
  </div>

  ${data.days.map(day => `
  <div class="day">
    <div class="day-header">
      <div class="day-title">${day.title}</div>
      <div class="day-stats">${day.stats}</div>
    </div>
    ${day.items.map(item => `
    <div class="item">
      <div class="item-time">${item.time}</div>
      <div class="item-body">
        <div class="item-name">
          ${item.icon} ${item.name}
          ${item.badge === '必去' ? `<span class="badge badge-must">🔶 必去</span>` : ''}
          ${item.badge === '可选' ? `<span class="badge badge-optional">⚪ 可选</span>` : ''}
          ${item.badge === '歇脚' ? `<span class="badge badge-rest">🔶 歇脚</span>` : ''}
          ${item.badge === '特色' ? `<span class="badge badge-drink">🍺 特色</span>` : ''}
        </div>
        ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ''}
        ${item.transport ? `<div class="item-transport">▶ ${item.transport}</div>` : ''}
        ${item.warning ? `<div class="item-desc" style="color:#fb923c;">⚠️ ${item.warning}</div>` : ''}
      </div>
    </div>`).join('')}
    ${day.food ? `
    <div class="food-section">
      <div class="food-title">🍜 沿途用餐</div>
      ${day.food.map(f => `<div class="food-item">${f}</div>`).join('')}
    </div>` : ''}
  </div>
  ${day !== data.days[data.days.length-1] ? '<div class="section-divider"></div>' : ''}
  `).join('')}

  <div class="footer">Fable Travel · ${data.date}</div>
</div></body></html>`;
}

async function generateCard(type, data, outputPath) {
  const html = type === 'info' ? buildCardA(data) : buildCardB(data);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: type === 'info' ? 1920 : 2400 } });
  await page.setContent(html, { waitUntil: 'networkidle' });

  const clipHeight = type === 'info' ? 1920 : Math.max(1920, await page.evaluate(() => document.querySelector('.card').scrollHeight + 96));
  await page.setViewportSize({ width: 1080, height: clipHeight });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({ path: outputPath, fullPage: true });
  await browser.close();
  console.log(`✅ 卡片已生成: ${outputPath}`);
}

// ========== MAIN ==========
const args = process.argv.slice(2);
const typeFlag = args[0]; // -i or -l

if (!typeFlag || !['-i', '-l'].includes(typeFlag)) {
  console.log('用法: node generate-card.js -i     # 城市概览信息图');
  console.log('       node generate-card.js -l     # 路线速查长图');
  console.log('       node generate-card.js -i -l  # 两者都生成');
  process.exit(0);
}

const OUTPUT_DIR = 'C:/Users/86138/OneDrive/Documents/travel-notes';

// ===== 卡片数据 =====
const cardData = {
  city: '合肥',
  tagline: '不再是那个"路过但不停"的中转站。铸客大鼎的千年重量、合柴1972的红砖穹顶、瑶海天地的泳池派对——两条腿走完文博线和潮流线，你会发现这座"大湖名城"的底牌比想象中厚得多。',
  date: '2026-07-01',
  stats: { routes: 2, museums: 6, food: 7, depth: 3 },
  note: '路线一（文博线）与路线二（潮流线）之间打车约20分钟，或地铁1号线秋浦河站→大东门站换2号线至四牌楼站。周一安徽博物院蜀山馆闭馆，可将两条路线对调。',
  routes: [
    {
      name: '路线一 · 文博文艺线',
      duration: '~9 小时',
      path: '安徽博物院（蜀山馆）→ 地质博物馆 → 新粮仓·文化商业合集 → 合柴1972（梵木艺术中心）→ 罍街+OTW音乐基地',
      food: '新粮仓内午餐 → THE KAFE咖啡下午茶 → 罍街晚餐',
      keyStops: ['安徽博物院·铸客大鼎', '地质博物馆·恐龙', '新粮仓·筒仓咖啡', '合柴1972·文创', '罍街·OTW演出']
    },
    {
      name: '路线二 · 老城潮流线',
      duration: '~7.5 小时',
      path: '李鸿章故居 → 淮河路·百盛二次元 → 庐州烤鸭店 → 逍遥津公园+三国馆 → 瑶海天地',
      food: '庐州烤鸭店午餐 → 詹记桃酥+卡旺卡下午茶 → 瑶海天地晚餐',
      keyStops: ['李鸿章故居·淮军史', '百盛·二次元世界', '庐州烤鸭·老字号', '逍遥津·三国战场', '瑶海天地·新街区']
    }
  ],
  meta: {
    startPoint: '出发：合肥站/合肥南站/新桥机场',
    dateRange: '2 天 · 文博+潮流双线'
  },
  days: [
    {
      title: 'Day 1 · 文博文艺线',
      stats: '~9h | 全程打车+步行',
      items: [
        {
          time: '09:00–11:00', icon: '🏛️', name: '安徽博物院（蜀山馆）',
          badge: '必去',
          desc: '直奔2F看铸客大鼎（东周最大青铜鼎，400kg）→ 同厅找鄂君启金节（最早免税凭证）→ 3F徽州古建筑展厅看1:1复原民居 → 江淮撷珍厅找金扣玛瑙碗（壁厚0.2cm）→ 1F文创区盖纪念章（约28枚）',
          transport: '地铁3号线省博物院站2号口，步行5分钟',
          warning: '周一闭馆'
        },
        {
          time: '11:10–12:30', icon: '🦕', name: '安徽省地质博物馆',
          badge: '必去',
          desc: '恐龙厅看巢湖鱼龙化石 → 触摸真实恐龙大腿骨 → 矿物岩石厅找直径1.61m水晶球 → 屋顶露台拍恐龙雕塑打卡照',
          transport: '出安徽博物院步行5分钟（同园区）'
        },
        {
          time: '12:30–14:00', icon: '🏭', name: '新粮仓·文化商业合集',
          badge: '歇脚',
          desc: '1993粮库改造的筒仓建筑群 → 铁轨旁拍照 → 园区午餐（30家安徽首店）→ THE KAFE一则咖啡喝手冲',
          transport: '打车约10分钟（望江西路）'
        },
        {
          time: '14:15–16:15', icon: '🎨', name: '合柴1972（含梵木艺术中心）',
          badge: '必去',
          desc: '国内首个监狱旧址文创园 → 逛独立书店+潮玩市集 → 红砖穹顶拍照 → 灰色工业风建筑即梵木艺术中心（安徽首家超千人Livehouse）',
          transport: '从新粮仓打车约10分钟（金寨路与天堂寨路交口）',
          warning: '秀动App查梵木当晚演出，先记开场时间'
        },
        {
          time: '16:30–21:00', icon: '🎵', name: '罍街 + OTW安徽原创音乐基地',
          badge: '必去',
          desc: '罍街二期15号楼找OTW（醒目标牌）→ 晚餐刘鸿盛（罍街店）非遗冬菇鸡饺 → 逛罍+村夜市 → 晚上OTW LIVEHOUSE或DAMO酒吧听独立音乐',
          transport: '从合柴1972打车约10分钟（宁国南路）'
        }
      ],
      food: [
        '<strong>午餐：</strong>新粮仓·文化商业合集内餐饮（30家安徽首店）| 人均 ¥40–80',
        '<strong>下午茶：</strong>THE KAFE 一则咖啡（新粮仓内）| 手冲咖啡 | 人均 ¥35',
        '<strong>晚餐：</strong>刘鸿盛（罍街店）| 冬菇鸡饺（非遗）、鸡油蒸饺、赤豆糊 | 人均 ¥35',
        '<strong>晚餐备选：</strong>老谢龙虾（九华山路店）| 十三香龙虾 | 人均 ¥122'
      ]
    },
    {
      title: 'Day 2 · 老城潮流线',
      stats: '~7.5h | 全程步行+一段打车',
      items: [
        {
          time: '09:30–10:30', icon: '🏯', name: '李鸿章故居',
          badge: '必去',
          desc: '江淮最完整的晚清名人故居（国保）→ 前厅看李鸿章生平 → 中厅"福寿堂"看木雕 → 走马楼（保存最完整的晚清闺楼）→ 重点看淮军史料和李鸿章奏折手稿原件',
          transport: '地铁2号线四牌楼站1号口，步行5分钟（淮河路步行街中段）'
        },
        {
          time: '10:35–12:00', icon: '🎮', name: '淮河路步行街·百盛二次元世界',
          badge: '必去',
          desc: '百盛商场一楼整层——谷子店、盲盒、手办密集陈列 → 周末有宅舞快闪和漫展 → 隔壁银泰裸眼3D大屏 → 顺路逛淮河路主街',
          transport: '出李鸿章故居沿淮河路向东步行5分钟'
        },
        {
          time: '12:10–13:10', icon: '🦆', name: '庐州烤鸭店（总店）',
          badge: '歇脚',
          desc: '始于明代的宫廷传承老字号，日均售鸭近千只 → 必点：庐州烤鸭、鸭油烧饼、桂花赤豆糊 → 餐后顺路买詹记桃酥+卡旺卡奶茶当下午茶',
          transport: '出百盛沿宿州路向南步行5分钟（宿州路104号）'
        },
        {
          time: '13:25–14:55', icon: '⚔️', name: '逍遥津公园 + 三国合肥历史文化馆',
          badge: '必去',
          desc: '张辽威震逍遥津古战场 → 找张辽衣冠冢 → 三国合肥历史文化馆看沉浸式数字展+巨型古城沙盘 → 公园散步消食',
          transport: '出庐州烤鸭店沿淮河路向东步行15分钟'
        },
        {
          time: '15:15–17:30+', icon: '🌆', name: '瑶海天地',
          badge: '必去',
          desc: '2026年现象级街区，原电机厂旧址 → 红砖老厂房建筑群 → 250+品牌（70%安徽首进）→ 夏季泳池派对 → 晚餐后继续逛到深夜',
          transport: '打车约15分钟（长江东路与铜陵路交口），或地铁2号线三里街站'
        }
      ],
      food: [
        '<strong>午餐：</strong>庐州烤鸭店（总店）| 庐州烤鸭、鸭油烧饼、桂花赤豆糊 | 人均 ¥50',
        '<strong>下午茶：</strong>詹记桃酥 + 卡旺卡奶茶（淮河路步行街上）| 人均 ¥20',
        '<strong>晚餐：</strong>瑶海天地内自选（250+品牌）| 人均 ¥50–150'
      ]
    }
  ]
};

async function main() {
  const generateBoth = typeFlag === '-i' && args.includes('-l');
  const types = generateBoth ? ['info', 'long'] : [typeFlag === '-i' ? 'info' : 'long'];

  for (const type of types) {
    const filename = type === 'info' ? '合肥旅行研究_城市概览.png' : '合肥旅行研究_路线速查.png';
    const outPath = path.join(OUTPUT_DIR, filename);
    await generateCard(type, cardData, outPath);
  }
}

main().catch(err => { console.error('❌ 生成失败:', err.message); process.exit(1); });
