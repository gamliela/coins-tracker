const {getJsonWithCache} = require("./utils-server");

const poloniexSupportedCoins = [
    "ARDR",
    "BCH",
    "BCN",
    "BCY",
    "BELA",
    "BLK",
    "BTCD",
    "BTM",
    "BTS",
    "BURST",
    "CLAM",
    "CVC",
    "DASH",
    "DCR",
    "DGB",
    "DOGE",
    "EMC2",
    "ETC",
    "ETH",
    "EXP",
    "FCT",
    "FLDC",
    "FLO",
    "GAME",
    "GAS",
    "GNO",
    "GNT",
    "GRC",
    "HUC",
    "LBC",
    "LSK",
    "LTC",
    "MAID",
    "NAV",
    "NEOS",
    "NMC",
    "NXC",
    "NXT",
    "OMG",
    "OMNI",
    "PASC",
    "PINK",
    "POT",
    "PPC",
    "RADS",
    "REP",
    "RIC",
    "SBD",
    "SC",
    "STEEM",
    "STORJ",
    "STR",
    "STRAT",
    "SYS",
    "VIA",
    "VRC",
    "VTC",
    "XBC",
    "XCP",
    "XEM",
    "XMR",
    "XPM",
    "XRP",
    "XVC",
    "ZEC",
    "ZRX"
];

const bilaxySymbols = {
    "ZP": 78
};

const bilaxySupportedCoins = Object.keys(bilaxySymbols);

const coinGeckoIds = {
    "BNT": "bancor",
    "AMP": "synereo"
};

const coinGeckoSupportedCoins = Object.keys(coinGeckoIds);

const supportedCoins = [
    "BTC",
    "NIS",
].concat(poloniexSupportedCoins).concat(bilaxySupportedCoins).concat(coinGeckoSupportedCoins);

function getPrice(c1, c2) {
    if (bilaxySymbols[c1])
        return Promise
            .all([getPriceBilaxy(c1), getPricePoloniex("ETH"), getPriceBit2c(c2)])
            .then(values => values[0] * values[1] * values[2]);
    else if (coinGeckoIds[c1])
        return Promise
            .all([getPriceCoinGecko(c1), getPriceBit2c(c2)])
            .then(values => values[0] * values[1]);
    else
        return Promise
            .all([getPricePoloniex(c1), getPriceBit2c(c2)])
            .then(values => values[0] * values[1]);
}

function getPriceBilaxy(c) {
    return getJsonWithCache("http://api.bilaxy.com/v1/tickers").then(json => {
        const data = json.data.filter(entry => entry.symbol === bilaxySymbols[c])[0];
        if (data && data.last)
            return parseFloat(data.last);
        else
            throw new Error("coin is not supported");
    });
}

function getPriceCoinGecko(c) {
    return getJsonWithCache(`https://api.coingecko.com/api/v3/coins/${coinGeckoIds[c]}`).then(json => {
        const data = json.market_data.current_price;
        if (data && data.btc)
            return parseFloat(data.btc);
        else
            throw new Error("coin is not supported");
    });
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
                return parseFloat(data.last);
            else
                throw new Error("coin is not supported");
        });
}

function getPriceBit2c(c) {
    if (c === "BTC")
        return Promise.resolve(1);
    else if (c === "NIS")
        return getJsonWithCache("http://bit2c.co.il/Exchanges/BtcNis/Ticker.json").then(json => parseFloat(json.ll));
    else
        return Promise.reject("coin is not supported");
}

module.exports = {supportedCoins, getPrice};
