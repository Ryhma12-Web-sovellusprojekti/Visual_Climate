import React, { useState } from "react";
import { auth, provider } from "../firebase-config"; 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { fsdb } from '../firebase-config';
import { doc, collection, setDoc } from "firebase/firestore";

export default function RegisterForm({ setIsAuth }) {   
    const schema = yup.object().shape({
        firstName: yup.string().required("this is requred information"),
        lastName: yup.string().required("this is requred information"),
        email: yup.string().email().required("this is requred information"),
        userName: yup.string().required("this is requred information"),
        password: yup.string().min(6).max(20).required("this is requred information"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null],"passwords don't match")
            .required("this is requred information")
    });

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const registerUser = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            )

            await updateProfile(auth.currentUser, { 
                displayName: `${firstName} ${lastName}`,
                photoURL: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
            }).catch(
                (err) => console.log(err)
              );

            const usersCollectionRef = collection(fsdb, "users");
            const docRef = doc(usersCollectionRef, user.user.uid);
            
            await setDoc(docRef, {
              firstName: firstName,
              lastName: lastName,
              userName: userName
            });

            console.log(user);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" 
                value={firstName} 
                placeholder="First Name..." {...register("firstName")}
                onChange={user => setFirstName(user.target.value)} /> 
                {errors.firstName?.message && <p data-testid="firstname-info">{errors.firstName?.message}</p>}
            <input type="text" 
                value={lastName} 
                placeholder="Last Name..." {...register("lastName")}
                onChange={user => setLastName(user.target.value)}/>
                {errors.lastName?.message && <p data-testid="lastname-info">{errors.lastName?.message}</p>}
            <input type="email" 
                value={email} 
                placeholder="Email..." 
                {...register("email")}
                onChange={user => setEmail(user.target.value)} />
                {errors.email?.message && <p data-testid="email-info">{errors.email?.message}</p>}
            <input type="text" 
                value={userName} 
                placeholder="Username..." {...register("userName")}
                onChange={user => setUserName(user.target.value)} />
                {errors.userName?.message && <p data-testid="username-info">{errors.userName?.message}</p>}
            <input type="password" 
                value={password} 
                placeholder="Password..." {...register("password")} 
                onChange={user => setPassword(user.target.value)} />
                {errors.password?.message && <p data-testid="password-info">{errors.password?.message}</p>}
            <input type="password" 
                value={confirmPassword} 
                placeholder="Password confirmation..." {...register("confirmPassword")}
                onChange={user => setConfirmPassword(user.target.value)} />
                {errors.confirmPassword?.message && <p data-testid="password-confirmation-info">{errors.confirmPassword?.message}</p>}
            <input data-testid="signup-submit" type="submit" value="Submit"/>
        </form>
    );
};

export function LoginForm({ setIsAuth }) {   
    const schema = yup.object().shape({
        email: yup.string().email().required("this is requred information"),
        password: yup.string().min(6).max(20).required("this is requred information"),
    });

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const Login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                email, 
                password
            );

            console.log(user);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(Login)}>
            <input type="email" 
                value={email} 
                placeholder="Email..." 
                {...register("email")}
                onChange={user => setEmail(user.target.value)} />
                {errors.email?.message && <p data-testid="email-error">{errors.email?.message}</p>}
                
            <input type="password" 
                value={password} 
                placeholder="Password..." {...register("password")}
                onChange={user => setPassword(user.target.value)} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
                
            <input data-testid="signin-submit" type="submit" value="Submit" />
        </form>
    );
};

export function GoogleForm({ setIsAuth }) {
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/home");
        });
    };

    return(
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
            </button>
    );
};

