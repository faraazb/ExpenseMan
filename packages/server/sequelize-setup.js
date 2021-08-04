const { Sequelize } = require("sequelize");
const { DB_URI } = require("./server-config");
const sequelize = new Sequelize(DB_URI);

/*
* To turn off sequelize query logging, set options above, or use the below line
* sequelize.options.logging = false anywhere sequelize instance is
* available
*/

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}



const modelDefiners = [
    require("./models/User"),
    require("./models/ExpenseCategory"),
    require("./models/Expense")
]

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

const { User, Expense, ExpenseCategory } = sequelize.models;

User.hasMany(Expense, {
	foreignKey: "user_id"
});
Expense.belongsTo(User, {
	foreignKey: "user_id"
});

Expense.belongsTo(ExpenseCategory, {
	foreignKey: "expense_category_id"
});


async function init() {
	await assertDatabaseConnectionOk();
	await sequelize.sync();
	console.log("All tables were successfully created")
}

init();

module.exports = sequelize;
