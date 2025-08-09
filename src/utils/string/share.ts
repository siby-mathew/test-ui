type Option = {
  message: string;
  link?: string;
};
export const getWhatsAppLink = (options: Option) => {
  const message = `${options.message}`;
  return `https://wa.me/?text=${encodeURIComponent(message ?? "")}`;
};

export const getTelegramLink = (options: Option) => {
  const message = `${options.message}`;
  return `https://telegram.me/share/url?url=${options.link}&text=${message}`;
};

export const getXShareUrl = (options: Option) => {
  const message = `${options.message}`;
  return `https://twitter.com/intent/tweet?url=${options.link}&text=${message}`;
};
