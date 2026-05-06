/**
 * Korea Trip 2026 — AI Assistant Widget
 * -------------------------------------------------------
 * Drop widget.js in your GitHub repo root.
 * Add this line before </body> in index.html:
 *   <script src="widget.js"></script>
 *
 * SETUP: Enter your Anthropic API key below.
 * Keep your repo PRIVATE if you hardcode the key here.
 * -------------------------------------------------------
 */

(function () {

  // ─────────────────────────────────────────────
  //  CONFIG — paste your Anthropic API key here
  // ─────────────────────────────────────────────
  const ANTHROPIC_API_KEY = 'YOUR_ANTHROPIC_API_KEY_HERE';

  // ─────────────────────────────────────────────
  //  TRIP KNOWLEDGE BASE (system prompt context)
  // ─────────────────────────────────────────────
  const SYSTEM_PROMPT = `You are a helpful travel assistant for the Korea Trip 2026 group.
You know everything about this trip and answer questions clearly and concisely.
Keep answers friendly, scannable and brief. Use bullet points or short paragraphs.
Never make up information — if something isn't in the data below, say so.

=== TRIP OVERVIEW ===
Destination: South Korea — Seoul, Jeju, Busan
Dates: September 25 – October 11, 2026 (18 days)
Group size: 12 people (9 Canada, 3 US)
Departure groups:
  • Canada group: departs Sep 24, arrives ICN Sep 25, returns Oct 11
  • US group (Victoria, Julie, Mike): departs Sep 27, arrives Sep 28, returns Oct 8

=== ITINERARY ===
Sep 25–Oct 1  → Seoul Stay 1 (6 nights) — Chuseok holiday
Oct 1–Oct 5   → Jeju Island (4 nights) — Hallasan
Oct 5–Oct 9   → Busan (4 nights) — Seafood
Oct 9–Oct 11  → Seoul Stay 2 (2 nights) — Shopping

=== AIRBNB OPTIONS ===

SEOUL (Stay 1: Sep 25–Oct 1 | Stay 2: Oct 9–11):
• Option A — Myeongdong Station (5 min walk, Line 4) ✅ BOOKED
• Option B — Gwanghwamun / Gyeongbokgung Stn (8 min walk, Line 3)
• Option C — Insadong / Jongno area, Anguk / Jongno 3-ga Stn, Central Seoul

JEJU (Oct 1–5):
• Option H — The Suites Jeju, Jungmun Beach (Seogwipo) — luxury hotel, pool & spa
• Option I — Parnas Hotel Jeju, Jungmun, 5-star, ocean view, +82-64-801-5555
• Option J — Airbnb Villa, sleeps 12, Jeju Island — view listing for pricing
• Option N — Jeju Hanok Hotel Hallagung, Seogwipo, traditional Hanok, ~$185 CAD/night (Hotels.com)
• Option O — Jeju GoldOne Hotel & Suites, 5-star, Seogwipo, 1032 Ieodo-ro, ocean view, award winner
• Option K — Two Jeju Airbnb units (6 guests each, book both)
• Option L — Two Jeju Airbnb units (6 guests each, book both)
• Option M — Two Jeju Airbnb units (6 guests each, book both)

BUSAN (Oct 5–9):
• Option D — Roots House Busan Station, Choryang Ibagu-Gil Alley — $2,241 CAD total
• Option E — Busan Port Bridge, Harbor Bridge / Taejong-Ro — $2,352 CAD total
• Option F — The Hue Haeundae, Haeundae Beach (3 min walk), up to 15 guests, rooftop BBQ
• Option G — Gwangalli Beach (×2 units), Diamond Bridge view, Units 501 & 502, 12 guests

=== BUDGET BREAKDOWN (per person, CAD) ===
Total estimate excl. flights: $2,850 (~$168/day)
Total estimate incl. flights: $4,350–$4,750

Lodging:          $1,190  ($70/night pp)
Food:             $765    ($45/day pp)
Local Transit:    $255    ($15/day pp)
Inter-city Travel:$210    (KTX + flights pp)
Activities:       $255    ($15/day pp)
ICN Transfer:     $175    (AREX x2 pp)
Group total (12 pax): $52k–$57k incl. flights

Exchange: 1 CAD ≈ ₩1,070 | 1 USD ≈ ₩1,460

=== AIRPORT TRANSPORT (Incheon → Seoul) ===
• AREX Express Train: ₩9,500 | 43 min (T1) / 51 min (T2) | every 20–40 min | 5:23am–10:48pm | best for speed
• AREX All-Stop Train: ₩4,150–4,750 | 59–66 min | every 5–10 min | stops Hongik Univ, Gongdeok, DMC | best value
• Airport Limousine Bus: ₩9,000–18,000 | 60–80 min | Route 6701 (Myeongdong), 6703 (Gangnam)
• Taxi: ₩55,000–75,000 | 60–90 min | +₩7,900 toll | +20% surcharge 10pm–4am | 24/7
Quick compare for ~10 people: AREX Express ₩95,000 | Limo Bus ₩180,000 | 2× Taxis ~₩130,000

=== SEOUL SUBWAY ===
Line 1 (Dark Blue): Incheon ↔ Soyosan, Seoul Stn, Dongdaemun
Line 2 (Green, Circular): City Hall, Hongdae, Gangnam, Jamsil
Line 3 (Orange ⭐ Airbnb area): Anguk, Gyeongbokgung, Chungmuro
Line 4 (Sky Blue): Myeongdong, Seoul Stn, Hyehwa
Line 5 (Purple): Gwanghwamun, Yeouido, Gongdeok
Line 6 (Brown): Itaewon, Mapo, Bulgwang, Sindang
Line 7 (Olive): Boramae, Gangnam-gu Office
Line 9 (Pink/Express): Yeouido, Express Bus Terminal, COEX

=== KEY TOURIST AREAS ===
Seoul:
• Myeongdong / Seoul Tower → Line 4, Myeongdong Stn
• Gyeongbokgung / Bukchon → Line 3, Anguk Stn
• Hongdae / Mangwon → AREX or Line 2
• Gangnam / COEX → Line 2 or Line 9
• Lotte World / Jamsil → Line 2 or Line 8

Busan:
• Seomyeon → central metro hub, ideal group base
• Haeundae / Gwangalli → Metro Line 2
• Songdo Cable Car → taxi recommended
• The Hue Haeundae (Option F) → Haeundae Stn Line 2, 3 min to beach

Jeju: Private van or two rental vehicles strongly recommended

=== GETTING AROUND BY CITY ===
Seoul: Public transit most efficient (unless late night)
Busan: Mix metro + taxis for coastal spots
Jeju: Private van strongly recommended

=== TRAVELERS ===
12 total: 9 from Canada, 3 from US (Victoria, Julie, Mike)
Canada group: Sep 24 departure, 18 days total
US group: Sep 27 departure, 10 days, return Oct 8`;

  // ─────────────────────────────────────────────
  //  STYLES
  // ─────────────────────────────────────────────
  const STYLES = `
    #kt-widget-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C0392B 0%, #922B21 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(192,57,43,0.45), 0 2px 8px rgba(0,0,0,0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      font-size: 24px;
    }
    #kt-widget-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(192,57,43,0.55), 0 3px 12px rgba(0,0,0,0.25);
    }
    #kt-widget-btn.open {
      background: linear-gradient(135deg, #555 0%, #333 100%);
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }
    #kt-panel {
      position: fixed;
      bottom: 100px;
      right: 28px;
      width: 370px;
      max-width: calc(100vw - 40px);
      height: 520px;
      max-height: calc(100vh - 130px);
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.08);
      z-index: 9998;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: scale(0.92) translateY(12px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }
    #kt-panel.visible {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    #kt-header {
      background: linear-gradient(135deg, #C0392B 0%, #922B21 100%);
      color: white;
      padding: 16px 18px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #kt-header-icon {
      font-size: 22px;
    }
    #kt-header-text h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.01em;
    }
    #kt-header-text p {
      margin: 2px 0 0;
      font-size: 11.5px;
      opacity: 0.82;
    }
    #kt-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f7f7f8;
    }
    #kt-messages::-webkit-scrollbar { width: 4px; }
    #kt-messages::-webkit-scrollbar-track { background: transparent; }
    #kt-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
    .kt-msg {
      display: flex;
      flex-direction: column;
      max-width: 88%;
      gap: 3px;
    }
    .kt-msg.user { align-self: flex-end; align-items: flex-end; }
    .kt-msg.ai   { align-self: flex-start; align-items: flex-start; }
    .kt-bubble {
      padding: 10px 13px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.55;
      word-break: break-word;
    }
    .kt-msg.user .kt-bubble {
      background: #C0392B;
      color: #fff;
      border-bottom-right-radius: 4px;
    }
    .kt-msg.ai .kt-bubble {
      background: #fff;
      color: #1a1a1a;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .kt-bubble ul { margin: 6px 0; padding-left: 18px; }
    .kt-bubble li { margin-bottom: 3px; }
    .kt-bubble strong { color: #8B1A1A; }
    .kt-bubble p { margin: 0 0 6px; }
    .kt-bubble p:last-child { margin-bottom: 0; }
    .kt-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 13px;
      background: #fff;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      width: fit-content;
    }
    .kt-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #C0392B;
      opacity: 0.5;
      animation: kt-bounce 1.2s infinite;
    }
    .kt-dot:nth-child(2) { animation-delay: 0.2s; }
    .kt-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes kt-bounce {
      0%,60%,100% { transform: translateY(0); opacity: 0.4; }
      30%          { transform: translateY(-5px); opacity: 1; }
    }
    #kt-suggestions {
      padding: 8px 14px 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      background: #f7f7f8;
      flex-shrink: 0;
    }
    .kt-chip {
      background: #fff;
      border: 1.5px solid #e8d0ce;
      color: #922B21;
      font-size: 11.5px;
      padding: 5px 11px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
      font-family: inherit;
    }
    .kt-chip:hover { background: #fdecea; border-color: #C0392B; }
    #kt-input-row {
      display: flex;
      gap: 8px;
      padding: 12px 14px;
      border-top: 1px solid #eee;
      background: #fff;
      flex-shrink: 0;
    }
    #kt-input {
      flex: 1;
      border: 1.5px solid #e0e0e0;
      border-radius: 22px;
      padding: 9px 14px;
      font-size: 13.5px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s;
      background: #fafafa;
    }
    #kt-input:focus { border-color: #C0392B; background: #fff; }
    #kt-send {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C0392B, #922B21);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s, opacity 0.15s;
      flex-shrink: 0;
    }
    #kt-send:hover { transform: scale(1.08); }
    #kt-send:disabled { opacity: 0.4; cursor: default; transform: none; }
    #kt-send svg { width: 16px; height: 16px; fill: white; }
    #kt-key-setup {
      position: absolute;
      inset: 0;
      background: #fff;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 28px 24px;
      text-align: center;
      z-index: 10;
    }
    #kt-key-setup h4 { margin: 0 0 8px; font-size: 16px; color: #1a1a1a; }
    #kt-key-setup p  { margin: 0 0 18px; font-size: 13px; color: #666; line-height: 1.5; }
    #kt-key-input {
      width: 100%;
      border: 1.5px solid #e0e0e0;
      border-radius: 10px;
      padding: 10px 13px;
      font-size: 13px;
      font-family: monospace;
      outline: none;
      margin-bottom: 12px;
      box-sizing: border-box;
    }
    #kt-key-input:focus { border-color: #C0392B; }
    #kt-key-save {
      width: 100%;
      padding: 11px;
      background: linear-gradient(135deg, #C0392B, #922B21);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    #kt-key-save:hover { opacity: 0.9; }
    #kt-key-err { color: #C0392B; font-size: 12px; margin-top: 8px; }
  `;

  // ─────────────────────────────────────────────
  //  SAMPLE SUGGESTIONS
  // ─────────────────────────────────────────────
  const SUGGESTIONS = [
    'Seoul Airbnb options',
    'Busan Airbnb options',
    'Jeju accommodation',
    'Airport to Seoul',
    'Budget breakdown',
    'Who are the travelers?',
    'Itinerary overview',
    'Getting around Jeju',
  ];

  // ─────────────────────────────────────────────
  //  INIT
  // ─────────────────────────────────────────────
  let messages = [];
  let isLoading = false;

  function getApiKey() {
    if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY !== 'YOUR_ANTHROPIC_API_KEY_HERE') {
      return ANTHROPIC_API_KEY;
    }
    return sessionStorage.getItem('kt_api_key') || '';
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  function buildHTML() {
    // Button
    const btn = document.createElement('button');
    btn.id = 'kt-widget-btn';
    btn.title = 'Korea Trip Assistant';
    btn.innerHTML = '🇰🇷';

    // Panel
    const panel = document.createElement('div');
    panel.id = 'kt-panel';
    panel.innerHTML = `
      <div id="kt-header">
        <div id="kt-header-icon">🗺️</div>
        <div id="kt-header-text">
          <h3>Korea Trip Assistant</h3>
          <p>Ask anything about the trip</p>
        </div>
      </div>
      <div id="kt-messages"></div>
      <div id="kt-suggestions">
        ${SUGGESTIONS.map(s => `<button class="kt-chip">${s}</button>`).join('')}
      </div>
      <div id="kt-input-row">
        <input id="kt-input" type="text" placeholder="Ask about Airbnbs, transit, budget…" autocomplete="off"/>
        <button id="kt-send" title="Send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    `;

    // Key setup overlay (shown if no key configured)
    const keySetup = document.createElement('div');
    keySetup.id = 'kt-key-setup';
    keySetup.innerHTML = `
      <div style="font-size:36px;margin-bottom:12px">🔑</div>
      <h4>API Key Required</h4>
      <p>Enter your Anthropic API key to activate the assistant. It's stored only for this session.</p>
      <input id="kt-key-input" type="password" placeholder="sk-ant-…" spellcheck="false"/>
      <button id="kt-key-save">Activate Assistant</button>
      <div id="kt-key-err"></div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    if (!getApiKey()) {
      panel.appendChild(keySetup);
    }

    return { btn, panel, keySetup };
  }

  function addMessage(role, content) {
    const container = document.getElementById('kt-messages');
    const div = document.createElement('div');
    div.className = `kt-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'kt-bubble';

    if (role === 'ai') {
      // Basic markdown: bold, bullets, line breaks
      let html = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .split('\n')
        .map(line => {
          if (/^[•\-\*]\s/.test(line)) return `<li>${line.replace(/^[•\-\*]\s/, '')}</li>`;
          if (/^\d+\.\s/.test(line)) return `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
          return line;
        })
        .join('\n')
        .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
        .split('\n')
        .map(line => line.startsWith('<') ? line : (line.trim() ? `<p>${line}</p>` : ''))
        .join('');

      bubble.innerHTML = html || content;
    } else {
      bubble.textContent = content;
    }

    div.appendChild(bubble);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;

    if (role === 'ai') {
      messages.push({ role: 'assistant', content });
    } else {
      messages.push({ role: 'user', content });
    }
  }

  function showTyping() {
    const container = document.getElementById('kt-messages');
    const div = document.createElement('div');
    div.className = 'kt-msg ai';
    div.id = 'kt-typing-indicator';
    div.innerHTML = `<div class="kt-typing"><div class="kt-dot"></div><div class="kt-dot"></div><div class="kt-dot"></div></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('kt-typing-indicator');
    if (el) el.remove();
  }

  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;
    const key = getApiKey();
    if (!key) return;

    isLoading = true;
    const input = document.getElementById('kt-input');
    const sendBtn = document.getElementById('kt-send');
    if (input) { input.value = ''; input.disabled = true; }
    if (sendBtn) sendBtn.disabled = true;

    // Hide suggestions after first send
    const sugg = document.getElementById('kt-suggestions');
    if (sugg) sugg.style.display = 'none';

    addMessage('user', text);
    showTyping();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages: messages.filter(m => m.role === 'user' || m.role === 'assistant'),
        }),
      });

      const data = await response.json();
      hideTyping();

      if (data.error) {
        addMessage('ai', `⚠️ Error: ${data.error.message}`);
      } else {
        const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t get a response.';
        addMessage('ai', reply);
      }
    } catch (err) {
      hideTyping();
      addMessage('ai', '⚠️ Network error. Check your connection and try again.');
    }

    isLoading = false;
    if (input) { input.disabled = false; input.focus(); }
    if (sendBtn) sendBtn.disabled = false;
  }

  function greet() {
    setTimeout(() => {
      const container = document.getElementById('kt-messages');
      if (!container) return;
      const div = document.createElement('div');
      div.className = 'kt-msg ai';
      div.innerHTML = `<div class="kt-bubble">👋 Hi! I'm your Korea Trip 2026 assistant. Ask me about <strong>Airbnbs</strong>, <strong>the itinerary</strong>, <strong>budget</strong>, <strong>transit</strong>, or anything else about the trip.</div>`;
      container.appendChild(div);
    }, 350);
  }

  function init() {
    injectStyles();
    const { btn, panel } = buildHTML();
    let open = false;

    btn.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('visible', open);
      btn.classList.toggle('open', open);
      btn.innerHTML = open ? '✕' : '🇰🇷';
      if (open && document.getElementById('kt-messages').children.length === 0 && getApiKey()) {
        greet();
      }
    });

    // Key save
    document.addEventListener('click', e => {
      if (e.target.id === 'kt-key-save') {
        const keyInput = document.getElementById('kt-key-input');
        const errEl = document.getElementById('kt-key-err');
        const val = keyInput?.value?.trim();
        if (!val || !val.startsWith('sk-ant-')) {
          if (errEl) errEl.textContent = 'Key should start with sk-ant-…';
          return;
        }
        sessionStorage.setItem('kt_api_key', val);
        const overlay = document.getElementById('kt-key-setup');
        if (overlay) overlay.remove();
        greet();
      }
    });

    // Send button
    const sendBtn = document.getElementById('kt-send');
    const input = document.getElementById('kt-input');
    if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(input.value));
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
      });
    }

    // Suggestion chips
    document.addEventListener('click', e => {
      if (e.target.classList.contains('kt-chip')) {
        sendMessage(e.target.textContent);
      }
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (open && !panel.contains(e.target) && e.target !== btn) {
        open = false;
        panel.classList.remove('visible');
        btn.classList.remove('open');
        btn.innerHTML = '🇰🇷';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
