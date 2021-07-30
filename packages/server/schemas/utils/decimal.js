/* 
https://github.com/SudhagarS/graphql-type-decimal
*/

var Big = require("big.js");
const { GraphQLScalarType, Kind } = require("graphql");

const GraphQLDecimal = new GraphQLScalarType({
  name: "Decimal",
  description: "The `Decimal` scalar type to represent currency values",

  serialize(value) {
    return new Big(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`${String(ast.value)} is not a valid decimal value.`);
    }

    return Big(ast.value);
  },

  parseValue(value) {
    return Big(value);
  }
});

exports.GraphQLDecimal = GraphQLDecimal