/**
 * API Response
 */
exports.response = (status, message = '', data = null) => {
    console.log('response')
    return JSON.stringify({"status": status, "message": message, "data": data});
}
  
/**
 * Make random string
 */
exports.makeCode = (length) => {
    console.log('make_code')
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}