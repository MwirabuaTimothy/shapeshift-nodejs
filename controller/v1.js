'use strict';
const shapeshift = require('../model/shapeshift');
const async = require('async');
const results = require('../utils/results');
const resCode = require('../utils/res_code');
const ramda = require('ramda');

exports.index = async (ctx) => {
    ctx.body = 'Shapeshift api v1.0'
}

exports.queryRate = async (ctx) => {
    let pairs = ctx.request.body.pairs;

    if ((pairs.constructor) !== Array || pairs.length < 1) {
        return results.BadRequest(ctx, resCode.paramsInvalid('pairs error'))
    }

    var rates = {};

    try {
        let processer = (value, index,callback) => {
            shapeshift.rate(value).then((result) => {
                rates[result.body.pair] = result.body.rate;
                callback();
            }).catch((err) => {
                callback(err);
            });
        }
        let res = await new Promise((resolve, reject) => {
            async.eachOfLimit(pairs, 10, processer, (err) => {
                if (err) reject(err);
                resolve(rates);
            });
        })
        results.OK(ctx, resCode.success(res));
    } catch (err) {
        results.InternalServerError(ctx, resCode.apiFailed('shapeshift get rate api failed'))
    }
}

exports.getTransaction = async (ctx) => {
    let params = ctx.params,
        pair = params.pair,
        address = params.address;

    if (ramda.isEmpty(pair) || ramda.isEmpty(address)) {
        return results.BadRequest(ctx, resCode.paramsInvalid('params error'))
    }

    let rate = shapeshift.rate(pair);
    let limit = shapeshift.limit(pair);

    let args = {
        withdrawal : address,
        pair : pair
    }
    let tx = shapeshift.shift(args);

    try {
        await Promise.all([rate, limit, tx]).then((values) => {
            if (ramda.isNil(values[2]['body']['error'])) {

                let res = {
                    info : {
                        pair : values[0]['body']['pair'],
                        rate : values[0]['body']['rate'],
                        limit : values[1]['body']['limit'],
                        min : values[1]['body']['min']
                    },
                    order : values[2].body
                }
                return results.OK(ctx, resCode.success(res));
            } else {
                let res = {
                    info : {
                        pair : values[0]['body']['pair'],
                        rate : values[0]['body']['rate'],
                        limit : values[1]['body']['limit'],
                        min : values[1]['body']['min']
                    },
                    error : values[2]['body']['error']
                }
                return results.BadRequest(ctx, resCode.orderFailed(res));
            }

        })
    } catch (err) {
        results.InternalServerError(ctx, resCode.apiFailed('shapeshift transaction api failed'))
    }
}

