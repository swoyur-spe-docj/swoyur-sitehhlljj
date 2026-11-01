import Link from 'next/link';
import { listPortfolio, listMedia } from '@/lib/repo';
import { CATEGORIES } from '@/lib/types';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Empty } from '@/components/ui';
import { mediaUrl } from '@/lib/media';
import { SafeImage } from '@/components/SafeImage';

export default async function PortfolioPage({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = searchParams.cat || 'All';
  const [allItems, media] = await Promise.all([listPortfolio(true), listMedia()]);
  const items = allItems.filter((i) => cat === 'All' || i.category === cat);
  return (
    <section className="container section">
      <div className="page-banner compact"><div><p className="eyebrow">SELECTED CREATIVE</p><h1>Work built for the real world.</h1><p className="lead">A look at campaigns, content and design made to help brands connect.</p></div><SafeImage className="tilt-card" src={mediaUrl(media, 'portfolio_main')} alt="Creative campaign work in progress" fetchPriority="high" /></div>
      <div className="filters-row">
        {['All', ...CATEGORIES].map((c) => (
          <Link key={c} className={`chip ${c === cat ? 'on' : ''}`} href={c === 'All' ? '/portfolio' : `/portfolio?cat=${encodeURIComponent(c)}`}>
            {c}
          </Link>
        ))}
      </div>
      {items.length === 0 ? (
        <Empty text="Portfolio coming soon." />
      ) : (
        <div className="grid-3">
          {items.map((i) => <PortfolioCard key={i.id} item={i} />)}
        </div>
      )}
          {media.some((m) => m.custom) ? (
        <div className="portfolio-gallery">
          <p className="eyebrow">MORE FROM THE STUDIO</p>
          <div className="grid-3">
            {media.filter((m) => m.custom).map((m) => (
              <article className="card portfolio-gallery-item" key={m.id}>
                {m.kind === 'video' ? (
                  <video src={m.url} poster={m.posterUrl || undefined} controls muted playsInline preload="metadata" />
                ) : (
                  <SafeImage src={m.url} alt={m.alt || m.label} loading="lazy" />
                )}
                <div className="card-body"><h3>{m.label}</h3></div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
</section>
  );
}
