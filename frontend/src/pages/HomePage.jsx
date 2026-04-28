

const HomePage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <main className="mx-auto max-w-7xl px-6 py-20">
                <section className="max-w-3xl">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
                        Fake Store API
                    </p>

                    <h1 className="text-5xl font-black leading-tight text-slate-950 md:text-7xl">
                        Build your ecommerce frontend.
                    </h1>

                    <p className="mt-6 text-xl leading-8 text-slate-600">
                        This is your HomePage. The Navbar is imported from the
                        components folder and rendered above this content.
                    </p>

                    <div className="mt-10">
                        <a
                            href="#"
                            className="rounded-full bg-slate-950 px-8 py-4 font-bold text-white hover:bg-yellow-400 hover:text-slate-950"
                        >
                            Get Started
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;