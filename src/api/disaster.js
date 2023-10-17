import { client } from "./client";

export async function uploadImageDisaster(image) {
  const formData = new FormData();
  formData.append("picture", image);

  try {
    const response = await client.post("/disaster/image", formData);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function addDisasterPost(data) {
  try {
    const response = await client.post("/disaster", data);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
}
