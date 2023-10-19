import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale("id", {
  relativeTime: {
    future: "%s",
    past: "%s",
    s: "baru saja",
    m: "1 menit",
    mm: "%d menit",
    h: "1 jam",
    hh: "%d jam",
    d: "1 hari",
    dd: "%d hari",
    M: "1 bulan",
    MM: "%d bulan",
    y: "1 tahun",
    yy: "%d tahun",
  },
});

dayjs.locale("id");

export function getTimeFromNow(time) {
  return dayjs(time).fromNow();
}
