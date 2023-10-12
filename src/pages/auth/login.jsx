import { AuthForm } from "@/components/form/auth-form";
import { loginFormFields } from "@/constants/form-field";

export default function Login() {
  return (
    <div className="fadein">
      <AuthForm fields={loginFormFields} submitText="Masuk" />
    </div>
  );
}
