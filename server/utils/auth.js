const jwt = require("jsonwebtoken");

// Set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // Auth middleware adapted for GraphQL
  authMiddleware: function ({ req }) {
    // Token can be sent via headers or req.body or req.query
    let token = req.headers.authorization || "";

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req; // Return the request object unmodified if no token is present
    }

    try {
      // Verify token and attach user data to the request
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach the user data to the request object
    } catch {
      console.log("Invalid token");
      // Optionally, you could throw an authentication error here
      throw new Error("Invalid token");
    }

    return req; // Return the request object, now with user data attached
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
