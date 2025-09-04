const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const app = express();

app.use(cors());                // Autorise toutes les origines
app.use(express.json());

// Récupère la clé Stripe via une variable d'environnement
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint pour créer une empreinte bancaire
app.post("/create-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 6000, // 100,00 € en centimes
      currency: "eur",
      capture_method: "manual", // 👉 empreinte bancaire
      payment_method_types: ["card"]
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint de test
app.get("/", (req, res) => res.send("✅ API Stripe fonctionne !"));

// Render impose d'écouter sur process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
