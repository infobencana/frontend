import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import { UserAvatar } from "./user-avatar";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { IconPhotoFilled, IconTrashFilled } from "@tabler/icons-react";
import { uploadPhotoProfile, updateProfile } from "@/api/user";
import { validationImage } from "@/utils/validation";

export function UserProfilePhoto() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, getUserData } = useUser();
  const uploadImgRef = useRef();

  const uploadingImage = async (img) => {
    try {
      const validation = validationImage(img[0]);

      if (validation.status) {
        setLoading(true);
        const url = await uploadPhotoProfile(img[0]);
        await updateProfile({ photo_profile: url });
        await getUserData();
      } else {
        toast({
          variant: "destructive",
          title: "Upload Gagal",
          description: validation.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Gagal",
        description: error || "Gagal memperbarui foto silahkan coba lagi",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async () => {
    try {
      setLoading(true);
      await updateProfile({ photo_profile: "" });
      await getUserData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hapus Gagal",
        description: "Gagal menghapus foto profile silahkan coba lagi",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center lg:block">
      <div className="relative w-[160px] h-[160px] lg:w-[240px] lg:h-[240px]">
        {loading ? (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black/50 rounded-full z-50">
            <Spinner className="w-10 h-10 text-white" />
          </div>
        ) : (
          false
        )}
        <UserAvatar
          src={user.photo_profile}
          alt={user.full_name}
          fallback={user.email}
          fallBackSize={240}
          draggable={false}
          className="w-[160px] h-[160px] lg:w-[240px] lg:h-[240px] rounded-full"
        />
      </div>
      <div className="flex flex-col space-y-3 mt-8 w-full">
        <label htmlFor="upload-img">
          <Button
            disabled={loading}
            className="w-full h-14 text-white font-semibold rounded-lg"
            onClick={() => uploadImgRef.current.click()}
          >
            <IconPhotoFilled className="w-6 h-6 mr-3 text-white" />
            Upload Foto
          </Button>
        </label>
        <input
          ref={uploadImgRef}
          id="upload-img"
          className="hidden"
          type="file"
          accept="image/png, image/gif, image/jpeg, image/webp"
          onChange={(e) => uploadingImage(e.target.files)}
        />
        {user.photo_profile ? (
          <Button
            disabled={loading}
            variant="outline"
            className="w-full h-14 font-semibold rounded-lg"
            onClick={deleteImage}
          >
            <IconTrashFilled className="w-6 h-6 mr-3 text-green" />
            Hapus Foto
          </Button>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
