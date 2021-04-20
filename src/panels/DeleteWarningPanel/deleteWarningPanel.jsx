import React, { useEffect, useState, useRef } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, notification } from "antd";
import "./deleteWarningPanel.less";

export const DeleteWarningPanel = (props) => {

    const { close, deleteFunc, deleteKey } = props

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
        let msg = "请输入“确认删除”"
        console.log(checkRef.current.state)
        if (!(checkRef?.current?.state?.value) || checkRef.current.state.value !== "确认删除") {
            pass = false
        }
        if (!pass) {
            notification.open({
                message: msg,
            });
            return
        }
        deleteFunc(deleteKey)
        close && close()
    }

    const onClick_cancelBtn = () => {
        close && close()
    }

    return (
        <div className='deleteSnippetItemPanel'>
            <div className="deleteSnippetItemPanelBg" >
                <h4>删除自定义片段</h4>
                <hr />
                <div className="content">
                    <Input className="checkInput" ref={checkRef} size="large" placeholder="请输入“确认删除”" allowClear />
                </div>
                <div className="btns">
                    <Button type="primary" className="cancelBtn" onClick={() => { onClick_cancelBtn() }}>取消</Button>
                    <Button type="primary" danger className="sureBtn" onClick={() => { onClick_sureBtn() }}>删除</Button>
                </div>
            </div>
        </div >
    )

}
