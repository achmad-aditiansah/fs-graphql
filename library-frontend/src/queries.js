import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`

export const EDIT_YOB = gql`
  mutation editYob($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const FILTERED_BOOKS = gql`
  query getBooks(
    $genre: String
  ){
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`