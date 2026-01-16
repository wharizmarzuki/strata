'use client';

import { useState } from 'react';
import Link from 'next/link';

import NavLink from '../../components/NavLink';
import homeStyles from '../page.module.css';
import styles from './page.module.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Menghantar...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Mesej berjaya dihantar!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus(`Ralat: ${data.error || 'Sila cuba lagi.'}`);
      }
    } catch (error) {
      console.error('Submission error', error);
      setStatus('Ralat: Tidak dapat menghantar borang.');
    }
  };

  return (
    <div className={styles.page}>
      <header className={homeStyles.navBar}>
        <Link href="/" aria-label="Kembali ke Utama">
          <div className={homeStyles.navLogo} />
        </Link>
        <nav className={homeStyles.navLinks}>
          <NavLink href="/" label="Utama" />
          <NavLink href="/tentang-persatuan" label="Tentang Persatuan" />
          <NavLink href="/panduan-penduduk" label="Panduan Penduduk" />
          <NavLink href="/kutipan-sekuriti" label="Kutipan Sekuriti" />
          <NavLink href="/pengumuman" label="Pengumuman" />
          <NavLink href="/hubungi-kami" label="Hubungi Kami" />
        </nav>
      </header>

      <main className={styles.content}>
        <h1 className={styles.title}>Hubungi Kami</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nama
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Tajuk
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Tentang
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.button}>
            Hantar
          </button>

          {status ? <p className={styles.status}>{status}</p> : null}
        </form>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Jika mempunyai sebarang aduan, cadangan atau penghargaan, sila klik butang di bawah.
          </p>
          <Link href="/cadangan" className={styles.ctaButton}>
            Borang Aduan/ Cadangan/ Penghargaan
          </Link>
        </div>
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
