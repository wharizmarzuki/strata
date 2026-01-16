'use client';

import { useState } from 'react';

import FeatureCard from '../components/FeatureCard';
import ImageTile from '../components/ImageTile';
import Modal from '../components/Modal';
import NavLink from '../components/NavLink';
import PrimaryButton from '../components/PrimaryButton';
import styles from './page.module.css';

const featureCards = [
  {
    id: 'cardFeature1',
    image: '/img/image6_1_2.jpg',
    title: 'Strata Family Day',
    subtitle: ''
  },
  {
    id: 'cardFeature2',
    image: '/img/image6_1_2.jpg',
    title: 'Strata Family Day',
    subtitle: ''
  },
  {
    id: 'cardFeature3',
    image: '/img/image6_1_2.jpg',
    title: 'Strata Family Day',
    subtitle: ''
  }
];

const tabLabels = ['Pengumuman', 'Panduan Penduduk', 'Program', 'Borang Keahlian'];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.viewport}>
      <div className={styles.artboard}>
        <div className={styles.artboardInner}>
          <header className={styles.navBar}>
            <div className={styles.navLogo} aria-label="Strata logo" />
            <nav className={styles.navLinks}>
              <NavLink id="navHome" href="/" label="Utama" />
              <NavLink href="/tentang-persatuan" label="Tentang Persatuan" />
              <NavLink href="/panduan-penduduk" label="Panduan Penduduk" />
              <NavLink href="/kutipan-sekuriti" label="Kutipan Sekuriti" />
              <NavLink href="/pengumuman" label="Pengumuman" />
              <NavLink href="/hubungi-kami" label="Hubungi Kami" />
            </nav>
          </header>

          <section className={styles.heroSection}>
            <PrimaryButton
              id="btnPrimary"
              label="Baca Selanjutnya"
              className={styles.heroButton}
              onClick={() => setModalOpen(true)}
            />
          </section>

          <section className={styles.partnerStrip}>
            <div className={styles.partnerCopy}>
              <p>
                Komuniti The Strata kini dihuni lebih 3,200 ahli aktif yang saling berkongsi maklumat
                dan sokongan.
              </p>
            </div>
            <div className={styles.partnerBadge} role="img" aria-label="Ahli Persatuan" />
          </section>

          <section className={styles.featureSection}>
            <div className={styles.sectionHeader}>
              <h2>Akses Mudah kepada Maklumat Komuniti Anda</h2>
              <p>
                Navigasi pengumuman, panduan penduduk, dan borang keahlian melalui tab interaktif
                yang memudahkan urusan komuniti.
              </p>
            </div>
            <div className={styles.tabRow}>
              {tabLabels.map((label) => (
                <button key={label} type="button" className={styles.tabPill}>
                  {label}
                </button>
              ))}
            </div>
            <div className={styles.featureGrid}>
              {featureCards.map((card) => (
                <FeatureCard key={card.title} {...card} />
              ))}
            </div>
          </section>

          <section className={styles.gallerySection}>
            <div className={styles.sectionHeaderLeft}>
              <h2>Faedah Menjadi Ahli Persatuan Penduduk The Strata</h2>
            </div>
            <ImageTile className={styles.tileA} image="/img/image7_1_2.jpg" alt="Aktiviti komuniti" />
            <div className={styles.tileGradientA} />
            <ImageTile className={styles.tileB} image="/img/image8_1_2.jpg" alt="Sokongan komuniti" />
            <div className={styles.tileGradientB} />
            <ImageTile className={styles.tileC} image="/img/image9_1_2.jpg" alt="Hubungan komuniti" />
            <div className={styles.tileGradientC} />
            <ImageTile className={styles.tileD} image="/img/image4_1_2.jpg" alt="Komuniti The Strata" />
            <div className={styles.tileGradientD} />
            <ImageTile className={styles.tileE} image="/img/image10_1_2.jpg" alt="Aktiviti petang" />
            <div className={styles.tileGradientE} />
          </section>

          <section className={styles.showcaseSection} />

          <section className={styles.ctaSection} />

          <footer className={styles.footer}>
            <div className={styles.footerLogo} role="img" aria-label="Persatuan Penduduk" />
            <div className={styles.footerCopy}>
              <p>
                The Strata ialah platform komuniti yang memudahkan penduduk mengakses pengumuman,
                panduan, dan urusan komuniti dengan lebih teratur.
              </p>
            </div>
            <div className={styles.footerLinks}>
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
            <div className={styles.footerSupport}>
              <h4>Sokongan</h4>
              <p>pptsbpbangi@gmail.com</p>
              <p>Bandar Puteri Bangi</p>
            </div>
            <div className={styles.footerDownload}>
              <h4>Muat Turun Applikasi JaGaAp 2.0</h4>
              <div className={styles.footerBadges} role="img" aria-label="Muat turun aplikasi" />
            </div>
            <p className={styles.footerCopyright}>
              © 2025 Persatuan Penduduk The Strata Bandar Puteri Bangi.
            </p>
          </footer>
        </div>
      </div>

      <Modal title="Daftar" open={modalOpen} onClose={() => setModalOpen(false)}>
        <p>Terima kasih. Kami akan hubungi anda dengan maklumat seterusnya.</p>
        <PrimaryButton label="Tutup" onClick={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
