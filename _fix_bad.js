const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/name: "坏人",[\s\S]*?words: \[([\s\S]*?)\]/);
const words = m[1].replace(/"/g, '').split(',').map(s => s.trim()).filter(Boolean);
const unique = [...new Set(words)];
console.log('总词数:', words.length);
console.log('去重后:', unique.length);
console.log('去重列表:', JSON.stringify(unique));
