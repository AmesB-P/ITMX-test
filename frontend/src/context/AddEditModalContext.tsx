"use client"

import React, {createContext, useState } from "react";

type productTypes = {
    id : string ,
    img : string,
    name : string ,
    description : string
}


type ModalContextTypes = {
    open : boolean,
    setOpen: (value: boolean) => void,
    mode: string,
    setMode: (value: string) => void,
    singleProductData : productTypes
    setSingleProductData : (value: productTypes) => void
};
export const ModalContext = createContext<ModalContextTypes | null>(null)

export const ModalProvider =({children}: Readonly<{
    children: React.ReactNode;
}>)=>{
    const [open, setOpen] = useState<ModalContextTypes["open"]>(false)
    const [singleProductData, setSingleProductData] = useState<ModalContextTypes["singleProductData"]>({
        id :  "",
        img : "",
        name : "",
        description : ""
    })
    const [mode, setMode] = useState<ModalContextTypes["mode"]>("add")

    return (
        <ModalContext.Provider value={{open , setOpen ,mode , setMode , singleProductData ,setSingleProductData}}>
            {children}
        </ModalContext.Provider>
    )
}
