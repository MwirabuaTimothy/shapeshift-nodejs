const router = require('koa-router')()

let index = require('../controller/index');

router.get('/', index.index);

// router.get('*', async (ctx, next) => {
//   ctx.body = {status : 404}
// });

module.exports = router;
