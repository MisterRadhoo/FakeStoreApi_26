import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import { updateMe } from "../../user/userApi.js";

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, updateCurrentUser } = useAuth();

    const [formData, setFormData] = useState({
        userName: user.userName || "",
        email: user.email || "",
        fullName: user.fullName || "",
        role: user.role || "user"
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
        setIsSubmitting(true);

        try {

            const response = await updateMe({
                userName: formData.userName,
                email: formData.email,
                fullName: formData.fullName,
                role: formData.role
            });

            updateCurrentUser(response.data.data);
            navigate("/account");
        } catch (error) {
            setErrorMessage(
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Profile update failed!"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f8e7b8] px-6 py-14">
            <section className="mx-auto max-w-2xl border-4 border-slate-950 bg-white p-8 shadow-[10px_10px_0_#020617]">
                <h1 className="pixel-font mb-8 text-center text-xl font-black uppercase tracking-widest text-slate-950">
                    Edit Profile
                </h1>

                {errorMessage && (
                    <p className="pixel-font mb-5 border-2 border-red-700 bg-red-100 px-4 py-3 text-sm font-bold text-red-700">
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="userName"
                            className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950"
                        >
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
                        <label
                            htmlFor="email"
                            className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950"
                        >
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
                        <label
                            htmlFor="fullName"
                            className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950"
                        >
                            Full name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            autoComplete="name"
                            className="pixel-font w-full border-4 border-slate-950 px-4 py-3 font-bold outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="role"
                            className="pixel-font mb-2 block text-sm font-black uppercase text-slate-950"
                        >
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="pixel-font w-full border-4 border-slate-950 bg-white px-4 py-3 font-bold uppercase outline-none"
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="pixel-font mb-5 w-full border-4 border-slate-950 bg-blue-300 px-6 py-3 text-sm font-black uppercase text-slate-950 shadow-[5px_5px_0_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
                    >
                        {isSubmitting ? "Saving..." : "Save changes"}
                    </button>

                    <Link
                        to="/account"
                        className="pixel-font block w-full border-4 border-slate-950 bg-white px-6 py-3 text-center text-sm font-black uppercase text-slate-950 shadow-[5px_5px_0_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                    >
                        Back to account
                    </Link>
                </form>
            </section>
        </main>
    );
};

export default EditProfile;