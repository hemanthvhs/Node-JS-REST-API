const express = require('express')
const router  = express.Router()
const sql = require('mssql/msnodesqlv8')
const db = require('../../dbconfig')

router.get('/servicegroups' ,(req,res,next) => {
   
    const request = new sql.Request(db)
    request.input('SVC_GRP',null)
    request.execute('USP_GET_SV_GRP')
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

router.get('/population' ,(req,res,next) => {
    
    const data = {
        ServiceGroup : req.body.ServiceGroup
    }
    console.log(data.ServiceGroup)
    const request = new sql.Request(db)
    if(data.ServiceGroup) {
        request.input('SVC_GRP',data.ServiceGroup)
    }
    else {
        request.input('SVC_GRP',null)
    }
    
    request.execute('USP_GET_POPULATION')
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

router.get('/category' ,(req,res,next) => {
    
    const data = {
        Population : req.body.Population
    }
    const request = new sql.Request(db)
    if(data.Population) {
        request.input('POPULATION',data.Population)
    }
    else {
        request.input('POPULATION',null)
    }
    
    request.execute('USP_GET_CAT')
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

router.get('/subcategory' ,(req,res,next) => {
    
    const data = {
        Category : req.body.Category
    }
    const request = new sql.Request(db)
    if(data.Category) {
        request.input('CAT',data.Category)
    }
    else {
        request.input('CAT',null)
    }
    
    request.execute('USP_GET_SUBCAT')
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