import BlackListCard from "../components/BlackListCard.jsx";
import { useBlackList } from "../BlackListContext.jsx";

const BlackListPage = () => {
    const {
        blackList,
        isLoadingBlackList,
        blackListError
    } = useBlackList();

    if (isLoadingBlackList) {
        return (
            <section className="pixel-font flex min-h-[60vh] items-center justify-center text-sm text-[#030712] dark:text-white">
                LOADING BLACKLIST...
            </section>
        );
    }

    const botBlackList = blackList.filter((item) => item.label === "Bot");
    const toxicBlackList = blackList.filter((item) => item.label === "Toxic");

    return (
        <section className="pixel-font mx-auto max-w-7xl px-6 py-12">
            <div className="border-4 border-[#030712] bg-white px-8 py-10 text-[#030712] shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#111827] dark:text-white dark:shadow-[12px_12px_0_#ffffff]">
                <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-3xl font-black uppercase text-red-500 drop-shadow-[5px_5px_0_#030712] dark:drop-shadow-[5px_5px_0_#ffffff]">
                        BLACKLISTED USERS
                    </h1>

                    <span className="border-4 border-[#030712] bg-[#fff6cc] px-5 py-3 text-[10px] uppercase text-[#030712] shadow-[6px_6px_0_#030712] dark:border-white dark:bg-[#374151] dark:text-white dark:shadow-[6px_6px_0_#ffffff]">
                        TOTAL: {blackList.length}
                    </span>
                </div>

                {blackListError ? (
                    <div className="border-4 border-red-700 bg-red-200 p-5 text-[10px] text-red-900 shadow-[6px_6px_0_#7f1d1d]">
                        {blackListError}
                    </div>
                ) : null}

                {!blackListError && blackList.length === 0 ? (
                    <div className="border-4 border-[#030712] bg-[#fff6cc] p-6 text-[10px] text-[#030712] shadow-[8px_8px_0_#030712] dark:border-white dark:bg-[#374151] dark:text-white dark:shadow-[8px_8px_0_#ffffff]">
                        NO BLACKLISTED USERS FOUND.
                    </div>
                ) : null}

                {!blackListError && blackList.length > 0 ? (
                    <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
                        <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l-4 border-[#030712] dark:border-white lg:block" />

                        <section>
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-xl font-black uppercase text-red-500 drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                                    BOT DETECTIONS
                                </h2>

                                <span className="border-4 border-[#030712] bg-red-500 px-5 py-3 text-[10px] uppercase text-white shadow-[6px_6px_0_#7f1d1d] dark:border-white">
                                    TOTAL: {botBlackList.length}
                                </span>
                            </div>

                            {botBlackList.length > 0 ? (
                                <div className="space-y-6">
                                    {botBlackList.map((item) => (
                                        <BlackListCard key={item.id} item={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="border-4 border-[#030712] bg-[#fff6cc] p-6 text-[10px] text-[#030712] shadow-[8px_8px_0_#030712] dark:border-white dark:bg-[#374151] dark:text-white dark:shadow-[8px_8px_0_#ffffff]">
                                    NO BOT DETECTIONS FOUND.
                                </div>
                            )}
                        </section>

                        <section>
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-xl font-black uppercase text-orange-500 drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                                    TOXIC DETECTIONS
                                </h2>

                                <span className="border-4 border-[#030712] bg-orange-500 px-5 py-3 text-[10px] uppercase text-white shadow-[6px_6px_0_#9a3412] dark:border-white">
                                    TOTAL: {toxicBlackList.length}
                                </span>
                            </div>

                            {toxicBlackList.length > 0 ? (
                                <div className="space-y-6">
                                    {toxicBlackList.map((item) => (
                                        <BlackListCard key={item.id} item={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="border-4 border-[#030712] bg-[#fff6cc] p-6 text-[10px] text-[#030712] shadow-[8px_8px_0_#030712] dark:border-white dark:bg-[#374151] dark:text-white dark:shadow-[8px_8px_0_#ffffff]">
                                    NO TOXIC DETECTIONS FOUND.
                                </div>
                            )}
                        </section>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default BlackListPage;