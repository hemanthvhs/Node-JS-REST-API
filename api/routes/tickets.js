const express = require('express')
const router  = express.Router()
const sql = require('mssql/msnodesqlv8')
const db = require('../../dbconfig')



router.get('/:TicketCode' ,(req,res,next) => {
   
        const ticketCode = req.params.TicketCode
        const request = new sql.Request(db)
        request.input('TICKET_CDE',ticketCode)
        request.execute('USP_GET_ALL_DATA')
        .then(recordsets => {
            res.json(recordsets['recordset'])       
        })
        .catch(error => {
            error.status = 500
            res.json({
                status  : error.status,
                message : error.message,
                 })
        })

    })



module.exports = router