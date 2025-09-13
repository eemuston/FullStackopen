import express from 'express';
import { calculateBmi, parseQueryArgmunets} from './bmiCalculator';
import { calculateExercises, DaysAndTarget } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseQueryArgmunets(req.query);
    const result = calculateBmi(height, weight);
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: "malformatted parameters" });
    } else {
      res.status(400).json({ error: "unknown error" });
    }
  }
});

app.post('/exercises', (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: DaysAndTarget = req.body;

  if (!daily_exercises || !target)
    return res.status(400).send({ error: 'parameters missing'});
  if (!target || isNaN(Number(target)))
    return res.status(400).send({ error: 'malformatted parameters'});
  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i])))
        return res.status(400).send({ error: 'malformatted parameters'});
  }

  const result = calculateExercises(daily_exercises, Number(target));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});