// app/dashboard/invoices/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchInvoicesPages, fetchFilteredInvoices } from '@/app/lib/data';
import InvoicesClient from './invoices-client';
import InvoicesTable from '@/app/ui/invoices/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { clsx } from 'clsx';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

export default async function Page() {
  const query = ''; // 初期は検索なし
  const currentPage = 1;

  const href = "/dashboard/invoices/create";
  const label = "Create Invoice";
  const variant = 'primary';

  const totalPages = await fetchInvoicesPages(query);
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="w-full">
      <h1 className="text-2xl">Invoices</h1>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesClient totalPages={totalPages} currentPage={currentPage}>
          <InvoicesTable invoices={invoices} />
        </InvoicesClient>
        <div className="flex justify-end mt-4 mb-4">
          <Link
            href={href}
            className={clsx(
              `inline-block rounded px-4 py-2 font-semibold transition-colors`,
              variant === 'primary'
                ? `bg-blue-600 text-white hover:bg-blue-700`
                : `bg-gray-200 text-gray-800 hover:bg-gray-300`
            )}
          >
            {label}
          </Link>
        </div>
      </Suspense>
    </div>
  );
}
