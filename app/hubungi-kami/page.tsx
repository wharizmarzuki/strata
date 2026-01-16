'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavLink from '../../components/NavLink';
import styles from './page.module.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
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
        <h1 className={styles.title}>Hubungi Kami</h1>
        <p>Ada soalan atau maklum balas? Hantarkan mesej kepada kami di bawah.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nama</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Emel</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Mesej</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.button}>
            Hantar Mesej
          </button>
          
          {status && <p>{status}</p>}
        </form>
      </main>
    </div>
  );
}
