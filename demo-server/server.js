const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let employees = [];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/employee/add', (req, res) => {
    const id = uuidv4();
    employees.push({ empId: id, ...req.body });
    res.json({ empId: id });
});

app.get('/employees/list', (req, res) => {
    const ob = {
        pagination: { total_records: employees.length },
        employees: employees
    };

    res.json(ob);
});
app.get('/employees/list', (req, res) => {
    const ob = {
        pagination: { total_records: employees.length },
        employees: employees
    };

    res.json(ob);
});
app.get('/employee/:id', (req, res) => {
    console.log(req.params.id);

    const result = employees.find((obj) => {
        return obj.empId === req.params.id;
    });

    res.json(result);
});
app.put('/employee/:id', (req, res) => {
    const index = employees.findIndex((obj) => {
        return obj.empId === req.params.id;
    });
    employees[index] = req.body;

    res.json({ status: 'Updated' });
});

app.delete('/employee/:id', (req, res) => {
    employees = employees.filter((item) => item.empId != req.params.id);

    res.json({ status: 'deleted' });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
