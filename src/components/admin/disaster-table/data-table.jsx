import * as React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { scrollToTop } from "@/utils/helpers";
import { deleteDisaster } from "@/api/disaster";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

export function DataTable({ data, columns, refetch }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disasterId, setDisasterId] = React.useState(null);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { toast } = useToast();

  const deleteDisasterData = async () => {
    try {
      setLoading(true);
      await deleteDisaster(disasterId);
      refetch();
    } catch (error) {
      toast({
        type: "destructive",
        title: "Gagal mengahapus laporan bencana",
      });
    } finally {
      setOpen(false);
      setDisasterId(null);
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setOpen(true);
    setDisasterId(id);
  };

  const closeModal = () => {
    setOpen(false);
    setDisasterId(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter Laporan Bencana..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm rounded-lg"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-lg ml-auto border-snow text-black hover:bg-slate-100/50"
              >
                Columns <IconChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border border-snow font-inter my-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, {
                          ...cell.getContext(),
                          openModal: openDeleteModal,
                        })}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-snow text-black hover:bg-slate-100/50"
              onClick={() => {
                scrollToTop();
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-snow text-black hover:bg-slate-100/50"
              onClick={() => {
                scrollToTop();
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin ingin menghapus ?</DialogTitle>
          <DialogDescription>
            Setelah ini anda tidak akan dapat melihat kembali laporan yang telah
            di hapus.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full flex justify-end space-x-3 mt-5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="bg-snow/50 w-32 h-10"
              disabled={loading}
              onClick={closeModal}
            >
              Close
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="bg-red-500 text-white w-32 h-10 hover:bg-red-700 hover:text-white"
              onClick={deleteDisasterData}
            >
              {loading ? <Spinner className="mr-2" /> : false}
              Hapus
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
