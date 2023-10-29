// typeDefs returns the string that describes the data structure in graphql

const typeDefs = `

type Profile {
    _id: ID
    name: String
    email: String
    password: String
    # ! mesas it is a required field 
    books: [Book]!
    # 
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Book {
    title: String!
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String!
  }
  
  type Query {
    user: Profile
    # Once the profiles are checked in the resolvers file and parse it's data, we can use a query that will always find and return the logged in user's data

  }


  type Mutation {

    # For each property in mutation needs to be assigned a primative type as well

    # AFter entering the input for data it expects and auth 

    addProfile(name: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth

    addBook(profileId: ID!, book: String!): Profile
    removeProfile: Profile
    removeBook(book: String!): Profile
  }

  `;

  module.exports = typeDefs;