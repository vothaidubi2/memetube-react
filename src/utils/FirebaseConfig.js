import { initializeApp } from "firebase/app";
import { push, onValue, getDatabase, child,ref as refDatabase} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref,deleteObject } from "firebase/storage";
import setCookie from "../Components/Cookie/setCookie";

const firebaseConfig = {
    apiKey: "AIzaSyCVPWnDvCqE2WD7L6FowgYYMwGahEIC2hk",
    authDomain: "memetube-2.firebaseapp.com",
    databaseURL: "https://memetube-2-default-rtdb.firebaseio.com",
    projectId: "memetube-2",
    storageBucket: "memetube-2.appspot.com",
    messagingSenderId: "1091776246958",
    appId: "1:1091776246958:web:b37766e43a8b7c970a293f",
    measurementId: "G-VLZEL8PQST"
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
  window.history.replaceState(null, "Meet", `?id=${firepadRef.key}`);
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
export { child, refDatabase, push, onValue ,firepadRef};
export default new FirebaseConfig
