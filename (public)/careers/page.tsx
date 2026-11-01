// Lists current hiring information without fabricating open roles.
// Applicants can contact the agency directly until applications are connected to the CMS.
import { getSettings, listMedia } from '@/lib/repo';
import { mediaUrl } from '@/lib/media';
import { emailHref } from '@/lib/site-contact';
import { SafeImage } from '@/components/SafeImage';

export default async function CareersPage() {
  const [settings, media] = await Promise.all([getSettings(), listMedia()]);
  const email = emailHref(settings.email, 'Future opportunities at Padmaarc', 'Hi Padmaarc team,\n\nI would like to be considered for future opportunities.\n\nA little about me:\n');
  return <section className="section container">
    <div className="page-banner compact"><div><p className="eyebrow">CAREERS · WORK WITH US</p><h1>Good work comes from curious people.</h1></div><SafeImage className="tilt-card" src={mediaUrl(media, 'careers_main')} alt="Collaborative creative team" fetchPriority="high" /></div>
    <div className="card editorial-empty"><p className="service-number">OPEN ROLES</p><h2>No open positions right now.</h2><p className="muted">We are not accepting applications for a specific role today. For future opportunities, send a short introduction {email ? <>to <a href={email}>{settings.email}</a>.</> : 'through our contact page.'}</p></div>
  </section>;
}
