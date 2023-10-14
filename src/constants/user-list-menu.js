import {
  IconUserFilled,
  IconClockFilled,
  IconSettingsFilled,
  IconGhost2Filled,
} from "@tabler/icons-react";

export const listMenu = [
  {
    id: 1,
    name: "akun",
    url: "/profile",
    icon: IconUserFilled,
    disabled: false,
  },
  {
    id: 2,
    name: "history",
    url: "/history",
    icon: IconClockFilled,
    disabled: true,
  },
  {
    id: 3,
    name: "pengaturan",
    url: "/settings",
    icon: IconSettingsFilled,
    disabled: true,
  },
  {
    id: 4,
    name: "keluar",
    icon: IconGhost2Filled,
    disabled: false,
  },
];
