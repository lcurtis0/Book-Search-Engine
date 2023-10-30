
// Resolvers populate the data in the schema 

// This will be used for the google api for books and users who make an account. Note how the properties lines up with the models

// This acts as the how can you get it

// This file was heavily reference by activity 25

const { signToken, AuthenticationError } = require('../utils/auth');

const { Book, User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);

        },
    },

    // Add profile must have username, email, password passed in and must take those values to create a token for it
    Mutation: {
        addProfile: async (parent,{ username, email, password }) => {

            console.log(" Hello " + email);

            // console.log(" Hello " + email + username + password);
            const profile = await User.create({ username, email, password });

            console.log(" After create User ");

            const token = signToken(profile);

            return { token, profile };
        },
        loginUser: async (parent,{ email, password }) => {
            const profile = await User.findOne({ email });

            if (!profile) {
                throw AuthenticationError;
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(profile);
            return { token, profile };
        },

        // This section is for adding a book either loggedin or not

        addBook: async (parent, { profileId, book }, context) => {
            // If context has a `user` property, meaning if the user is loggedin, this will trigger this will assign a new book
            if (context.user) {
                return User.findOneAndUpdate(
                    {
                        _id: profileId
                    },
                    {
                        $addToSet: { books: book },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            // If user asks to add a book and isn't logged in, it will throw an error
            throw AuthenticationError;
        },

        // This section is for delete an account (profile)

        removeProfile: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw AuthenticationError;
        },

        // This section is for deleting a existing book

        // This can only work if the user is logged in
        removeBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: book } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;