import { listPackages, listMedia } from '@/lib/repo';
import { PackageCard } from '@/components/PackageCard';
import { mediaUrl } from '@/lib/media';
import { SafeImage } from '@/components/SafeImage';

export default async function PackagesPage() {
  const [pkgs, media] = await Promise.all([listPackages(), listMedia()]);
  return (
    <section className="container section">
      <div className="page-banner"><div><p className="eyebrow">CLEAR PLANS. CREATIVE THAT MOVES.</p><h1>Packages made for steady growth.</h1><p className="lead">Choose a plan, place your order, and we’ll contact you to confirm the details.</p></div><SafeImage className="tilt-card" src={mediaUrl(media, 'packages_main')} alt="Marketing team planning business goals" fetchPriority="high" /></div>
      <div className="grid-3">
        {pkgs.map((p) => <PackageCard key={p.id} p={p} />)}
      </div>
      <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>
        Meta ad spend is paid separately by you to Meta. An agreement is signed when your order is confirmed.
      </p>
    </section>
  );
}
