import * as yup from "yup";
import {
  fullname,
  email,
  password,
  gender,
  disaster,
  missingPeople,
  phone_number,
} from "./validation";

export const registerSchema = yup
  .object({
    full_name: fullname,
    email,
    password,
  })
  .required();
export const loginSchema = yup.object({ email, password }).required();
export const disasterFormSchema = yup.object(disaster).required();
export const MissingPeopleScehma = yup.object(missingPeople).required();
export const profileSchema = yup.object({
  email,
  full_name: fullname,
  gender,
  phone_number,
});
