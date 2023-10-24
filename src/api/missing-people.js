import { client } from "./client";

export async function getAllReqMissingPoeple() {
  return await client.get("/missingpeople");
}

export async function getDetailReqMissingPeople(id) {
  return await client.get(`/missingpeople/${id}/detail`);
}

export async function actionReqMissingPeople(data) {
  return await client.post("/missingpeople/update-people-gone", data);
}

export async function requestMissingPeople(data) {
  return await client.post("/missingpeople/add-from-disaster", data);
}
