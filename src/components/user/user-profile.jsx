import React, { useState, useEffect } from "react";

import { Button } from "../../components/ui/button";

export function UserProfile({ user, onDataChange }) {
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.full_name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [gender, setGender] = useState(user.gender);

  useEffect(() => {
    // setEmail(user.email);
    setFullName(user.full_name);
    setPhoneNumber(user.phone_number);
    setGender(user.gender);
  }, [user]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const updatedUser = {
        full_name: fullName,
        phone_number: phoneNumber,
        gender,
      };
      // console.log("Profile Component::", updatedUser);
      onDataChange(updatedUser);
      // onButtonClick();
  };

  return (
    <>
      <div className="mb-4 pb-2 border-b">
        <h1 className="text-2xl font-bold mb-4">Detail Akun</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 pb-2">
          <div className="mb-4 pb-2">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded-lg px-3 py-2"
              disabled
            />
          </div>

          <div className="mb-4 pb-2">
            <label className="block font-semibold mb-2">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => handleInputChange(e, setFullName)}
              className="w-full border border-gray-400 rounded-lg px-3 py-2"
            />
          </div>

          <div className="mb-4 pb-2">
            <label className="block font-semibold mb-2">Nomor Handphone</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => handleInputChange(e, setPhoneNumber)}
              className="w-full border border-gray-400 rounded-lg px-3 py-2"
            />
          </div>

          <div className="mb-4 pb-2">
            <label className="block font-semibold mb-2">Jenis Kelamin</label>
            <div className="mb-2">
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => handleInputChange(e, setGender)}
                  className="mr-2"
                />
                Laki-Laki
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => handleInputChange(e, setGender)}
                  className="mr-2"
                />
                Perempuan
              </label>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button
              className="font-bold px-4 py-2 rounded-lg w-full"
              type="submit"
            >
              Perbarui Akun
            </Button>
          </div>
        </div>
      </form>

      {/* update password */}
      {/* <div className="mt-16">
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
          </div> */}
    </>
  );
}
