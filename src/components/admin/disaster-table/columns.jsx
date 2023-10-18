import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { IconArrowsSort, IconDots } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { DisasterStatusBadge } from "@/components/badge/disaster-status-badge";
import dayjs from "dayjs";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    size: 700,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          asChild
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left text-black font-semibold hover:bg-slate-100 cursor-pointer"
        >
          <div>
            Laporan Bencana
            <IconArrowsSort size={16} className="ml-2" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    id: "lokasi",
    accessorKey: "place",
    header: () => (
      <div className="text-left text-black font-semibold">Lokasi</div>
    ),
    cell: ({ row }) => <div className="capitalize">{row.original.place}</div>,
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="text-center text-black font-semibold">Status</div>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-center">
        <DisasterStatusBadge status={row.getValue("status")} />
      </div>
    ),
  },
  {
    id: "tanggal",
    accessorKey: "date",
    header: () => (
      <div className="text-left text-black font-semibold">Tanggal</div>
    ),
    cell: ({ row }) => (
      <div className="lowercase w-full">
        {dayjs(row.original.date).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (props) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDots size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to={`/post/${props.row.original.id}`} className="w-full">
                Lihat
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`../post/${props.row.original.id}/edit`}
                className="w-full"
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <p
                className="cursor-pointer w-full"
                onClick={() => props.openModal(props.row.original.id)}
              >
                Hapus
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
