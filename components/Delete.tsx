import React, { FC } from 'react';

interface DeleteComponentProps {
  id: number;
  handleClick: () => void;
}

const Delete: FC<DeleteComponentProps> = ({ id, handleClick }) => {
  
  const deletProduct = () => {
    const requestOptions: RequestInit= {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:5000/items/${id}`, requestOptions).then(
      async (response) => {
        if (!response.ok) {
          throw new Error("non e' stato possibile eliminare questo articolo");
        }
        handleClick();
      }
    );
  };

  return (
    <button onClick={deletProduct} className="bg-red-500 hover:bg-red-500 text-white font-bold py-1 px-3 border-b-4 border-red-700 hover:border-red-600 rounded hover:scale-90">
      Delete
    </button>
  );
}

export default Delete;
