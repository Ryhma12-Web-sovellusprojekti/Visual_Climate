import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import axios from "axios";
import { GetServerUrl } from "./GetUrls";

export default function SignUserOut() {
    signOut(auth).then(() => {
        localStorage.clear();
        window.location.pathname = "/";
    });
}

export function DeleteSignedUser() {
    const user = auth.currentUser;
    const serverUrl = GetServerUrl();

    // delete user's custom views and then the user
    axios.delete(`${serverUrl}deleteall/customview/${user.uid}`)
        .catch((error) => {
            console.log("Error deleting custom views:", error);
            return Promise.resolve();
        })
        .then(() => {
            axios.delete(`${serverUrl}deleteuser/${user.uid}`)
                .then(() => {
                    console.log("User Account Deleted");
                    localStorage.clear();
                    window.location.pathname = "/";
                })
                .catch((error) => {
                    console.log("Error deleting user:", error);
                });
        });
}