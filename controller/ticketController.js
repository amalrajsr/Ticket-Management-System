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

exports.fetchTicketById = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new AppError(400, "Invalid request");
  const result = await ticketHelper.fetchTicketById(id);
  res.json({ success: true, result });
});

exports.updateTicketAssingee = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const { assignee } = req.body;
  if (!id || !assignee) throw new AppError(400, "Invalid request");
  const result = await ticketHelper.updateTicketAssignee(assignee, id);
  if (!result.rowCount) throw new AppError(400, "Invalid id");
  res.json({ success: true, result: result.rows[0] });
});
exports.updateTicketStatus = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id || !status) throw new AppError(400, "Invalid request");
  const result = await ticketHelper.updateTicketStatus(status, id);
  if (!result.rowCount) throw new AppError(400, "Invalid id");
  res.json({ success: true, result: result.rows[0] });
});
exports.addComment = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  if (!id || !comment) throw new AppError(400, "Invalid request");
  const result = await ticketHelper.addComment(comment, id);
  if (!result.rowCount) throw new AppError(400, "Invalid id");
  res.json({ success: true, result: result.rows[0] });
});