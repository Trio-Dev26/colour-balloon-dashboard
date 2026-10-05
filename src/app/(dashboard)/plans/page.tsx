import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = { title: 'Plans & Prices' };

export default function PlansPricesPage() {
   return (
      <PagePlaceholder
         title="Plans & Prices"
         description="Manage subscription plans, trials and prices in THB, USD and MMK."
      />
   );
}
