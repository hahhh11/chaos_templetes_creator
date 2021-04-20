

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom"
import "./index.css";
import {
  Layer,
  PanelCtrl,
  TopLayer
} from "../src/components/Layer/layer.jsx";
import { CustomSnippetsList } from "./pages/snippets/customList/customList";
import PageError from "./pages/pageError/pageError";
import { PreviewLottie } from "./pages/lotties/preview/preview";


// 获取屏幕宽度

var width = document.documentElement.clientWidth

// 设置根元素字体大小。此时为宽的10等分

document.documentElement.style.fontSize = width / 70 + 'px'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: null,
    };
  }

  componentDidMount() {

  }

  render() {
    const { } = this.state;
    return (
      <div className="app" >

        <BrowserRouter>
          <Switch>
            <Route path="/" component={PreviewLottie} />
            <Route path="/snippets/commonList/:page" component={CustomSnippetsList} />
            <Route path="/snippets/customList/:page" component={CustomSnippetsList} />
            <Route path="/lottie/preview" component={PreviewLottie} />
            <PageError Component={PageError} />
          </Switch>
        </BrowserRouter>
        {PanelCtrl.ins.render()}
        {TopLayer.ins.render()}
      </div>

    );
  }
}

ReactDOM.render(< App />, document.getElementById("root"));
