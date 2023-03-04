import { useEffect, useState } from "react";

export const useLocalStorage = (key) => {
    const [value, setValue] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage && value === "") {
            setIsMounted(true)
            setValue(localStorage.getItem(key))
        }
    }, [key, value]);
    if(isMounted) return value;
}