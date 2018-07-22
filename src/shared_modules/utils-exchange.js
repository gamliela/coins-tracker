import { getJsonWithCache } from "./utils-server";

const supportedCoins = {
  "BTC": true,
  "NIS": true,
  "AMP": true,
  "ARDR": true,
  "BCH": true,
  "BCN": true,
  "BCY": true,
  "BELA": true,
  "BLK": true,
  "BTCD": true,
  "BTM": true,
  "BTS": true,
  "BURST": true,
  "CLAM": true,
  "CVC": true,
  "DASH": true,
  "DCR": true,
  "DGB": true,
  "DOGE": true,
  "EMC2": true,
  "ETC": true,
  "ETH": true,
  "EXP": true,
  "FCT": true,
  "FLDC": true,
  "FLO": true,
  "GAME": true,
  "GAS": true,
  "GNO": true,
  "GNT": true,
  "GRC": true,
  "HUC": true,
  "LBC": true,
  "LSK": true,
  "LTC": true,
  "MAID": true,
  "NAV": true,
  "NEOS": true,
  "NMC": true,
  "NXC": true,
  "NXT": true,
  "OMG": true,
  "OMNI": true,
  "PASC": true,
  "PINK": true,
  "POT": true,
  "PPC": true,
  "RADS": true,
  "REP": true,
  "RIC": true,
  "SBD": true,
  "SC": true,
  "STEEM": true,
  "STORJ": true,
  "STR": true,
  "STRAT": true,
  "SYS": true,
  "VIA": true,
  "VRC": true,
  "VTC": true,
  "XBC": true,
  "XCP": true,
  "XEM": true,
  "XMR": true,
  "XPM": true,
  "XRP": true,
  "XVC": true,
  "ZEC": true,
  "ZRX": true
};

function getPrice(c1, c2) {
  return Promise
    .all([getPricePoloniex(c1), getPriceBit2c(c2)])
    .then(values => values[0] * values[1]);
}

function getPricePoloniex(c) {
  if (c === "BTC")
    return Promise.resolve(1);
  else if (c === "NIS")
    return getPriceBit2c(c).then(value => 1 / value);
  else
    return getJsonWithCache("https://poloniex.com/public?command=returnTicker").then(json => {
      const data = json[`BTC_${c}`];
      if (data && data.last)
        return data.last;
      else
        throw new Error("coin is not supported");
    });
}

// note that Bit2c currently doesn't support CORS, so we use https://cors-anywhere.herokuapp.com/ service to solve this.
function getPriceBit2c(c) {
  if (c === "BTC")
    return Promise.resolve(1);
  else if (c === "NIS")
    return getJsonWithCache("https://cors-anywhere.herokuapp.com/http://bit2c.co.il/Exchanges/BtcNis/Ticker.json").then(json => json.ll);
  else
    return Promise.reject("coin is not supported");
}

export { supportedCoins, getPrice };
