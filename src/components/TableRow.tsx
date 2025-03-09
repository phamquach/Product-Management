import Link from 'next/link';
import Button from './Button';
import ROUTES from '@/lib/routes';
import CustomImage from '@/customs/Image';
import { formatNumber } from '@/lib';

interface IProps {
  item: IProducts;
  index: number;
  deleteProduct: (id: string) => void;
}

export default function TableRow({ item, index, deleteProduct }: IProps) {
  if (!item || !item.id) {
    return null; // Tránh render lỗi nếu dữ liệu bị thiếu
  }

  return (
    <tr
      className="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-600"
      role="button"
      aria-label={`Row for product ${item.name}`}
    >
      <th>{index + 1}</th>
      <td>{item.id}</td>
      <td>
        <div className="flex items-center gap-3">
          {/* Hình ảnh sản phẩm */}
          <div className="mask mask-squircle flex items-center justify-center min-h-12 min-w-12 relative">
            <CustomImage
              src={item.img || '/placeholder.png'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={item.name || 'Product image'}
              fill
            />
          </div>
          {/* Tên sản phẩm */}
          <div>
            <div className="font-bold">{item.name || 'Unnamed Product'}</div>
          </div>
        </div>
      </td>
      <td>{item.brand || 'N/A'}</td>
      <td>{item.category || 'N/A'}</td>
      <td>
        {item.quantity === 0 ? (
          <span className="text-error font-bold">Out of stock</span>
        ) : (
          item.quantity ?? 'N/A'
        )}
      </td>
      <td className="font-bold">{item.price ? formatNumber(item.price) : 'N/A'}</td>
      {/* Các nút thao tác */}
      <td className="flex justify-around gap-2">
        <Link href={`${ROUTES.views}/${item.id}`}>
          <Button className="btn-success" title="View product">View</Button>
        </Link>
        <Button
          className="btn-error"
          title="Delete product"
          onClick={() => {
            if (confirm(`Do you want to delete the product named "${item.name}"?`)) {
              deleteProduct(item.id.toString());
            }
          }}
        >
          Delete
        </Button>
        <Button className="btn-warning" title="Edit product">Edit</Button>
      </td>
    </tr>
  );
}
