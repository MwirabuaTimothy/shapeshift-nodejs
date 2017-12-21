'use strict';

function results() {
}

results.prototype.OK = (res, result) => {
    res.status = 200;
    res.body = result;
};

results.prototype.Created = (res, result) => {
    res.status = 201;
    res.body = result;
};

results.prototype.MovedPermanently = (res, result) => {
    res.status = 301;
    res.body = result;
};

results.prototype.MovedTemporarily = (res, result) => {
    res.status = 302;
    res.body = result;
};

results.prototype.BadRequest = (res, result) => {
    res.status = 400;
    res.body = result;
};

results.prototype.Unauthorized = (res, result) => {
    res.status = 401;
    res.body = result;
};

results.prototype.Forbidden = (res, result) => {
    res.status = 403;
    res.body = result;
};

results.prototype.NotFound = (res, result) => {
    res.status = 404;
    res.body = result;
};

results.prototype.InternalServerError = (res, result) => {
    res.status = 500;
    res.body = result;
};

module.exports = new results();