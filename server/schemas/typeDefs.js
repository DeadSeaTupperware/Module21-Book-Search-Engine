const typeDefs = `
    type book {
        _id: ID
        authors: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]!
    }

    type Query {
        user(_id: String): [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!, savedBooks: [Book]!): [User]
        addBook(_id: String!): [User]
        deleteBook(_id: String!): [User]
    }
`;

module.exports = typeDefs;
