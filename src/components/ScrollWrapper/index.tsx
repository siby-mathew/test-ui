import { Scrollbar } from "react-scrollbars-custom";
import type { ReactNode } from "react";
import { useDisclosure } from "@chakra-ui/react";

export const CustomScrollbarWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Scrollbar
      disableTracksWidthCompensation
      style={{ width: "100%", height: "100%" }}
      removeTracksWhenNotUsed={!0}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      trackYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <span
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              width: isOpen ? 3 : 0,
              transition: "width 0.3s ease",
              backgroundColor: "transparent",
            }}
          />
        ),
      }}
      thumbYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              borderRadius: 4,
            }}
          />
        ),
      }}
    >
      {children}
    </Scrollbar>
  );
};
