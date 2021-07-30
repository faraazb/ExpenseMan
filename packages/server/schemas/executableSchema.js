const { makeExecutableSchema } = require("@graphql-tools/schema");
const { merge } = require("lodash");

const { ExpenseTypeDef, ExpenseQuery, ExpenseResolver } = require("./expense");
const { CategoryTypeDef } = require("./category");
const { Currency } = require("./utils/currency")
const { GraphQLDateTime } = require("./utils/datetime")
const { GraphQLDecimal } = require("./utils/decimal");

const typeResolvers = {
  DateTime: GraphQLDateTime,
  Decimal: GraphQLDecimal
}

const executableSchema = makeExecutableSchema({
  typeDefs: [
      `scalar DateTime`, 
      `scalar Decimal`, 
      Currency, 
      CategoryTypeDef, 
      ExpenseTypeDef, 
      ExpenseQuery
    ],
  resolvers: merge(typeResolvers, ExpenseResolver)
});

exports.ExecutableSchema = executableSchema;
