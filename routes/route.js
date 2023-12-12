const {Router}= require('express')
const {createTickets,fetchTickets,fetchTicketById,updateTicketAssingee,updateTicketStatus,addComment}= require('../controller/ticketController')
const router= Router()

router.route('/tickets').post(createTickets).get(fetchTickets)
router.get('/tickets/:id',fetchTicketById)
router.put('/tickets/:id/assign',updateTicketAssingee)
router.put('/tickets/:id/status',updateTicketStatus)
router.post('/tickets/:id/comments',addComment)
 
module.exports=router