import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full font-inter px-4">
      <Helmet>
        <title>Terjadi sebuah kesalahan</title>
      </Helmet>
      <div className="max-w-[500px] flex flex-col justify-center items-center">
        <h1 className="text-black font-bold text-2xl lg:text-3xl">
          Terjadi Kesalahan
        </h1>
        <p className="text-sm text-gray mt-2 lg:mt-3 text-center leading-6">
          Halaman yang Anda cari tidak dapat ditemukan atau terjadi masalah
          lainnya. Silakan coba lagi nanti.
        </p>
        <Button asChild className="rounded-lg mt-6 p-5">
          <Link to="/" replace>
            Kembali
          </Link>
        </Button>
      </div>
    </div>
  );
}
