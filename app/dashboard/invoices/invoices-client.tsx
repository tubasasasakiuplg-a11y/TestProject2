// app/dashboard/invoices/invoices-client.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Pagination from '@/app/ui/invoices/pagination';

export default function InvoicesClient({
  totalPages,
  currentPage,
  children,
}: {
  totalPages: number;
  currentPage: number;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || currentPage;

  return (
    <>
      {children}
      <Pagination totalPages={totalPages} currentPage={page} />
    </>
  );
}
