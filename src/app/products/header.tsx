import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { CirclePlus, Download } from 'lucide-react';
import { useState } from 'react';

export default function PHeader() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <header className="flex justify-between items-center">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-bold">Products</h1>
      <div className="inline-flex gap-3">
        <button className="btn btn-outline md:btn-md btn-sm" onClick={handleShowModal}>
          <span>Add</span>
          <CirclePlus size={'50%'} />
        </button>
        {showModal && <Modal setShowModal={handleShowModal} />}
        <Button className="btn-outline">
          <span>Download</span>
          <Download size={'50%'} />
        </Button>
      </div>
    </header>
  );
}
