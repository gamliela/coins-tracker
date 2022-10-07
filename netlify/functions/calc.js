const {supportedCoins, getPrice} = require('../lib/utils-exchange');

exports.handler = async function (event) {
    console.log(`event.queryStringParameters=${JSON.stringify(event.queryStringParameters)}`);
    const requestedCoins = Object.entries(event.queryStringParameters).filter(([coin, value]) => supportedCoins.includes(coin.toUpperCase()) && !isNaN(parseFloat(value)));
    const results = {};

    for (const [coin, value] of requestedCoins) {
        try {
            const price = await getPrice(coin, "NIS");
            console.log(`price for 1 ${coin} is ${price} NIS`);
            results[coin] = price * parseFloat(value);
        } catch (e) {
            console.error(`can't get price for ${coin}`, e);
            results[coin] = 0;
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };
};
