/**
 * API Response
 *
 * @return response()
 */
exports.response = (status, message = '', data = null) => {
    console.log(data)
    return JSON.stringify({"status": status, "message": message, "data": data});
}
  
  
exports.makeCode = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}