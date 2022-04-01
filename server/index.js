const express 	= require("express");
const cors    	= require("cors");
const mysql   	= require('mysql');
const validUrl	= require('valid-url');
const Config 	= require('./config.json')
const Helpers 	= require('./helpers')
const app 		= express();

app.use(cors(Config.cors));

// parse requests of content-type - application/json
app.use(express.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


/*------------------------------------------
--------------------------------------------
	Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection(Config.database);

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

	
	let diff = url.length - Config.baseUrl.length

	if( diff <= 3 )
		return res.send(responseHandler('fail', 'URL is already shorten!'));

	/** Check exist url */
	let exist_query = `SELECT * FROM urls WHERE full_address='${url}' ORDER BY id DESC`;

	let query = conn.query(exist_query, (err, results) => {
		if(err) 
			throw err;

		if( results.length ) 
			return res.send(responseHandler('success', 'Successfully generate and shorten url.', Config.baseUrl+''+results[0].code));

		/** if no result found, create generate new code*/
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
			code		: code,
			full_address: url,
		};
		
		/** Store in database */
		let statement = "INSERT INTO urls SET ?";
	
		let q = conn.query(statement, data,(err, results) => {
			if(err) throw err;
			res.send(responseHandler('success', 'Successfully generate and shorten url.', Config.baseUrl+''+code));
		});
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