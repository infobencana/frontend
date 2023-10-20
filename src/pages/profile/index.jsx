import React, { useState, useEffect, useRef } from "react";

import { useToast } from "@/hooks/use-toast";

import { useUser } from "@/context/user-context";

import { UserProfile } from "@/components/user/user-profile";
import { UserPhoto } from "@/components/user/user-photo";

import { updateProfile } from "@/api/user";

export default function Profile() {
  const { toast } = useToast();

  const { user } = useUser();

  const [userData, setUserData] = useState(user);
  const [userPhoto, setUserPhoto] = useState(user.photo_profile);
  const [loading, setLoading] = useState(false);

  const userPhotoRef = useRef(user.photo_profile);

  useEffect(() => {
    setUserData(user);
    setUserPhoto(user.photo_profile);
  }, [user, userPhoto]);

  useEffect(() => {
    console.log("userPhoto inside useEffect::", userPhotoRef.current);
    // Your effect logic here
  }, [userPhotoRef.current]);

  const handlePhotoChange = (newPhoto) => {
    setUserPhoto(newPhoto);
    userPhotoRef.current = newPhoto; // Update the ref with the latest value
    console.log("::", userPhotoRef.current);
  };

  const handleUserChange = (newUserData) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...newUserData,
    }));
    // console.log("Page Profile Data::", newUserData);
    handleUpdateUser(newUserData);
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      setLoading(true);
      const updatedData = {
        full_name: updatedUserData.full_name,
        phone_number: updatedUserData.phone_number,
        gender: updatedUserData.gender,
        photo_profile: userPhotoRef.current,
      };

      console.log("Submit data", updatedData);
      // Simulate API call with setTimeout
      setTimeout(async () => {
        await updateProfile(updatedData);
        console.log("Profile updated successfully!");
        setLoading(false);
        toast({
          title: "Berhasil",
          description: "Berhasil Update Profile",
        });
      }, 1000); // You can adjust the timeout duration based on your API call duration
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="flex">
        {/* Photo section */}
        <div className="w-2/5 p-4 flex flex-col items-center">
          <UserPhoto user={user} onDataChange={handlePhotoChange} />
        </div>

        {/* user accounts section */}
        <div className="w-3/5 mx-auto p-4 border-l pl-10">
          <UserProfile user={user} onDataChange={handleUserChange} />
        </div>
        {loading && <h1>Loading...</h1>}
      </div>
    </>
  );
}
