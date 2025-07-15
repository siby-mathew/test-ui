import isFunction from "lodash/isFunction";

export const download = async (
  _url: string,
  name: string,
  callback?: () => void
) => {
  try {
    const response = await fetch(_url, { mode: "cors" });
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    if (callback && isFunction(callback)) {
      callback();
    }
  } catch {
    if (callback && isFunction(callback)) {
      callback();
    }
  }
};
