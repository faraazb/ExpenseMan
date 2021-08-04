var sequelize = require("./sequelize-setup");
var express = require("express");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
const { ExecutableSchema } = require("./schemas/executableSchema");
const jwt = require("express-jwt");
const bodyParser = require('body-parser');
const { JWT_SECRET, PORT } = require("./server-config");

const app = express();
const port = PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  jwt({
    secret: JWT_SECRET,
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
