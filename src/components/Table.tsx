import Image from 'next/image';
import Button from './Button';
import { formatNumber } from '@/lib';
import { deleteData } from '@/utils/deleteData';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
interface Iprops {
  data: IProducts[];
}

export default function Table({ data }: Iprops) {
  const { mutate } = useSWRConfig();
  const deleteProduct = (id: string) => {
    if (confirm('Do you want do delete?')) {
      deleteData(process.env.NEXT_PUBLIC_API_URL_PRODUCTS ?? '', id)
        .then((res) => {
          if (res?.ok) {
            toast.success('Done!');
            mutate(process.env.NEXT_PUBLIC_API_URL_PRODUCTS);
            return;
          }
          toast.warning('Delete failed, try again!');
        })
        .catch(() => toast.warning('Delete failed, try again!'));
    }
  };

  if (data.length === 0) {
    return <div className="text-center">No results found</div>;
  }
  return (
    <div className="w-full overflow-x-scroll dark:border rounded-box border-base-content/5 ">
      <table className="table table-zebra text-nowrap">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Product Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th className="text-center">Menu</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-600" key={item.id}>
              <th>{index + 1}</th>
              <th>{item.id}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12 relative">
                      <Image
                        src={item.img}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt=""
                        fill
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                  </div>
                </div>
              </td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{formatNumber(item.price)}</td>
              <th className="flex justify-around gap-2">
                <Button className="btn-outline">View</Button>
                <Button className="btn-outline" onClick={() => deleteProduct(item.id?.toString())}>
                  Delete
                </Button>
                <Button className="btn-outline">Edit</Button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
