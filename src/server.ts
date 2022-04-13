import express from 'express';
import db from './config/database.config';
import router from './route';

db.sync().then(() => {
	console.log('DB connect ok');
});

const app = express();

const port = '9000';

app.use(express.json());

app.use('/api/beta/', router);

app.listen(port, () => {
	console.log('Server on Port: ' + port);
});
