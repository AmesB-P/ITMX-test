"use client"
import {Fragment, useRef, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useForm, SubmitHandler} from "react-hook-form"
import {useAddEditModal} from "@/hooks/useAddEditModal";
import { v4 as uuidv4 } from 'uuid';
import {useProduct} from "@/hooks/useProduct";
import Swal from 'sweetalert2'
export default function ModalAddAndEditProduct() {

    type Inputs = {
        id: string
        name: string
        description: string
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
    } = useForm<Inputs>()

    const {open, setOpen, singleProductData, setSingleProductData, mode, setMode} = useAddEditModal()

    useEffect(() => {
        let isMounted = true
        setValue("id", singleProductData.id)
        setValue("name", singleProductData.name)
        setValue("description", singleProductData.description)
        return () => {
            isMounted = false;
        }
    }, [watch, singleProductData]);

    const {products,setProducts} = useProduct()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        try {
            const newData = {
                ...data,
                img : "",
                id : uuidv4()
            }
            if(mode === "add"){
                setProducts([...products, newData])
                console.log("newData" , newData)
            }else{
                setProducts((value : any)=> {
                    const editIndex = value.map((e : any) => e.id).indexOf(data.id)
                    value[editIndex] = data
                    return [...value]
                })
            }


            Swal.fire(`${mode === "add" ? `Add` : `Edit`} success!!`,``,'success').then(res => Promise.resolve(res))

            handleCancelProduct()

        } catch (e) {

        }
    }

    const onDelete = (data : any) => {
        try {

            setProducts((value : any)=> {
                const editIndex = value.map((e : any) => e.id).indexOf(data.id)
                value.splice(editIndex , 1)
                console.log("value delete" , value)
                return [...value]
            })

            Swal.fire(`Delete success!!`,``,'success').then(res => Promise.resolve(res))

            handleCancelProduct()
        } catch (e) {

        }
    }


    const onChangeName = (data: string) => {
        try {

            setSingleProductData({
                ...singleProductData,
                name: data
            })
        } catch (e) {

        }
    }
    const onChangeDescription = (data: string) => {
        try {
            setSingleProductData({
                ...singleProductData,
                description: data
            })
        } catch (e) {

        }
    }

    const handleCancelProduct = () => {
        try {
            setOpen(false)
            setMode("add")
            reset()
            setSingleProductData({
                id: "",
                img: "",
                name: "",
                description: ""
            })
        } catch (e) {

        }
    }

    const cancelButtonRef = useRef(null)


    return (
        <>
            <div className={`flex grid-cols-1 justify-end`}>
                <button className={`p-4 bg-blue-400 text-white rounded-2xl`} onClick={() => setOpen(true)}> Add +</button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleCancelProduct}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="">
                                                {/*<div*/}
                                                {/*    className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">*/}
                                                {/*    <ExclamationTriangleIcon className="h-6 w-6 text-red-600"*/}
                                                {/*                             aria-hidden="true"/>*/}
                                                {/*</div>*/}

                                                <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3"
                                                                  className="text-2xl font-semibold leading-6 text-gray-900">
                                                        {mode === "add" ? "Add" : "Edit"} product
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <input hidden value={singleProductData?.id ?? ""}  {...register("id")}/>

                                                        <div className={"grid grid-cols-1 gap-2"}>
                                                            <div className={'grid grid-cols-1'}>
                                                                <label className={'grid-cols-1'}>Product name : </label>
                                                                <input
                                                                    value={singleProductData?.name ?? ""}  {...register("name")}
                                                                    className={'grid-cols-1 p-2 border-2 rounded-lg w-full'}
                                                                    onChange={(value) => onChangeName(value.target.value)}/>
                                                            </div>
                                                            <div className={'grid grid-cols-1'}>
                                                                <label className={'grid-cols-1'}>Description : </label>
                                                                <textarea
                                                                    value={singleProductData?.description ?? ""}  {...register("description")}
                                                                    className={'grid-cols-1 p-2 border-2 rounded-lg'}
                                                                    onChange={(value) => onChangeDescription(value.target.value)}/>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 sm:ml-3 sm:w-auto"
                                                // onClick={onSubmit}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={handleCancelProduct}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                className={`${mode === "add" ? "hidden" : ""} mt-3 inline-flex w-full justify-center rounded-md text-white bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 sm:mt-0 sm:mr-3 sm:w-auto`}
                                                onClick={()=>onDelete(getValues())}
                                                // ref={cancelButtonRef}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>

    )
}
