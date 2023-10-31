// typeDefs returns the string that describes the data structure in graphql

// This acts as the what can you get it

const typeDefs = `

type Profile {
    _id: ID
    username: String
    email: String
    password: String

    # ! means it is a required field 

    books: [Book]

    # Book is a type that will be filled in for the array because it holds all the properties unlike string
  }

  type Auth {

    # This will be returned when the profile infromation lines up

    token: ID!
    profile: Profile
  }

 input BookInput {
    title: String!
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Book {
    title: String!
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
  }
  
  type Query {

    # profiles is an array that will hold all "Profiles" meaning all users

    profiles: [Profile]!
    profile(profileId: ID!): Profile

    # user and profile act as one and the same because the user represents the Profile

    user: Profile
     
    # Once the profiles are checked in the resolvers file and parse it's data, we can use a query that will always find and return the logged in user's data

  }


  type Mutation {

    # For each property in mutation needs to be assigned a primative type as well

    # After entering the input for data it expects and auth 

    addProfile(username: String!, email: String!, password: String!): Auth

    loginUser(email: String!, password: String!): Auth

    addBook(profileId: ID!, book: BookInput!): Profile

    # removeProfile is not necessary but still added in case of further modification

    removeProfile(profileId: ID!): Profile
    removeBook(book: String!): Profile
  }

  `;

module.exports = typeDefs;