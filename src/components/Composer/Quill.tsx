import React, { useEffect, useRef } from "react";
import Quill, { Delta } from "quill";
import "quill/dist/quill.snow.css";
import { Box } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { ComposerFormInputs } from "src/types";

type QuillEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
};

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const { getValues } = useFormContext<ComposerFormInputs>();
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
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

      quillRef.current.clipboard.addMatcher(Node.ELEMENT_NODE, (_, delta) => {
        delta.ops.forEach((op) => {
          if (op.attributes) {
            delete op.attributes.background;
          }
        });
        return delta;
      });

      quillRef.current.clipboard.addMatcher(
        Node.ELEMENT_NODE,
        (node: Node, delta: Delta): Delta => {
          if (node instanceof Element) {
            const tagName = node.tagName.toLowerCase();

            if (["script", "iframe"].includes(tagName)) {
              return new Delta();
            }
          }
          return delta;
        }
      );
      quillRef.current.clipboard.dangerouslyPasteHTML(getValues().body ?? "");
      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [getValues, onChange, value]);

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
          opacity: 0.8,
        },
      }}
      h={"300px"}
      w="100%"
    >
      <Box ref={editorRef} />
    </Box>
  );
};

export default QuillEditor;
