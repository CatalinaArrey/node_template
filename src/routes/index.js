import Router from 'koa-router'
import getHealth from './health/health'

const router = new Router();

router.get('/health', getHealth);

router.post('/api/get-promotions', async (ctx) => {
    const { cart_id, items } = ctx.request.body;
    const resultado = preciofinal(cart_id, items);

    ctx.response.status = 200;
    ctx.response.body = resultado;
});

export default router
