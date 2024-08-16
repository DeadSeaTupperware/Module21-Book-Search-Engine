/* DEPENDENCIES */
const { User } = require("../models");
const { signToken } = require("../utils/auth");

/* RESOLVERS */
const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      return User.findById(_id).populate("savedBooks");
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password, savedBooks }) => {
      console.log("In create user");
      const user = await User.create({ username, email, password, savedBooks });
      console.log("User", user);
      const token = signToken(user);
      return { token, user };
    },
    addBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        );
        return user;
      }
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return user;
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

/* EXPORTS */
module.exports = resolvers;
