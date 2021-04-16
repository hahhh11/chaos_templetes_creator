import React, { useEffect, useState, useRef } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, notification } from "antd";
import "./deleteWarningPanel.less";

export const DeleteWarningPanel = (props) => {

    const { close, deleteFunc } = props

    const checkRef = useRef()

    useEffect(() => {
        // didmount
        return () => {
            //willunmount
        }
    }, [])


    const onClick_sureBtn = () => {
        // 校验是否填写内容
        console.log(checkRef)
        let pass = true
        let msg = "请先填写片段名"

        if (!pass) {
            notification.open({
                message: msg,
            });
            return
        }
        deleteFunc()
        close && close()
    }

    const onClick_cancelBtn = () => {
        close && close()
    }

    return (
        <div className='addSnippetItemPanel'>
            <div className="addSnippetItemPanelBg" >
                <h4>是否确认删除</h4>
                <hr />
                <div className="content">
                    <Input className="checkInput" ref={checkRef} size="large" placeholder="输入确认删除" allowClear />
                </div>
                <div className="btns">
                    <Button className="cancelBtn" danger onClick={() => { onClick_cancelBtn() }}>我手抖了</Button>
                    <Button type="primary" className="sureBtn" onClick={() => { onClick_sureBtn() }}>确认删除</Button>
                </div>
            </div>
        </div >
    )

}
