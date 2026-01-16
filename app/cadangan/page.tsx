'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavLink from '../../components/NavLink';
import styles from './page.module.css';

export default function SuggestionPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('Suggestion');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('/api/suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact, subject, type, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Submission received. Thank you!');
        setName('');
        setContact('');
        setSubject('');
        setMessage('');
      } else {
        setStatus(`Error: ${data.error || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Submission error', error);
      setStatus('Error: Could not submit the form.');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.navBar}>
        <Link href="/">
          <div className={styles.navLogo} aria-label="Strata logo" />
        </Link>
        <nav className={styles.navLinks}>
          <NavLink href="/" label="Utama" />
          <NavLink href="/tentang-persatuan" label="Tentang Persatuan" />
          <NavLink href="/panduan-penduduk" label="Panduan Penduduk" />
          <NavLink href="/kutipan-sekuriti" label="Kutipan Sekuriti" />
          <NavLink href="/pengumuman" label="Pengumuman" />
          <NavLink href="/hubungi-kami" label="Hubungi Kami" />
        </nav>
      </header>

      <main className={styles.container}>
        <h1 className={styles.title}>Laporan / Cadangan</h1>
        <p>Hantar laporan mengenai isu atau cadangan untuk penambahbaikan komuniti.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="type" className={styles.label}>Jenis</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={styles.input}
            >
              <option value="Suggestion">Cadangan</option>
              <option value="Report">Laporan</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>Subjek</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Butiran</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nama (Pilihan)</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="contact" className={styles.label}>Emel / No. Telefon (Pilihan)</label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Hantar
          </button>
          
          {status && <p>{status}</p>}
        </form>
      </main>
    </div>
  );
}
