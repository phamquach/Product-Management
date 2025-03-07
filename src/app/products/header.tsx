import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { CirclePlus, Download } from 'lucide-react';

export default function PHeader() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-bold">Products</h1>
      <div className="inline-flex gap-3">
        <label htmlFor="my_modal_6" className="btn btn-outline md:btn-md btn-sm">
          <span>Add</span>
          <CirclePlus size={'50%'} />
        </label>
        <Modal />
        <Button className="btn-outline">
          <span>Download</span>
          <Download size={'50%'} />
        </Button>
      </div>
    </header>
  );
}
