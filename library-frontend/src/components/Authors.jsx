import { useMutation, useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_YOB } from "../queries"
import { useState } from "react"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show
  })
  const [born, setBorn] = useState('')
  const [selectedName, setSelectedName] = useState('')

  const [ changeYob ] = useMutation(EDIT_YOB, {
    onCompleted: (data) => {
      if (!data.editAuthor) {
        props.setError('author not found')
      }
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  
  const submit = async (event) => {
    event.preventDefault()

    const nameToUpdate = selectedName || authors[0]?.name

    changeYob({ variables: { name: nameToUpdate, setBornTo: born } })
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.user && (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
          <div>
            <label>
              name
              <select name="name" value={selectedName} onChange={(event) => setSelectedName(event.target.value)}>
                {authors.map(author => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              born
              <input type="number" value={born} onChange={(event) => setBorn(parseInt(event.target.value, 10))}/>
            </label>
          </div>
          <button type="submit">update author</button>
        </form>
        </div>
      )}
    </div>
  )
}

export default Authors
