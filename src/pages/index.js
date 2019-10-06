import React from "react";
import TemplateWrapper from "../layouts";
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
      <TemplateWrapper>
        <h1>
          Total: {nisNumber(this.state.coins && this.state.coins.reduce((sum, coin) => sum + this.state[coin[0]], 0))}</h1>
        <ul>
          {this.state.coins && this.state.coins.map((coin, key) => (
            <li key={key}>{coin[0]}: {coin[1]} = {nisNumber(this.state[coin[0]])}</li>
          ))}
        </ul>
      </TemplateWrapper>
    );
  }

  componentDidMount() {
    const pageParams = getUrlParameters();
    const coins = Object.entries(pageParams).filter(obj => supportedCoins.includes(obj[0]) && !isNaN(parseFloat(obj[1])));
    this.setState({ coins });
    coins.forEach(coin => {
      getPrice(coin[0], "NIS").then(price => {
        console.log(`price for 1 ${coin[0]} is ${price} NIS`);
        this.setState({ [coin[0]]: price * parseFloat(coin[1]) });
      }).catch((e) => {
        console.error(`can't get price for ${coin[0]}`, e)
        this.setState({ [coin[0]]: 0 });
      });
    });
  }
}

export default IndexPage;
