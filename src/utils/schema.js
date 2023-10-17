import * as yup from "yup";
import {
  fullname,
  email,
  password,
  disaster,
  missingPeople,
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
