import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CA = "Ayfr5kqa2VsXzo8D2CB59pUaLCeG5GnVHod4ixutpump";
const SOL_CAIP = "solana:101/address:So11111111111111111111111111111111111111112";
const CNYAN_CAIP = `solana:101/address:${CA}`;
const PUBLIC_SITE_URL = "https://challengecat.github.io/challengecat-cnyan/";
const DEXSCREENER_API = `https://api.dexscreener.com/token-pairs/v1/solana/${CA}`;
const DEXSCREENER_URL = `https://dexscreener.com/solana/${CA}`;
const PHANTOM_SWAP_URL = `https://phantom.app/ul/v1/swap?buy=${encodeURIComponent(CNYAN_CAIP)}&sell=${encodeURIComponent(SOL_CAIP)}`;
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
    copy: "都市ごとのミッションを選び、Proofを提出し、CNYANまたはSOLの報酬を受け取る体験を確認できます。",
    image: images.challenge,
  },
  {
    id: "answer",
    title: "AI Answer Demo",
    label: "Route intelligence",
    copy: "ルート情報、地域、Proofの集まりやすさをもとに、質問、根拠、回答までを一画面で見せるAI回答デモです。",
    image: images.trade,
  },
  {
    id: "route",
    title: "Route Challenge Demo",
    label: "Route proof",
    copy: "探索ルート、Proof提出、検証、報酬の受け取りまでの流れをチャレンジ形式で確認できます。",
    image: images.travel,
  },
  {
    id: "dex",
    title: "CNYAN DEX Concept",
    label: "Swap / Liquidity / Rewards",
    copy: "CNYANの投稿fee、報酬決済、流動性、バーン、トレジャリーをつなぐDEX構想です。",
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
      <section className="intro-hero">
        <img className="intro-hero-bg" src={images.hero} alt="" />
        <FloatingCoins />
        <div className="hero-copy">
          <p>CNYAN Network</p>
          <SplitHeading text="WE ARE CNYAN" />
          <span>
            CNYANは、ミッションを作る人、挑戦する人、Proofを提出する人をつなぐコミュニティ報酬ネットワークです。紹介から各デモまで、ひとつの流れで体験できます。
          </span>
          <div className="hero-actions">
            <button className="primary-button sized" type="button" onClick={() => onNavigate("challenge")}>Launch challenge</button>
            <a className="secondary-link" href="#demo-directory">Explore demos</a>
          </div>
          <PriceTradePanel compact />
        </div>
      </section>
      <section id="demo-directory" className="section">
        <SectionTitle label="Demo Hub" title="CNYANの主要デモへすぐ移動できます" />
        <div className="demo-grid">
          {demoCards.map((card) => (
            <DemoCard key={card.id} card={card} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
      <section className="section split-section">
        <div>
          <SectionTitle label="What CNYAN does" title="ミッション、Proof、報酬をひとつの流れに" align="left" />
          <p>
            CNYANは、コミュニティが依頼を作り、参加者が成果を示し、承認後に報酬を受け取る仕組みをわかりやすく見せるためのプロトタイプです。
            トップで全体像を伝え、下のカードから各デモへ自然に進める構成にしています。
          </p>
        </div>
        <div className="feature-list">
          <button type="button" onClick={() => onNavigate("challenge")}>Challenge: ミッションを選んでProofを提出</button>
          <button type="button" onClick={() => onNavigate("answer")}>AI Answer: ルート情報から回答を生成</button>
          <button type="button" onClick={() => onNavigate("route")}>Route: ルートを検証して報酬へ進む</button>
          <button type="button" onClick={() => onNavigate("dex")}>DEX: Swap、流動性、報酬決済を設計</button>
        </div>
      </section>
    </>
  );
}

function SplitHeading({ text }) {
  const accentStart = text.indexOf("CNYAN");
  return (
    <h1 className="split-heading" aria-label={text}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className={letter === " " ? "space" : accentStart >= 0 && index >= accentStart ? "accent" : ""}
          initial={{ opacity: 0, y: 34, rotate: index % 2 ? 5 : -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.08 * index, duration: 0.48, ease: "easeOut" }}
        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>
      ))}
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

function PriceTradePanel({ compact = false }) {
  const price = useLivePrice();
  const ready = price.status === "ready";

  return (
    <div className={`price-panel ${compact ? "compact" : ""}`}>
      <div className="price-head">
        <span>Live CNYAN Price</span>
        <strong>{ready ? formatUsd(price.priceUsd) : price.status === "error" ? "取得待ち" : "Loading"}</strong>
      </div>
      <div className="price-grid">
        <HudStat label="24h" value={ready && Number.isFinite(Number(price.change24h)) ? `${Number(price.change24h).toFixed(2)}%` : "--"} />
        <HudStat label="Volume" value={ready ? formatCompact(price.volume24h, "$") : "--"} />
        <HudStat label="MCap" value={ready ? formatCompact(price.marketCap, "$") : "--"} />
      </div>
      <div className="trade-actions">
        <a className="primary-button" href={PHANTOM_SWAP_URL} target="_blank" rel="noreferrer">Open Phantom Swap</a>
        <a className="secondary-button" href={ready ? price.pairUrl : DEXSCREENER_URL} target="_blank" rel="noreferrer">View chart</a>
      </div>
      <p className="price-note">
        DexScreener live data. CA: <code>{CA}</code>
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
          <h2>次に公開すべきCNYANルートは？</h2>
          <p>地域データ、参加しやすさ、Proofの集まりやすさを参照し、回答と根拠をまとめて表示します。</p>
          <div className="source-row">
            <span>Tokyo Node</span>
            <span>Seoul Node</span>
            <span>Singapore Node</span>
          </div>
        </div>
        <div className="answer-panel">
          <span>Answer</span>
          <h3>最初は Tokyo - Seoul - Taipei ルートが最適です。</h3>
          <p>
            このルートは現地Proofを集めやすく、コミュニティ投稿も増やしやすい構成です。短い移動ストーリーを作れるため、最初の公開デモとして説明しやすくなります。
          </p>
          <div className="evidence-list">
            <p>1. Proof撮影の条件がわかりやすい。</p>
            <p>2. 投稿・翻訳・拡散の参加者を集めやすい。</p>
            <p>3. CNYAN報酬とSOL報酬の両方をテストできる。</p>
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
      <div className="odyssey-board">
        {["ノードを選ぶ", "Proofを集める", "ルートを検証する", "報酬を受け取る"].map((step, index) => (
          <div key={step} className="route-step">
            <span>0{index + 1}</span>
            <strong>{step}</strong>
            <p>{index === 0 ? "対象エリアとミッション条件を確認します。" : index === 1 ? "写真、投稿、翻訳などの証跡を提出します。" : index === 2 ? "提出内容がルート条件を満たしているか確認します。" : "承認後、設定された報酬を受け取ります。"}</p>
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
    ["Quest Fees", "Challenge投稿feeをCNYAN需要として設計。"],
    ["Reward Settlement", "CNYAN / SOL / USDC報酬を安全に決済。"],
    ["Liquidity Pools", "CNYAN-SOLを中心にルート流動性を形成。"],
    ["Burn + Treasury", "一部をバーン、一部をトレジャリーへ配分。"],
  ];

  return (
    <section className="demo-page">
      <DemoTop onNavigate={onNavigate} title="CNYAN DEX Concept" label="Quest-native exchange layer" />
      <div className="dex-layout">
        <PriceTradePanel />
        <div className="answer-panel">
          <span>DEX Thesis</span>
          <h3>チャレンジ経済圏に必要な交換・決済レイヤーを作る。</h3>
          <p>
            CNYAN DEXは単なるSwap画面ではなく、Quest投稿fee、Claim deposit、報酬決済、流動性、バーン、トレジャリーをつなぐための設計です。
            Quest Protocolの活動量が、そのままCNYANの利用文脈になります。
          </p>
          <div className="evidence-list">
            <p>Post Quest: 投稿feeがCNYAN需要を作る。</p>
            <p>Claim Quest: depositで荒らしを抑え、完了時に返却する。</p>
            <p>Prove + Settle: AI/creator/community確認後に報酬を決済する。</p>
          </div>
        </div>
        <div className="odyssey-board dex-board">
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
