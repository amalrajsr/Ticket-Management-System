const {Router}= require('express')
const {createTickets,fetchTickets,fetchTicketById,updateTicketAssingee,updateTicketStatus,addComment}= require('../controller/ticketController')
const validateBody=require('../utils/validateBody')
const validateID=require('../utils//validateId')
const {ticketSchema,assingeeSchema,statusSchema,commentSchema}=require('../utils/yupSchema')
const router= Router()

router.route('/tickets').post(validateBody(ticketSchema),createTickets).get(fetchTickets)
router.get('/tickets/:id',validateID(),fetchTicketById)
router.put('/tickets/:id/assign',validateID(),validateBody(assingeeSchema), updateTicketAssingee)
router.put('/tickets/:id/status',validateID(),validateBody(statusSchema),updateTicketStatus)
router.post('/tickets/:id/comments',validateID(),validateBody(commentSchema),addComment)
 
module.exports=router