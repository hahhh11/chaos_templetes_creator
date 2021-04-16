import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import './codeEditor.less'
export const CodeEditor = (props) => {

    const { currCode, updateCode, height } = props
    let [code, setCode] = useState(currCode)
    const options = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: true
    };
    let editor

    useEffect(() => {
        console.log("当前代码：", code)
        updateCode(code)
    }, [code])


    const onChange = (newValue) => {
        code = setCode(newValue)
    };

    const editorWillMount = () => {

    }

    const editorValidation = () => {

    }

    const editorDidMount = (_editor) => {
        // eslint-disable-next-line no-console
        console.log("editorDidMount", _editor, _editor.getValue(), _editor.getModel());
        editor = _editor;
        editor.focus();
        setCode(currCode)
    };


    return (
        <div className="EditorContainer">
            <Editor
                width="40"
                height={height}
                theme="vs-dark"
                options={options}
                defaultLanguage="javascript"
                defaultValue={currCode}
                onChange={onChange}
                onMount={editorDidMount}
                beforeMount={editorWillMount}
                onValidate={editorValidation}
            />
        </div >
    );

}
