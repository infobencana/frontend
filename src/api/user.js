import { client } from "./client";

export function getCurrentUser() {
  return client.get("/profile");
}

export function updateProfile(data) {
  return client.put("/profile", {...data});
}