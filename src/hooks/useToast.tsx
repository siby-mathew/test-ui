import { toast, type ToastOptions } from "react-toastify";
import { Box } from "@chakra-ui/react";

// eslint-disable-next-line react-refresh/only-export-components
const Toast: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Box w="100%" p={2}>
      {message}
    </Box>
  );
};
export const useToast = () => {
  const showToast = (message: string, options?: ToastOptions) => {
    toast(<Toast message={message} />, options);
  };
  return {
    showToast,
  };
};
