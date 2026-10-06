import Link from 'next/link';
import { getSavedProviders } from '@/lib/dashboard';
import { isLocale, localeHref, type Locale } from '@/lib/i18n';
import ProviderCard from '@/components/directory/ProviderCard';
import { Heart } from '@/components/Icons';

type Params = { params: { locale: string } };

export default async function SavedPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const providers = await getSavedProviders();

  return (
    <>
      <div className="dash-head">
        <span className="eyebrow">Saved</span>
        <h1>Saved providers</h1>
        <p className="lead">The providers you have bookmarked, ready to revisit or book.</p>
      </div>

      {providers.length === 0 ? (
        <div className="dash-empty">
          <span className="empty-ico"><Heart size={24} /></span>
          <h3>Nothing saved yet</h3>
          <p>Save providers from the directory and they will be collected here for quick access.</p>
          <Link className="btn btn-primary" href={localeHref(locale, '/search')}>Find care</Link>
        </div>
      ) : (
        <div className="saved-grid">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} locale={locale} saved />
          ))}
        </div>
      )}
    </>
  );
}
