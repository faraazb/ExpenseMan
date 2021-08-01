

const typeDef = `
    type User {
        id: UUID!
        name: String!
    }

    type Expense {
        id: UUID!
        user: User!
        amount: Decimal!
        currency: Currency!
        currency_symbol: String
        currency_decimal_digits: Int
        incurredAt: DateTime!
        createdAt: DateTime!
        updatedAt: DateTime!
        category: Category!
        description: String
    }
`

const Query = `
    type Query {
        getExpense(id: UUID!): Expense
        getAllExpenses: [Expense]
        getExpensesByUserId(user_id: UUID!): [Expense]
    }
`
const Mutation= `
    type ExpenseResponse {
        success: Boolean!
        message: String
        expense: Expense
    }

    type Mutation {
        createExpense(
            userId: UUID!
            amount: Decimal!
            currency: Currency!
            incurredAt: DateTime!
            categoryId: UUID!
            description: String
        ): ExpenseResponse!
        updateExpense(
            id: UUID!
            amount: Decimal
            currency: Currency
            incurredAt: DateTime
            categoryId: UUID
            description: String
        ): ExpenseResponse!
        deleteExpense(
            id: UUID!
        ): ExpenseResponse!
    }
`

const Resolver = {
    Query: {
        getExpense: async (obj, {id}, {Expense}) => {
            try {
                let expense = await Expense.findByPk(id, {include: ['ExpenseCategory', 'User']});
                if (expense) {
                    console.log(expense.toJSON())
                    return expense.toJSON();
                }
                else {
                    return new Error(`Expense with '${id}' does not exist`)
                }
            } catch (error ) {
                console.log(error);
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
        getAllExpenses: async (_, __, {Expense}) => {
            try {
                let expenses = await Expense.findAll({include: ['ExpenseCategory', 'User']});
                return expenses
            } catch (error) {
                console.log(error);
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
        getExpensesByUserId: async (obj, {user_id}, {Expense}) => {
            try {
                let expenses = await Expense.findAll({
                    where: {user_id: user_id}, 
                    include: ['ExpenseCategory']
                });
                return expenses
            } catch (error) {
                console.log(error);
                return new Error(`DB_ERROR: '${error}'`);
            }
        }
    },
    Expense: {
        user: async (obj, __, ___) => {
            return obj.User
        },
        category: async (obj, _, __) => {
            return obj.ExpenseCategory
        }
    },
    Mutation: {
        // TODO: Look into eager loading after instance creation
        createExpense: async (_, 
            {userId, amount, currency, incurredAt, categoryId, description}, 
            {Expense}) => {
            try {
                let exp = await Expense.create({
                    user_id: userId,
                    amount: amount,
                    currency: currency,
                    incurredAt: incurredAt,
                    expense_category_id: categoryId,
                    description: description
                });
                if (exp) {
                    return {
                        success: true,
                        expense: exp
                    }
                }
            } catch (error) {
                console.error(`Couldn't create Expense: ${error}`);
                return {
                    success: false,
                    message: "Couldn't create Expense!"
                }
            }
        },
        updateExpense: async (_, args, {Expense}) => {
            try {
                let exp = await Expense.findByPk(args.id);
                if (exp) {
                    if (args.amount !== undefined) exp.amount = args.amount;
                    if (args.currency !== undefined) exp.currency = args.currency;
                    if (args.incurredAt !== undefined) exp.incurredAt = args.incurredAt;
                    if (args.categoryId !== undefined) exp.expense_category_id = args.categoryId;
                    if (args.description !== undefined) exp.description = args.description;
                }
                else {
                    return new Error(`Expense with '${arg.id}' does not exist`)
                }
            } catch (error) {
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
        deleteExpense: async (_, {id}, {Expense}) => {
            try {
                let exp = await Expense.destroy({where: {id: id}});
                if (exp = 1) {
                    return {
                        success: true,
                        message: "Expense deleted"
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Couldn't delete Expense!"
                    }
                }
            } catch (error) {
                console.error(`Couldn't delete Expense: ${error}`);
                return {
                    success: false,
                    message: "Couldn't delete Expense!"
                }
            }
        }
    }
}

exports.ExpenseTypeDef = typeDef;
exports.ExpenseQuery = Query;
exports.ExpenseMutation = Mutation;
exports.ExpenseResolver = Resolver;