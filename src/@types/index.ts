import type { IconType } from "react-icons/lib";

export type MenuConfig = {
  icon: IconType;
  name: string;
  id: string;
  link: string;
  submenu?: MenuConfig[];
  header?: React.FC;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};
