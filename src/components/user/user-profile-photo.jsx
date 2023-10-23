import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useUser } from "@/context/user-context";
import { UserAvatar } from "./user-avatar";
import { Spinner } from "../ui/spinner";
import { cn } from "@/utils/cn";
import { IconDots } from "@tabler/icons-react";
import { uploadPhotoProfile, updateProfile } from "@/api/user";
import { validationImage } from "@/utils/validation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserProfilePhoto() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, getUserData } = useUser();
  const matches = useMediaQuery("(max-width:1024px)");
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
    <div className="w-full flex flex-col items-center lg:block font-inter">
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
          fallBackSize={matches ? 160 : 240}
          draggable={false}
          className="w-[160px] h-[160px] lg:w-[240px] lg:h-[240px] rounded-full"
        />
        <input
          ref={uploadImgRef}
          id="upload-img"
          className="hidden"
          type="file"
          accept="image/png, image/gif, image/jpeg, image/webp"
          onChange={(e) => uploadingImage(e.target.files)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex justify-center items-center bg-white border border-snow",
              "rounded-full w-8 h-8  lg:w-9 lg:h-9 absolute bottom-0 right-4 lg:right-10 z-[999]",
            )}
          >
            <IconDots className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-inter" side="bottom">
            <DropdownMenuItem
              className="text-sm text-black cursor-pointer"
              onClick={() => uploadImgRef.current.click()}
              disabled={loading}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-sm text-black cursor-pointer"
              onClick={deleteImage}
              disabled={loading}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
