import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { GetServerUrl } from "../components/GetUrls";

export default function RegisterForm() {
    const schema = yup.object().shape({
        firstName: yup.string().required("this is required information"),
        lastName: yup.string().required("this is required information"),
        email: yup.string().email().required("this is required information"),
        password: yup.string().min(6).max(20).required("this is required information"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "passwords don't match")
            .required("this is required information")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const serverUrl = GetServerUrl();

    const registerUser = () => {
        try {
            const user = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            };

            axios.post(`${serverUrl}createuser`, user, {
                headers: {
                  'Content-Type': 'application/json'
                },
              }).then((res) => {
                console.log(res.status, res.data);
                window.location.pathname = "/";
            });

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
                onChange={user => setLastName(user.target.value)} />
            {errors.lastName?.message && <p data-testid="lastname-info">{errors.lastName?.message}</p>}
            <input type="email"
                value={email}
                placeholder="Email..."
                {...register("email")}
                onChange={user => setEmail(user.target.value)} />
            {errors.email?.message && <p data-testid="email-info">{errors.email?.message}</p>}
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
            <input data-testid="signup-submit" type="submit" value="Submit" />
        </form>
    );
};

export function LoginForm() {
    const schema = yup.object().shape({
      email: yup.string().email().required("This is required information"),
      password: yup.string().min(6).max(20).required("This is required information"),
    });
  
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const createToken = async (userId) => {
        try {
            const response = await axios.post('/createusertoken', { userId }, {
                headers: {
                  'Content-Type': 'application/json'
                },
              });
          const token = response.data;
          console.log('User token:', token);
          localStorage.setItem("token", token);
          localStorage.setItem("isAuth", true);
        } catch (error) {
          console.log("Error creating user token:", error);
          setErrorMessage("Error creating user token");
        }
    };
  
    const login = async () => {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );      
        console.log('User:', user);
        await createToken(user.user.uid);
        navigate("/home");
      } catch (error) {
        console.log(error.message);
        setErrorMessage("Incorrect email or password. Please try again.");
      }
    };

    return (
        <form onSubmit={handleSubmit(login)}>
            {errorMessage && <p>{errorMessage}</p>}
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
            {errors.password?.message && <p data-testid="password-error">{errors.password?.message}</p>}

            <input data-testid="signin-submit" type="submit" value="Submit" />
        </form>
    );
};

export function GoogleForm() {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            navigate("/home");
        });
    };

    return (
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    );
};
