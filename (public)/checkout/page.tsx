import Link from 'next/link';
import { createOrderAction } from '@/app/actions';
import { getPackageBySlug } from '@/lib/repo';
import { inr, today } from '@/lib/format';
import { ActionIcon } from '@/components/ActionIcon';

export default async function CheckoutPage({ searchParams }: { searchParams: { package?: string; error?: string } }) {
  const slug = searchParams.package || '';
  const pkg = slug ? await getPackageBySlug(slug) : undefined;

  if (!pkg || !pkg.active) {
    return (
      <section className="container section narrow checkout-page">
        <h1>Package not found</h1>
        <p className="muted">Please choose an available package.</p>
        <Link className="btn btn-outline" href="/packages"><ActionIcon name="package" /> View packages</Link>
      </section>
    );
  }

  return (
    <section className="container section narrow checkout-page">
      <h1>Place your order</h1>
      <div className="card summary">
        <strong>{pkg.name}</strong> · {pkg.durationMonths} {pkg.durationMonths === 1 ? 'month' : 'months'} · <strong>{inr(pkg.price)}</strong>
      </div>
      {searchParams.error && <div className="notice error">{searchParams.error}</div>}

      <form action={createOrderAction} className="form">
        <input type="hidden" name="packageSlug" value={pkg.slug} />
        <div className="hp" aria-hidden="true">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label>Full name *<input name="name" required minLength={2} /></label>
        <label>Mobile (10 digits) *<input name="mobile" required pattern="\d{10}" inputMode="numeric" /></label>
        <label>Email (optional)<input name="email" type="email" /></label>
        <label>Business name *<input name="business" required /></label>
        <label>City *<input name="city" required /></label>
        <label>Goal or message (optional)<textarea name="goal" rows={3} maxLength={500} /></label>
        <label>Preferred start date (optional)<input name="startDate" type="date" min={today()} /></label>
        <label>GST number (optional)<input name="gst" maxLength={15} /></label>
        <label className="check">
          <input type="checkbox" name="agree" required /> I agree to the terms and understand the order is confirmed after payment.
        </label>
        <div><button className="btn btn-primary" type="submit"><ActionIcon name="send" /> Place order</button></div>
      </form>
    </section>
  );
}
