import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { IoDocument } from "react-icons/io5";
import { IoMdImage } from "react-icons/io";
import { LuFile } from "react-icons/lu";
import type { IconType } from "react-icons";

type FileConfig = {
  color: string;
  icon: IconType;
  image: boolean;
};

const configs: Record<string, FileConfig> = {
  pdf: {
    color: "red.500",
    icon: BsFileEarmarkPdfFill,
    image: false,
  },
  "jpg,jpeg,png,image": {
    color: "blue.500",
    icon: IoMdImage,
    image: true,
  },
  "doc,docx,xml,json": {
    color: "blue.500",
    icon: IoDocument,
    image: false,
  },
  unknown: {
    color: "",
    icon: LuFile,
    image: false,
  },
};

export const getFileConfig = (filename: string): FileConfig => {
  if (!filename || !filename.includes(".")) {
    return configs.unknown;
  }

  const extension = filename.slice(filename.lastIndexOf(".") + 1).toLowerCase();

  for (const key in configs) {
    const extensions = key.split(",");
    if (extensions.includes(extension)) {
      return configs[key];
    }
  }

  return configs.unknown;
};
