const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('--- 首页开始按钮 ---');
console.log('start-btn HTML:', html.includes('id="start-btn"'));
console.log('startBtn JS:', /getElementById\("start-btn"\)/.test(m[1]));
console.log('buildAllDeck:', /function buildAllDeck/.test(m[1]));
console.log('startBtn click:', /startBtn\.addEventListener\("click"/.test(m[1]));
console.log('--- 无分类卡片 ---');
console.log('no gridEl:', !/getElementById\("grid"\)/.test(m[1]));
console.log('no randomCard:', !/randomCard/.test(m[1]));
console.log('--- 词库 ---');
console.log('知名人物:', /name: "知名人物"/.test(html));
console.log('游戏:', /name: "游戏"/.test(html));
console.log('坏人:', /name: "坏人"/.test(html));
console.log('电影电视:', /name: "电影电视"/.test(html));
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('version:', (html.match(/version">v([\d.]+)<\/p>/) || [])[1]);
