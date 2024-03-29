"use client"

import {useProduct} from "@/hooks/useProduct";
import ProductCard from "@/components/ProductCard";
import ModalAddAndEditProduct from "@/components/ModalAddAndEditProduct";

const AllProduct = () => {
    const {products} = useProduct()
  return (
      <>

          <ModalAddAndEditProduct/>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-10 overflow-y-auto`}>
              {
                  products.map((e,index)=>(
                      <ProductCard key={index} productData={e}/>
                  ))
              }
          </div>

      </>
  )
}

export default AllProduct