"use client"

import React, {createContext, useState } from "react";
import {productData} from "@/data/AllProductData";

type productTypes = {
    id : string,
    img : string,
    name : string,
    description : string
}

type productContextTypes = {
    products: productTypes[];
    setProducts: (value: productTypes[] | any) => void | productTypes[] ;
};
export const ProductContext = createContext<productContextTypes | null>(null)

export const AllProductProvider =({children}: Readonly<{
    children: React.ReactNode;
}>)=>{

    const [products, setProducts] = useState<productTypes[] | []>(productData);
    return (
        <ProductContext.Provider value={{products , setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}
