'use strict';
const shapeshift = require('../model/shapeshift');

exports.index = async (ctx, next) => {

    let rate = await shapeshift.rate('btc_ltc');
    let limit = await shapeshift.limit('btc_ltc');
    console.log(limit);

    ctx.body = 'Shapeshift api v0.1.0'
}
