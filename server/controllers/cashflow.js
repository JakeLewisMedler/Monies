const Budget = require("../models/Budget");
const BudgetCategory = require("../models/BudgetCategory");

const { startOfMonth, eachMonthOfInterval, addMonths, subMonths, subMinutes } = require("date-fns");

const generate_cashflow = async (req, res) => {
  let monthStart = subMonths(startOfMonth(new Date()), 1);
  let numberOfPeriods = 13;
  let budgets = await Budget.find({});
  let budgetCategories = await BudgetCategory.find({});

  let dates = eachMonthOfInterval({
    start: monthStart,
    end: addMonths(monthStart, numberOfPeriods - 1)
  }).map((d) => subMinutes(d, d.getTimezoneOffset()));

  let periods = dates.map((date) => {
    let period = { date, budgets: [], budgetCategories: [], totals: {} };

    for (let budgetCategory of budgetCategories) {
      let budgetCategoryEstimatedTotal = 0;
      let budgetCategoryActualTotal = 0;
      for (let budget of budgets.filter((b) => String(b.category) == String(budgetCategory._id))) {
        let estimated = 0;
        let actual = 0;
        budgetCategoryEstimatedTotal += estimated;
        budgetCategoryActualTotal += actual;
        period.budgets.push({ name: budget.name, _id: budget._id, estimatedTotal: estimated, actualTotal: actual });
      }
      period.budgetCategories.push({
        name: budgetCategory.name,
        _id: budgetCategory._id,
        estimatedTotal: budgetCategoryEstimatedTotal,
        actualTotal: budgetCategoryActualTotal
      });
    }
    let openingBalance = 0;
    let diffEstimated = Math.round(period.budgets.reduce((prev, curr) => prev + curr.estimatedTotal, 0) * 100) / 100;
    let diffActual = Math.round(period.budgets.reduce((prev, curr) => prev + curr.actualTotal, 0) * 100) / 100;
    let closingEstimated = Math.round((openingBalance + diffEstimated) * 100) / 100;
    let closingActual = Math.round((openingBalance + diffActual) * 100) / 100;

    period.totals = { openingBalance, diffEstimated, diffActual, closingEstimated, closingActual };
    return period;
  });
  return res.send({ periods });
};

module.exports = {
  generate_cashflow
};
