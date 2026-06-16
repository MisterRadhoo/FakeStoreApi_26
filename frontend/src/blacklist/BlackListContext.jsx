import { createContext, useContext, useEffect, useState } from "react";
import { getBlackList } from "./blackListApi.js";
import { getErrorMessage } from "../utils/utils.js";

const BlackListContext = createContext(null);

export const BlackListProvider = ({ children }) => {
    const [blackList, setBlackList] = useState([]);
    const [isLoadingBlackList, setIsLoadingBlackList] = useState(true);
    const [blackListError, setBlackListError] = useState("");

    useEffect(() => {
        const loadBlackList = async () => {
            setIsLoadingBlackList(true);
            setBlackListError("");

            try {
                const result = await getBlackList();

                setBlackList(result.data || []);
            } catch (error) {
                setBlackListError(getErrorMessage(error));
            } finally {
                setIsLoadingBlackList(false);
            }
        };

        loadBlackList();
    }, []);

    return (
        <BlackListContext.Provider
            value={{
                blackList,
                isLoadingBlackList,
                blackListError
            }}
        >
            {children}
        </BlackListContext.Provider>
    );
};

export const useBlackList = () => {
    const context = useContext(BlackListContext);

    if (!context) {
        throw new Error("useBlackList must be used inside BlackListProvider!");
    }

    return context;
};