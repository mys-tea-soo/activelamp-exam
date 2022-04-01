const db 				= require('../config/database');
const config 			= require('../config/config.json');
const Helpers 			= require('../helpers');
var validUrl  			= require('valid-url');
const { throwError } 	= require('rxjs');

module.exports = class UrlConvert {
	constructor(redirect, alias) {
		this.redirect 	= redirect;
		this.alias 		= alias;
	}

	static all() {
		return db.execute('SELECT * FROM urls');
	}

	static create(request) {
		let url = request.url
		if( !validUrl.isUri(url) )
			throw 'Invalid url!';

		

		let diff = url.length - config.baseUrl.length
		
		if( diff <= 3 )
			throw 'URL is already shorten!';
		
		let code = '';

		if( diff == 6 )
			code = Helpers.makeCode(5)
		else if ( diff == 5 )
			code = Helpers.makeCode(4)
		else if ( diff == 4 )
			code = Helpers.makeCode(3) 
		else
			code = Helpers.makeCode(6)

		let data = {
			full_address: url, 
			code: code
		};

		let sqlQuery = "INSERT INTO urls SET ?";
		
		db.query(sqlQuery, data,(err, results) => {
			if(err) 
				throw err;

			console.log('success')
			return config.baseUrl+''+code;
		});
	}

	static get = async(full_address) => {
		return await db.query("SELECT * FROM urls WHERE id = '"+full_address+"'", (err, results) => {
			if(err) throw err;
			
			return [123];
		});
	}
};
