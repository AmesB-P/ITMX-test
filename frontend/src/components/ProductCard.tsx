import Image from "next/image";
import mockPic from "../assets/Image/mockPic.jpg"
import Link from "next/link";
import {useAddEditModal} from "@/hooks/useAddEditModal";

type productDataTypes ={
    id : string,
    img : string,
    name : string,
    description : string,
}

type propsTypes ={
    productData : productDataTypes
}

const ProductCard = ({productData} : propsTypes) => {
    const {name , description,id} = productData
    const {open ,setOpen, singleProductData , setSingleProductData , setMode } = useAddEditModal()

    const handleEditProduct =()=>{
        try {
            setMode("edit")
            setSingleProductData(productData)
            setOpen(true)
        }catch (e) {

        }
    }

  return (
      <button onClick={handleEditProduct}
         className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
               src={mockPic}  alt=""/>
              <div className="flex flex-col w-full justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>

              </div>


      </button>

)
}

export default ProductCard