import { object, string, date, number, array } from "yup";

export const fullname = string()
  .required("Nama lengkap tidak boleh kosong")
  .min(4, "Nama Lengkap minimal 4 karakter")
  .matches(/^[a-zA-Z\s]+$/, "Format nama lengkap tidak sesuai");

export const email = string()
  .email("Format email tidak sesuai")
  .required("Email tidak boleh kosong");

export const password = string()
  .required("Password tidak boleh kosong")
  .matches(
    /^(?=.*[A-Z])(?=.*\d).{6,12}$/,
    "Password harus 6-12 karakter, minimal terdapat satu angka dan satu huruf kapital.",
  );

export const disaster = {
  title: string().required("judul post bencana tidak boleh kosong"),
  detail: object().shape({
    type: string().required("tipe bencana tidak boleh kosong"),
    status: string()
      .required("status bencana tidak boleh kosong")
      .oneOf(["aman", "darurat", "pemulihan", "waspada"]),
    date: date().required("tanggal bencana tidak boleh kosong"),
    description: string().required("deskripsi bencana tidak boleh kosong"),
  }),
  place: string().required("Lokasi bencana tidak boleh kosong"),
  victim: number()
    .default(0)
    .min(0)
    .required("total korban tidak boleh kosong"),
  latitude: number().required("koordinat latitude tidak boleh kosong"),
  longitude: number().required("koordinat longitude tidak boleh kosong"),
  picture: string()
    .url("format gambar harus berupa url")
    .required("gambar tidak boleh kosong"),
  donation: array().default([]),
  people_gone: array().default([]),
};
