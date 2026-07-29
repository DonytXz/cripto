import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/img/whiteLogo.png";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { AppSettings } from "../../config/app-settings.js";
import { getCoins } from "../../services/Market.js";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

function formatPrice(value) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (value < 1) {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })}`;
  }

  return currencyFormatter.format(value);
}

function Landing() {
  const context = useContext(AppSettings);
  const [coins, setCoins] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const isAuthenticated = Boolean(
    localStorage.getItem("id") && localStorage.getItem("token"),
  );

  useEffect(() => {
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentClass("p-0");
    document.body.classList.add("market-landing-active");

    return () => {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentClass("");
      document.body.classList.remove("market-landing-active");
    };
  }, []);

  const loadCoins = useCallback(async () => {
    setStatus("loading");

    try {
      const response = await getCoins();
      setCoins(response);
      setStatus("success");
    } catch (error) {
      console.error("Unable to load market data.", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadCoins();
  }, [loadCoins]);

  const filteredCoins = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return coins;
    }

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(normalizedQuery) ||
        coin.symbol.toLowerCase().includes(normalizedQuery),
    );
  }, [coins, query]);

  return (
    <main className="market-landing">
      <nav className="market-nav" aria-label="Main navigation">
        <Link to="/" className="market-brand" aria-label="Tradia home">
          <img src={logo} alt="Tradia" />
        </Link>
        <Link
          to={isAuthenticated ? "/home" : "/pages/login"}
          className="btn btn-outline-theme market-login"
        >
          <i
            className={`bi ${isAuthenticated ? "bi-speedometer2" : "bi-box-arrow-in-right"}`}
            aria-hidden="true"
          />
          {isAuthenticated ? "Open dashboard" : "Log in"}
        </Link>
      </nav>

      <section className="market-hero">
        <div className="market-hero-copy">
          <span className="market-eyebrow">LIVE CRYPTO MARKET</span>
          <h1>Follow the market.<br />Trade with context.</h1>
          <p>
            Track leading cryptocurrencies in one clear view, then sign in to
            access Tradia&apos;s prediction dashboard.
          </p>
        </div>
        <div className="market-orbit" aria-hidden="true">
          <span className="market-orbit-ring market-orbit-ring-one" />
          <span className="market-orbit-ring market-orbit-ring-two" />
          <span className="market-orbit-core">
            <i className="bi bi-graph-up-arrow" />
          </span>
        </div>
      </section>

      <section className="market-panel" aria-labelledby="market-title">
        <div className="market-panel-header">
          <div>
            <span className="market-kicker">MARKET OVERVIEW</span>
            <h2 id="market-title">Top cryptocurrencies</h2>
            <p>Ranked by market capitalization · Prices in USD</p>
          </div>
          <label className="market-search">
            <span className="visually-hidden">Search coins</span>
            <i className="bi bi-search" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search coins"
              disabled={status !== "success"}
            />
          </label>
        </div>

        {status === "loading" ? (
          <div className="market-state" role="status">
            <LoadingIndicator />
            <span>Loading the latest prices…</span>
          </div>
        ) : status === "error" ? (
          <div className="market-state market-state-error" role="alert">
            <i className="bi bi-cloud-slash" aria-hidden="true" />
            <h3>Market data is temporarily unavailable</h3>
            <p>Check your connection or try again in a moment.</p>
            <button
              type="button"
              className="btn btn-outline-theme"
              onClick={loadCoins}
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="market-table-wrap">
            <table className="market-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Asset</th>
                  <th scope="col">Price</th>
                  <th scope="col">24h</th>
                  <th scope="col">Market cap</th>
                  <th scope="col">Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin) => {
                  const change = coin.price_change_percentage_24h;
                  const isPositive = Number.isFinite(change) && change >= 0;

                  return (
                    <tr key={coin.id}>
                      <td className="market-rank">
                        {coin.market_cap_rank ?? "—"}
                      </td>
                      <td>
                        <div className="market-asset">
                          <img src={coin.image} alt="" loading="lazy" />
                          <span>
                            <strong>{coin.name}</strong>
                            <small>{coin.symbol.toUpperCase()}</small>
                          </span>
                        </div>
                      </td>
                      <td className="market-price">
                        {formatPrice(coin.current_price)}
                      </td>
                      <td>
                        <span
                          className={`market-change ${
                            isPositive ? "is-positive" : "is-negative"
                          }`}
                        >
                          <i
                            className={`bi ${
                              isPositive ? "bi-caret-up-fill" : "bi-caret-down-fill"
                            }`}
                            aria-hidden="true"
                          />
                          {Number.isFinite(change)
                            ? `${Math.abs(change).toFixed(2)}%`
                            : "—"}
                        </span>
                      </td>
                      <td>{compactCurrencyFormatter.format(coin.market_cap)}</td>
                      <td>{compactCurrencyFormatter.format(coin.total_volume)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredCoins.length === 0 && (
              <div className="market-empty" role="status">
                No coins match &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="market-footer">
        <span>TRADIA</span>
        <p>Market prices are informational and do not constitute financial advice.</p>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}

export default Landing;
