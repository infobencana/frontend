import { Helmet } from "react-helmet";
import { AuthForm } from "@/components/form/auth-form";
import { loginFormFields } from "@/constants/form-field";

export default function Login() {
  return (
    <div className="fadein">
      <Helmet>
        <title>Masuk - Infobencana</title>
      </Helmet>
      <AuthForm fields={loginFormFields} submitText="Masuk" />
    </div>
  );
}
