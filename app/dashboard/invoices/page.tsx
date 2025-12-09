// app/dashboard/invoices/page.tsx
import { Suspense } from 'react';
import { fetchInvoicesPages, fetchFilteredInvoices } from '@/app/lib/data';
import InvoicesClient from './invoices-client';
import InvoicesTable from '@/app/ui/invoices/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoiceById } from '@/app/lib/data';

export default async function Page() {
  const query = ''; // 初期は検索なし
  const currentPage = 1;

  const totalPages = await fetchInvoicesPages(query);
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="w-full">
      <h1 className="text-2xl">Invoices</h1>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesClient totalPages={totalPages} currentPage={currentPage}>
          <InvoicesTable invoices={invoices} />
        </InvoicesClient>
      </Suspense>
    </div>
  );
}
