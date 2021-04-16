import { useEffect, useState } from "react";
import { CodeEditor } from "../../components/CodeEditor/codeEditor";
import { Button } from 'antd';
import '../../styles/common.less';
import './customSnippetsList.less';
import piceUrl from "../../images/pice.jpg";
import addUrl from "../../images/add.png"
import { AddSnippetItemPanel } from "../../panels/AddSnippetItemPanel/addSnippetItemPanel";
import { PanelCtrl } from "../../components/Layer/layer";
import { DeleteWarningPanel } from "../../panels/DeleteWarningPanel/deleteWarningPanel";

export const CustomSnippetsList = (props) => {
    let { snippetsJson } = props
    let snippetsKeys = snippetsJson ? Object.keys(snippetsJson) : []
    let _customSnippetsKeys = []
    snippetsKeys.map(snippetKey => {
        if (snippetKey.split("custom_").length > 1) {
            _customSnippetsKeys.push({ key: snippetKey, val: snippetsJson[snippetKey] })
        }
    })
    const [snippetsList, setSnippetList] = useState(snippetsJson)
    const [customSnippetsKeys, setCustomSnippetsKeys] = useState(_customSnippetsKeys)
    const [showEditor, setShowEditor] = useState(false)
    const [newSnippetData, setNewSnippetData] = useState({ spName: '', spDesc: '', spPrefix: '' })
    const [currCode, setCurrCode] = useState("//请输入代码片段")
    const [currKey, setCurrKey] = useState(undefined)


    useEffect(() => {
        return () => {

        }
    }, [])

    useEffect(() => {
        // 更新列表

    }, [snippetsList])

    useEffect(() => {

    }, [currCode])

    const editSnippet = (key) => {
        setCurrKey(key)
        setShowEditor(true)

        if (snippetsList[key]?.body && snippetsList[key].body.length > 0) {

            let data = { spName: key, spDesc: snippetsList[key].description, spPrefix: snippetsList[key].prefix }
            setNewSnippetData(data)
            let allCode = ""
            snippetsList[key] && snippetsList[key].body && snippetsList[key].body.forEach(code => {
                allCode += code + "\n"
            });
            setCurrCode(allCode)
        } else {
            setCurrCode("//请输入代码片段")
        }
    }

    const deleteSnippet = (key) => {
        let nList = {}
        snippetsKeys = snippetsList ? Object.keys(snippetsList) : []
        snippetsKeys.map(_key => {
            if (_key !== key) {
                nList[_key] = snippetsList[_key]
            }
        })
        setSnippetList(nList)
        snippetsKeys = nList ? Object.keys(nList) : []
        let _customSnippetsKeys = []
        snippetsKeys.map(snippetKey => {
            if (snippetKey.split("custom_").length > 1) {
                _customSnippetsKeys.push({ key: snippetKey, val: nList[snippetKey] })
            }
        })
        setCustomSnippetsKeys(_customSnippetsKeys)
        if (window.nVscode) {
            window.nVscode.postMessage({
                command: 'deleteSnippets',
                snippets: JSON.stringify(nList)
            })
        }
    }

    const saveSnippet = () => {
        let key = currKey

        let nList = snippetsList
        nList[key] = {
            prefix: newSnippetData.spPrefix,
            body: currCode.split("\n"),
            description: newSnippetData.spDesc
        }
        setSnippetList(nList)
        let snippetsKeys = nList ? Object.keys(nList) : []
        let _customSnippetsKeys = []
        snippetsKeys.map(snippetKey => {
            if (snippetKey.split("custom_").length > 1) {
                _customSnippetsKeys.push({ key: snippetKey, val: nList[snippetKey] })
            }
        })
        setCustomSnippetsKeys(_customSnippetsKeys)
        setShowEditor(false)


        if (window.nVscode) {
            window.nVscode.postMessage({
                command: 'saveSnippets',
                snippets: JSON.stringify(nList)
            })
        }

    }

    const cancelEditSnippet = () => {
        setShowEditor(false)
    }

    const updateCode = (code) => {
        setCurrCode(code)
    }

    const editNewSnippetItem = (data) => {
        setNewSnippetData(data)
        setCurrKey("custom_" + data.spName)
        setShowEditor(true)
        setCurrCode("//请输入代码片段")
    }
    const addSnippetItem = () => {
        PanelCtrl.ins.show(AddSnippetItemPanel, { editNewSnippetItem: editNewSnippetItem, keyList: Object.keys(snippetsList) })
    }

    // const saveCode = (key, codeArr) => {
    //     snippetsJson[key].body = codeArr
    // }
    const sureFunc = () => {

    }

    const cancelFunc = () => {

    }

    const showDeleteWarningPanel = (key) => {
        PanelCtrl.ins.show(DeleteWarningPanel, { deleteFunc: deleteSnippet(key) })
    }

    const listItems = customSnippetsKeys.map((item, idx) => {
        return (
            <div className="conlist snippetsItem" key={idx}>
                <div className="spImg ">
                    <img src={piceUrl} alt="" width="100px" height="100px" />
                </div>
                <div className="">
                    <h4>片段名：{item.key.split('custom_')[1]}</h4>
                    <p>快捷命令：{item.val.prefix}</p>
                    <div className="spItemBtns">
                        <Button type="primary" onClick={() => { editSnippet(item.key) }} className="editBtn" >编辑</Button>
                        <Button type="primary" onClick={() => { showDeleteWarningPanel(item.key) }} className="deleteBtn" danger>删除</Button>
                    </div>
                    <div className="snippetDescribe">
                        {item?.val?.description ? item.val.description : "通用片段描述"}
                    </div>
                </div>
            </div>
        )
    });


    console.log(showEditor)
    return (
        <div className="snippetsList">
            {!showEditor &&
                <div>
                    <h3>自定义片段</h3>
                    <p className="desc">用户自定义代码片段</p>
                    <div className="con">
                        <div className="conlist addSnippetBtn" onClick={() => { addSnippetItem() }}>
                            <div><img src={addUrl} /></div>
                        </div>
                        {customSnippetsKeys.length > 0 && listItems}
                    </div>
                </div>
            }
            {showEditor &&
                <div>
                    <CodeEditor currCode={currCode} updateCode={updateCode} height={"100vh"} />
                    <Button className="saveSnippetsBtn" onClick={() => { saveSnippet() }}>保存</Button>
                    <Button className="cancelSnippetsBtn" onClick={() => { cancelEditSnippet() }} danger>取消</Button>
                </div>
            }
        </div>
    )

}