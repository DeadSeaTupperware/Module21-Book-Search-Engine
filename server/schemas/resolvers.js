/* DEPENDENCIES */
const { User } = require("../models");
const { signToken } = require("../utils/auth");

/* RESOLVERS */
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Error finding user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Incorrect password!");
      }

      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    saveBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        try {
          const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: bookInput } },
            { new: true }
          );
          return user;
        } catch (err) {
          throw new Error("Error saving book");
        }
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return user;
        } catch (err) {
          throw new Error("Error deleting book");
        }
      }
    },
  },
};

/* EXPORTS */
module.exports = resolvers;
