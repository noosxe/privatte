/**
 * Functions file
 *
 */

/* BEGIN VARS */

var log = {
    log:function(m) {
        var now = new Date();
        console.log('[' + now.toTimeString() + '][priv] ' + m);
    },
    act:function(m) {
        this.log('ACTION:' + m);
    },
    status:function(m) {
        this.log('STATUS:' + m);
    },
    warn:function(m) {
        this.log('WARNING:' + m);
    },
    error:function(m) {
        this.log('ERROR:' + m);
    }
};

/* END VARS */
//--------------------------------------------------------------------------------
/* BEGIN EXPORTS */

/*
 * Function to log to console
 * EXPORTS ACTIONS ON OBJECT
 *
 * log
 * act
 * status
 * warn
 * error
 */
exports.__defineGetter__('log', function() {
    return log;
});

exports.exit = function() {
    log.act('exiting');
    process.exit();
};

/* END EXPORTS */