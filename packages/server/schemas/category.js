
const typeDef = `
    type Category {
        id: UUID!
        name: String!
    }
`

const queries = `
    type Query {
        getCategories: [Category]
    }
`

const resolver = {
    Query: {
        getCategories: async (_, __, {ExpenseCategory, user}) => {
            if (!user) {
                return new Error(`You are not authenticated or authorized`);
            }
            try {
                let categories = await ExpenseCategory.findAll();
                return categories
            } catch (error) {
                console.log(error);
                return new Error(`DB_ERROR: '${error}'`);
            }
        },
    }
}

exports.ExpenseCategoryTypeDef = typeDef;
exports.ExpenseCategoryQuery = queries;
exports.ExpenseCategoryResolver =resolver;