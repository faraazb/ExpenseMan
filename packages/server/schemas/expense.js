

const typeDef = `
    type Expense {
        _id: ID!
        user: String!
        amount: Decimal!
        currency: Currency!
        symbol_native: String
        incurred_on: DateTime!
        created_on: DateTime!
        updated_on: DateTime!
        category: Category!
        description: String
    }
`

const Query = `
    type Query {
        getExpense(_id: String!): Expense
        getAllExpenses: [Expense]
    }
`

const Resolver = {
    Query: {
        getExpense: async (obj, {_id}, {Expense}) => {
            let expense = await Expense.findById(_id).populate("category")
            return expense;
        },
        getAllExpenses: async (obj, args, {Expense}) => {
            // console.log(obj, args, context);
            let expenses = await Expense.find().populate("category")
            return expenses;
        }
    }
}

exports.ExpenseTypeDef = typeDef;
exports.ExpenseQuery = Query;
exports.ExpenseResolver = Resolver;