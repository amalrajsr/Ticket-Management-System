const asyncHanlder = require("express-async-handler");
const tableHelper = require("../helper/tableHelper");
const ticketHelper = require("../helper/ticketHelper");
const historyHelper = require("../helper/historyHelper");
const commentHelper = require("../helper/commentHelper");
const AppError = require("../utils/error");
exports.createTickets = asyncHanlder(async (req, res) => {
  const { title, description, status, assignee } = req.body;

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
  const comments = await commentHelper.fetchComments();
  result.forEach((ticket) => {
    ticket.comment = [];
    comments.forEach((item) => {
      if (ticket.id == item.ticket_id) {
        ticket.comment.push(item.comment);
      }
    });
  });
  res.json({ success: true, result });
});

exports.fetchTicketById = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new AppError(400, "Invalid request");
  const ticket = await ticketHelper.fetchTicketById(id);
  const history = await historyHelper.fechHistory(id);
  const comments = await commentHelper.fetchCommentsById(id);
  const result = { details: { ...ticket, comments }, history };

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
  if (!result) throw new AppError(400, "Invalid id");
  res.json({ success: true, result: result.rows[0] });
});
exports.addComment = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  if (!id || !comment) throw new AppError(400, "Invalid request");
  const result = await commentHelper.addComment(id, comment);
  if (!result) throw new Error("failed to add comment");
  const isHistoryAdded = await historyHelper.addHistory(id, comment);
  res.json({ success: true, history: isHistoryAdded });
});
