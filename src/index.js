

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Layer,
  PanelCtrl,
  TopLayer
} from "../src/components/Layer/layer.jsx";
import { CustomSnippetsList } from "./pages/CustomSnippetsList/customSnippetsList";
if (!window.snippetsJson) {
  window.snippetsJson = {
    "custom_xxxxx": {
      "prefix": "cl",
      "body": [
        "console.log(${1})",
        "//dadfasdf",
        "//asdfasdf"
      ],
      "description": "打印"
    },
    "custom_yyyyy": {
      "prefix": "cl",
      "body": [
        "console.log(${1})"
      ],
      "description": "打印"
    },
    "custom_zzzzz": {
      "prefix": "cl",
      "body": [
        "console.log(${1})"
      ],
      "description": "打印"
    }
  }
}

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
        <CustomSnippetsList snippetsJson={window.snippetsJson} />
        {PanelCtrl.ins.render()}
        {TopLayer.ins.render()}
      </div>
    );
  }
}

ReactDOM.render(< App />, document.getElementById("root"));
