import { useQuery } from "@apollo/client/react"
import { FILTERED_BOOKS, ME } from "../queries"

const Recommend = (props) => {
  const userData = useQuery(ME)
  const userFavGenre = userData.data?.me?.favoriteGenre

  const result = useQuery(FILTERED_BOOKS, {
    variables: { genre: userFavGenre },
    skip: !userFavGenre,
  })

  if (!props.show) {
    return null
  }

  if (userData.loading || result.loading) {
    return <div>loading...</div>
  }

  const userFavBooks = result.data?.allBooks || []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{userFavGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {userFavBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend