// --- 1. Imports for state and navigation ---
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import signinimage from '../../images/signin-g.svg'
import ScrollToTop from "../ScrollToTop";

const MyAccountSignIn = () => {
    // --- 2. State variables to hold form data ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // --- 3. Function to handle form submission ---
    const handleSignIn = async (e) => {
        e.preventDefault();

        const credentials = { email, password };

        try {
            // IMPORTANT: Replace with your actual backend URL
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign in.');
            }

            // On success, the backend should send back a token.
            if (data.token) {
                // Store the token in the browser's local storage
                localStorage.setItem('token', data.token);
                
                alert('Signed in successfully!');
                navigate('/Shop'); // Redirect to the shop or dashboard
            }

        } catch (error) {
            console.error("Signin error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <> <ScrollToTop/> </>
            <section className="my-lg-14 my-8">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                            <img src={signinimage} alt="freshcart" className="img-fluid" />
                        </div>
                        <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                            <div className="mb-lg-9 mb-5">
                                <h1 className="mb-1 h2 fw-bold">Sign in to FreshCart</h1>
                                <p>Welcome back to FreshCart! Enter your email to get started.</p>
                            </div>

                            {/* --- 4. Connecting state and functions to the form JSX --- */}
                            <form onSubmit={handleSignIn}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultChecked
                                                id="flexCheckDefault"
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Remember me
                                            </label>
                                        </div>
                                        <div>
                                            Forgot password?{" "}
                                            <Link to="/MyAccountForgetPassword">Reset it</Link>
                                        </div>
                                    </div>
                                    <div className="col-12 d-grid">
                                        <button type="submit" className="btn btn-primary">
                                            Sign In
                                        </button>
                                    </div>
                                    <div>
                                        Don’t have an account?{" "}
                                        <Link to="/MyAccountSignUp"> Sign Up</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyAccountSignIn;