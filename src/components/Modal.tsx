import { isNotNull } from '@/lib';
import { ChangeEvent, useReducer, useCallback, useMemo } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import { postData } from '@/utils/postData';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface Action {
  type: string;
  field?: string;
  value?: string | number | File;
}
const ACTIONS = {
  update: 'UPDATE_FIELD',
  reset: 'RESET_FORM',
};
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
    case ACTIONS.update:
      return { ...state, [action.field ?? '']: action.value };
    case ACTIONS.reset:
      return initialState;
    default:
      return state;
  }
}

export default function Modal({ setShowModal }: { setShowModal: () => void }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const isFormValid = useMemo(() => isNotNull(state), [state]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      dispatch({
        type: ACTIONS.update,
        field: name,
        value: files[0],
      });
    } else {
      dispatch({
        type: ACTIONS.update,
        field: name,
        value: value,
      });
    }
  }, []);
  const handleOnSubmit = () => {
    const data = { ...state, img: 'https://dummyimage.com/300x300/cccccc/000.png&text=Ergonomic+Mouse+Pad' };
    postData(process.env.NEXT_PUBLIC_API_URL_PRODUCTS ?? '', data)
      .then((res) => {
        if (res?.ok) {
          toast.success('Product added successfully!');
          mutate(process.env.NEXT_PUBLIC_API_URL_PRODUCTS ?? '');
        } else {
          toast.error('Failed to add product, try again!');
        }
      })
      .catch(() => {
        toast.error('Failed to add product, try again!');
      });
    dispatch({ type: ACTIONS.reset });
    setShowModal();
  };
  const handleCancel = () => {
    dispatch({ type: ACTIONS.reset });
    setShowModal();
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog">
        <div className="absolute inset-0 z-10 bg-neutral-950 opacity-50"></div>
        <div className="modal-box z-20 opacity-100 w-11/12 max-w-5xl animation-scale-in-center">
          {/* title */}
          <h3 className="text-lg font-bold">New Product</h3>
          {/* content */}
          <form className="flex flex-wrap lg:gap-5 md:gap-3 gap-2 items-center">
            <InputField id="name" label="Name" value={state.name} onChange={handleOnChange} />
            <InputField id="brand" label="Brand" value={state.brand} onChange={handleOnChange} />
            <InputField id="category" label="Category" value={state.category} onChange={handleOnChange} />
            <InputField id="quantity" label="Quantity" value={state.quantity} onChange={handleOnChange} type="number" />
            <InputField id="price" label="Price" value={state.price} onChange={handleOnChange} type="number" />
            <div className="min-w-fit max-w-auto">
              <label htmlFor="file_img" className="cursor-pointer">
                Image
              </label>
              <br />
              <input
                type="file"
                id="file_img"
                className="file-input file-input-sm focus:outline-0"
                name="img"
                onChange={handleOnChange}
              />
            </div>
            <TextAreaField id="description" label="Description" value={state.description} onChange={handleOnChange} />
          </form>
          {/* action */}
          <div className="modal-action">
            <button className="btn btn-outline" onClick={handleCancel}>
              Close
            </button>
            <button className="btn btn-outline" onClick={handleOnSubmit} disabled={!isFormValid}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
