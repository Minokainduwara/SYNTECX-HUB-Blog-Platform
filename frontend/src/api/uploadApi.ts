import API from "./axios";

/**
 * Uploads an image to Cloudinary via the backend.
 * Backend expects multipart field name `image`.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await API.post<{ imageUrl: string }>(
    "/api/upload",
    formData
  );
  return data.imageUrl;
}
