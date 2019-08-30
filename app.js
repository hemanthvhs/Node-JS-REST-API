const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const DropDownsRouter = require('./api/routes/dropdowns')
const TicketsRouter = require('./api/routes/tickets')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','*')
        return res.status(200).json({});
    }
    next();
});

 app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Content-Type,X-Requested-With,cache-control,pragma');

    next();
});
 


app.use('/api/getdropdowns',DropDownsRouter)
app.use('/api/gettickets',TicketsRouter)

app.use((req,res,next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            status  : error.status,
            message : error.message
        }
    })
})

module.exports = app