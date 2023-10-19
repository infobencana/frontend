import { client } from "./client";

export async function getAllMissingPeople() {
  return await client.get("/missingpeople");
}
