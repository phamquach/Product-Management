'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function ViewDetails({ params }: { params: Promise<{ id: string | number }> }) {
  const { id } = use(params);
  const router = useRouter();
  return (
    <div>
      {id}
      <button className="btn" onClick={() => router.back()}>
        Back <ChevronLeft />
      </button>
    </div>
  );
}
