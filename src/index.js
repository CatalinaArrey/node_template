import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'

const app = new koa()
const port = 3000

app.use(bodyParser({ multipart: true, urlencoded: true }))

// Reglas Promociones
const promotion_rules = [
    {
        rule: "Nx$",
        discount_percentage: 20,
        n: 4
    },
    {
        rule: "AyA",
        discount_percentage: 15,
        n: 1
    }
];

// Funcion Aplicar Promociones
export function preciofinal(cart_id, items) {
    let total_cart_amount = 0;
    let details = [];

    items.forEach(item => {

        let total_price = item.amount * item.unit_base_price;
        let promotion_applied;

        const ruleExists = items.every(item => promotion_rules.some(rule => rule.rule === item.promotion));
        const rule = promotion_rules.find(rule => rule.rule === item.promotion);

        total_cart_amount += total_price;

        if (promotion.rule === "Nx$")
        {
            if (item.amount >= rule.n) {
                const descuento = rule.discount_percentage / 100;
                total_price = (total_price * (1 - descuento)).toFixed(2);
                promotion_applied = true;
            }
        }
        else if (prototion.rule === "AyA")
        {
            const descuento = rule.discount_percentage / 100;
            total_price = (item.amount * item.unit_base_price * (1 - descuento)).toFixed(2);
            promotion_applied = true;
        }else{
            promotion_applied = false;
        };

        // Detalles
        details.push({
            item_id: item.item_id,
            amount: item.amount,
            total_price: total_price,
            promotion_applied: promotion_applied
        });

        total_cart_amount += parseFloat(total_price);
        
        if (!ruleExists) {
            return {
                status: "NOK",
                error_message: "RULE DOES NOT EXIST"
            };
        }
        else if (items.amount >= 0) {
            return {
                status: "NOK",
                error_message: "AMOUNT OR PRICE SHOULD BE GREATER THAN ZERO"
            };
        }
        else if (error) {
            return {
                status: "NOK",
                error_message: "INTERNAL SERVER ERROR"
            };
        }
        else {
            return {
                status: "OK",
                cart_id: cart_id,
                total_cart_amount: total_cart_amount,
                details: details
            };
        }
    });
}

app.use(router.routes())

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`)
})
