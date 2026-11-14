/* Onsia: the portfolio's AI assistant (chat panel, chip carousel, local fallback answers). Needs app.js first. */
(function () {
  const fr = LANG === "fr", L = (en, f) => fr ? f : en;
  /* assistant: Onsia */
  const panel = $("aiPanel"), msgs = $("aiMsgs"), inp = $("aiIn"), sendB = $("aiSend"), cf = $("aiConfirm"), foot = $("aiFoot"), nb = $("aiBtn");
  const hist = [], log = [], KEY = "onsia-chat"; let busy = false, gen = 0, lastTs = 0;
  const ICON = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const CHIPS = [
    [ICON('<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'), L("Explore Projects", "Découvrir les projets"), L("projects", "projets")],
    [ICON('<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>'), L("AWS & Cloud Labs", "Labs AWS & Cloud"), "labs"],
    [ICON('<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>'), L("Technical Skills", "Compétences techniques"), L("skills", "compétences")],
    [ICON('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'), L("Education & Experience", "Études & expérience"), L("education", "études")],
    [ICON('<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>'), L("Internship Opportunities", "Opportunités de stage"), L("internships", "stages")],
    [ICON('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'), L("Contact Ons", "Contacter Ons"), "contact"]
  ];
  const chipsHtml = CHIPS.map(([ic, lb, q]) => `<button type="button" class="ai-chip" data-q="${esc(q)}" data-l="${esc(lb)}"><span class="ci">${ic}</span><span>${esc(lb)}</span></button>`).join("");
  $("aiSug").innerHTML = chipsHtml;
  /* chip carousel: swipe / scroll, arrows appear when there is more to see */
  const car = $("aiSug"), cp = $("carPrev"), cn = $("carNext");
  const carSync = () => { const max = car.scrollWidth - car.clientWidth - 4; cp.classList.toggle("on", car.scrollLeft > 4); cn.classList.toggle("on", car.scrollLeft < max); };
  const carGo = d => car.scrollBy({ left: d * car.clientWidth * 0.7, behavior: "smooth" });
  cp.onclick = () => carGo(-1); cn.onclick = () => carGo(1);
  car.addEventListener("scroll", carSync, { passive: true }); addEventListener("resize", carSync);
  /* auto-advance: one chip at a time, loops back; pauses on hover, focus, touch, manual use and when closed */
  let carPause = 0; const hold = ms => { carPause = Date.now() + ms; };
  const carStep = () => {
    if (Date.now() < carPause || !panel.classList.contains("open") || panel.classList.contains("min")) return;
    const max = car.scrollWidth - car.clientWidth; if (max <= 4) return;
    if (car.scrollLeft >= max - 4) return car.scrollTo({ left: 0, behavior: "smooth" });
    const nx = [...car.children].find(c => c.offsetLeft - 14 > car.scrollLeft + 6);
    car.scrollTo({ left: Math.min(nx ? nx.offsetLeft - 14 : max, max), behavior: "smooth" });
  };
  car.addEventListener("pointerenter", () => hold(1e9)); car.addEventListener("pointerleave", () => hold(1500));
  car.addEventListener("focusin", () => hold(1e9)); car.addEventListener("focusout", () => hold(1500));
  car.addEventListener("touchstart", () => hold(6000), { passive: true });
  cp.addEventListener("click", () => hold(6000)); cn.addEventListener("click", () => hold(6000));
  if (!matchMedia("(prefers-reduced-motion:reduce)").matches) setInterval(carStep, 2600);
  car.addEventListener("wheel", e => { hold(6000); if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && car.scrollWidth > car.clientWidth) { car.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
  $("aiLabel").textContent = L("Ask Onsia", "Demandez à Onsia"); nb.setAttribute("aria-label", $("aiLabel").textContent);
  $("aiSub").textContent = L("Ons’s AI Portfolio Assistant", "Assistante IA du portfolio d’Ons");
  $("aiLive").textContent = L("Online", "En ligne");
  inp.placeholder = L("Ask Onsia anything about my portfolio...", "Posez une question à Onsia sur mon portfolio...");
  [["aiClear", L("Clear conversation", "Effacer la discussion")], ["aiClose", L("Close", "Fermer")], ["aiSend", L("Send", "Envoyer")]].forEach(([i, t]) => { $(i).setAttribute("aria-label", t); if (i !== "aiSend") $(i).title = t; });
  $("aiConfirmTxt").textContent = L("Clear this conversation?", "Effacer cette discussion ?"); $("aiNo").textContent = L("Cancel", "Annuler"); $("aiYes").textContent = L("Clear", "Effacer");
  $("awTitle").textContent = L("Hi! I’m Onsia 👋", "Bonjour ! Je suis Onsia 👋");
  $("awText").textContent = L("I’m Ons’s AI assistant. I can help you explore her projects, technical skills, cloud infrastructure experience, and professional journey.", "Je suis l’assistante IA d’Ons. Je peux vous aider à explorer ses projets, ses compétences techniques, son expérience en infrastructure cloud et son parcours professionnel.");
  $("awAsk").textContent = L("What would you like to discover?", "Que souhaitez-vous découvrir ?");
  const FOOT = L("Onsia · answers come from this portfolio", "Onsia · réponses issues de ce portfolio");
  const FOOT_OFF = L("AI replies unavailable · showing built-in portfolio answers", "Réponses IA indisponibles · réponses intégrées du portfolio");
  const setFoot = ok => { foot.textContent = ok ? FOOT : FOOT_OFF; foot.classList.toggle("warn", !ok); }; setFoot(true);
  /* light, safe Markdown: **bold**, *italic*, `code`, [text](url), bare links, - / • / 1. lists */
  const md = raw => {
    const keep = []; const hold = h => "\u0000" + (keep.push(h) - 1) + "\u0000";
    const a = (u, t) => hold(`<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`);
    let s = esc(raw);
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, t, u) => a(u, t));
    s = s.replace(/https?:\/\/[^\s<]*[^\s<).,;!?]/g, u => a(u, u));
    const inl = x => x.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    const out = []; let mode = null, para = [];
    const flush = () => { if (para.length) { out.push("<p>" + para.join("<br>") + "</p>"); para = []; } };
    const close = () => { if (mode) { out.push("</" + mode + ">"); mode = null; } };
    s.split("\n").forEach(line => {
      const ul = line.match(/^\s*(?:[•\-*])\s+(.*)$/), ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
      if (ul || ol) { flush(); const t = ul ? "ul" : "ol"; if (mode !== t) { close(); out.push("<" + t + ">"); mode = t; } out.push("<li>" + inl((ul || ol)[1]) + "</li>"); }
      else if (!line.trim()) { flush(); close(); }
      else { close(); para.push(inl(line)); }
    });
    flush(); close();
    return out.join("").replace(/\u0000(\d+)\u0000/g, (_, i) => keep[i]);
  };
  const plain = t => esc(t).replace(/\n/g, "<br>");
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(log.slice(-40))); } catch (e) {} };
  const sync = () => { $("aiClear").disabled = !log.length; panel.classList.toggle("has-msgs", !!msgs.querySelector(".m")); };
  const upd = () => { sendB.disabled = busy || !inp.value.trim(); };
  const setBusy = b => { busy = b; panel.classList.toggle("busy", b); upd(); };
  const toEnd = () => { msgs.scrollTop = msgs.scrollHeight; };
  const stamp = ts => { if (!lastTs || ts - lastTs > 3e5) { const e = document.createElement("div"); e.className = "ai-time"; e.textContent = new Date(ts).toLocaleTimeString(fr ? "fr-FR" : "en-GB", { hour: "2-digit", minute: "2-digit" }); msgs.appendChild(e); } lastTs = ts; };
  const say = (t, who, keep = true, ts = Date.now()) => {
    stamp(ts); const d = document.createElement("div"); d.className = "m " + who; d.innerHTML = who === "bot" ? md(t) : plain(t); msgs.appendChild(d);
    if (keep) { log.push({ t, who, ts }); save(); } sync(); toEnd(); return d;
  };
  const typing = () => { const d = document.createElement("div"); d.className = "m bot typing"; d.setAttribute("role", "status"); d.setAttribute("aria-label", L("Onsia is typing", "Onsia écrit")); d.innerHTML = "<i></i><i></i><i></i>"; msgs.appendChild(d); sync(); toEnd(); return d; };
  const list = (a, f) => a.map(f).join("\n");
  const KB = [
    [/bonjour|salut|hello|^hi\b|hey|coucou/, () => L("Hi, I’m Onsia, Ons’s cloud assistant. Ask me about her projects, labs, skills, education or how to contact her.", "Bonjour, je suis Onsia, l’assistante cloud d’Ons. Posez-moi vos questions sur ses projets, labs, compétences, études ou sur la façon de la contacter.")],
    [/project|projet|built|construit|réalis|realis/, () => list(C.projects, p => `• ${p.title}: ${p.idea}`)],
    [/lab|\btp\b|load|balanc|répartition|haute|availab|disponib|auto.?scal|multi/, () => list(C.labs, l => `• ${l.title}: ${l.text}`)],
    [/skill|compétence|competence|stack|tech|outil|tool|terraform|docker|python|aws/, () => list(C.skills, k => `• ${k.title}: ${k.items.join(", ")}`)],
    [/intern|stage|experience|expérience|siccad|cpn/, () => L("• IT intern at SicCad Engineering (Feb to May 2025): designed and developed an e-commerce mobile application with a web dashboard built with Laravel.\n• IT intern at CPN, M’Saken (Jan to Feb 2024): developed an e-learning platform with HTML, CSS, Bootstrap and MySQL.", "• Stage à SicCad Engineering (fév. à mai 2025) : conception et développement d’une application mobile e-commerce avec un tableau de bord web Laravel.\n• Stage au CPN, M’Saken (janv. à fév. 2024) : développement d’une plateforme e-learning avec HTML, CSS, Bootstrap et MySQL.")],
    [/educat|étude|etude|diplôm|diplom|degree|licence|universit|school|tek|iset|graduat/, () => list(C.education, e => `• ${e.title}, ${e.place} (${e.when}): ${e.text}`)],
    [/certif/, () => L("AWS Certified Cloud Practitioner and AWS Certified Solutions Architect – Associate are in progress. No certification has been obtained yet.", "AWS Certified Cloud Practitioner et AWS Certified Solutions Architect – Associate sont en préparation. Aucune certification n’est encore obtenue.")],
    [/langu|french|english|arab|german|français|anglais|arabe|allemand/, () => L("Arabic (native), French (C1), English (B2), German (A1).", "Arabe (langue maternelle), français (C1), anglais (B2), allemand (A1).")],
    [/\bcv\b|resume|résumé/, () => L("You can download her CV with the “Download CV” button at the top of the page.", "Vous pouvez télécharger son CV avec le bouton « Télécharger le CV » en haut de la page.")],
    [/github|repo|code/, () => "https://github.com/" + C.github],
    [/contact|mail|linkedin|reach|joindre|hire|recrut|available|disponible/, () => `Email: ${C.email}\nLinkedIn: ${C.linkedin}\nGitHub: https://github.com/${C.github}`]
  ];
  const local = q => { const s = q.toLowerCase(); for (const [re, f] of KB) if (re.test(s)) return f(); return L("I can answer questions about Ons’s projects, labs, skills, education, internships and how to contact her. Try one of the suggestions below.", "Je peux répondre aux questions sur les projets, labs, compétences, études et stages d’Ons, et sur la façon de la contacter. Essayez l’une des suggestions ci-dessous."); };
  const ask = async (q, label) => {
    q = q.trim().slice(0, 300); if (!q || busy) return;
    const shown = label || q, g = gen;
    setBusy(true); say(shown, "me"); hist.push({ role: "user", content: shown }); const t = typing(); let r = null;
    try { const c = new AbortController(); const to = setTimeout(() => c.abort(), 12000);
      const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: hist.slice(-6), lang: LANG }), signal: c.signal });
      clearTimeout(to); if (res.ok) r = (await res.json()).reply; } catch (e) {}
    if (g !== gen) { t.remove(); return; }          /* conversation was cleared meanwhile */
    setFoot(!!r); r = r || local(q); t.remove(); say(r, "bot"); hist.push({ role: "assistant", content: r }); setBusy(false);
  };
  /* launcher: tooltip shows for a few seconds, then folds back; rotating hints */
  const hints = L(["my AWS labs", "my projects", "my skills", "how to reach me"], ["mes labs AWS", "mes projets", "mes compétences", "comment me joindre"]); let hi = 0;
  const setHint = () => { $("aiHint").textContent = L("Try: ", "Essayez : ") + hints[hi]; };
  setHint(); nb.classList.add("intro");
  if (!matchMedia("(prefers-reduced-motion:reduce)").matches) { setTimeout(() => nb.classList.remove("intro"), 7000); setInterval(() => { const h = $("aiHint"); h.style.opacity = 0; setTimeout(() => { hi = (hi + 1) % hints.length; setHint(); h.style.opacity = 1; }, 300); }, 2800); }
  /* open / minimize / close / clear */
  const isOpen = () => panel.classList.contains("open");
  const askClear = on => cf.classList.toggle("show", on);
  const syncMin = () => { const m = panel.classList.contains("min"), t = m ? L("Expand", "Agrandir") : L("Minimize", "Réduire"); $("aiMin").setAttribute("aria-label", t); $("aiMin").title = t; $("aiMin").setAttribute("aria-expanded", String(!m)); };
  const open = on => {
    panel.classList.toggle("open", on); panel.inert = !on; panel.setAttribute("aria-hidden", String(!on)); nb.setAttribute("aria-expanded", String(on)); nb.classList.toggle("is-open", on);
    if (on) { nb.classList.remove("intro"); panel.classList.remove("min"); syncMin(); setTimeout(() => { inp.focus(); toEnd(); carSync(); }, 160); } else askClear(false);
  };
  const wipe = () => { gen++; msgs.classList.add("fade");
    setTimeout(() => { msgs.querySelectorAll(".m,.ai-time").forEach(n => n.remove()); log.length = 0; hist.length = 0; lastTs = 0; try { sessionStorage.removeItem(KEY); } catch (e) {}
      setBusy(false); setFoot(true); sync(); askClear(false); msgs.classList.remove("fade"); msgs.scrollTop = 0; inp.focus(); }, 260); };
  nb.onclick = () => open(!isOpen());
  $("aiClose").onclick = () => { open(false); nb.focus(); };
  $("aiMin").onclick = () => { panel.classList.toggle("min"); askClear(false); syncMin(); if (!panel.classList.contains("min")) { toEnd(); inp.focus(); } };
  $("aiClear").onclick = () => { if (log.length) askClear(!cf.classList.contains("show")); };
  $("aiNo").onclick = () => askClear(false); $("aiYes").onclick = wipe;
  addEventListener("keydown", e => { if (e.key === "Escape" && isOpen()) { if (cf.classList.contains("show")) askClear(false); else { open(false); nb.focus(); } } });
  /* input: Enter sends, Shift+Enter = new line, auto-grow, disabled when empty */
  const grow = () => { inp.style.height = "auto"; inp.style.height = Math.min(inp.scrollHeight, 112) + "px"; };
  inp.addEventListener("input", () => { grow(); upd(); });
  inp.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); $("aiForm").requestSubmit(); } });
  $("aiForm").onsubmit = e => { e.preventDefault(); const v = inp.value; if (!v.trim() || busy) return; inp.value = ""; grow(); upd(); ask(v); };
  panel.addEventListener("click", e => { const b = e.target.closest("[data-q]"); if (b) ask(b.dataset.q, b.dataset.l); });
  /* restore this tab's conversation */
  try { JSON.parse(sessionStorage.getItem(KEY) || "[]").forEach(m => { if (m && m.t && (m.who === "me" || m.who === "bot")) { say(String(m.t), m.who, true, Number(m.ts) || Date.now()); hist.push({ role: m.who === "me" ? "user" : "assistant", content: String(m.t) }); } }); } catch (e) {}
  syncMin(); sync(); upd(); carSync();
})();
