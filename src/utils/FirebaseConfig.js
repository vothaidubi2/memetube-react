
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAOqwhqnDBpRHUJQWtE79fBcUvn0zEsUF0",
    authDomain: "memetube-fb4a6.firebaseapp.com",
    projectId: "memetube-fb4a6",
    storageBucket: "memetube-fb4a6.appspot.com",
    messagingSenderId: "927981229531",
    appId: "1:927981229531:web:54fe5041c3d10f9b1ec3fe",
    measurementId: "G-9W90Y8VZ7J"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);
class FirebaseConfig{
    DeleteImage = (imgUrl) => {
        // Create a reference to the file to delete
        function getFileNameFromURL(url) {
            const partsWithoutQuery = url.split('?')[0];
            const parts = partsWithoutQuery.split('/');
            const fileName = parts[parts.length - 1];
            return fileName;
        }
        const desertRef = ref(storage, getFileNameFromURL(imgUrl));
    
        // Delete the file
        deleteObject(desertRef).then(() => {
            console.log("Image deleted successfully");
        }).catch((error) => {
            console.error("Error deleting image:", error);
        });
    };
    DeleteVideo = (imgUrl) => {
        
    
        // Create a reference to the file to delete
        function getFileNameFromURL(url) {
            const partsWithoutQuery = url.split('?')[0];
            const parts = partsWithoutQuery.split('/');
            const fileName = parts[parts.length - 1];
            return fileName;
        }
        const desertRef = ref(storage, getFileNameFromURL(imgUrl));
    
        // Delete the file
        deleteObject(desertRef).then(() => {
            console.log("Video deleted successfully");
        }).catch((error) => {
            console.error("Error deleting Video:", error);
        });
    };
}
export default new FirebaseConfig