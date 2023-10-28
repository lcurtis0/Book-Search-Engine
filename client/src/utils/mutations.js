// Mutations unlike Queries are to change the existing data

import { gql } from '@apollo/client';

// For signing up

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addbook($profileId: ID!, $book: String!) {
    addbook(profileId: $profileId, book: $book) {
      _id
      title
      books
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removebook($book: String!) {
    removebook(book: $book) {
      _id
      name
      books
    }
  }
`;

