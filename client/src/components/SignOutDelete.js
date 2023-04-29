import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import axios from "axios";
import { GetServerUrl } from "./GetUrls";


// Logs the user out and clears local storage, then redirects to the login page
export default function SignUserOut() {

    signOut(auth).then(() => {
        localStorage.clear();
        window.location.pathname = "/";
    });
}

export function DeleteSignedUser() {

    // Retrieving the current user, server URL, token, and user ID from localStorage
    const user = auth.currentUser;
    const serverUrl = GetServerUrl();
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("id");

    // A DELETE request to delete the user's custom views
    axios.delete(`${serverUrl}deleteall/customview/${user.uid}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ID: `${uid}`
          },
        }).catch((error) => {
            console.log("Error deleting custom views:", error);
            return Promise.resolve();
        }).then(() => {
             // After deleting custom views, a DELETE request to delete the user
            axios.delete(`${serverUrl}deleteuser/${user.uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ID: `${uid}`
                },
            }).then(() => {
                // If successful, clearing also localStorage and redirect to sign in page
                console.log("User Account Deleted");
                localStorage.clear();
                window.location.pathname = "/";
            }).catch((error) => {
                console.log("Error deleting user:", error);
        });
    });
}
