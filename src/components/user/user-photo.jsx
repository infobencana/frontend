import React, { useState, useRef, useEffect } from "react";

import { IconTrash, IconCloudUpload } from "@tabler/icons-react";

import { Button } from "../../components/ui/button";

import { useToast } from "@/hooks/use-toast";

import { updatePhoto } from "@/api/user";

export function UserPhoto({ user, onDataChange }) {
  const { toast } = useToast();

  const [photoProfile, setPhotoProfile] = useState(user.photo_profile);
  const [isUploading, setIsUploading] = useState(false);

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    setPhotoProfile(user.photo_profile);
  }, [user]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleRemovePhoto = async () => {
    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPhotoProfile(""); // Set the photoProfile state to an empty string
      onDataChange(""); // Pass an empty string to indicate there is no photoProfile
      setIsUploading(false);
      toast({
        title: "Berhasil",
        description: "Berhasil Menghapus Photo Profile",
      });
    } catch (error) {
      console.error("Error removing photo:", error);
      toast({
        variant: "destructive",
        title: "Gagal!",
        description: "Gagal Menghapus Photo Profile",
      });
      setIsUploading(false);
    }
  };

  const handleChange = async (e) => {
    const fileUploaded = e.target.files[0];
    setIsUploading(true);
    if (fileUploaded && fileUploaded.type.startsWith("image/")) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await updatePhoto(fileUploaded);
        setPhotoProfile(response);
        onDataChange(response);
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        toast({
          title: "Berhasil",
          description: "Berhasil Update Photo Profile",
        });
        setIsUploading(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Gagal!",
        description: "Format file tidak valid. Silakan unggah gambar.",
      });
      setIsUploading(false);
    }
  };

  const getInitials = (username) => {
    const names = username.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
    return initials;
  };

  return (
    <>
      <div className="relative">
        {photoProfile ? (
          // Display the photo if it exists
          <img
            src={photoProfile}
            alt={user.full_name}
            className={`rounded-md h-64 w-64 border border-gray-400 ${
              isUploading ? "filter blur-sm" : ""
            }`}
            onLoad={() => setIsUploading(false)}
          />
        ) : (
          // Display user's initials if the photo doesn't exist
          <div className="rounded-md h-64 w-64 bg-gray-300 border border-gray-600 font-bold text-black flex items-center justify-center text-2xl">
            {getInitials(user.full_name)}
          </div>
        )}
        {isUploading && (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <div className="mt-4 w-full">
        <Button
          onClick={handleClick}
          className="bg-white text-black font-bold px-4 py-2 rounded mb-2 w-full border"
        >
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }} // Make the file input element invisible
            accept="image/*"
          />
          <IconCloudUpload size={26} className="mr-4" />
          Upload Foto
        </Button>
        <Button
          onClick={handleRemovePhoto}
          className="hover:bg-red-500 font-bold rounded-md mt-4 w-full"
        >
          <IconTrash size={26} className="text-snow mr-4" />
          Hapus Foto
        </Button>
      </div>
    </>
  );
}
