import React from "react";
import { Editor, EditorState as EditorStateType } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getDefaultKeyBinding, RichUtils } from "draft-js";
import { ErrorMessage } from "formik";
import "src/App.css";

type Props = {
  name: string;
  value: any;
  onChange: (newValue: any) => void;
  placeholder? : string;
};

const ATMHTMLEditor = ({ name, value, onChange ,placeholder}: Props) => {
  const onHandleKeyBindings = (e: any) => {
    if (e.keyCode === 9) {
      onChange(RichUtils.onTab(e, value, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  const handleEditorChange = (state: EditorStateType) => {
    onChange(state);
  };

  return (
    <div className="relative">
      <Editor
        editorState={value}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbarclassName="
        wrapperClassName="wrapperclassName=  "
        editorClassName="editorclassName= px-3 border min-h-[180px]"
        placeholder={placeholder || "Write here..."}
        
        onTab={onHandleKeyBindings}
        toolbar={{
          options: [
            "fontSize",
            "inline",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "remove",
            "history",
          ],
        
        }}
      />

      {name && (
        <ErrorMessage name={name}>
          {(errMsg) => {
            return (
              <p className="font-poppins absolute text-[12px] text-start mt-0 text-red-500">
                {" "}
                {errMsg}{" "}
              </p>
            );
          }}
        </ErrorMessage>
      )}
    </div>
  );
};

export default ATMHTMLEditor;
