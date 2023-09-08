import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase/firebase.ts";

export async function uploadFiles(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
        const storageRef = ref(storage, file.name);

        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        urls.push(url);
    }

    return urls;
}
