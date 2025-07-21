import type { JSX } from "react";

export const generateHtmlTag = (
  tag: keyof JSX.IntrinsicElements,
  attributes: Record<string, any> = {},
  content: string = ""
) => {
  const attrString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");

  const openingTag = attrString ? `<${tag} ${attrString}>` : `<${tag}>`;
  return `${openingTag}${content}</${tag}>`;
};
