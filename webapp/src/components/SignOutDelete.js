
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase-config";

export default function SignUserOut() {
    signOut(auth).then(() => {
        localStorage.clear();
        //setIsAuth(false);
        localStorage.removeItem("user");
        localStorage.setItem("isAuth", false);
        window.location.pathname = "/";
    });
}

export function DeleteSignedUser() {
    const user = auth.currentUser;

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