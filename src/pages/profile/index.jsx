import { Helmet } from "react-helmet";
import { UserProfilePhoto } from "@/components/user/user-profile-photo";
import { ProfileForm } from "@/components/form/profile-form";

export default function Profile() {
  return (
    <div className="mt-6 lg:mt-14 lg:grid lg:grid-cols-[240px_minmax(400px,1fr)] lg:auto-rows-auto lg:gap-x-24">
      <Helmet>
        <title>Akun anda - Infobencana</title>
      </Helmet>
      <UserProfilePhoto />
      <ProfileForm />
    </div>
  );
}
