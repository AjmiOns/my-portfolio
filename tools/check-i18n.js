// Dev tool (not shipped to visitors): opens the site in French and lists text or attributes that still look English.
// Usage: serve the site (python -m http.server 8000), then: node tools/check-i18n.js [http://localhost:8000]
// Needs Playwright (npm i -D playwright). Exits with code 1 if something is left untranslated.
const { chromium } = require("playwright");
const url = process.argv[2] || "http://localhost:8000/index.html";
const EN = /\b(the|and|of|to|your|my|with|for|you|see|view|open|close|back|next(?!\.?js)|previous|show|hover|tap|click|scroll|type|main|switch|download|copy|send|email)\b/i;
const NAMES = ["To-do list Android app"];   // proper names that are meant to stay in English

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addInitScript(() => localStorage.setItem("lang", "fr"));
  await page.goto(url); await page.waitForTimeout(1500);
  const found = (await page.evaluate((src) => {
    const re = new RegExp(src, "i"), out = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) { const n = w.currentNode, t = n.nodeValue.trim(); if (t && !/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentNode.nodeName) && re.test(t)) out.push("text: " + t); }
    document.querySelectorAll("[aria-label],[title],[placeholder],[alt]").forEach(e => ["aria-label", "title", "placeholder", "alt"].forEach(a => { const v = e.getAttribute(a); if (v && re.test(v)) out.push(a + ": " + v); }));
    return [...new Set(out)];
  }, EN.source)).filter(f => !NAMES.some(n => f.includes(n)) && !/Next\.js, NestJS|Next\.js et NestJS/.test(f));
  const lang = await page.evaluate(() => document.documentElement.lang);
  console.log("html lang =", lang);
  found.forEach(f => console.log("  EN?", f.slice(0, 110)));
  console.log(found.length ? found.length + " string(s) to translate" : "French page: nothing left in English");
  await browser.close();
  process.exit(found.length || lang !== "fr" ? 1 : 0);
})();
