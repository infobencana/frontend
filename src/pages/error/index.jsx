import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Error() {
  const error = useRouteError();

  console.log(error);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full font-inter px-4">
      <div className="max-w-[500px] flex flex-col justify-center items-center">
        <h1 className="text-black font-bold text-2xl lg:text-3xl">
          Terjadi Kesalahan
        </h1>
        <p className="text-sm text-gray mt-2 lg:mt-3 text-center leading-6">
          Halaman yang Anda cari tidak dapat ditemukan atau terjadi masalah
          lainnya. Silakan coba lagi nanti.
        </p>
        <code className="block mt-4 text-sm text-green">{error.message}</code>
        <Button asChild className="rounded-lg mt-6 p-5">
          <Link to="/" replace>
            Kembali
          </Link>
        </Button>
      </div>
    </div>
  );
}
