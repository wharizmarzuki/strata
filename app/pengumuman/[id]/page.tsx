import { notFound } from 'next/navigation';
import { groq } from 'next-sanity';

import NavLink from '../../../components/NavLink';
import { client } from '../../../lib/sanity.client';
import homeStyles from '../../page.module.css';
import styles from './page.module.css';

const announcementQuery = groq`
  *[_type == "announcement" && _id == $id][0] {
    _id,
    title,
    date,
    content,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`;

type AnnouncementBlock = {
  _key?: string;
  _type?: string;
  children?: Array<{ text?: string }>;
};

type Announcement = {
  _id: string;
  title: string;
  date: string;
  content?: AnnouncementBlock[];
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

const extractParagraphs = (blocks?: AnnouncementBlock[]) => {
  if (!blocks?.length) {
    return [];
  }

  return blocks
    .filter((block) => block?._type === 'block')
    .map((block) => block.children?.map((child) => child.text ?? '').join('')?.trim())
    .filter((text): text is string => Boolean(text));
};

type PageProps = {
  params: { id: string };
};

export default async function PengumumanDetailPage({ params }: PageProps) {
  const announcement = await client.fetch<Announcement | null>(announcementQuery, {
    id: params.id,
  });

  if (!announcement) {
    notFound();
  }

  const paragraphs = extractParagraphs(announcement.content);
  const imageStyle = announcement.imageUrl
    ? { backgroundImage: `url(${announcement.imageUrl})` }
    : undefined;
  const dateLabel = formatDate(announcement.date);

  return (
    <div className={styles.viewport}>
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
      <main className={styles.content}>
        <article className={styles.card} aria-label={announcement.title}>
          <div
            className={styles.heroImage}
            role="img"
            aria-label={announcement.imageAlt || announcement.title}
            style={imageStyle}
          />
          <div className={styles.body}>
            {dateLabel ? <p className={styles.date}>{dateLabel}</p> : null}
            <h1 className={styles.title}>{announcement.title}</h1>
            {paragraphs.length === 0 ? (
              <p className={styles.emptyNotice}>Kandungan pengumuman belum dikemaskini.</p>
            ) : (
              paragraphs.map((text, index) => (
                <p className={styles.paragraph} key={`${announcement._id}-${index}`}>
                  {text}
                </p>
              ))
            )}
          </div>
        </article>
      </main>
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
