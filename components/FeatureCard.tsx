import styles from '../app/page.module.css';

type Props = {
  id?: string;
  image: string;
  title: string;
  subtitle: string;
  className?: string;
};

export default function FeatureCard({ id, image, title, subtitle, className = '' }: Props) {
  return (
    <div id={id} className={`${styles.featureCard} ${className}`}>
      <div className={styles.featureCardImage} style={{ backgroundImage: `url(${image})` }} />
      <div className={styles.featureCardBody}>
        <h4>{title}</h4>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </div>
  );
}
