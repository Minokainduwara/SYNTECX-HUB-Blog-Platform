import API from "./axios";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await API.post(
    "/upload", // ❗ NO /api here
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return data.imageUrl;
}