// typeDefs returns the string that describes the data structure in graphql

const typeDefs = `

type Profile {
    _id: ID
    name: String
    email: String
    password: String
    books: [String]!
    # For the array of books added
  }

  type Auth {
    token: ID!
    profile: Profile
  }
  
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Once the profiles are checked in the resolvers file and parse it's data, we can use a query that will always find and return the logged in user's data

    me: Profile
  }

  type Mutation {

    # For each property in mutation needs to be assigned a primative type as well

    addProfile(name: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth

    addBook(profileId: ID!, book: String!): Profile
    removeProfile: Profile
    removeBook(book: String!): Profile
  }

  `;

  module.exports = typeDefs;