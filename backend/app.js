import express from "express";
import { createUser, enforceAuth, login } from "./auth.js";
import { generateImage } from "./image.js";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name.trim() ||
      !password ||
      password.trim().lenght < 7
    ) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const token = createUser(name, email, password);
    res.status(201).send({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);

    res.status(400).send({ error: "Creating user feild,invalid credentials." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = login(email, password);
    res.status(200).send({ message: "logged in successfully", token });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).send({ error: error.message });
    }
    res
      .status(500)
      .send({ error: "Login failed,please check your credentials." });
  }
});

app.post("/generate-image", enforceAuth, async (req, res) => {
  const { prompt, options } = req.body; // options => aspect_ratio,format,quality

  const { image, format } = await generateImage(prompt, options);
  res.type(format);
  res.status(201).send(image);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
