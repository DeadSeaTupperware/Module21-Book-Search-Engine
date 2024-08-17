const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req }) => authMiddleware({ req }), // Ensure authMiddleware is applied here
});

const startApolloServer = async () => {
  await server.start();

  // Apply Express middleware first
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apply Apollo GraphQL middleware after Express middleware
  app.use("/graphql", expressMiddleware(server));

  // Serve static assets in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Start the database and server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
