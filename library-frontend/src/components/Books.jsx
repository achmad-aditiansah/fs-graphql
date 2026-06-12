import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, FILTERED_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show
  })

  const filtered = useQuery(FILTERED_BOOKS, {
    skip: !genre,
    variables: { genre: genre}
  })
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const books = result.data?.allBooks
  const filteredBooks = filtered.data?.allBooks ?? books
  const allGenres = [...new Set(books.map(b => b.genres).flat())]

  return (
    <div>
      <h2>books</h2>
      {genre && (<div>in genre <strong>{genre}</strong></div>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks
            ? filteredBooks.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))
            : books.map((b) => (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
          }
        </tbody>
      </table>

      <div>
        {allGenres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            >
              {g}
          </button>
        ))}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
