// app/dashboard/invoices/create/page.tsx
import Link from 'next/link';
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          { label: 'Create Invoice', href: '/dashboard/invoices/create', active: true },
        ]}
      />
      <Form customers={customers} />
      <div className="mt-4">
        <Link
          href="/dashboard/invoices"
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back to Invoices
        </Link>
      </div>
    </main>
  );
}
