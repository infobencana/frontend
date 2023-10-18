import React, { useState } from "react";

import { useUser } from "@/context/user-context";

import { updateProfile } from "@/api/user";

import { IconTrash, IconCloudUpload } from "@tabler/icons-react";

import { Button } from "../../components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useUser();

  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.full_name);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submit data", email, fullName);
      // data = { email: email, full_name: fullName };
      await updateProfile({ full_name: fullName });
      console.log("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="flex">
        {/* Photo section */}
        <div className="w-2/5 p-4 flex flex-col items-center">
          <img
            src={user.photo_profile}
            alt={user.full_name}
            className="rounded-md h-64 w-64"
          />

          <div className="mt-4 w-full">
            <Button className="bg-white text-black font-bold px-4 py-2 rounded mb-2 w-full border">
              <IconCloudUpload size={26} className="mr-4" />
              Upload Foto
            </Button>
            <Button className="hover:bg-red-500 font-bold rounded-md mt-4 w-full">
              <IconTrash size={26} className="text-snow mr-4" />
              Hapus Foto
            </Button>
          </div>
        </div>

        {/* user accounts section */}
        <div className="w-3/5 mx-auto p-4 border-l pl-10">
          <div className="mb-4 pb-2 border-b">
            <h1 className="text-2xl font-bold mb-4">Detail Akun</h1>
          </div>

          <div className="mb-4 pb-2">
            <div className="mb-4 pb-2">
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full border border-gray-400 rounded-lg px-3 py-2"
              />
            </div>

            <div className="mb-4 pb-2">
              <label className="block font-semibold mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                className="w-full border border-gray-400 rounded-lg px-3 py-2"
              />
            </div>

            <div className="mt-4 w-full">
              <Button
                className="font-bold px-4 py-2 rounded-lg w-full"
                onClick={handleSubmit}
              >
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
                  className="w-full border border-gray-400 rounded-lg px-3 py-2"
                />
              </div>

              <div className="mb-4 pb-2">
                <label className="block font-semibold mb-2">
                  Password Baru
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Password"
                  className="w-full border border-gray-400 rounded-lg px-3 py-2"
                />
              </div>

              <div className="mt-4 w-full">
                <Button className="font-bold px-4 py-2 rounded-lg w-full">
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
