'use client';

import { useState } from 'react';
import Link from 'next/link';

import NavLink from '../../components/NavLink';
import homeStyles from '../page.module.css';
import styles from './page.module.css';

export default function SuggestionPage() {
  const [email, setEmail] = useState('');
  const [residentType, setResidentType] = useState('Pemilik');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('Cadangan');
  const [issue, setIssue] = useState('Permohonan');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Menghantar...');

    const messageLines = [
      `Kategori Penghuni: ${residentType}`,
      `No. Telefon: ${phone}`,
      `Alamat Rumah: ${address}`,
      `Kategori: ${category}`,
      `Isu Berkaitan: ${issue}`,
      `Keterangan: ${details}`,
    ];

    if (attachmentName) {
      messageLines.push(`Dokumen Berkaitan: ${attachmentName} (tidak dilampirkan)`);
    }

    const contactInfo = email;

    try {
      const response = await fetch('/api/suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          contact: contactInfo,
          subject,
          type: category,
          message: messageLines.join('\n'),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Maklum balas diterima. Terima kasih!');
        setEmail('');
        setResidentType('Pemilik');
        setFullName('');
        setPhone('');
        setAddress('');
        setCategory('Cadangan');
        setIssue('Permohonan');
        setSubject('');
        setDetails('');
        setAttachmentName('');
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
        <h1 className={styles.title}>Borang Aduan/ Cadangan/ Penghargaan</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
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

          <fieldset className={styles.section}>
            <legend className={styles.sectionTitle}>Kategori</legend>
            <div className={styles.radioList}>
              {['Pemilik', 'Penyewa'].map((option) => (
                <label key={option} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="residentType"
                    value={option}
                    checked={residentType === option}
                    onChange={() => setResidentType(option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Nama Penuh
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              No. Telefon
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Alamat Rumah
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              className={styles.textarea}
            />
          </div>

          <fieldset className={styles.section}>
            <legend className={styles.sectionTitle}>Kategori</legend>
            <div className={styles.radioList}>
              {['Permohonan', 'Cadangan', 'Penghargaan', 'Aduan', 'Lain-lain'].map((option) => (
                <label key={option} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="category"
                    value={option}
                    checked={category === option}
                    onChange={() => setCategory(option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.section}>
            <legend className={styles.sectionTitle}>Isu Berkaitan</legend>
            <div className={styles.radioList}>
              {[
                'Permohonan',
                'Permohonan Kaki Laku / RFID Stiker',
                'Bayaran Sekuriti',
                'Keselamatan',
                'Masalah Parkir Kereta',
                'Gangguan Jiran',
                'Haiwan Peliharaan / Liar',
                'Pembaikan Setempat',
                'Hal-hal Pihak Pemaju',
                'Kawasan Lapang, Taman Permainan dan Rekreasi',
                'Kutipan Sampah, Rumput dan Sisa Pukal',
                'Lain-lain',
              ].map((option) => (
                <label key={option} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="issue"
                    value={option}
                    checked={issue === option}
                    onChange={() => setIssue(option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Perkara
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
            <label htmlFor="details" className={styles.label}>
              Keterangan
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              required
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="attachment">
              Dokumen Berkaitan
            </label>
            <div className={styles.fileRow}>
              <label className={styles.fileButton} htmlFor="attachment">
                Muat Naik
              </label>
              <span className={styles.fileName}>
                {attachmentName ? attachmentName : 'Tiada fail dipilih'}
              </span>
            </div>
            <input
              id="attachment"
              type="file"
              className={styles.fileInput}
              onChange={(event) => {
                const file = event.target.files?.[0];
                setAttachmentName(file ? file.name : '');
              }}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Hantar
          </button>

          {status ? <p className={styles.status}>{status}</p> : null}
        </form>

        <p className={styles.helper}>
          The Strata Feedback Form | Kami cuba menyelesaikan setiap maklum balas dalam tempoh 14 hari
          waktu bekerja. Anda boleh hubungi kami lagi melalui emel atau aplikasi JaGaAp 2.0.
        </p>
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
