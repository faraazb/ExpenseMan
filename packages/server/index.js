var sequelize = require("./sequelize-setup");
var express = require("express");
var { graphqlHTTP } = require('express-graphql');
const { ExecutableSchema } = require("./schemas/executableSchema")

const app = express();
const port = 3000;

// console.log(sequelize.model);

app.use("/graphql", graphqlHTTP({
  schema: ExecutableSchema,
  context: sequelize.models,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/graphql`)
});
