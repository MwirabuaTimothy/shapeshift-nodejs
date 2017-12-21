const router = require('koa-router')()
router.prefix('/v1');

let v1 = require('../controller/v1');

router.get('/', v1.index);
router.post('/rate', v1.queryRate);

module.exports = router;
