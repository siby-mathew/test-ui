import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const formatTime = (timestamp: string | number) => {
  return dayjs(timestamp).fromNow();
};

export const format = (timestamp: string | number) => {
  return dayjs(timestamp).format("D MMMM, YYYY hh:mm A");
};
