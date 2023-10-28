
// Resolvers populate the adta in the schema 

// This will be used for the google api for books

const { Book, User } = require('../models');

const resolvers = {
    Query: {
        book: async () => {
            return Book.find({});
        },
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
    },
    Mutation: {
        
    }
}