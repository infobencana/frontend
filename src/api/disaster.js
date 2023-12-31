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
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function getAllDisasters() {
  try {
    const response = await client.get("/disaster");
    return response.data;
  } catch (error) {
    throw new Error(error);
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

export async function deleteDisaster(id) {
  try {
    return await client.delete(`/disaster/${id}`);
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function addComment(disasterId, data) {
  try {
    return await client.post(`/disaster/${disasterId}/discuss`, data);
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function getComment(disasterId) {
  try {
    return await client.get(`/disaster/${disasterId}/discuss`);
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function getDisasterByQuery(queryParams) {
  try {
    const response = await client.get("/disaster", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function getActiveDisaster() {
  try {
    const response = await client.get("/disaster/lat_long");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
}
