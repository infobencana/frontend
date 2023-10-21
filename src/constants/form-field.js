export const fullname = {
  label: "Nama Lengkap",
  name: "full_name",
  placeholder: "Jhon Doe",
  type: "text",
};

export const email = {
  label: "email",
  name: "email",
  placeholder: "example@email.com",
  type: "text",
};

export const password = {
  label: "password",
  name: "password",
  placeholder: "Masukan password anda",
  type: "password",
};

export const phone_number = {
  label: "Nomor Telp",
  name: "phone_number",
  placeholder: "628XXXXXXXXXX",
  type: "text",
};

export const registerFormFields = [fullname, email, password];
export const loginFormFields = [email, password];
export const profileFields = [email, fullname, phone_number];
