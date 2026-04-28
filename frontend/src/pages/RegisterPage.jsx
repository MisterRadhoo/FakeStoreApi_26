import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage("");

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        setIsSubmitting(true);

        try {
            await register({
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            navigate("/auth/login");
        } catch (error) {
            setErrorMessage(
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Register failed!"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f8e7b8] px-6 py-16">
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-md border-4 border-slate-950 bg-white p-8 shadow-[8px_8px_0_#020617]"
            >
                <h1 className="pixel-font mb-8 text-center text-xl font-black uppercase text-slate-950">
                    Register
                </h1>

                {errorMessage && (
                    <p className="pixel-font mb-5 border-2 border-red-700 bg-red-100 px-4 py-3 text-sm font-bold text-red-700">
                        {errorMessage}
                    </p>
                )}

                <div className="mb-5">
                    <label htmlFor="userName"
                        className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950">
                        Username
                    </label>
                    <input
                        id="userName"
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        autoComplete="username"
                        className="pixel-font w-full border-4 border-slate-950 px-4 py-3 font-bold outline-none"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email"
                        className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="pixel-font w-full border-4 border-slate-950 px-4 py-3 font-bold outline-none"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password"
                        className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className="pixel-font w-full border-4 border-slate-950 px-4 py-3 font-bold outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword"
                        className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className="pixel-font w-full border-4 border-slate-950 px-4 py-3 font-bold outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="pixel-font w-full border-4 border-slate-950 bg-blue-300 px-6 py-3 text-sm font-black uppercase text-slate-950 shadow-[5px_5px_0_#020617] disabled:opacity-60"
                >
                    {isSubmitting ? "Creating account..." : "Register"}
                </button>

                <p className="pixel-font mt-6 text-center text-sm font-bold text-slate-950">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="underline">
                        Login
                    </Link>
                </p>
            </form>
        </main>
    );
};

export default RegisterPage;