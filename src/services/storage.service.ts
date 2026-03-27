import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

export interface UploadResult {
  url: string;
  path: string;
  name: string;
  type: string;
}

export const StorageService = {
  /**
   * Upload a file from a local URI to Firebase Storage
   * @param localUri The local file URI (e.g. from ImagePicker)
   * @param storagePath The destination path in Firebase Storage
   * @param onProgress Optional callback for upload progress
   * @returns The download URL and metadata
   */
  async uploadFile(
    localUri: string,
    storagePath: string,
    onProgress?: (progress: number) => void
  ): Promise<UploadResult> {
    try {
      // Fetch the file to get a Blob for Firebase
      const response = await fetch(localUri);
      const blob = await response.blob();
      
      // Determine file name and type
      const filename = localUri.split('/').pop() || `file-${Date.now()}`;
      const type = blob.type || 'application/octet-stream';
      const fullPath = `${storagePath}/${filename}`;
      
      const storageRef = ref(storage, fullPath);
      
      // Create upload task
      const uploadTask = uploadBytesResumable(storageRef, blob);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            reject(error);
          },
          async () => {
            // Upload completed successfully
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve({
                url: downloadUrl,
                path: fullPath,
                name: filename,
                type,
              });
            } catch (err) {
              reject(err);
            }
          }
        );
      });
    } catch (error) {
      console.error('Error preparing file for upload:', error);
      throw error;
    }
  },

  /**
   * Delete a file from Firebase Storage
   * @param storagePath The path to the file in Storage
   */
  async deleteFile(storagePath: string): Promise<void> {
    try {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};
