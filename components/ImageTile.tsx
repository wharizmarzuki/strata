import styles from '../app/page.module.css';

type Props = {
  className?: string;
  image: string;
  alt: string;
};

export default function ImageTile({ className = '', image, alt }: Props) {
  return (
    <div
      className={`${styles.imageTile} ${className}`}
      role="img"
      aria-label={alt}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
}
