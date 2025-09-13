import express from "express";
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pinki ponki");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
