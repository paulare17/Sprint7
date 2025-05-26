//redux
import { useGetDadesQuery} from '../../features/apiSlice'
import type { Film } from '../../features/apiSlice'


export default function List() {
  const { data, isLoading, isError } = useGetDadesQuery()

  if (isLoading) return <p>Carregant...</p>
  if (isError) return <p>Error en carregar la llista de pel·lícules</p>
  if (!data.results || data.results.length === 0) return <p>No hi ha pel·lícules disponibles</p>;

  console.log(data.results)

  return (
    <div>
      {data.results.map((movie:Film) => (
        <img key={movie.id} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
      ))}
    </div>
  )
}

