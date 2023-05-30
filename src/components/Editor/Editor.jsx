import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey="vzkfeug5q4me46sye4gvez1nd382k6hwqpx9loke76rq1f7i"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | fontsizeselect | customFontsizeselect | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | table | image media | help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          setup: (editor) => {
            editor.ui.registry.addButton("customFontsizeselect", {
              text: "Font Size",
              type: "menubutton",
              fetch: (callback) => {
                const items = [
                  { text: "Tiny", value: "8pt" },
                  { text: "Small", value: "10pt" },
                  { text: "Normal", value: "12pt" },
                  { text: "Large", value: "14pt" },
                  { text: "Huge", value: "18pt" },
                ];
                callback(items);
              },
              onAction: (buttonApi) => {
                const value = buttonApi.value;
                editor.execCommand("fontSize", false, value);
              },
              onSetup: (buttonApi) => {
                buttonApi.onAction = () => buttonApi.onAction();
              },
            });
          },
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
