const Yup = require("yup");

exports.ticketSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .trim()
    .min(3, "Title must contain atleast 3 character"),
  description: Yup.string()
    .required("Description is required")
    .trim()
    .min(4, "Description must contain atleast 4 character"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(
      ["pending", "active", "complete", "reject"],
      "Invalid status. Must be one of: pending, active, complete, reject"
    ),
  assignee: Yup.string()
    .required("Assignee is required")
    .trim()
    .min(3, "Assignee must contain atleast 3 character"),
});

exports.assingeeSchema = Yup.object().shape({
  id: Yup.number().required("ID is required"),
  assignee: Yup.string()
    .required("Assignee is required")
    .trim()
    .min(3, "Assignee must contain atleast 3 character"),
});
exports.statusSchema = Yup.object().shape({
  id: Yup.number().required("ID is required"),
  status: Yup.string()
    .required("status is required")
    .trim()
    .min(3, "Assignee must contain atleast 3 character"),
});
exports.commentSchema = Yup.object().shape({
  id: Yup.number().required("ID is required"),
  comment: Yup.string()
    .required("comment is required")
    .trim()
    .min(3, "comment must contain atleast 3 character"),
});