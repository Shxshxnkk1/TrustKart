// --- 1. Imports for state and navigation ---
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import signupimage from '../../images/signup-g.svg'
import ScrollToTop from "../ScrollToTop";

const MyAccountSignUp = () => {
    // --- 2. State variables to hold form data ---
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // --- 3. Function to handle form submission ---
    const handleSignUp = async (e) => {
        e.preventDefault(); // Stop the form from reloading the page

        const userData = { firstName, lastName, email, password };

        try {
            // IMPORTANT: Replace with your actual backend URL
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign up.');
            }

            alert('Account created successfully! Please sign in.');
            navigate('/MyAccountSignIn'); // Redirect to sign-in page

        } catch (error) {
            console.error("Signup error:", error);
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
                            <img src={signupimage} alt="freshcart" className="img-fluid" />
                        </div>
                        <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                            <div className="mb-lg-9 mb-5">
                                <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
                                <p>Welcome to TrustKart! Enter your email to get started.</p>
                            </div>
                            
                            {/* --- 4. Connecting state and functions to the form JSX --- */}
                            <form onSubmit={handleSignUp}>
                                <div className="row g-3">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="First name"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Last name"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
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
                                    <div className="col-12 d-grid">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                        <span className="navbar-text">
                                            Already have an account?{" "}
                                            <Link to="/MyAccountSignIn">Sign in</Link>
                                        </span>
                                    </div>
                                    <p>
                                        <small>
                                            By continuing, you agree to our{" "}
                                            <Link to="#!"> Terms of Service</Link> &amp;{" "}
                                            <Link to="#!">Privacy Policy</Link>
                                        </small>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyAccountSignUp;