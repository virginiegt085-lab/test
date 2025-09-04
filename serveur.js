const express = require("express");
const Stripe = require("stripe");
const app = express();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // clé secrète via variable d'env

app.use(express.json());

app.post("/create-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000, // en centimes => 100,00 €
      currency: "eur",
      capture_method: "manual", // 👉 empreinte CB
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("API Stripe OK"));

app.listen(10000, () => console.log("Server running on port 10000"));