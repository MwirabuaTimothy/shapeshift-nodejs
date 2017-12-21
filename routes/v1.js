const router = require('koa-router')()
router.prefix('/shapeshift/v1');

let v1 = require('../controller/v1');

router.get('/', v1.index);
router.post('/rate', v1.queryRate);
router.get('/transaction/:address/:pair', v1.getTransaction);

module.exports = router;
