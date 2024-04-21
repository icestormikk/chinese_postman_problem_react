import React from 'react';
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean
  title: string
  hasCloseBtn?: boolean
  onClose?: () => void
};

function  Modal({ isOpen, title, hasCloseBtn, onClose, children }: React.PropsWithChildren<ModalProps>) {
  const [isModalOpen, setModalOpen] = React.useState(isOpen);
  const modalRef = React.useRef<HTMLDialogElement | null>(null)

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  React.useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className='modal'>
      <div className='flex justify-between items-center text-2xl'>
        <b>{title}</b>
        {hasCloseBtn && (
          <IoCloseSharp size={30} onClick={handleCloseModal} className='cursor-pointer'/>
        )}
      </div>
      {children}
  </dialog>
  );
}

export default Modal;