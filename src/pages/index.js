import React from "react";
import { getUrlParameters, niceNumber } from "../shared_modules/utils-js";
import { getPrice, supportedCoins } from "../shared_modules/utils-exchange";

function nisNumber(number) {
  if (typeof(number === "number") && !isNaN(number))
    return `${niceNumber(number)} NIS`;
  else
    return "Loading...";
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>
          Total: {nisNumber(this.state.coins && this.state.coins.reduce((sum, coin) => sum + this.state[coin[0]], 0))}</h1>
        <ul>
          {this.state.coins && this.state.coins.map((coin, key) => (
            <li key={key}>{coin[0]}: {coin[1]} = {nisNumber(this.state[coin[0]])}</li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const pageParams = getUrlParameters();
    const coins = Object.entries(pageParams).filter(obj => supportedCoins[obj[0]] && !isNaN(parseFloat(obj[1])));
    this.setState({ coins });
    coins.forEach(coin => {
      getPrice(coin[0], "NIS").then(price => {
        this.setState({ [coin[0]]: price * parseFloat(coin[1]) });
      });
    });
  }
}

export default IndexPage;
