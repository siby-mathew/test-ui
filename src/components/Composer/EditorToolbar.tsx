import { Box } from "@chakra-ui/react";

export const EditorToolbar: React.FC = () => {
  return (
    <Box
      id="toolbar-custom"
      border={"none !important"}
      px="0 !important"
      py="4px !important"
    >
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>

      <select className="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option selected></option>
      </select>
      <select className="ql-font">
        <option selected></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select>

      <select className="ql-color">
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="orange"></option>
        <option value="violet"></option>
        <option value="#d0d1d2"></option>
        <option selected></option>
      </select>
    </Box>
  );
};
