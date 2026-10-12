// node print/make_card.js  ->  print/pdf/QR card (A6) and QR card sheet (A4, 4 per page)
const fs = require('fs'), path = require('path'), cp = require('child_process');
global.self = global; require('../src/art.js');
const qr = fs.readFileSync(path.join(__dirname, 'qr.svg'), 'utf8').replace(/<svg [^>]*?(viewBox="[^"]*")?[^>]*?>/, (m) => { const w = /width="(\d+)"/.exec(m)[1], h = /height="(\d+)"/.exec(m)[1]; return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="100%" height="100%" shape-rendering="crispEdges">'; });
const bug = global.CampArt.raw('bug');
const card = `<div class="card"><div class="l"><h1>Your kit has<br>15 projects</h1><p class="sub">Scan the code, or type the address below.</p>
<ol><li>Scan the code with a phone camera.</li><li>Open <b>Getting started</b> and set up the Arduino IDE once.</li><li>Try <b>Project 1: Hello Nano</b> and take it from there.</li></ol>
<p class="url">abhijithgiridhar.github.io/chipcamp-projects</p><p class="small">Not in the box: resistors (220 Ω). The site tells you when you need them.</p></div>
<div class="r"><div class="qr">${qr}</div><div class="bug">${bug}</div></div></div>`;
const css = `@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@600;800&display=swap');@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:"Nunito","Trebuchet MS",sans-serif;color:#2b2f4a}
.card{width:148mm;height:105mm;padding:8mm;display:flex;gap:6mm;background:#eef3ff;border:1.2mm solid #7c4dff;border-radius:6mm;overflow:hidden}
.l{flex:1}h1{font-family:"Fredoka","Trebuchet MS",sans-serif;font-size:22pt;line-height:1.05;margin:0 0 2mm;color:#7c4dff}
.sub{margin:0 0 2mm;font-size:10pt;color:#69709a}ol{margin:0;padding-left:5mm;font-size:10pt}li{margin:1.4mm 0}
.url{font-family:"Fredoka",sans-serif;font-size:9.5pt;font-weight:600;background:#fff;border:.6mm solid #d3def6;border-radius:3mm;padding:2mm 3mm;margin:3mm 0 2mm;white-space:nowrap}
.small{font-size:8pt;color:#69709a;margin:0}.r{width:46mm;display:flex;flex-direction:column;align-items:center;gap:3mm}
.qr{width:44mm;height:44mm;background:#fff;padding:2.5mm;border-radius:3mm;border:.6mm solid #d3def6}.bug{width:28mm}.bug svg{width:100%;height:auto}
.sheet{display:grid;grid-template-columns:148mm 148mm;grid-template-rows:105mm 105mm;width:297mm;height:210mm;page-break-after:always}
.sheet .card{border-radius:0;border-width:.3mm;border-color:#999}`;
const out = path.join(__dirname, 'pdf'); fs.mkdirSync(out, { recursive: true });
const C = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
function pdf(name, html, size) {
  const f = path.join(out, name + '.html');
  fs.writeFileSync(f, '<!doctype html><meta charset="utf-8"><style>' + css + (size ? '@page{size:' + size + ';margin:0}' : '') + '</style>' + html);
  cp.execFileSync(C, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf=' + path.join(out, name + '.pdf'), 'file://' + f], { stdio: 'ignore' });
  fs.unlinkSync(f);
}
pdf('Box QR card (single, A5 landscape)', card, '148mm 105mm');
pdf('Box QR cards (4 on one A4 landscape sheet)', '<div class="sheet">' + card.repeat(4) + '</div>', '297mm 210mm');
console.log('done');
