import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
    const error = useRouteError();

    const message =
        error && error.status === 404
            ? "Page not found"
            : "Something went wrong";

    return (
        <main className="min-h-screen bg-[#f8e7b8] px-6 py-20">
            <section className="mx-auto max-w-3xl border-4 border-slate-950 bg-white p-8 text-center shadow-[10px_10px_0_#020617]">
                <h1 className="pixel-font text-5xl font-black uppercase text-red-500 drop-shadow-[4px_4px_0_#020617]">
                    404
                </h1>

                <p className="pixel-font mt-5 text-sm font-black uppercase text-slate-700">
                    {message}
                </p>

                <Link
                    to="/"
                    className="pixel-font mt-8 inline-flex min-h-12 items-center justify-center border-4 border-slate-950 bg-blue-300 px-5 py-3 text-xs font-black uppercase text-slate-950 shadow-[4px_4px_0_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                    Back Home
                </Link>
            </section>
        </main>
    );
};

export default NotFound;