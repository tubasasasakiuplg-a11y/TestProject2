// app/ui/invoices/table.tsx
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

export default function InvoicesTable({ invoices }: { invoices: any[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                        className="rounded-full"
                      />
                      {invoice.name}
                    </div>
                  </td>
                  <td>{invoice.email}</td>
                  <td>{formatCurrency(invoice.amount)}</td>
                  <td>{formatDateToLocal(invoice.date)}</td>
                  <td><InvoiceStatus status={invoice.status} /></td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center justify-end gap-2">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
