/**
 * HTTP request post processing module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

var http = require('../fx/http.js');

/* END INCLUDES */

/* BEGIN ACTIONS */

http.all('*', function(req, res) {
    res.render('common/notFound', 404);
});

/* END ACTIONS */