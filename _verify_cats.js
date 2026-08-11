const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
// 提取所有品类
const catRe = /name: "([^"]+)"[\s\S]*?emoji: "([^"]*)"[\s\S]*?gradient: "([^"]+)"[\s\S]*?words: \[([\s\S]*?)\]/g;
let m, idx = 0;
while ((m = catRe.exec(html)) !== null) {
  const name = m[1];
  const words = m[4].replace(/"/g, '').split(',').map(s => s.trim()).filter(Boolean);
  const dup = words.filter((w, i) => words.indexOf(w) !== i);
  console.log(`[${name}] 数量=${words.length} 重复=${dup.length ? dup.join('、') : '无'}`);
}
