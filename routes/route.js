const {Router}= require('express')
const {createTickets,fetchTickets,fetchTicketById,updateTicketAssingee,updateTicketStatus,addComment}= require('../controller/ticketController')
const validateBody=require('../utils/validateBody')
const {ticketSchema,assingeeSchema,statusSchema,commentSchema}=require('../utils/yupSchema')
const router= Router()

router.route('/tickets').post(validateBody(ticketSchema),createTickets).get(fetchTickets)
router.get('/tickets/:id',fetchTicketById)
router.put('/tickets/:id/assign',validateBody(assingeeSchema), updateTicketAssingee)
router.put('/tickets/:id/status',validateBody(statusSchema),updateTicketStatus)
router.post('/tickets/:id/comments',validateBody(commentSchema),addComment)
 
module.exports=router