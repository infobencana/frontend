import { AuthForm } from "@/components/form/auth-form";
import { registerFormFields } from "@/constants/form-field";

export default function Register() {
  return (
    <div className="fadein">
      <AuthForm fields={registerFormFields} submitText="Daftar" />
    </div>
  );
}
