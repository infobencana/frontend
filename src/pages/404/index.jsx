import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full font-inter">
      <h1 className="text-black font-bold text-3xl lg:text-4xl">404</h1>
      <p className="text-sm text-gray mt-1 lg:mt-2 text-center">
        Halaman yang anda cari tidak dapat ditemukan
      </p>
      <Button asChild className="rounded-lg mt-6 p-5">
        <Link to="/" replace>
          Kembali
        </Link>
      </Button>
    </div>
  );
}
