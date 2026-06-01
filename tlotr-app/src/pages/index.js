import { useState, useEffect } from 'react';
import SearchBar from '@/components/searchBar';
import CharacterCard from '@/components/characterCard';
import styles from '../styles/Home.module.css'; 
import {SauronLogo} from '../components/logo'
import {Error} from '@/components/error'
import {Loading} from '@/components/loading'

// Dados mockados/simulados
const MOCK_API_DATA = [
  { _id: "1", name: "Frodo Baggins", race: "Hobbit" },
  { _id: "2", name: "Aragorn", race: "Human" },
  { _id: "3", name: "Legolas", race: "Elf" },
  { _id: "4", name: "Gimli", race: "Dwarf" },
];

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchCharacters() {
      try {
        // usa token na variável de ambiente
        const token = process.env.NEXT_PUBLIC_ONE_API_TOKEN;
        // realiza busca na API pública
        const res = await fetch('https://the-one-api.dev/v2/character', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // erro na consulta
        if (!res.ok) {
          throw new Error('Falha ao carregar os dados da API.');
        }

        const data = await res.json();
        // A API retorna os registros dentro da propriedade "docs"
        setCharacters(data.docs || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
    // setCharacters(MOCK_API_DATA);
  }, []);

  // Filtra a lista baseado no input de busca
  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  // exibe elemento de carregamento
   if (loading) {
    return <Loading/>;
  }
  // exibe elemnto de erro
  if (error) {
    return <Error message={error.message}/>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

      <SauronLogo size={150}/>

      <h1 style={{ textAlign: 'center', color: '#ff6900' }}>The One Consumer</h1>
      <p style={{textAlign:'center'}}>Este é um App feito com React.js e Next.js para consumir dados relacionados a Senhor dos Anéis originados da <a href='https://the-one-api.dev/documentation'>The One API</a>.</p>

      <SearchBar value={search} onChange={setSearch} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {filteredCharacters.map(char => (
          <CharacterCard key={char._id} character={char} />
        ))}
      </div>
    </div>
  );
}