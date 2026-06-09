import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CA = "Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump";
const NYANMARU_CA = "FpECzw6x8RG4VBXfnVg3UJd8pq9CCxJUSWCKb4gebq8B";
const CNYAN_CAIP = `solana:101/address:${CA}`;
const NYANMARU_CAIP = `solana:101/address:${NYANMARU_CA}`;
const PUBLIC_SITE_URL = "https://challengecat.github.io/challengecat-cnyan/";
const DEXSCREENER_PAIR = "2asrDYfjyAuKvdRAaQsMJ9CTEj7j7BrNXC5dGUVwtVdZ";
const DEXSCREENER_API = `https://api.dexscreener.com/token-pairs/v1/solana/${CA}`;
const DEXSCREENER_URL = `https://dexscreener.com/solana/${DEXSCREENER_PAIR}`;
const DEXSCREENER_EMBED_URL = `https://dexscreener.com/solana/${DEXSCREENER_PAIR}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15`;
const PHANTOM_SWAP_URL = `https://phantom.app/ul/v1/swap/?buy=${encodeURIComponent(CNYAN_CAIP)}&sell=`;
const PHANTOM_NYANMARU_TO_CNYAN_URL = `https://phantom.app/ul/v1/swap/?buy=${encodeURIComponent(CNYAN_CAIP)}&sell=${encodeURIComponent(NYANMARU_CAIP)}`;
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const logo = asset("/cnyan-logo.png");
const mapImage = asset("/cnyan-asia-map.svg");
const images = {
  hero: asset("/images/cnyan-hero-visual.png"),
  challenge: asset("/images/cnyan-challenge-visual.png"),
  travel: asset("/images/cnyan-travel-visual.png"),
  community: asset("/images/cnyan-community-visual.png"),
  trade: asset("/images/cnyan-trade-visual.png"),
};

const demoCards = [
  {
    id: "challenge",
    title: "CNYAN Challenge Demo",
    label: "Bounty map",
    copy: "Pick city missions, submit proof, and preview CNYAN or SOL reward flows.",
    image: images.challenge,
  },
  {
    id: "answer",
    title: "AI Answer Demo",
    label: "Route intelligence",
    copy: "Use route data, region signals, and proof availability to show a question, answer, and evidence in one screen.",
    image: images.trade,
  },
  {
    id: "route",
    title: "Route Challenge Demo",
    label: "Route proof",
    copy: "Preview the flow from route selection and proof submission to verification and reward settlement.",
    image: images.travel,
  },
  {
    id: "dex",
    title: "CNYAN DEX Concept",
    label: "Swap / Liquidity / Rewards",
    copy: "A DEX concept connecting CNYAN posting fees, reward settlement, liquidity, burn, and treasury flows.",
    image: images.community,
  },
];

const drops = [
  ["tokyo", "Tokyo", "Japan", 73, 30, "12,000", "CNYAN", "S", 48, "02:18:44", "Station photo + CNYAN sign", images.travel],
  ["seoul", "Seoul", "Korea", 68, 25, "0.35", "SOL", "A", 31, "06:40:12", "Street proof + community post", images.challenge],
  ["taipei", "Taipei", "Taiwan", 64, 46, "8,500", "CNYAN", "B", 22, "11:09:03", "Landmark selfie + tag", images.travel],
  ["hongkong", "Hong Kong", "Hong Kong", 58, 54, "0.28", "SOL", "A", 19, "16:21:55", "Harbor proof + meme", images.challenge],
  ["bangkok", "Bangkok", "Thailand", 44, 68, "6,000", "CNYAN", "C", 14, "23:50:10", "Market proof + review", images.travel],
  ["singapore", "Singapore", "Singapore", 49, 82, "0.42", "SOL", "S", 37, "04:12:31", "Skyline proof + route log", images.challenge],
  ["manila", "Manila", "Philippines", 63, 72, "7,200", "CNYAN", "B", 16, "08:03:22", "City proof + translation", images.travel],
  ["hanoi", "Hanoi", "Vietnam", 48, 58, "5,500", "CNYAN", "C", 12, "19:30:18", "Cafe proof + caption", images.challenge],
].map(([id, city, country, x, y, reward, currency, rarity, hunters, time, proof, image]) => ({
  id,
  city,
  country,
  x,
  y,
  reward,
  currency,
  rarity,
  hunters,
  time,
  proof,
  image,
  desc: `Clear the ${city} challenge with original proof, a short CNYAN caption, and a public mission tag.`,
}));

const feed = [
  "NekoRider accepted Tokyo",
  "MintScout submitted proof in Seoul",
  "RouteCat is heading to Taipei",
  "GoldPaw claimed a Singapore drop",
];

const titleMap = {
  home: "CNYAN",
  challenge: "CNYAN - Challenge",
  answer: "CNYAN - AI Answer",
  route: "CNYAN - Route",
  dex: "CNYAN - DEX",
};

function normalizeView(nextView) {
  if (nextView === "legacy-answer") return "answer";
  if (nextView === "legacy-route") return "route";
  return nextView || "home";
}

function savedName() {
  try {
    return localStorage.getItem("cnyan-challenger-name") || "";
  } catch {
    return "";
  }
}

export default function App() {
  const [view, setView] = useState(() => normalizeView(window.location.hash.replace("#", "")));
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const onHashChange = () => setView(normalizeView(window.location.hash.replace("#", "")));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = titleMap[view] || "CNYAN";
  }, [view]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 1350);
    return () => window.clearTimeout(timer);
  }, []);

  function navigate(nextView) {
    const target = normalizeView(nextView);
    window.location.hash = target === "home" ? "" : target;
    setView(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={view === "challenge" ? "challenger-shell" : "site-shell"}>
      <AnimatePresence>{showSplash && <LoadingSplash />}</AnimatePresence>
      {view === "challenge" ? (
        <ChallengeDemo onHome={() => navigate("home")} onDemo={navigate} />
      ) : (
        <>
          <SiteHeader onNavigate={navigate} />
          {view === "home" && <HomeSite onNavigate={navigate} />}
          {view === "answer" && <AnswerDemo onNavigate={navigate} />}
          {view === "route" && <RouteDemo onNavigate={navigate} />}
          {view === "dex" && <DexDemo onNavigate={navigate} />}
        </>
      )}
    </main>
  );
}

function LoadingSplash() {
  return (
    <motion.div className="loading-splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <motion.img src={logo} alt="CNYAN loading" animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }} />
      <div className="loading-bar"><span /></div>
      <p>Loading CNYAN...</p>
    </motion.div>
  );
}

function SiteHeader({ onNavigate }) {
  return (
    <header className="site-header">
      <button className="site-brand" type="button" onClick={() => onNavigate("home")}>
        <img src={logo} alt="CNYAN" />
        <span>CNYAN</span>
      </button>
      <nav>
        <button type="button" onClick={() => onNavigate("home")}>Home</button>
        <button type="button" onClick={() => onNavigate("challenge")}>Challenge</button>
        <button type="button" onClick={() => onNavigate("answer")}>AI Answer</button>
        <button type="button" onClick={() => onNavigate("route")}>Route</button>
        <button type="button" onClick={() => onNavigate("dex")}>DEX</button>
      </nav>
    </header>
  );
}

function HomeSite({ onNavigate }) {
  return (
    <>
      <TokenSpotlight onNavigate={onNavigate} />
      <section className="intro-hero">
        <img className="intro-hero-bg" src={images.hero} alt="" />
        <FloatingCoins />
        <div className="hero-copy">
          <p>CNYAN Network</p>
          <SplitHeading text="WE ARE CNYAN" />
          <span>
            CNYAN connects mission creators, challengers, proof submissions, and token rewards in one community reward network.
            Move from the introduction into live demos without leaving the page.
          </span>
          <div className="hero-actions">
            <button className="primary-button sized" type="button" onClick={() => onNavigate("challenge")}>Launch challenge</button>
            <a className="secondary-link" href="#demo-directory">Explore demos</a>
          </div>
        </div>
      </section>
      <section id="demo-directory" className="section">
        <SectionTitle label="Demo Hub" title="Explore the core CNYAN demos" />
        <div className="demo-grid">
          {demoCards.map((card) => (
            <DemoCard key={card.id} card={card} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
      <section className="section split-section">
        <div>
          <SectionTitle label="What CNYAN does" title="Missions, proof, and rewards in one loop" align="left" />
          <p>
            CNYAN is a prototype for community missions: creators post tasks, participants submit proof,
            and approved work can settle into CNYAN or SOL rewards.
          </p>
        </div>
        <div className="feature-list">
          <button type="button" onClick={() => onNavigate("challenge")}>Challenge: choose a mission and submit proof</button>
          <button type="button" onClick={() => onNavigate("answer")}>AI Answer: generate route decisions from proof signals</button>
          <button type="button" onClick={() => onNavigate("route")}>Route: verify route progress and move toward rewards</button>
          <button type="button" onClick={() => onNavigate("dex")}>DEX: connect swaps, liquidity, and reward settlement</button>
        </div>
      </section>
    </>
  );
}

function TokenSpotlight({ onNavigate }) {
  return (
    <section className="token-spotlight">
      <div className="token-copy token-main">
        <p>Live DexScreener Chart</p>
        <h1>CNYAN Token</h1>
        <div className="ca-hero">
          <span>Contract Address</span>
          <a className="ca-link" href={DEXSCREENER_URL} aria-label="Open CNYAN on DexScreener">
            <strong>{CA}</strong>
          </a>
        </div>
      </div>
      <div className="dex-frame-wrap">
        <iframe
          title="CNYAN DexScreener chart"
          src={DEXSCREENER_EMBED_URL}
          loading="lazy"
          allow="clipboard-write"
        />
      </div>
      <div className="token-copy token-trade">
        <p className="token-summary">
          The live DexScreener chart, market stats, Phantom swap routes, and DEX links are placed at the top so mobile users can verify the token before trading.
        </p>
        <PriceTradePanel compact />
        <div className="token-shortcuts">
          <button className="secondary-button" type="button" onClick={() => onNavigate("dex")}>DEX details</button>
          <button className="secondary-button" type="button" onClick={() => onNavigate("challenge")}>Challenge demo</button>
        </div>
      </div>
    </section>
  );
}

function SplitHeading({ text }) {
  const accentStart = text.indexOf("CNYAN");
  const prefix = accentStart >= 0 ? text.slice(0, accentStart) : text;
  const accent = accentStart >= 0 ? text.slice(accentStart) : "";

  return (
    <h1 className="split-heading" aria-label={text}>
      <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
        {prefix}
      </motion.span>
      {accent && (
        <motion.span className="accent" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}>
          {accent}
        </motion.span>
      )}
    </h1>
  );
}

function FloatingCoins() {
  return (
    <div className="floating-coins" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((item) => (
        <motion.img
          key={item}
          src={logo}
          alt=""
          style={{ "--x": `${12 + item * 18}%`, "--delay": `${item * 0.35}s`, "--size": `${42 + item * 7}px` }}
          animate={{ y: [0, -26, 0], rotate: [0, 12, -8, 0] }}
          transition={{ duration: 3.6 + item * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function SectionTitle({ label, title, align = "center" }) {
  return (
    <div className={`section-title ${align}`}>
      <p>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function DemoCard({ card, onNavigate }) {
  return (
    <button className="demo-card" type="button" onClick={() => onNavigate(card.id)}>
      <img src={card.image} alt="" />
      <div>
        <span>{card.label}</span>
        <strong>{card.title}</strong>
        <p>{card.copy}</p>
      </div>
    </button>
  );
}

function useLivePrice() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let active = true;
    let timer;

    async function loadPrice() {
      try {
        const response = await fetch(DEXSCREENER_API, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`Price request failed: ${response.status}`);
        const pairs = await response.json();
        const sorted = Array.isArray(pairs)
          ? [...pairs].sort((a, b) => (Number(b.liquidity?.usd) || Number(b.volume?.h24) || 0) - (Number(a.liquidity?.usd) || Number(a.volume?.h24) || 0))
          : [];
        const pair = sorted[0];
        if (!pair) throw new Error("No CNYAN pair found");
        if (active) {
          setState({
            status: "ready",
            priceUsd: pair.priceUsd,
            priceNative: pair.priceNative,
            marketCap: pair.marketCap,
            fdv: pair.fdv,
            volume24h: pair.volume?.h24,
            change24h: pair.priceChange?.h24,
            dexId: pair.dexId,
            pairUrl: pair.url,
            updatedAt: new Date(),
          });
        }
      } catch (error) {
        if (active) setState({ status: "error", message: error.message });
      }
    }

    loadPrice();
    timer = window.setInterval(loadPrice, 30000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return state;
}

function formatUsd(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  if (numeric < 0.0001) return `$${numeric.toPrecision(4)}`;
  if (numeric < 1) return `$${numeric.toFixed(6)}`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 4 }).format(numeric);
}

function formatCompact(value, prefix = "") {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  return `${prefix}${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(numeric)}`;
}

function openSwap(event, url) {
  event.preventDefault();
  window.location.href = url;
}

function SwapLink({ className, href, children }) {
  return (
    <a className={className} href={href} onClick={(event) => openSwap(event, href)}>
      {children}
    </a>
  );
}

function PriceTradePanel({ compact = false }) {
  const price = useLivePrice();
  const ready = price.status === "ready";

  return (
    <div className={`price-panel ${compact ? "compact" : ""}`}>
      <div className="price-head">
        <span>Live CNYAN Price</span>
        <strong>{ready ? formatUsd(price.priceUsd) : price.status === "error" ? "Unavailable" : "Loading"}</strong>
      </div>
      <div className="price-grid">
        <HudStat label="24h" value={ready && Number.isFinite(Number(price.change24h)) ? `${Number(price.change24h).toFixed(2)}%` : "--"} />
        <HudStat label="Volume" value={ready ? formatCompact(price.volume24h, "$") : "--"} />
        <HudStat label="MCap" value={ready ? formatCompact(price.marketCap, "$") : "--"} />
      </div>
      <div className="trade-actions">
        <SwapLink className="primary-button" href={PHANTOM_SWAP_URL}>Buy CNYAN with SOL</SwapLink>
        <SwapLink className="secondary-button" href={PHANTOM_NYANMARU_TO_CNYAN_URL}>Sell NYANMARU for CNYAN</SwapLink>
        <a className="secondary-button" href={ready ? price.pairUrl : DEXSCREENER_URL} target="_blank" rel="noreferrer">Open DEX</a>
      </div>
      <p className="price-note">
        DexScreener live data. CNYAN CA: <code>{CA}</code>
        <br />
        NYANMARU sell token: <code>{NYANMARU_CA}</code>
      </p>
    </div>
  );
}

function AnswerDemo({ onNavigate }) {
  return (
    <section className="demo-page">
      <DemoTop onNavigate={onNavigate} title="AI Answer Demo" label="Route intelligence layer" />
      <div className="answer-layout">
        <div className="ask-panel">
          <span>Question</span>
          <h2>Which CNYAN route should launch next?</h2>
          <p>Route data, local participation signals, and proof availability are used to present a decision with supporting evidence.</p>
          <div className="source-row">
            <span>Tokyo Node</span>
            <span>Seoul Node</span>
            <span>Singapore Node</span>
          </div>
        </div>
        <div className="answer-panel">
          <span>Answer</span>
          <h3>Start with the Tokyo - Seoul - Taipei route.</h3>
          <p>
            This route is easy to explain, simple to verify, and strong for community posts.
            It creates a short travel story while testing both CNYAN and SOL reward paths.
          </p>
          <div className="evidence-list">
            <p>1. Proof capture requirements are easy to understand.</p>
            <p>2. Posts, translations, and community shares are easy to coordinate.</p>
            <p>3. The route can test both CNYAN and SOL rewards.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteDemo({ onNavigate }) {
  return (
    <section className="demo-page">
      <DemoTop onNavigate={onNavigate} title="Route Challenge Demo" label="Route proof network" />
      <div className="route-board">
        {["Choose a node", "Collect proof", "Verify the route", "Claim reward"].map((step, index) => (
          <div key={step} className="route-step">
            <span>0{index + 1}</span>
            <strong>{step}</strong>
            <p>{index === 0 ? "Review the target area and mission rules." : index === 1 ? "Submit photos, posts, translations, or route evidence." : index === 2 ? "Check whether the proof matches the route conditions." : "Receive the configured reward after approval."}</p>
          </div>
        ))}
      </div>
      <div className="route-map">
        <img src={mapImage} alt="Route proof map" />
      </div>
    </section>
  );
}

function DexDemo({ onNavigate }) {
  const lanes = [
    ["Quest Fees", "Posting fees create recurring CNYAN demand."],
    ["Reward Settlement", "CNYAN, SOL, and USDC rewards can settle through clear routes."],
    ["Liquidity Pools", "CNYAN-SOL liquidity supports reward conversion."],
    ["Burn + Treasury", "Fees can split between burn, treasury, and seasonal rewards."],
  ];

  return (
    <section className="demo-page">
      <DemoTop onNavigate={onNavigate} title="CNYAN DEX Concept" label="Quest-native exchange layer" />
      <div className="dex-layout">
        <PriceTradePanel />
        <div className="answer-panel">
          <span>DEX Thesis</span>
          <h3>Build the exchange and settlement layer for a challenge economy.</h3>
          <p>
            The CNYAN DEX concept is more than a swap screen. It connects quest posting fees,
            claim deposits, reward settlement, liquidity, burn mechanics, and treasury routing.
          </p>
          <div className="evidence-list">
            <p>Post Quest: posting fees create CNYAN usage.</p>
            <p>Claim Quest: deposits reduce spam and return on completion.</p>
            <p>Prove + Settle: rewards settle after AI, creator, or community review.</p>
          </div>
        </div>
        <div className="route-board dex-board">
          {lanes.map(([title, copy], index) => (
            <div key={title} className="route-step">
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoTop({ onNavigate, title, label }) {
  return (
    <div className="demo-top">
      <button className="secondary-button back-button" type="button" onClick={() => onNavigate("home")}>Back to home</button>
      <p>{label}</p>
      <h1>{title}</h1>
    </div>
  );
}

function ChallengeDemo({ onHome, onDemo }) {
  const [hunterName, setHunterName] = useState(savedName);
  const [draftName, setDraftName] = useState("");
  const [selectedId, setSelectedId] = useState("tokyo");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("globe");
  const [claimed, setClaimed] = useState(() => new Set(["taipei"]));
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selected = drops.find((drop) => drop.id === selectedId) || drops[0];
  const visibleDrops = useMemo(() => {
    const term = query.trim().toLowerCase();
    return drops.filter((drop) => {
      const matchesText = [drop.city, drop.country, drop.currency, drop.rarity].join(" ").toLowerCase().includes(term);
      const matchesFilter = filter === "all" || filter === drop.currency.toLowerCase();
      return matchesText && matchesFilter;
    });
  }, [filter, query]);

  const cnyanEarned = drops
    .filter((drop) => claimed.has(drop.id) && drop.currency === "CNYAN")
    .reduce((sum, drop) => sum + Number(drop.reward.replace(",", "")), 0);
  const solEarned = drops
    .filter((drop) => claimed.has(drop.id) && drop.currency === "SOL")
    .reduce((sum, drop) => sum + Number(drop.reward), 0);

  function startHunting(event) {
    event.preventDefault();
    const clean = draftName.trim().replace(/\s+/g, "").slice(0, 18);
    if (!clean) return;
    localStorage.setItem("cnyan-challenger-name", clean);
    setHunterName(clean);
  }

  function claimDrop(drop) {
    if (!drop) return;
    if (claimed.has(drop.id)) {
      setToast(`${drop.city} is already claimed`);
      return;
    }
    setClaimed((current) => new Set([...current, drop.id]));
    setSelectedId(drop.id);
    setToast(`Claimed ${drop.reward} ${drop.currency} in ${drop.city}`);
  }

  return (
    <>
      <div className="world-bg" />
      <div className="grid-bg" />
      <div className="scanline" />
      <TopBar name={hunterName} mode={mode} setMode={setMode} active={drops.length - claimed.size} claimedCount={claimed.size} onHome={onHome} onDemo={onDemo} />
      <section className="app-layout">
        <BountyPanel drops={visibleDrops} selectedId={selectedId} setSelectedId={setSelectedId} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} claimed={claimed} onClaim={() => claimDrop(selected)} />
        <MapStage drops={drops} mode={mode} selected={selected} setSelectedId={setSelectedId} claimed={claimed} onClaim={claimDrop} />
        <IntelPanel selected={selected} claimed={claimed} onClaim={claimDrop} cnyanEarned={cnyanEarned} solEarned={solEarned} />
      </section>
      <AnimatePresence>{!hunterName && <NameGate draftName={draftName} setDraftName={setDraftName} onSubmit={startHunting} />}</AnimatePresence>
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </>
  );
}

function TopBar({ name, mode, setMode, active, claimedCount, onHome, onDemo }) {
  return (
    <header className="topbar">
      <button className="brand-block as-button" type="button" onClick={onHome}>
        <img src={logo} alt="CNYAN" />
        <div>
          <strong>CNYAN Challenger</strong>
          <span>Tag places. Clear proof. Earn rewards.</span>
        </div>
      </button>
      <div className="topbar-actions">
        <button className="small-nav" type="button" onClick={() => onDemo("answer")}>AI Answer</button>
        <button className="small-nav" type="button" onClick={() => onDemo("route")}>Route</button>
        <div className="segmented" aria-label="Map mode">
          <button className={mode === "flat" ? "active" : ""} type="button" onClick={() => setMode("flat")}>Flat</button>
          <button className={mode === "globe" ? "active" : ""} type="button" onClick={() => setMode("globe")}>Globe</button>
        </div>
        <HudStat label="Active" value={active} />
        <HudStat label="Claimed" value={claimedCount} />
        <div className="hunter-chip"><span />{name || "Guest"}</div>
      </div>
    </header>
  );
}

function HudStat({ label, value }) {
  return (
    <div className="hud-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function BountyPanel({ drops, selectedId, setSelectedId, query, setQuery, filter, setFilter, claimed, onClaim }) {
  return (
    <aside className="panel bounty-panel">
      <div className="panel-heading">
        <p>Live board</p>
        <h1>Bounty Map</h1>
      </div>
      <label className="search-box">
        <span>Search</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="city, country, reward..." />
      </label>
      <div className="filter-row">
        {["all", "cnyan", "sol"].map((item) => (
          <button key={item} className={filter === item ? "active" : ""} type="button" onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="feed-box">
        <span>Live feed</span>
        {feed.map((item) => <p key={item}>{item}</p>)}
      </div>
      <div className="drop-list">
        {drops.map((drop) => {
          const done = claimed.has(drop.id);
          return (
            <button key={drop.id} className={`drop-card ${selectedId === drop.id ? "selected" : ""}`} type="button" onClick={() => setSelectedId(drop.id)}>
              <img src={drop.image} alt="" />
              <div className="drop-card-body">
                <div className="drop-card-top">
                  <strong>{drop.city}</strong>
                  <span>{drop.reward} {drop.currency}</span>
                </div>
                <p>{drop.country} / Rank {drop.rarity}</p>
                <div className="drop-meta">
                  <span>{drop.hunters} hunters</span>
                  <span>{done ? "claimed" : drop.time}</span>
                </div>
              </div>
              <span className={`claim-dot ${done ? "done" : ""}`} />
            </button>
          );
        })}
      </div>
      <button className="primary-button" type="button" onClick={onClaim}>Claim selected</button>
    </aside>
  );
}

function MapStage({ drops, mode, selected, setSelectedId, claimed, onClaim }) {
  return (
    <section className={`map-stage ${mode}`}>
      <div className="map-toolbar">
        <HudStat label="Next drop" value={selected.time} />
        <HudStat label="Rarity" value={selected.rarity} />
        <HudStat label="Reward" value={`${selected.reward} ${selected.currency}`} />
      </div>
      <div className="map-canvas" aria-label="CNYAN challenge map">
        {mode === "flat" ? <img className="flat-map" src={mapImage} alt="Asia challenge map" /> : <div className="globe-art"><div className="globe-shade" /><img src={mapImage} alt="Asia challenge globe texture" /></div>}
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        {drops.map((drop, index) => {
          const selectedPin = selected.id === drop.id;
          const done = claimed.has(drop.id);
          return (
            <motion.button key={drop.id} className={`map-pin ${selectedPin ? "selected" : ""} ${done ? "claimed" : ""}`} style={{ left: `${drop.x}%`, top: `${drop.y}%` }} type="button" onClick={() => setSelectedId(drop.id)} onDoubleClick={() => onClaim(drop)} initial={{ opacity: 0, scale: 0.72 }} animate={{ opacity: 1, scale: selectedPin ? 1.16 : 1 }} transition={{ delay: index * 0.04 }}>
              <img src={logo} alt="" />
              <span>{done ? "OK" : `${drop.reward} ${drop.currency}`}</span>
            </motion.button>
          );
        })}
      </div>
      <div className="map-caption">
        <strong>{selected.city}, {selected.country}</strong>
        <span>{selected.proof}</span>
      </div>
    </section>
  );
}

function IntelPanel({ selected, claimed, onClaim, cnyanEarned, solEarned }) {
  const done = claimed.has(selected.id);
  return (
    <aside className="panel intel-panel">
      <div className="selected-visual">
        <img src={selected.image} alt="" />
        <div>
          <span>Rank {selected.rarity}</span>
          <strong>{selected.reward} {selected.currency}</strong>
        </div>
      </div>
      <div className="mission-detail">
        <p>Selected mission</p>
        <h2>{selected.city}</h2>
        <span>{selected.country}</span>
        <p className="mission-copy">{selected.desc}</p>
      </div>
      <div className="proof-box">
        <span>Proof rule</span>
        <strong>{selected.proof}</strong>
      </div>
      <div className="score-grid">
        <HudStat label="CNYAN" value={cnyanEarned.toLocaleString()} />
        <HudStat label="SOL" value={solEarned.toFixed(2)} />
      </div>
      <button className="primary-button" type="button" disabled={done} onClick={() => onClaim(selected)}>{done ? "Already claimed" : "Submit proof"}</button>
      <button className="secondary-button" type="button">Route preview</button>
    </aside>
  );
}

function NameGate({ draftName, setDraftName, onSubmit }) {
  return (
    <motion.div className="gate-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form className="name-gate" onSubmit={onSubmit} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }}>
        <img src={logo} alt="CNYAN" />
        <h2>Choose your challenger name</h2>
        <p>Leaderboard and claimed missions are saved only in this browser.</p>
        <input autoFocus maxLength={18} value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="TokyoRunner, NyanScout..." />
        <div className="gate-meta"><span>No spaces</span><span>{draftName.length}/18</span></div>
        <button className="primary-button" type="submit">Start challenge</button>
      </motion.form>
    </motion.div>
  );
}

function Toast({ message }) {
  return <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>{message}</motion.div>;
}
