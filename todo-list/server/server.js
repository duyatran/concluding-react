// Server API
const PORT = 8080;
const express = require('express'); // npm i express
const app = express();
const morgan = require('morgan'); // npm i morgan
const bodyParser = require('body-parser')

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

// mock data
// unique, random ID => UUIDv4
let data = [
	{ id: crypto.randomUUID(), task: 'buy milk', done: false },
	{ id: crypto.randomUUID(), task: 'wash dishes', done: false },
	{ id: crypto.randomUUID(), task: 'clean up', done: true },
];

// GET /todos
app.get('/todos', (req, res) => {
  res.json(data);
});

app.post('/todos', (req, res) => {
	console.log(req.body);
	const newTodo = {
		...req.body.todo,
		id: crypto.randomUUID()
	}
	data.push(newTodo);
	res.json(newTodo);
})

app.post('/todos/:id/checkoff', (req, res) => {
	const { id } = req.params;
	console.log(id);

	const results = data.map(todo => {
		if (todo.id === id) {
			return {
				...todo,
				done: !todo.done,
			};
		}
		return todo;
	});
	data = results;

	res.status(200).send('You have updated correctly!');
});

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
