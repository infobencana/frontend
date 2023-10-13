import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="bg-transparent p-1 rounded-xl hover:bg-slate-100"
        >
          <IconMenu2 size={20} className="text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-xs w-full">
        <div className="w-full flex flex-col space-y-4 mt-8 px-2">
          <Button size="lg" className="rounded-3xl px-8" asChild>
            <Link to="/auth/login">Masuk</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-3xl px-8"
            asChild
          >
            <Link to="/auth/register">Daftar</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
