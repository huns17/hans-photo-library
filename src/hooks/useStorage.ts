import { addDoc, collection } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const useStorage = (file: any) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<any>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const storageRef = ref(projectStorage, file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setError(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            const docRef = await addDoc(
              collection(projectFirestore, "images"),
              {
                url: downloadURL,
                createdAt: timestamp,
              }
            );
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          setUrl(downloadURL);
          window.location.reload();
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
