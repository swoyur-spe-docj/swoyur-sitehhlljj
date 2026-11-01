// Shows published agency insights without inventing sample articles.
// New posts can be added after the CMS is connected to the Supabase schema.
import Link from 'next/link';
import { listMedia } from '@/lib/repo';
import { mediaUrl } from '@/lib/media';
import { SafeImage } from '@/components/SafeImage';

export default async function BlogPage() {
  const media = await listMedia();
  return <section className="section container">
    <div className="page-banner compact"><div><p className="eyebrow">THE JOURNAL · NOTES ON CREATIVE AND GROWTH</p><h1>Ideas for building brands people remember.</h1></div><SafeImage className="tilt-card" src={mediaUrl(media, 'blog_main')} alt="Notes and ideas at a creative desk" fetchPriority="high" /></div>
    <div className="card editorial-empty"><p className="service-number">FIRST EDITION — COMING SOON</p><h2>We are preparing our first field notes.</h2><p className="muted">Check back for practical ideas on content, advertising and growing a business.</p><Link className="service-link" href="/services">Explore our services →</Link></div>
  </section>;
}
