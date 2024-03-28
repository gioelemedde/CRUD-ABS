"use client";
import React, { useEffect, useState } from "react";
import Delete from "./Delete";
import Loder from "./Loder";
import FormProducts from "./FormProduct";
import EditComponent from "./Edit";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
}

function Table() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [orderToggle, setOrderToggle] = useState<boolean>(false);

  const getData = async () => {
    try {
      const data: Product[] = await fetch("http://localhost:5000/items").then(
        (response) => response.json()
      );
      setProducts(data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const setOrderDesc = () => {
    let sortedProducts = [...products].sort((a, b) => b.id - a.id);
    setProducts(sortedProducts);
    setOrderToggle(true);
  };

  const setOrderAsc = () => {
    let sortedProducts = [...products].sort((a, b) => a.id - b.id);
    setProducts(sortedProducts);
    setOrderToggle(false);
  };

  const handleClick = () => {
    getData();
  };

  return (
    <>
      {dataLoaded ? (
        <>
          <div className="flex justify-center mt-5 flex-col items-center ">
            <button
              onClick={orderToggle ? setOrderAsc : setOrderDesc}
              className="mb-5 border px-2 py-1 border-orange-700 rounded-md hover:bg-orange-600 hover:text-white transition "
            >
              Change order
            </button>
            <table className="border-separate border-spacing-6 border rounded-md">
              <thead>
                <tr className=" bg-orange-500  p-3">
                  <th>{!orderToggle ? "From the oldest" : "From the latest"}</th>
                  <th className="">Products</th>
                  <th className="">Description</th>
                  <th className="">Delete</th>
                  <th className="">Edit</th>
                  <th className="">Details</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className="hover:bg-slate-800 transition" key={product.name}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </td>
                    <td className="bg-black">
                      <Delete id={product.id} handleClick={handleClick} />
                    </td>
                    <td className="bg-black">
                      <EditComponent
                        id={product.id}
                        product={product}
                        handleClick={handleClick}
                      />
                    </td>
                    <td className="bg-black">
                      <Link href={`/${product.id}`}>
                      <button className="bg-green-500 hover:bg-green-500 text-white font-bold py-1 px-3 border-b-4 border-green-700 hover:border-green-600 rounded hover:scale-90">
                        Details
                      </button>
                      </Link>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FormProducts handleClick={handleClick} />
        </>
      ) : (
        <Loder />
      )}
    </>
  );
}

export default Table;
