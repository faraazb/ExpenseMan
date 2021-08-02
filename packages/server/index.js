var sequelize = require("./sequelize-setup");
var express = require("express");
var { graphqlHTTP } = require("express-graphql");
const { ExecutableSchema } = require("./schemas/executableSchema");
const jwt = require("express-jwt");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  jwt({
    secret: 'a_terrible_secret',
    algorithms: ["HS256"],
    credentialsRequired: false
  })
);

const authRouter = require("./auth");
app.use("/api/auth", authRouter);


app.use("/graphql", graphqlHTTP((request) => ({
  schema: ExecutableSchema,
  context: {...sequelize.models, user: request.user || null},
  graphiql: true,
})));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/graphql`)
});
