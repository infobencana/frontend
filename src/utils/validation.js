import { object, string, date, number, array, boolean } from "yup";

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
  name: string().required("judul post bencana tidak boleh kosong"),
  detail: object().shape({
    type: string()
      .required("tipe bencana tidak boleh kosong")
      .oneOf([
        "gempa bumi",
        "gunung meletus",
        "tsunami",
        "tanah longsor",
        "banjir",
      ]),
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
  donations: array().default([]),
  people_gone: array().default([]),
};

export const missingPeople = {
  name: string().required("Nama tidak boleh kosong"),
  last_seen: string().required("Lokasi terakhir tidak boleh kosong"),
  address: string().required("Lokasi terakhir tidak boleh kosong"),
  age: number().required("Umur tidak boleh kosong").min(1),
  weight: number().required("Berat tidak boleh kosong").min(1),
  height: number().required("Tinggi tidak boleh kosong").min(1),
  gender: string()
    .required("Gender tidak boleh kosong")
    .oneOf(["laki-laki", "perempuan"]),
  status: boolean().required("status tidak boleh kosong").default(false),
};

export function validationImage(img) {
  let error;

  if (!img) {
    error = "file image tidak ditemukan";
  } else if (img.size > 3145728) {
    error = "ukuran gambar maksimal 3MB";
  } else if (!["image/jpeg", "image/png", "image/webp"].includes(img.type)) {
    error = "Hanya support gambar JPG PNG WEBP";
  }

  return {
    status: !error,
    error,
  };
}
