const {Router}= require('express')
const {createTickets,fetchTickets}= require('../controller/ticketController')
const router= Router()

router.route('/tickets').post(createTickets).get(fetchTickets)
// router.get('/tickets/:id')
 
module.exports=router