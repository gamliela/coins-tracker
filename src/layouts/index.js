import React from "react";

import "./index.css";

const Header = () => (
    <div
        style={{
            background: "rebeccapurple",
            marginBottom: "1.45rem"
        }}
    >
        <div
            style={{
                margin: "0 auto",
                maxWidth: 960,
                padding: "1.45rem 1.0875rem"
            }}
        >
            <h1 style={{margin: 0, color: "white"}}>
                My Coins Balance
            </h1>
        </div>
    </div>
);

const TemplateWrapper = ({children}) => (
    <>
        <Header/>
        <div
            style={{
                margin: "0 auto",
                maxWidth: 960,
                padding: "0px 1.0875rem 1.45rem",
                paddingTop: 0
            }}
        >
            {children}
        </div>
    </>
);

export default TemplateWrapper;
