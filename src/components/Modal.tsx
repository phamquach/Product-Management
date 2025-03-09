import { isNotNull } from '@/lib';
import { ChangeEvent, useReducer } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import { postData } from '@/utils/postData';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import Button from './Button';

interface Action {
  type: 'UPDATE_FIELD' | 'RESET_FORM';
  field?: keyof Product;
  value?: string | number | File;
}

interface Product {
  img: File | null;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
}

const initialState: Product = {
  img: null,
  name: '',
  brand: '',
  price: 0,
  quantity: 0,
  category: '',
  description: '',
};

function formReducer(state: Product, action: Action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      if (!action.field) return state;
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

export default function Modal({ setShowModal }: { setShowModal: () => void }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    const newValue = files?.length ? files[0] : value;
    dispatch({ type: 'UPDATE_FIELD', field: name as keyof Product, value: newValue });
  };

  const handleOnSubmit = async () => {
    const data = {
      ...state,
      img: state.img ? URL.createObjectURL(state.img) : 'https://dummyimage.com/300x300/cccccc/000.png&text=No+Image',
    };

    try {
      const res = await postData(process.env.NEXT_PUBLIC_API_URL_PRODUCTS ?? '', data);
      if (res?.ok) {
        toast.success('Product added successfully!');
        mutate(process.env.NEXT_PUBLIC_API_URL_PRODUCTS);
      } else {
        toast.error('Failed to add product, try again!');
      }
    } catch {
      toast.error('Failed to add product, try again!');
    }

    dispatch({ type: 'RESET_FORM' });
    setShowModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog">
      <div className="absolute inset-0 z-10 bg-neutral-950 opacity-50"></div>
      <div className="w-11/12 h-auto z-20 p-6 2xl:p-20 rounded-2xl animation-scale-in-center bg-base-100">
        <h3 className="text-lg font-bold 2xl:text-7xl 2xl:mb-10">New Product</h3>

        <form className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-5 2xl:gap-10">
          {[
            { id: 'name', label: 'Name', type: 'text' },
            { id: 'brand', label: 'Brand', type: 'text' },
            { id: 'category', label: 'Category', type: 'text' },
            { id: 'quantity', label: 'Quantity', type: 'number' },
            { id: 'price', label: 'Price', type: 'number' },
          ].map(({ id, label, type }) => (
            <InputField key={id} id={id} label={label} type={type} onChange={handleOnChange} className="focus:outline-0" />
          ))}

          <div className="flex flex-col flex-1 min-w-fit max-w-md 2xl:min-w-[40%] 2xl:max-w-full 2xl:gap-3 2xl:text-5xl">
            <label htmlFor="file_img" className="cursor-pointer">Image</label>
            <input
              type="file"
              id="file_img"
              name="img"
              accept="image/*"
              onChange={handleOnChange}
              className="file-input focus:outline-0 2xl:file-input-xl 2xl:min-h-24 2xl:text-4xl"
            />
          </div>

          <TextAreaField id="description" label="Description" value={state.description} onChange={handleOnChange} />
        </form>

        <div className="modal-action">
          <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={setShowModal}>Close</Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleOnSubmit}
            disabled={!isNotNull(state)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
