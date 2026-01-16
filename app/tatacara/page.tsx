import NavLink from '../../components/NavLink';
import homeStyles from '../page.module.css';
import styles from './page.module.css';

export default function TatacaraPage() {
  return (
    <div className={styles.viewport}>
      <section className={styles.artboard} aria-label="Tatacara">
        <div className={styles.pageBackground} role="presentation" />
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
        <iframe
          className={styles.mapEmbed}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4877.079375792222!2d101.7863914374936!3d2.995250978545446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcb788a14425f%3A0x6f9ca637de6dc629!2sKajang%20Municipal%20Council!5e0!3m2!1sen!2smy!4v1768552374295!5m2!1sen!2smy"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        />
        <footer className={`${homeStyles.footer} ${styles.footerPlacement}`}>
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
      </section>
    </div>
  );
}
