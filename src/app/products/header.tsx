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
      <h1 className="text-xl md:text-2xl lg:text-3xl 2xl:text-6xl font-bold">Products</h1>
      <div className="flex gap-3">
        <Button className="btn btn-info" onClick={handleShowModal} title='Add new product'>
          <span>Add</span>
          <CirclePlus size="50%" />
        </Button>
        {showModal && <Modal setShowModal={handleShowModal} />}
        <Button className="btn-outline" title='Download products'>
          <span>Download</span>
          <Download size="50%" />
        </Button>
      </div>
    </header>
  );
}