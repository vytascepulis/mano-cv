import { bucket } from "@/lib/firebase";

export async function uploadFileBuffer(
  buffer: Buffer,
  destinationPath: string,
  contentType: string,
  previousPath?: string,
): Promise<string> {
  if (previousPath) {
    const oldFile = bucket.file(previousPath);
    await oldFile.delete();
  }

  const file = bucket.file(destinationPath);
  await file.save(buffer, {
    metadata: {
      contentType,
      cacheControl: "public, max-age=31536000, immutable",
    },
    resumable: false,
  });

  await file.makePublic();

  return destinationPath;
}
