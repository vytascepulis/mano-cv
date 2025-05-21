import { bucket } from "@/lib/firebase";

export async function uploadFileBuffer(
  buffer: Buffer,
  destinationPath: string,
  contentType: string,
): Promise<string> {
  const file = bucket.file(destinationPath);

  await file.save(buffer, {
    metadata: {
      contentType,
      cacheControl: "no-cache, no-store, must-revalidate, max-age=0",
    },
    resumable: false,
  });

  await file.makePublic();
  return file.publicUrl();
}
