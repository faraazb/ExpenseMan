const { makeExecutableSchema } = require("@graphql-tools/schema");
const { merge } = require("lodash");

const { ExpenseTypeDef, ExpenseQuery, ExpenseResolver, ExpenseMutation } = require("./expense");
const { ExpenseCategoryTypeDef, ExpenseCategoryQuery, ExpenseCategoryResolver } = require("./category");
const { Currency } = require("./utils/currency");
const { GraphQLDateTime } = require("./utils/datetime");
const { GraphQLDecimal } = require("./utils/decimal");
const { GraphQLUUID } = require("./utils/UUID");

const typeResolvers = {
  DateTime: GraphQLDateTime,
  Decimal: GraphQLDecimal,
  UUID: GraphQLUUID
}

const executableSchema = makeExecutableSchema({
  typeDefs: [
      `scalar DateTime`, 
      `scalar Decimal`,
      `scalar UUID`,
      Currency, 
      ExpenseCategoryTypeDef,
      ExpenseCategoryQuery,
      ExpenseTypeDef, 
      ExpenseQuery,
      ExpenseMutation
    ],
  resolvers: merge(typeResolvers, ExpenseResolver, ExpenseCategoryResolver)
});

exports.ExecutableSchema = executableSchema;
