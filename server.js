const express = require("express");
const Stripe = require("stripe");
const app = express();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.post("/create-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 6000, // 100 € en centimes
      currency: "eur",
      capture_method: "manual", // 👉 empreinte CB
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("✅ API Stripe fonctionne !"));

const PORT = process.env.PORT || 3000; // ⚠️ important sur Render
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
