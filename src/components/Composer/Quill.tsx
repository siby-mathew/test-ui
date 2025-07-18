import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Box } from "@chakra-ui/react";

type QuillEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
};

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],

        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ size: ["small", false, "large", "huge"] }],

        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
      ];

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type your message here...",
        modules: {
          toolbar: "#toolbar-custom",
        },
      });

      quillRef.current.on("editor-change", () => {
        if (onChange) {
          const html =
            editorRef.current!.querySelector(".ql-editor")?.innerHTML;

          onChange(html || "");
        }
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [onChange, value]);

  return (
    <Box
      data-wrapper
      sx={{
        ".ql-container,.ql-toolbar": {
          border: "none !important",
          px: "0 !important",
        },
        ".ql-toolbar": {
          ml: "-10px",
        },
        ".ql-editor": {
          px: 0,
        },
        ".ql-editor.ql-blank::before": {
          fontStyle: "normal",
          color: "#444444",
          left: 0,
          right: 0,
        },
      }}
      h={"300px"}
      w="100%"
      color={"#fff"}
    >
      <Box ref={editorRef} />
    </Box>
  );
};

export default QuillEditor;
