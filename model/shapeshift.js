'use strict';
const request = require('request');
const conf = require('../config/conf').shapeshift;

/**
 * Shapeshift API: https://info.shapeshift.io/api
 * @constructor
 */
function Shapeshift() {

}
//https get method
/**
 * Gets the current rate offered by Shapeshift.
 * @param pair is any valid coin pair such as btc_ltc or ltc_btc
 * The list will grow as we add more:btc, ltc, ppc, drk, doge, nmc, ftc, blk, nxt, btcd, qrk, rdd, nbt, bts, bitusd, xcp, xmr
 * @returns {Promise<any>}
 */
Shapeshift.prototype.rate = async (pair) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/rate/${pair}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Gets the current deposit limit set by Shapeshift.
 * @param pair is any valid coin pair such as btc_ltc or ltc_btc
 * @returns {Promise<any>}
 */
Shapeshift.prototype.limit = async (pair) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/limit/${pair}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * This gets the market info (pair, rate, limit, minimum limit, miner fee)
 * @param pair (OPTIONAL) is any valid coin pair such as btc_ltc or ltc_btc.
 The pair is not required and if not specified will return an array of all market infos.
 * @returns {Promise<any>}
 */
Shapeshift.prototype.marketinfo = async (pair) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/marketinfo/${pair}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Get a list of the most recent transactions.
 * @param max is an optional maximum number of transactions to return.
 If [max] is not specified this will return 5 transactions.
 Also, [max] must be a number between 1 and 50 (inclusive).
 * @returns {Promise<any>}
 */
Shapeshift.prototype.recenttx = async (max) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/recenttx/${max}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * This returns the status of the most recent deposit transaction to the address.
 * @param address is the deposit address to look up.
 * @returns {Promise<any>}
 */
Shapeshift.prototype.txStat = async (address) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/recenttx/${address}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Time Remaining on Fixed Amount Transaction
 * @param address is the deposit address to look up.
 * @returns {Promise<any>}
 */
Shapeshift.prototype.timeremaining = async (address) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/timeremaining/${address}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Get List of Supported Coins with Icon Links
 * @returns {Promise<any>}
 */
Shapeshift.prototype.getcoins = async () => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/getcoins`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Get List of Transactions with a PRIVATE API KEY
 * @param apiKey is the affiliate's PRIVATE api key.
 * @returns {Promise<any>}
 */
Shapeshift.prototype.txbyapikey = async (apiKey) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/txbyapikey/${apiKey}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Get List of Transactions with a Specific Output Address
 * @param address the address that output coin was sent to for the shift
 * @param apiKey is the affiliate's PRIVATE api key.
 * @returns {Promise<any>}
 */
Shapeshift.prototype.txbyaddress = async (address, apiKey) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/txbyaddress/${address}/${apiKey}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Validate an address, given a currency symbol and address.
 * @param address the address that the user wishes to validate
 * @param coinSymbol the currency symbol of the coin
 * @returns {Promise<any>}
 */
Shapeshift.prototype.validateAddress = async (address, coinSymbol) => {
    return new Promise((resolve, reject) => {
        request.get({
            url : `${conf.method}://${conf.domain}/validateAddress/${address}/${coinSymbol}`,
            json : true,
            headers: {'Content-Type':'application/json'}
        }, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}





//https post method
/**
 * This is the primary data input into ShapeShift.
 * @param args {
 *  withdrawal     = the address for resulting coin to be sent to
 *  pair       = what coins are being exchanged in the form [input coin]_[output coin]  ie btc_ltc
 *  returnAddress  = (Optional) address to return deposit to if anything goes wrong with exchange
 *  destTag    = (Optional) Destination tag that you want appended to a Ripple payment to you
 *  rsAddress  = (Optional) For new NXT accounts to be funded, you supply this on NXT payment to you
 *  apiKey     = (Optional) Your affiliate PUBLIC KEY, for volume tracking, affiliate payments, split-shifts, etc...
 * }
 * @returns {Promise<void>}
 */
Shapeshift.prototype.shift = async (args) => {
    console.log(args);
    return new Promise(function(resolve,reject){
        request.post({
            url : `${conf.method}://${conf.domain}/shift`,
            headers: {'Content-Type':'application/json'},
            json : args
        },function(err,res){
            if(err) {
                reject(err);
            } else {
                resolve(res)
            }
        })
    })
}

/**
 * Request Email Receipt
 * @param args {
 * email    = the address for receipt email to be sent to
 * txid       = the transaction id of the transaction TO the user (ie the txid for the withdrawal NOT the deposit)
 * }
 * @returns {Promise<void>}
 */
Shapeshift.prototype.mail = async (args) => {
    return new Promise(function(resolve,reject){
        request.post({
            url : `${conf.method}://${conf.domain}/mail`,
            headers: {'Content-Type':'application/json'},
            json : args
        },function(err,res){
            if(err) {
                reject(err);
            } else {
                resolve(res)
            }
        })
    })
}

/**
 * Fixed Amount Transaction / Quote Send Exact Price
 * @param args {
 * amount          = the amount to be sent to the withdrawal address
 * withdrawal      = the address for coin to be sent to
 * pair            = what coins are being exchanged in the form [input coin]_[output coin]  ie ltc_btc
 * returnAddress   = (Optional) address to return deposit to if anything goes wrong with exchange
 * destTag         = (Optional) Destination tag that you want appended to a Ripple payment to you
 * rsAddress       = (Optional) For new NXT accounts to be funded, supply this on NXT payment to you
 * apiKey          = (Optional) Your affiliate PUBLIC KEY, for volume tracking, affiliate payments, split-shifts, etc...
 * }
 * @returns {Promise<any>}
 */
Shapeshift.prototype.sendamount = async (args) => {
    return new Promise(function(resolve,reject){
        request.post({
            url : `${conf.method}://${conf.domain}/sendamount`,
            headers: {'Content-Type':'application/json'},
            json : args
        },function(err,res){
            if(err) {
                reject(err);
            } else {
                resolve(res)
            }
        })
    })
}

/**
 * Cancel Pending Transaction
 * @param args{
 * address  = The deposit address associated with the pending transaction
 * }
 * @returns {Promise<any>}
 */
Shapeshift.prototype.cancelpending = async (args) => {
    return new Promise(function(resolve,reject){
        request.post({
            url : `${conf.method}://${conf.domain}/cancelpending`,
            headers: {'Content-Type':'application/json'},
            json : args
        },function(err,res){
            if(err) {
                reject(err);
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = new Shapeshift();