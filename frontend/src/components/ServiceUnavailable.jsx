const ServiceUnavailable = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 top-8 z-9999 flex justify-center px-6">
            <section className="border-4 border-slate-950 bg-white px-8 py-6 text-center shadow-[8px_8px_0_#020617]">
                <h1 className="pixel-font text-4xl font-black uppercase text-red-500 drop-shadow-[3px_3px_0_#020617]">
                    503
                </h1>

                <p className="pixel-font mt-4 text-sm font-black uppercase text-slate-700">
                    {message}
                </p>
            </section>
        </div>
    );
};

export default ServiceUnavailable;