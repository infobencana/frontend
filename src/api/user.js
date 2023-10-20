import { client } from "./client";

export function getCurrentUser() {
  return client.get("/profile");
}

export async function updateProfile(data) {
  try {
    const response = await client.put("/profile", data);
    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function uploadPhotoProfile(image) {
  const formData = new FormData();
  formData.append("photo_profile", image);
  try {
    const response = await client.post("/profile/upload_photo", formData);
    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
