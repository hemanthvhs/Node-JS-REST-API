const sql = require('mssql/msnodesqlv8')

const config = {
  database: "Test_DB",
  server: "TWNC0429SHPNT01",
  port  : 1433,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  },
};

const connection = sql.connect(config, (err) => {
    if(err) console.log(err)
    else console.log("Connected to DB")
    
})

module.exports = connection

