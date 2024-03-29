// "use client"
import {useContext} from "react";
import {ProductContext} from "@/context/AllProductContext";



export const useProduct = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error("Error!!");
    }

    return context
};