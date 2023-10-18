import {
  IconUserFilled,
  IconClockFilled,
  IconSquareRoundedPlusFilled,
  IconSettingsFilled,
  IconArrowBigRightFilled,
  IconChartPieFilled,
} from "@tabler/icons-react";

export const listMenu = [
  {
    id: 1,
    name: "akun",
    url: "profile",
    icon: IconUserFilled,
    disabled: false,
  },
  {
    id: 2,
    name: "buat laporan",
    url: "r/admin/create-post",
    icon: IconSquareRoundedPlusFilled,
    disabled: false,
  },
  {
    id: 3,
    name: "dashboard",
    url: "r/admin/dashboard",
    icon: IconChartPieFilled,
    disabled: false,
  },
  {
    id: 4,
    name: "history",
    url: "history",
    icon: IconClockFilled,
    disabled: true,
  },
  {
    id: 5,
    name: "pengaturan",
    url: "settings",
    icon: IconSettingsFilled,
    disabled: true,
  },
  {
    id: 6,
    name: "keluar",
    icon: IconArrowBigRightFilled,
    disabled: false,
  },
];
