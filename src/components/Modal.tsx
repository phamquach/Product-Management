import { isNotNull } from '@/lib';
import { ChangeEvent, useReducer, useCallback, useMemo } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

interface Action {
  type: string;
  field?: string;
  value?: string;
}

interface Product {
  img: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
}

const initialState: Product = {
  img: '',
  name: '',
  brand: '',
  price: 0,
  quantity: 0,
  category: '',
  description: '',
};

const ACTIONS = {
  update: 'UPDATE_FIELD',
  reset: 'RESET_FORM',
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

export default function Modal() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: ACTIONS.update,
      field: e.target.name,
      value: e.target.value,
    });
  }, []);

  const isFormValid = useMemo(() => isNotNull(state), [state]);
  console.log(isFormValid);
  console.log(state);
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
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
                name='img'
                onChange={handleOnChange}
              />
            </div>
            <TextAreaField id="description" label="Description" value={state.description} onChange={handleOnChange} />
          </form>
          {/* action */}
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn btn-outline"
              id="next"
              onClick={() => dispatch({ type: ACTIONS.reset })}
            >
              Close!
            </label>
            {isFormValid ? (
              <label htmlFor="my_modal_6" className="btn btn-outline" id="next">
                Next!
              </label>
            ) : (
              <button className="btn btn-outline" disabled>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
