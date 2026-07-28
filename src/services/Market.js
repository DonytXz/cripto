import axios from "axios";

const MARKET_API =
  import.meta.env.VITE_MARKET_API || "https://api.coingecko.com/api/v3";

export const getCoins = async ({ currency = "usd", limit = 20 } = {}) => {
  const response = await axios.get(`${MARKET_API}/coins/markets`, {
    params: {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: limit,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h",
    },
  });

  return Array.isArray(response.data) ? response.data : [];
};
