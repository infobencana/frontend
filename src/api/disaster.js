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
    throw error.response.data.message;
  }
}

export async function getDisasterById(id) {
  try {
    const response = await client.get(`/disaster/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function updateDisaster(id, data) {
  try {
    const response = await client.put(`/disaster/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
