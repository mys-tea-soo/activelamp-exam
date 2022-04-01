const express = require("express");
const cors    = require("cors");
const mysql   = require('mysql');
var validUrl  = require('valid-url');

const app = express();
const baseUrl = 'http://localhost:8000/'


var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: '192.168.56.56',
  user: 'homestead',
  password: 'secret',
  database: 'xiao',
});

conn.connect((err) =>{
  if(err) 
    throw err;
  console.log('Database connected with App...');
});





/**
 * Get all url
 *
 * @return response()
 */
app.get("/api/url", function (req, res) {
  let sqlQuery = "SELECT * FROM urls";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;

    res.send(responseHandler('success', 'List.', results));

  });
});


app.get('/:code', (req, res) => {
  let sqlQuery = `SELECT * FROM urls WHERE code='${req.params.code}'`;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) 
      throw err;
    
    if( !results.length ) 
      return res.send('Invalid url!');

    res.redirect(results[0].full_address);
  });
})

/**
 * Create New url
 *
 * @return response()
 */
 app.post('/api/url',(req, res) => {

  let url = req.body.url
  if( !validUrl.isUri(url) )
    return res.send(responseHandler('fail', 'Invalid url!'));

  

  let diff = url.length - baseUrl.length
  
  if( diff <= 3 )
    return res.send(responseHandler('fail', 'URL is already shorten!'));
  
  let code = '';

  if( diff == 6 )
    code = makeCode(5)
  else if ( diff == 5 )
    code = makeCode(4)
  else if ( diff == 4 )
    code = makeCode(3) 
  else
    code = makeCode(6)

  let data = {
    full_address: url, 
    code: code
  };

  let sqlQuery = "INSERT INTO urls SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(responseHandler('success', 'Successfully generate and shorten url.', baseUrl+''+code));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/items/:id',(req, res) => {
  let sqlQuery = "UPDATE items SET title='"+req.body.title+"', body='"+req.body.body+"' WHERE id="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(responseHandler('success', 'Successfully update and shorten url.', results));
  });
});


/**
 * API Response
 *
 * @return response()
 */
function responseHandler(status, message = '', data = null){
  return JSON.stringify({"status": status, "message": message, "data": data});
}


function makeCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
 return result;
}







// Init the server
var server = app.listen(process.env.PORT || 8000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});