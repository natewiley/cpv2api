/**
 * Wrapper for the request module to get around cloudflare's captcha page
 */
const request = require( 'request' );

module.exports = {
  _retryCount: 0,
  _retryMax: 3,

  // Look for cloudflare cookie from server response
  getServerCookie( response ) {
    if ( response && response.headers && Array.isArray( response.headers['set-cookie'] ) ) {
      for ( let cookie of response.headers['set-cookie'] ) {
        cookie = String( cookie ).split( ';' ).shift().trim();

        if ( cookie.indexOf( '__cfduid' ) >= 0 ) {
					return cookie;
				}
      }
    }
    return '';
  },

  // Make a request, try to bypass cloudflare cookie check
  doRequest( url, callback, cookie='' ) {
    const options = {
			method: 'GET',
			url: url,
			headers: {
				'referer': url,
				'cookie': cookie,
				'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
				'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36',
				'upgrade-insecure-requests': '1',
				'cache-control': 'no-cache',
				'pragma': 'no-cache',
				'dnt': '1',
			}
		};
		request( options, ( err, response, body ) => {
      if ( err ) return callback( new Error( err.message || `There was a problem sending the request.` ) );
      if ( !response ) return callback( new Error( `No response object for the current request.` ) );

      // request denied, look for uid cookie
      if ( response.statusCode >= 400 ) {
        const cookie = this.getServerCookie( response );

        // set cookie and resend the request...
        if ( cookie && this._retryCount < this._retryMax ) {
          this._retryCount += 1;
          return this.doRequest( url, callback, cookie );
        }
        // done retrying, abort
        this._retryCount = 0;
        return callback( new Error( `The server responded with status code ${response.statusCode}.` ) );
      }
      // looks good...
      this._retryCount = 0;
      return callback( false, response, body );
		});
  },

}
