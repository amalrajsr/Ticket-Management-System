const asyncHanlder = require("express-async-handler");
const tableHelper = require("../helper/tableHelper");
const ticketHelper = require("../helper/ticketHelper");
const AppError = require("../utils/error");
exports.createTickets = asyncHanlder(async (req, res) => {
  const { title, description, status, assignee } = req.body;
  if (!title || !description || !status || !assignee)
    throw new AppError(400, "Invalid request");

  const tableExists = await tableHelper.checkTableExists("tickets");
  if (!tableExists) {
    await ticketHelper.createTable();
  }
  const result = await ticketHelper.createTicket(
    title,
    description,
    status,
    assignee
  );

  if (!result) throw new Error("failed to create ticket");
  res.json({ success: true });
});

exports.fetchTickets = asyncHanlder(async (req, res) => {
  const result = await ticketHelper.fetchTickets();
  res.json({ success: true, result });
});
