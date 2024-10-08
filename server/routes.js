const { Router } = require("express");
const router = Router();

let TransactionsController = require("./controllers/transaction");
let FlowController = require("./controllers/flow");
let AccountController = require("./controllers/account");
let EstimateController = require("./controllers/estimate");
let BudgetCategoryController = require("./controllers/budgetCategory");
let BudgetController = require("./controllers/budget");
let ForecastController = require("./controllers/forecast");

router.get("/transactions", TransactionsController.list_transactions);
router.get("/transactions/unallocated", TransactionsController.list_unallocated_transactions);
router.post("/transactions/upload-csv", TransactionsController.upload_csv);
router.post("/transactions/upload-monzo", TransactionsController.upload_monzo);
router.put("/transactions/:_id", TransactionsController.update_transaction);
router.delete("/transactions", TransactionsController.delete_transactions);

router.get("/flows", FlowController.list_flows);
router.post("/flows", FlowController.create_flow);
router.post("/flows/create-temp", FlowController.create_flow_temp);
router.put("/flows/:_id", FlowController.update_flow);
router.delete("/flows", FlowController.delete_flows);
router.delete("/flows/:_id", FlowController.delete_flow);

router.get("/estimates", EstimateController.list_estimates);
router.post("/estimates", EstimateController.create_estimate);
router.post("/estimates/delete", EstimateController.delete_estimates);
router.put("/estimates/:_id", EstimateController.update_estimate);
router.delete("/estimates/:_id", EstimateController.delete_estimate);

router.get("/budgets", BudgetController.list_budgets);
router.post("/budgets", BudgetController.create_budget);
router.put("/budgets/:_id", BudgetController.update_budget);

router.delete("/budgets", BudgetController.delete_budgets);
router.delete("/budgets/:_id", BudgetController.delete_budget);

router.get("/budget-categories", BudgetCategoryController.list_budget_categories);
router.post("/budget-categories", BudgetCategoryController.create_budget_category);
router.put("/budget-categories/:_id", BudgetCategoryController.update_budget_category);
router.put("/budget-categories/:_id/move", BudgetCategoryController.move_budget_category);
router.delete("/budget-categories", BudgetCategoryController.delete_budget_categories);
router.delete("/budget-categories/:_id", BudgetCategoryController.delete_budget_category);

router.get("/accounts", AccountController.list_accounts);
router.post("/accounts", AccountController.create_account);
router.put("/accounts/:_id", AccountController.update_account);
router.put("/accounts/:_id/move", AccountController.move_account);
router.delete("/accounts", AccountController.delete_accounts);
router.delete("/accounts/:_id", AccountController.delete_account);

router.get("/forecast", ForecastController.generate_forecast);

const monzo = require("./monzo");
router.use(monzo);

const backup = require("./backup");
router.use(backup);

module.exports = router;
