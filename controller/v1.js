'use strict';
const shapeshift = require('../model/shapeshift');
const async = require('async');
const results = require('../utils/results');
const errorCode = require('../utils/error_code');

exports.index = async (ctx) => {
    ctx.body = 'Shapeshift api v1.0'
}

exports.queryRate = async (ctx) => {
    let pairs = ctx.request.body.pairs;

    if ((pairs.constructor) !== Array || pairs.length < 1) {
        return results.BadRequest(ctx, errorCode.paramsInvalid('pairs error'))
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
        results.OK(ctx, errorCode.success(res));
    } catch (err) {
        results.InternalServerError(ctx, errorCode.apiFailed('shapeshift get rate api failed'))
    }
}

