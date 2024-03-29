
import {useContext} from "react";
import {ModalContext} from "@/context/AddEditModalContext";



export const useAddEditModal = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("Error!!");
    }

    return context
};