const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize-setup');

const typeDef = `
    type User {
        id: UUID!
        name: String!
        email: String!
        defaultCurrency: Currency!
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

    type ExpenseResponse {
        success: Boolean!
        message: String
        expense: Expense
    }

    type CategorizedTotalExpense {
        amount: Decimal!
        category: Category!
    }
`

const Query = `
    type Query {
        getExpense(id: UUID!): Expense
        getAllExpenses: [Expense]
        getExpensesByUserId(userId: UUID!): [Expense]
        getTotalExpense(userId: UUID!): Decimal!
        getTotalExpenseByWeek(userId: UUID!): [Decimal]!
        getTotalExpenseByCategory(userId: UUID!): [CategorizedTotalExpense]!
    }
`
const Mutation= `
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
        getAllExpenses: async (_, __, {Expense, user}) => {
            console.log(user);
            if (!user) {
                return new Error(`You are not authenticated`);
            }
            try {
                let expenses = await Expense.findAll({include: ['ExpenseCategory', 'User']});
                return expenses
            } catch (error) {
                console.log(error);
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
        getExpensesByUserId: async (obj, {userId}, {Expense, user}) => {
            if (!user || user.id != userId) {
                return new Error(`You are not authenticated or authorized`);
            }
            try {
                let expenses = await Expense.findAll({
                    where: {user_id: userId}, 
                    include: ['ExpenseCategory']
                });
                return expenses
            } catch (error) {
                console.log(error);
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
        getTotalExpense: async (_, {userId}, {Expense, user}) => {
            if (!user || user.id != userId) {
                return new Error(`You are not authenticated or authorized`);
            }
            try {
                let amount = await Expense.sum('amount', {where: {user_id: userId}});
                return amount;
            } catch (error) {
                console.log(error);
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
        getTotalExpenseByCategory: async(_, {userId}, {user}) => {
            if (!user || user.id != userId) {
                return new Error(`You are not authenticated or authorized`);
            }
            try {
                let expenses = await sequelize.query(`select ec.name as category, sum(amount) as amount, ec.id
                from expenses inner join expense_categories ec on ec.id = expenses.expense_category_id
                where expenses.user_id = ?
                group by ec.id;`, {
                    replacements: [userId],
                    type: QueryTypes.SELECT
                });
                return expenses;
            } catch (error) {
                console.log(error)
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
        getTotalExpenseByWeek: async(_, {userId}, {user}) => {
            if (!user || user.id != userId) {
                return new Error(`You are not authenticated or authorized`);
            }
            try {
                const d = new Date()
                let expenses = await sequelize.query(`select incurred_at, amount from expenses
                where user_id = ?
                and extract(month from incurred_at) = ?`, {
                    replacements: [userId, d.getMonth()+1]
                })
                let total = [null, null, null, null]
                expenses[0].forEach(expense => {
                    let day = new Date(expense.incurred_at).getDate();
                    let week = day/7;
                    let amount = Number(expense.amount);
                    if (week <= 1) {
                        if (total[0] === null) total[0] = 0;
                        total[0] = total[0] + amount;
                    }
                    else if (week <= 2) {
                        if (total[1]=== null) total[1]= 0;
                        total[1] = total[1] + amount;
                    }
                    else if (week <= 3) {
                        if (total[2] === null) total[2] = 0;
                        total[2] = total[2] + amount;
                    }
                    else if (week > 3) {
                        if (total[3] === null) total[3] = 0;
                        total[3] = total[3] + amount;
                    }
                });
                return total;
            } catch (error) {
                console.log(error)
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
    CategorizedTotalExpense: {
        category: async(obj, _, __) => {
            return {
                name: obj.category,
                id: obj.id
            }
        }
    },
    Mutation: {
        // TODO: Look into eager loading after instance creation
        createExpense: async (_, 
            {userId, amount, currency, incurredAt, categoryId, description}, 
            {Expense, user}) => {
            if (!user || user.id != userId) {
                return new Error(`You are not authenticated or authorized`);
            }
            try {
                let exp = await Expense.create({
                    user_id: userId,
                    amount: amount,
                    currency: currency,
                    incurredAt: incurredAt,
                    expense_category_id: categoryId,
                    description: description
                });
                let expense = await Expense.findByPk(exp.id, {include: ['ExpenseCategory']});
                if (expense) {
                    return {
                        success: true,
                        expense: expense
                    }
                }
            } catch (error) {
                console.error(`Couldn't create Expense: ${error}`);
                return {
                    success: false,
                    message: `DB_ERROR: '${error}'`                       
                }
            }
        },
        updateExpense: async (_, args, {Expense, user}) => {
            if (!user) {
                return new Error(`You are not authenticated`);
            }
            try {
                let exp = await Expense.findByPk(args.id);
                if (exp) {
                    if (exp.user_id != user.id) {
                        return new Error(`You are not authenticated`);
                    }
                    if (args.amount !== undefined) exp.amount = args.amount;
                    if (args.currency !== undefined) exp.currency = args.currency;
                    if (args.incurredAt !== undefined) exp.incurredAt = args.incurredAt;
                    if (args.categoryId !== undefined) exp.expense_category_id = args.categoryId;
                    if (args.description !== undefined) exp.description = args.description;
                    exp = await exp.save();
                    let expense = await Expense.findByPk(exp.id, {include: ['ExpenseCategory']});
                    if (expense) {
                        return {
                            success: true,
                            expense: expense
                        }
                    }
                }
                else {
                    return {
                        success: false,
                        message: `Expense with '${arg.id}' does not exist`                       
                    }
                }
            } catch (error) {
                return {
                    success: false,
                    message: `DB_ERROR: '${error}'`                      
                }
            }
        },
        deleteExpense: async (_, {id}, {Expense, user}) => {
            if (!user) {
                return new Error(`You are not authenticated`);
            }
            try {
                let exp = await Expense.destroy({where: {id: id}});
                if (exp === 1) {
                    return {
                        success: true,
                        message: "Expense deleted"
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Couldn't delete Expense. Check UUID."
                    }
                }
            } catch (error) {
                console.error(`Couldn't delete Expense: ${error}`);
                return {
                    success: false,
                    message: `DB_ERROR: '${error}'`
                }
            }
        }
    }
}

exports.ExpenseTypeDef = typeDef;
exports.ExpenseQuery = Query;
exports.ExpenseMutation = Mutation;
exports.ExpenseResolver = Resolver;