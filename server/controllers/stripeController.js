const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  const { cart, totalAmount, shippingFee } = req.body;

  // in practice, don't use order amount from front end
  // must verify with backend logic
  const calculateOrderAmount = () => {
    return totalAmount + shippingFee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  });
  console.log(req.body);
  return res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
