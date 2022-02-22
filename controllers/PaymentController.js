import stripe from 'stripe';
const stripe_key = "sk_test_51JnO3uHpUAymjJoEwHb89lHNLfIlgKLs2mZsdHmUTtspexo3ooy8LA3AaPvc3Xo1eq7N36FE2WaElO3dDTbUxHAC00ocUTB4TZ";

class PaymentController {
  static makePayment(req, res) {
    stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    }, (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr).end();
      } else {
        res.status(200).json(stripeRes).end();
      }
    });
  }
}



module.exports = PaymentController;
