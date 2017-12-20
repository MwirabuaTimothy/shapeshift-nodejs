const assert = require('assert');
const request = require('supertest');
const app = require('../app.js');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(4));
        })

        it('getUser', (done) => {

            request(app.listen())
                .get('/')     //get方法
                .expect(200)                        //断言状态码为200
                .end((err, res) => {

                    console.log(res.body);

                    done();
                });
        })

    })
});

