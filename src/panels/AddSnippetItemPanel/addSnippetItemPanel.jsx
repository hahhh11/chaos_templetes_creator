import React, { useEffect, useState, useRef } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, notification } from "antd";
import "./addSnippetItemPanel.less";

const { TextArea } = Input;
export const AddSnippetItemPanel = (props) => {

    const { close, keyList, editNewSnippetItem } = props

    const nameRef = useRef()
    const descRef = useRef()
    const prefixRef = useRef()

    useEffect(() => {
        // didmount
        return () => {
            //willunmount
        }
    }, [])


    const onClick_sureBtn = () => {
        // 校验是否填写内容
        console.log(nameRef, descRef, prefixRef)
        let pass = true
        let msg = "请先填写片段名"
        let name = nameRef.current.state.value ? nameRef.current.state.value.replace(/\s/g, '') : ""
        let desc = descRef.current.resizableTextArea.props.value
        let prefix = prefixRef.current.state.value
        if (!prefixRef.current.state.value || prefixRef.current.state.value === "") {
            msg = "请先填写快捷命令"
            pass = false
        }
        if (!name || name === "") {
            msg = "请先填写片段名"
            pass = false
        }
        if (keyList && keyList.length > 0) {
            keyList.map(key => {
                if (key == "custom_" + name) {
                    msg = "片段名重复，请换个名字"
                    pass = false
                }
            })
        }
        if (!pass) {
            notification.open({
                message: msg,
            });
            return
        }
        let data = { spName: name, spDesc: desc, spPrefix: prefix }
        editNewSnippetItem && editNewSnippetItem(data)
        close && close()
    }

    const onClick_cancelBtn = () => {
        close && close()
    }

    return (
        <div className='addSnippetItemPanel'>
            <div className="addSnippetItemPanelBg" >
                <h4>新增代码片段</h4>
                <hr />
                <div className="content">
                    <Input className="spName" ref={nameRef} size="large" placeholder="片段名" allowClear />
                    <TextArea className="spDesc" ref={descRef} size="large" placeholder="片段描述" allowClear />
                    <Input className="spPrefix" ref={prefixRef} size="large" placeholder="快捷命令" allowClear />
                </div>
                <div className="btns">
                    <Button className="cancelBtn" danger onClick={() => { onClick_cancelBtn() }}>取消</Button>
                    <Button type="primary" className="sureBtn" onClick={() => { onClick_sureBtn() }}>确认</Button>
                </div>
            </div>
        </div >
    )

}
