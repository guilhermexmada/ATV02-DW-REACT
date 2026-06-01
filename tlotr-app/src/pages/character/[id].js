import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './detail.module.css';
import {Loading} from '@/components/loading';
import {Figure} from '@/components/figure';

// Dados mockados/simulados
const MOCK_API_DATA = [
  { _id: "1", name: "Frodo Baggins", race: "Hobbit", realm: "The Shire", birth: "September 22, 2968", gender: "Male" },
  { _id: "2", name: "Aragorn", race: "Human", realm: "Gondor", birth: "March 1, 2931", gender: "Male" },
  { _id: "3", name: "Legolas", race: "Elf", realm: "Mirkwood", birth: "Unknown", gender: "Male" },
  { _id: "4", name: "Gimli", race: "Dwarf", realm: "Erebor", birth: "2879 Third Age", gender: "Male" },
];

export default function CharacterDetail() {
  const router = useRouter();
  const { id } = router.query; // Captura ID do personagem
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Aguarda o next disponibilizar o ID

    // consulta detalhes do personagem
    const fetchCharacterDetails = async () => {
      setLoading(true); // inicia carregamento
      try {
        // usa token na variável de ambiente
        const token = process.env.NEXT_PUBLIC_ONE_API_TOKEN;
        
        // realiza busca na API pública
        const res = await fetch(`https://the-one-api.dev/v2/character/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // erro na consulta
        if (!res.ok) {
          throw new Error('Falha ao obter detalhes do personagem.');
        }

        const data = await res.json();

        // A API retorna os registros dentro da propriedade "docs"
        if (data.docs && data.docs.length > 0) {
          setCharacter(data.docs[0]);
        } else {
          setCharacter(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // finaliza carregamento
      }
    };

    fetchCharacterDetails();
  }, [id]); // Executa novamente sempre que o ID mudar

    // exibe elemento de carregamento
     if (loading) {
      return <Loading/>;
    }

  // exibe elemento de erro
  if (error || !character) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.message}>{error || 'Personagem não encontrado!'}</p>
          <Link href="/" className={styles.backButton}>
            Voltar para a Busca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Silhueta do personagem */}
        <Figure type={character.race.toLowerCase()}/> 

        <h1 className={styles.title}>{character.name}</h1>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <strong>Raça</strong>
            <span>{character.race || 'Não informada'}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Gênero</strong>
            <span>{character.gender || 'Não informado'}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Reino / Origem</strong>
            <span>{character.realm || 'Não informado'}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Link Oficial</strong>
            <span>
              {character.wikiUrl ? (
                <a href={character.wikiUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6900' }}>
                  Ver na Wiki
                </a>
              ) : 'Não disponível'}
            </span>
          </div>
        </div>

        <Link href="/" className={styles.backButton}>
          Voltar
        </Link>
      </div>
    </div>
  );
}