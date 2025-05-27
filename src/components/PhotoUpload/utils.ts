import { PixelCrop } from "react-image-crop";
import { getGenericUserPhoto } from "@/utils/user";

export const fileToUrl = (file: Blob) => {
  return URL.createObjectURL(file);
};

export const fileToImageState = (file: Blob | null) => {
  return {
    url: file ? fileToUrl(file) : getGenericUserPhoto(),
    blob: file,
  };
};

export async function renderCroppedImage(
  image: HTMLImageElement,
  crop: PixelCrop,
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2D context");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  // Fixed 1:1 crop (ensures square crop)
  const cropSize = Math.min(crop.width, crop.height); // Ensure square crop
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Hardcoded target output size (400x400)
  const outputWidth = 300;
  const outputHeight = 300;

  // Set canvas size (in device pixels)
  canvas.width = outputWidth * pixelRatio;
  canvas.height = outputHeight * pixelRatio;

  // Set CSS size
  canvas.style.width = `${outputWidth}px`;
  canvas.style.height = `${outputHeight}px`;

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  // Draw the square cropped image to fit the 400x400 canvas
  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropSize * scaleX,
    cropSize * scaleY,
    0,
    0,
    outputWidth,
    outputHeight,
  );

  // Convert canvas to Blob in WEBP format with compression
  return new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error("Failed to convert canvas to Blob");
        }
      },
      "image/jpeg",
      0.8, // Adjust quality for compression (0 to 1)
    );
  });
}
