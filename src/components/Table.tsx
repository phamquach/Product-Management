import { deleteData } from '@/utils/deleteData';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import TableRow from './TableRow';

interface IProps {
  data: IProducts[];
}

export default function Table({ data }: IProps) {
  const { mutate } = useSWRConfig();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_PRODUCTS;

  const deleteProduct = (id: string) => {
    if (!apiUrl) {
      toast.error('API URL is not set.');
      return;
    }
    deleteData(apiUrl, id)
      .then((res) => {
        if (res?.ok) {
          toast.success('Deleted successfully!');
          mutate(apiUrl);
        } else {
          toast.warning('Delete failed, try again!');
        }
      })
      .catch(() => toast.warning('Delete failed, try again!'));
  };

  return (
    <div className="max-w-full overflow-x-auto dark:border rounded-box border-base-content/5">
      <table className="table table-zebra lg:text-wrap text-nowrap 2xl:text-2xl">
        <thead className="2xl:text-2xl">
          <tr>
            <th>Stt</th>
            <th>Code</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price (VND)</th>
            <th className="text-center">Menu</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <TableRow key={item.id} item={item} index={index} deleteProduct={deleteProduct} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
