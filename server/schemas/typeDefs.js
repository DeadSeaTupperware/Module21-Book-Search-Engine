const typeDefs = `
    type Book {
        _id: ID!
        authors: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    input BookInput {
        bookId: String!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        savedBooks: [Book]
    }

    type UserLogin {
        token: ID!
        user: User
    }

    type Query {
        user: [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!, savedBooks: [BookInput]!): [UserLogin]
        addBook(_id: String!, book: [BookInput]): [User]
        deleteBook(_id: String!): [User]
        login(email: String, password: String!): [UserLogin]
    }
`;

module.exports = typeDefs;
