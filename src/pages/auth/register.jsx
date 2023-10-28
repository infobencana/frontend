import { Helmet } from "react-helmet";
import { AuthForm } from "@/components/form/auth-form";
import { registerFormFields } from "@/constants/form-field";

export default function Register() {
  return (
    <div className="fadein">
      <Helmet>
        <title>Daftar - Infobencana</title>
      </Helmet>
      <AuthForm fields={registerFormFields} submitText="Daftar" />
    </div>
  );
}
