var mongoose = require("mongoose");

const { connectMongoDB } = require("./database");
const { Expense, ExpenseCategory } = require("./models/models");

var express = require("express");
var { graphqlHTTP } = require('express-graphql');
const { ExecutableSchema } = require("./schemas/executableSchema")

const app = express();
const port = 3000;

connectMongoDB();

app.use('/graphql', graphqlHTTP({
  schema: ExecutableSchema,
  context: { Expense },
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/graphql`)
});
