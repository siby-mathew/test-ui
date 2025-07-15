type FileDetails = {
  extension: string;
  baseName: string;
  fullName: string;
};

export const getFileDetails = (file: File): FileDetails | null => {
  if (!file || !file.name) return null;

  const fullName = file.name;
  const lastDotIndex = fullName.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return {
      fullName,
      baseName: fullName,
      extension: "",
    };
  }

  const baseName = fullName.substring(0, lastDotIndex);
  const extension = fullName.substring(lastDotIndex + 1);

  return {
    fullName,
    baseName,
    extension,
  };
};
