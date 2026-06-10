import cors from 'cors';
import express from 'express';
import CategoriesRouter from './routes/categories/CategoriesRouter';
import HealthRouter from './routes/health/HealthRouter';
import SchedulesRouter from "./routes/schedules/SchedulesRouter";
import HorsesRouter from "./routes/horses/HorsesRouter";


const app = express();

app.use(cors());
app.use(express.json());

app.use(SchedulesRouter.router);
app.use(HealthRouter.router);
app.use(CategoriesRouter.router);
app.use(HorsesRouter.router);

// const port = Number(process.env.PORT) || 3000;

// app.listen(port, () => {
// 	console.log(`API server listening on port ${port}`);
// });


export default app;