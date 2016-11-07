/**
 * The common namespace for all Toucanno classes.
 *
 * @namespace TCN
 */
var TCN = {};


/**
 * Common prefix to use for Toucanno css classes
 *
 * @constant
 * @type {string}
 * @default
 */
TCN.CSS_PREFIX = 'tcn-';


/**
 * Common prefix to use for Toucanno actions and events.
 *
 * @constant
 * @type {string}
 * @default
 */

TCN.EVENT_PREFIX = 'tcn-';


// Add TCN to global namespace in a browser environment
if(function(){ try{ return window; }catch(e){ return false; } }()){
	// If TCN not already defined, then attach to window
	if(!window.TCN){
		window.TCN = TCN;
	// If TCN is defined, then use the pre-defined one to prevent duplication
	}else{
		TCN = window.TCN;
	}
}


// Export the TCN module
module.exports = TCN;
