
// Queries unlike Mutations are to find and read the model data

import { gql } from '@apollo/client';

// To use useQuery we must use gql from the @apollo/client library. This parses the queries to be read by other files

// This will be for general profiles 

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      books
    }
  }
`;

// To get a single profile
// Used for saved books specific to that profile

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

// Having the single book

export const QUERY_BOOK = gql`
  query book {
    book {
      _id
      name
    }
  }
`;

// For representing the user and their books

export const ME = gql`
query me {
    me {
      _id
      name
      book
    }
  }
`;
 