import React, { FC, useRef, useState } from "react";

interface FormProductsProps {
  handleClick: () => void;
}

const FormProducts: FC<FormProductsProps> = ({ handleClick }) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const descInput = useRef<HTMLInputElement>(null);

  const [inputValid, setInputValid] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let name = nameInput.current?.value;
    let desc = descInput.current?.value;

    if (name?.trim() === "" || desc?.trim() === "") {
      setInputValid(true);
    } else {
      const formData = new FormData(event.target as HTMLFormElement);
      const formJson = Object.fromEntries(formData.entries());

      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson),
      };

      fetch("http://localhost:5000/items", requestOptions).then(
        async (response) => {
          if (!response.ok) {
            throw new Error(`Non e' stato possibile aggiungere l'articolo ${nameInput}`);
          }
          handleClick();
        }
      );
      setInputValid(false);
    }

    if (nameInput.current) {
      nameInput.current.value = "";
    }
    if (descInput.current) {
      descInput.current.value = "";
    }
  };

  return (
    <>
      <div className="flex justify-center my-9">
        <form onSubmit={handleSubmit} className="flex">
          <div className="mx-10 ">
            <p>
              <label htmlFor="name" className="mx-3 text-orange-600">
                Nome
              </label>
            </p>
            <input
              ref={nameInput}
              className=" text-white bg-transparent border-b border-orange-600 rounded-md focus:outline-none focus:border"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="mx-10 ">
            <p>
              <label htmlFor="name" className="mx-3 text-orange-600">
                Description
              </label>
            </p>
            <input
              ref={descInput}
              className=" text-white bg-transparent border-b border-orange-600 rounded-md focus:outline-none focus:border"
              type="text"
              name="desc"
              id="desc"
            />
          </div>

          <button type="submit" className="bg-orange-500 hover:bg-orange-500 text-white font-bold py-1 px-3 border-b-4 border-orange-700 hover:border-orange-600 rounded">Add products</button>
        </form>
      </div>

      {inputValid && <p className=" text-red-600 text-center mt-5">Attenzione: Compilare tutti i campi richiesti !</p>}
    </>
  );
};

export default FormProducts;
