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

    // Setting up schema for form validation using yup
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

    // Setting up the useForm hook with the schema resolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // Setting up states for form input values
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Getting the server URL from GetServerUrl function
    const serverUrl = GetServerUrl();

    // Function to handle user registration upon form submission
    const registerUser = () => {
        try {
            // Creating a user object with input values
            const user = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            };

            // Sending a POST request to create a new user
            axios.post(`${serverUrl}createuser`, user).then((res) => {
                console.log(res.status, res.data);
                // Redirecting user to home page upon successful registration
                window.location.pathname = "/";
            });

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        // A form is rendered with an onSubmit handler that will call the registerUser function when the form is submitted
        <form onSubmit={handleSubmit(registerUser)}>
            {/* Input field for first name with value and onChange handlers that update the firstName state, and a conditional error message */}
            <input type="text"
                value={firstName}
                placeholder="First Name..." {...register("firstName")}
                onChange={user => setFirstName(user.target.value)} />
            {errors.firstName?.message && <p data-testid="firstname-info">{errors.firstName?.message}</p>}
    
            {/* Input field for last name with value and onChange handlers that update the lastName state, and a conditional error message */}
            <input type="text"
                value={lastName}
                placeholder="Last Name..." {...register("lastName")}
                onChange={user => setLastName(user.target.value)} />
            {errors.lastName?.message && <p data-testid="lastname-info">{errors.lastName?.message}</p>}
    
            {/* Input field for email with value and onChange handlers that update the email state, and a conditional error message */}
            <input type="email"
                value={email}
                placeholder="Email..."
                {...register("email")}
                onChange={user => setEmail(user.target.value)} />
            {errors.email?.message && <p data-testid="email-info">{errors.email?.message}</p>}
    
            {/* Input field for password with value and onChange handlers that update the password state, and a conditional error message */}
            <input type="password"
                value={password}
                placeholder="Password..." {...register("password")}
                onChange={user => setPassword(user.target.value)} />
            {errors.password?.message && <p data-testid="password-info">{errors.password?.message}</p>}
    
            {/* Input field for password confirmation with value and onChange handlers that update the confirmPassword state, and a conditional error message */}
            <input type="password"
                value={confirmPassword}
                placeholder="Password confirmation..." {...register("confirmPassword")}
                onChange={user => setConfirmPassword(user.target.value)} />
            {errors.confirmPassword?.message && <p data-testid="password-confirmation-info">{errors.confirmPassword?.message}</p>}
    
            {/* Submit button for the form */}
            <input data-testid="signup-submit" type="submit" value="Submit" />
        </form>
    );
};

export function LoginForm() {

    // Validation schema for the form
    const schema = yup.object().shape({
        email: yup.string().email().required("This is required information"),
        password: yup.string().min(6).max(20).required("This is required information"),
    });

    // react-hook-form to handle the form submission and validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // State variables for the form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const createToken = async (userId) => {

        try {

            // A POST request to create a user token
            const response = await axios.post('/createusertoken', { userId }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            // Extracting the token from the response data
            const token = response.data;
            console.log('User token:', token);

            // Storing the token and setting isAuth to true in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("isAuth", true);
        } catch (error) {
            console.log("Error creating user token:", error);
            setErrorMessage("Error creating user token");
        }
    };
    
    const login = async () => {

        try {

            // Sign in the user with the provided email and password
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );      
            console.log('User:', user);

            // Storing the user ID in localStorage
            localStorage.setItem("id", user.user.uid);

            // Creating a user token and navigate to the home page
            await createToken(user.user.uid);

            navigate("/home");
        } catch (error) {
            console.log(error.message);
            setErrorMessage("Incorrect email or password. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(login)}>

            {/* Display error message if it exists */}
            {errorMessage && <p>{errorMessage}</p>}

            {/* Input field for email */}
            <input type="email"
                value={email}
                placeholder="Email..."
                {...register("email")}
                onChange={user => setEmail(user.target.value)} />

            {/* Display validation error message for email */}
            {errors.email?.message && <p data-testid="email-error">{errors.email?.message}</p>}

            {/* Input field for password */}
            <input type="password"
                value={password}
                placeholder="Password..." {...register("password")}
                onChange={user => setPassword(user.target.value)} />

            {/* Display validation error message for password */}
            {errors.password?.message && <p data-testid="password-error">{errors.password?.message}</p>}

            {/* Submit button */}
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
