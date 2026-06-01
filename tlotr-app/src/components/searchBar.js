import styles from './searchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Digite o nome do personagem..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
}