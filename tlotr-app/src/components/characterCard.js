import Link from 'next/link';
import styles from './characterCard.module.css';

export default function CharacterCard({ character }) {
  return (
    <div className={styles.card}>
      <h3>{character.name}</h3>
      <p><strong>Raça:</strong> {character.race || 'Não informada'}</p>
      <Link href={`/character/${character._id}`} className={styles.button}>
        Ver Detalhes
      </Link>
    </div>
  );
}