const sequelize = require("./sequelize-setup");

const { User, Expense, ExpenseCategory } = sequelize.models;

const currencies = require("./currencies.json")

let currencyCodes = Object.keys(currencies);

let description = ["air ball basket", "punpkin halloween bitcoin", "nightmare garbage tulips", "bet home man", "rot beetroot pass"]

let names  = ["Faraaz Biyabani", "Mohan Mohan", "Rohan Sharma", "David Thomas", "Sahil Darji"]

let categories  = ["Home", "Food", "Fuel", "Shopping", "Other"]

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// async function dataFactory() {

//     for (const category of categories) {
//         const ctg = await ExpenseCategory.create({name: category});
//         console.log(ctg);
//     }
// }

async function dataFactory() {
    const categoriesID = []
    for (const category of categories) {
        const ctg = await ExpenseCategory.create({name: category});
        categoriesID.push(ctg.id);
    }

    // const users = []
    var precision = 100;
    for (const name of names) {
        try {
            const user = await User.create({name: name});
            // users.push(user.id);
            console.log("Categories", categoriesID);
            console.log(user.id)
            const expense = await Expense.create({
                user_id: user.id, 
                amount: Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision),
                currency: currencyCodes[Math.floor(Math.random()*currencyCodes.length)],
                incurredAt: randomDate(new Date(2021, 6, 12, 5, 40, 34), new Date()),
                createdAt: randomDate(new Date(2021, 6, 12, 7, 56, 30), new Date()),
                expense_category_id: categoriesID[Math.floor(Math.random()*categoriesID.length)],
                description: description[Math.floor(Math.random()*description.length)]
            });
        } catch (error) {
            console.log(error);
        }
    }
}

// dataFactory();

async function createCategories() {
    const categoriesID = []
    for (const category of categories) {
        const ctg = await ExpenseCategory.create({name: category});
        categoriesID.push(ctg.id);
    }
}

// createCategories();

function getWeeksInMonth(year, month) {
    const weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();
  
    let dayOfWeekCounter = firstDate.getDay();
  
    for (let date = 1; date <= numDays; date++) {
      if (dayOfWeekCounter === 0 || weeks.length === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(date);
      dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
    }
  
    return weeks
      .filter((w) => !!w.length)
      .map((w) => ({
        start: w[0],
        end: w[w.length - 1],
        dates: w,
      }));
  }

//   console.log(getWeeksInMonth(2021, 4));

// async function getSum() {
//     let expenses = Expense.sum('amount', {where: {userId: ""}, group: ExpenseCategory.id, include: ['ExpenseCategory']});
//     console.log(JSON.stringify(expenses));
// }

// getSum();