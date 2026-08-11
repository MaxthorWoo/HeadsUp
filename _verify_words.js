const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
// 提取"知名人物"品类
const m = html.match(/name: "知名人物",[\s\S]*?words: \[([\s\S]*?)\]/);
if (!m) { console.log('未找到知名人物品类'); process.exit(0); }
const words = m[1].replace(/"/g, '').split(',').map(s => s.trim()).filter(Boolean);
console.log('知名人物数量:', words.length);
const dup = words.filter((w, i) => words.indexOf(w) !== i);
console.log('重复项:', dup.length ? dup.join(', ') : '无');
console.log('前5个:', words.slice(0, 5).join(' / '));
console.log('后5个:', words.slice(-5).join(' / '));
