import { useState } from "react";

function useToken(key = "authUser"){

    const getToken = () => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error("Error getting token from storage", error);
            return null;
        }
    };

    const [token, setToken] = useState(getToken());

    const setNewToken = (newToken) => {
        try {
            if (newToken) {
                localStorage.setItem(key, newToken);
                setToken(newToken);
            }
        } catch (error) {
            console.error("Error setting token in storage", error);
        }
    };

    const removeToken = () => {
        try {
            localStorage.removeItem(key);
            setToken(null);
        } catch (error) {
            console.error("Error removing token from storage", error);
        }
    };

    return { token, setNewToken, removeToken };
};

export default useToken;
