"use server";

import { UploadFileResponse } from "@/types";
import { utapi } from "./uploadthing";
import { formatImageUrl } from "@/lib/format-url";
import { FileEsque, UploadFileResult } from "uploadthing/types";

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as FileEsque;

    if (!(file instanceof File)) {
      return { success: false, fileUrl: null, message: "No se encontró ninguna imagen para subir" };
    }

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      return { success: false, fileUrl: null, message: "El archivo debe ser una imagen" };
    }

    const response: UploadFileResult = await utapi.uploadFiles(file);

    if (response.data) {
      return { success: true, fileUrl: response.data.url };
    }

    return { success: false, fileUrl: null, message: "Error al subir la imagen" };
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return { success: false, fileUrl: null, message: "Error al procesar la imagen" };
  }
}

// export async function uploadFile(formData: FormData) {
//   try {
//     const file = formData.get("file") as FileEsque;

//     if (file instanceof File) {
//       const response: UploadFileResponse = await utapi.uploadFiles(file);

//       if (response.data) {
//         return { success: true, data: response.data };
//       }

//       return { success: false, message: "Something went wrong" };
//     } else {
//       // throw new Error("Invalid file");
//       return { success: false, message: "No files found for upload" };
//     }
//   } catch (error: any) {
//     return { sucess: false, message: "" };
//   }
// }

export async function deleteImageFile(imageUrl: string) {
  try {
    const newImageUrl = formatImageUrl(imageUrl);
    const response = await utapi.deleteFiles(newImageUrl);

    return { success: response.success };
  } catch (error) {
    console.log(error);
  }
}
