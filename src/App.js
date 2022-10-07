import {useState, useEffect} from "react";
import Layout from "./layouts";
import {getUrlParameters, niceNumber} from "./shared_modules/utils-js";

function nisNumber(number) {
    if (typeof (number === "number") && !isNaN(number))
        return `${niceNumber(number)} NIS`;
    else
        return "Loading...";
}

function App() {
    const [requestedCoins, setRequestedCoins] = useState([]);
    const [results, setResults] = useState({});

    useEffect(() => {
        const pageParams = getUrlParameters();
        setRequestedCoins(Object.entries(pageParams).filter(([_, value]) => !isNaN(parseFloat(value))));
        window.fetch(`/.netlify/functions/calc${window.location.search}`).then((response) => response.json()).then(setResults).catch(console.error);
    }, []);

    return (
        <Layout>
            <h1>
                Total: {nisNumber(Object.keys(results).reduce((sum, coin) => sum + results[coin], 0))}
            </h1>
            <ul>
                {requestedCoins.map(([requestedCoin, requestedAmount], key) => (
                    <li key={key}>{requestedCoin}: {requestedAmount} = {nisNumber(results[requestedCoin])}</li>
                ))}
            </ul>
        </Layout>
    );
}

export default App;
