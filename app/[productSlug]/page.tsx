"use client";
import Loder from "@/components/Loder";
import Image from "next/image";
import React, { FC, useState, useEffect } from "react";
import { notFound } from "next/navigation";

interface ProductDetailsProps {
  params: {
    productSlug: number;
  };
}

interface Product {
  name: string;
  id: number;
}


const ProductDetails: FC<ProductDetailsProps> = ({ params }) => {
  const [product, setProduct] = useState<Product>({
    name: "",
    id: params.productSlug,
  });
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/items/${params.productSlug}`
      );
      if (!response.ok) {
        setError(true)
      }
       const productData: Product = await response.json()
        setProduct(productData);
        setDataLoaded(true);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  if(error){
    notFound()
  }

  return (
    <>
      {dataLoaded ? (
        <div className="mt-3 flex justify-center flex-col items-center">
          <h1 className="text-center text-orange-600 text-3xl ">{product.name.toLocaleUpperCase()}</h1>
          <Image
            src="/gif.gif"
            alt="abs logo"
            className=" h-auto w-auto mt-10"
            width={90}
            height={24}
            priority
            unoptimized
          />
        </div>
      ) : (
        <Loder />
      )}
    </>
  );
};

export default ProductDetails;
