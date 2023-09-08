import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../firebase/firebase.ts";
import {toast} from "react-toastify";

export async function uploadFilesWithToast(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
        const toastId = toast('Uploading ' + file.name + "...", {autoClose: false});
        const storageRef = ref(storage, file.name);

        // Wrap the upload in a Promise so that we can await it
        await new Promise((resolve, reject) => {
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Update the progress bar of the toast here
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    toast.update(toastId, {progress});
                },
                (error) => {
                    // On error, dismiss the toast and reject the Promise
                    toast.dismiss(toastId);
                    reject(error);
                },
                async () => {
                    // On complete, update the toast to show success and resolve the Promise
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    urls.push(url);

                    toast.update(toastId, {type: 'success', autoClose: 500});
                    resolve(null);
                }
            );
        });
    }
    return urls;
}
