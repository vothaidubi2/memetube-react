import { initializeApp } from "firebase/app";
import { push, onValue, getDatabase, child,ref as refDatabase} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref,deleteObject } from "firebase/storage";
import setCookie from "../Components/Cookie/setCookie";

const firebaseConfig = {
  apiKey: "AIzaSyAOqwhqnDBpRHUJQWtE79fBcUvn0zEsUF0", // Add API Key
  databaseURL:"https://memetube-fb4a6-default-rtdb.asia-southeast1.firebasedatabase.app/" ,
  authDomain: "memetube-fb4a6.firebaseapp.com",
  projectId: "memetube-fb4a6",
  storageBucket: "memetube-fb4a6.appspot.com",
  messagingSenderId: "927981229531",
  appId: "1:927981229531:web:54fe5041c3d10f9b1ec3fe",
  measurementId: "G-9W90Y8VZ7J"// Add databaseURL
  };
  var currentdate = new Date();
  var datetime = "Stream at: " + currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/" 
  + currentdate.getFullYear() + " @ "  
  + currentdate.getHours() + ":"  
  + currentdate.getMinutes() + ":" 
  + currentdate.getSeconds();
  export let userRole = false;
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);
  export const db = getDatabase(app);
  var firepadRef = refDatabase(db);
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");
const currentURL = new URL(window.location.href);
if(currentURL.pathname.startsWith('/stream')){
    if (roomId) {
  firepadRef = child(firepadRef,roomId);
} else {
  firepadRef = push(firepadRef);
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
  userRole = true; // Đặt vai trò là admin
  setCookie('timeLiveStream',datetime)
}
}


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
export    default firepadRef;
export { child, refDatabase, push, onValue };
// export default new FirebaseConfig