import NavLink from '../../components/NavLink';
import { client } from '../../lib/sanity.client';
import { groq } from 'next-sanity';

import homeStyles from '../page.module.css';
import styles from './page.module.css';

const announcementsQuery = groq`
  *[_type == "announcement"] | order(date desc) {
    _id,
    title,
    date,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`;

type Announcement = {
  _id: string;
  title: string;
  date: string;
  imageUrl?: string;
  imageAlt?: string;
};

const formatDate = (value?: string) => {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  return parsed.toLocaleDateString('ms-MY', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export default async function PengumumanPage() {
  const announcements = await client.fetch<Announcement[]>(announcementsQuery);

  return (
    <div className={styles.viewport}>
      <section className={styles.artboard} aria-label="Pengumuman">
        <header className={homeStyles.navBar}>
          <div className={homeStyles.navLogo} aria-label="Strata logo" />
          <nav className={homeStyles.navLinks}>
            <NavLink id="navHome" href="/" label="Utama" />
            <NavLink href="/tentang-persatuan" label="Tentang Persatuan" />
            <NavLink href="/panduan-penduduk" label="Panduan Penduduk" />
            <NavLink href="/kutipan-sekuriti" label="Kutipan Sekuriti" />
            <NavLink href="/pengumuman" label="Pengumuman" />
            <NavLink href="/hubungi-kami" label="Hubungi Kami" />
          </nav>
        </header>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Pengumuman</h1>
          <p className={styles.pageSubtitle}>
            Kemaskini terkini daripada Persatuan Penduduk The Strata.
          </p>
        </div>
        <div className={styles.announcementGrid} role="list">
          {announcements.length === 0 ? (
            <div className={styles.emptyState}>Tiada pengumuman ditemui.</div>
          ) : (
            announcements.map((announcement) => {
              const cardStyle = announcement.imageUrl
                ? { backgroundImage: `url(${announcement.imageUrl})` }
                : undefined;
              const dateLabel = formatDate(announcement.date);
              const imageLabel = announcement.imageAlt || announcement.title;

              return (
                <a
                  key={announcement._id}
                  href={`/pengumuman/${announcement._id}`}
                  className={styles.announcementCard}
                  aria-label={`Baca pengumuman: ${announcement.title}`}
                >
                  <div
                    className={styles.cardImage}
                    role="img"
                    aria-label={imageLabel}
                    style={cardStyle}
                  />
                  <div className={styles.cardBody}>
                    {dateLabel ? <p className={styles.cardDate}>{dateLabel}</p> : null}
                    <h3 className={styles.cardTitle}>{announcement.title}</h3>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </section>
      <footer className={`${homeStyles.footer} ${styles.footerFull}`}>
        <div className={homeStyles.footerLogo} role="img" aria-label="Persatuan Penduduk" />
        <div className={homeStyles.footerCopy}>
          <p>
            The Strata ialah platform komuniti yang memudahkan penduduk mengakses pengumuman,
            panduan, dan urusan komuniti dengan lebih teratur.
          </p>
        </div>
        <div className={homeStyles.footerLinks}>
          <h4>Pautan Pantas</h4>
          <ul>
            <li>Pengumuman</li>
            <li>Panduan Penduduk</li>
            <li>Borang Keahlian</li>
            <li>Hubungi Kami</li>
            <li>Tentang Kami</li>
            <li>Dasar Privasi</li>
            <li>Terma & Syarat</li>
          </ul>
        </div>
        <div className={homeStyles.footerSupport}>
          <h4>Sokongan</h4>
          <p>pptsbpbangi@gmail.com</p>
          <p>Bandar Puteri Bangi</p>
        </div>
        <div className={homeStyles.footerDownload}>
          <h4>Muat Turun Applikasi JaGaAp 2.0</h4>
          <div className={homeStyles.footerBadges} role="img" aria-label="Muat turun aplikasi">
            <a
              className={homeStyles.footerBadgeLink}
              href="https://play.google.com/store/apps/details?id=com.redideas.jagaapp"
              target="_blank"
              rel="noreferrer"
              aria-label="Muat turun JagaApp 2.0 di Google Play"
            />
            <a
              className={homeStyles.footerBadgeLink}
              href="https://apps.apple.com/my/app/jagaapp-2-0/id1518198706"
              target="_blank"
              rel="noreferrer"
              aria-label="Muat turun JagaApp 2.0 di App Store"
            />
          </div>
        </div>
        <p className={homeStyles.footerCopyright}>
          © 2025 Persatuan Penduduk The Strata Bandar Puteri Bangi.
        </p>
      </footer>
    </div>
  );
}
