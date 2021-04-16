"use strict";

import React, { Component } from "react";

export class Layer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
    };
    this.props.parent.show = this.show;
    this.props.parent.close = this.close;
    this.props.parent.closeAll = this.closeAll;
  }

  async componentDidMount() {}

  componentWillUnmount() {
    this.setState = () => 0;
  }

  /**
   * 显示弹窗 带队列带
   * @param panel 弹窗类
   * @param props 要传递的数据，会放在props里
   */
  show = (panel, props) => {
    const p = React.createElement(panel, {
      close: this.close,
      closeAllPanel: this.closeAll,
      ...props,
    });

    this.state.queue.unshift(p);
    this.setState({
      queue: this.state.queue,
    });
  };

  // 关闭弹窗
  close = () => {
    this.state.queue.shift();
    this.setState({
      queue: this.state.queue,
    });
  };

  // 关闭所有弹窗
  closeAll = () => {
    this.state.queue.length = 0;
    this.setState({
      queue: [],
    });
  };

  getPanel = () => {
    const { queue } = this.state;
    if (!queue || queue.length <= 0) return <></>;
    // const panels = [];
    // queue.forEach((v, index) => {
    //   panels.push(
    //     <div
    //       style={{ display: index === 0 ? "block" : "none" }}
    //       key={v.type.name + Date.now()}
    //     >
    //       {v}
    //     </div>
    //   );
    // });
    return (
      <div className="modal-bg">
        {/*{panels}*/}
        {queue[0]}
      </div>
    );
  };

  render() {
    return this.getPanel();
  }
}

export class PanelCtrl {
  static _ins = null;
  static get ins() {
    return PanelCtrl._ins || (PanelCtrl._ins = new PanelCtrl());
  }

  dom = (<></>);

  constructor() {
    this.dom = React.createElement(Layer, { parent: this });
  }

  render() {
    return this.dom;
  }
}

export class TopLayer {
  static _ins = null;
  static get ins() {
    return TopLayer._ins || (TopLayer._ins = new TopLayer());
  }

  dom = (<></>);

  constructor() {
    this.dom = React.createElement(Layer, { parent: this });
  }

  render() {
    return this.dom;
  }
}
