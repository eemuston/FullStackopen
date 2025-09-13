import express from 'express'
import {calculateBmi, parseQueryArgmunets} from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseQueryArgmunets(req.query)
    const result = calculateBmi(height, weight)
    res.json(result)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: "malformatted parameters" });
    } else {
      res.status(400).json({ error: "unknown error" });
    }
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})