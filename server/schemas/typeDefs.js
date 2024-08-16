const typeDefs = `
    type Book {
        _id: ID
        authors: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    input BookInput {
        title: String
        author: String
        description: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type UserLogin {
        token: String!
        user: User
    }

    type Query {
        user(_id: String): [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!, savedBooks: [BookInput]!): [User]
        addBook(_id: String!, book: [BookInput]): [User]
        deleteBook(_id: String!): [User]
        login(username: String, email: String, password: String!): [UserLogin]
    }
`;

module.exports = typeDefs;
