import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase-config";
import axios from "axios";
import { GetServerUrl } from "./GetUrls";

export default function SignUserOut() {
    signOut(auth).then(() => {
        localStorage.clear();
        localStorage.removeItem("user");
        localStorage.setItem("isAuth", false);
        window.location.pathname = "/";
    });
}

export function DeleteSignedUser() {
    const user = auth.currentUser;
    const serverUrl = GetServerUrl();

    // delete user's custom views
    axios.delete(`${serverUrl}deleteall/customview/${user.uid}`);

    deleteUser(user).then(() => {
        console.log("User Account Deleted");
        localStorage.removeItem("user");
        localStorage.setItem("isAuth", false);
        window.location.pathname = "/";
    })
    .catch((error) => {
        console.log(error.message)
    })
}