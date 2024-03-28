import React, { FC, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('body');

interface EditComponentProps {
  id: number;
  product: {
    name: string;
  };
  handleClick: () => void;
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'black',
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
      backdropFilter: 'blur(9px)'
    }
  };

const EditComponent: FC<EditComponentProps> = ({ id, product, handleClick }) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const requestOptions: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formJson),
    };

    fetch(`http://localhost:5000/items/${id}`, requestOptions).then(
      async (response) => {
        if (!response.ok) {
          alert("Non e' stato possibile modificare questo articolo");
        }
        handleClick();
        closeModal();
      }
    );
  };

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-1 px-3 border-b-4 border-blue-700 hover:border-blue-600 rounded hover:scale-90" onClick={openModal}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className=' text-red-500' onClick={closeModal}>X</button>
        <form onSubmit={handleSubmit} className="flex">
          <div className="mx-10 ">
            <p>
              <label htmlFor="name" className="mx-3 text-orange-600">
                Nome
              </label>
            </p>
            <input
              className=" text-white bg-transparent border-b border-orange-600 rounded-md focus:outline-none focus:border px-3 py-1"
              type="text"
              name="name"
              id="name"
              defaultValue={product.name}
            />
          </div>
          <div className="mx-10 ">
            <p>
              <label htmlFor="name" className="mx-3 text-orange-600">
                Descrizione
              </label>
            </p>
            <input
              className=" text-white bg-transparent border-b border-orange-600 rounded-md focus:outline-none focus:border ps-3 py-1"
              type="text"
              name="desc"
              id="desc"
              defaultValue='lorem ipsum...'
            />
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-500 text-white font-bold py-0 px-3 border-b-4 border-orange-700 hover:border-orange-600 rounded">Edit products</button>
        </form>
      </Modal>
    </div>
  );
};

export default EditComponent;