import cors from 'cors';
import express from 'express';
import db from './config/database.config';
import router from './route';

db.sync().then(() => {
	console.log('DB connect ok');
});

const app = express();

const nodeEnv: number = process.env.PORT as unknown as number;

app.use(cors());

app.use(express.json());

app.use('/api/', router);

app.listen(nodeEnv || 3000, '0.0.0.0', () => {
	console.log('Server is running.');
});
