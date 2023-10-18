import { useUser } from "@/context/user-context";

import { Button } from "../../components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <div className="w-2/5 p-4 flex flex-col items-center">
          <img
            src={user.photo_profile}
            alt={user.full_name}
            className="rounded-md h-64 w-64"
          />

          <div className="mt-4 w-full">
            <Button className="bg-white text-black font-bold px-4 py-2 rounded mb-2 w-full border">
              Upload Foto
            </Button>
            <Button className="font-bold rounded-md mt-4 w-full">
              Hapus Foto
            </Button>
          </div>
        </div>

        <div className="w-3/5 mx-auto p-4 border-l pl-10">
          <div className="mb-4 pb-2 border-b">
            <h1 className="text-2xl font-bold mb-4">Detail Akun</h1>
          </div>

          <div className="mb-4 pb-2">
            <div className="mb-4 pb-2">
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full border border-gray-400 rounded px-3 py-2"
              />
            </div>

            <div className="mb-4 pb-2">
              <label className="block font-semibold mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={user.full_name}
                className="w-full border border-gray-400 rounded px-3 py-2"
              />
            </div>

            <div className="mt-4 w-full">
              <Button className="font-bold px-4 py-2 rounded w-full">
                Perbarui Akun
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-4 pb-2 border-b">
              <h1 className="text-2xl font-bold mb-4">Kata Sandi & Keamanan</h1>
            </div>

            <div className="mb-4 pb-2">
              <div className="mb-4 pb-2">
                <label className="block font-semibold mb-2">
                  Password Lama
                </label>
                <input
                  type="email"
                  placeholder="Masukkan Password"
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              <div className="mb-4 pb-2">
                <label className="block font-semibold mb-2">
                  Password Baru
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Password"
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              <div className="mt-4 w-full">
                <Button className="font-bold px-4 py-2 rounded w-full">
                  Perbarui Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
