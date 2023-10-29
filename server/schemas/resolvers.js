
// Resolvers populate the adta in the schema 

// This will be used for the google api for books

// This file was heavily reference by activity 25



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
        addProfile: async (parent /* Note: Parent may not be necessary */, args) => {
            const profile = await Profile.create({ name, email, password });
            const token = signToken(profile);

            return { token, profile };
        },
        loginUser: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email });

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
                return Profile.findOneAndUpdate(
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
                return Profile.findOneAndDelete({ _id: context.user._id });
            }
            throw AuthenticationError;
        },

        // This section is for deleting a existing book

        // This can only work if the user is logged in

        removeBook: async (parent, { book }, context) => {
            if (context.user) {
                return Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: book } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    }
}