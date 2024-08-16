const typeDefs = `
    type Book {
        bookId: String!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
    }

    input BookInput {
        bookId: String!
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: String!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String, password: String!): Auth
        saveBook(bookInput: BookInput): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
