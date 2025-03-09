'use client';

import Button from '@/components/Button';
import CustomImage from '@/customs/Image';
import { useProducts } from '@/utils/fetchData';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function ViewDetails({ params }: { params: Promise<{ id: string | number }> }) {
  const { id } = use(params);
  const { data: product, isLoading } = useProducts(`${process.env.NEXT_PUBLIC_API_URL_PRODUCTS}/${id}`);
  const router = useRouter();

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full h-auto p-6 rounded-xl bg-base-300 2xl:text-3xl">
      {/* Header */}
      <header className="flex items-center gap-3">
        <Button onClick={() => router.back()} className="bg-gray-700 text-white hover:bg-gray-900 rounded-lg">
          <ChevronLeft /> Back
        </Button>
        <h1 className="text-xl font-bold text-blue-600 md:text-2xl lg:text-3xl 2xl:text-5xl">Product Details</h1>
      </header>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 2xl:grid-cols-1">
        {/* Carousel - Ảnh sản phẩm */}
        <div className="p-6 bg-base-100 rounded-lg shadow-lg">
          <div className="flex items-center justify-center w-full h-64 2xl:min-h-[800px] relative text-xl text-gray-600 bg-gray-300 rounded-lg">
            <CustomImage src={product.img || ''} alt={product.name || 'Product image'} fill className="object-cover" />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="p-6 bg-base-100 rounded-lg shadow-md">
          {[
            ['Product code', product?.id],
            ['Name', product?.name],
            ['Brand', product?.brand],
            ['Category', product?.category],
            ['Quantity', product?.quantity],
          ].map(([label, value]) => (
            <div key={label} className="mb-4">
              <span className="font-semibold">{label}:</span> {value}
            </div>
          ))}
          <div className="mb-4 text-green-400 font-semibold">
            <span className="font-semibold">Price:</span> {product?.price} VND
          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      <div className="p-6 bg-base-100 rounded-lg shadow-md">
        <h2 className="mb-2 text-blue-600 font-semibold 2xl:text-4xl">Description</h2>
        <p>{product?.description}</p>
      </div>

      <div className="flex justify-end gap-2 md:gap-4">
        <Button className="bg-yellow-400 hover:bg-yellow-600">Edit</Button>
        <Button className="bg-red-500 hover:bg-red-800 text-white">Delete</Button>
      </div>
    </div>
  );
}
