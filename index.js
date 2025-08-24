const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//API DE TAREAS

let tasks = [
    { id: 1, title: "Organizar la casas", completed: true },
    { id: 2, title: "Pasear el perro", completed: true },
    { id: 3, title: "Hacer la compra", completed: false },
    { id: 4, title: "Preparar el almuerzo", completed: false },
    { id: 5, title: "Recoger pedido", completed: false },

];

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
    return res.json(tasks);
});

// Crear una nueva tarea
app.post("/tasks", (req, res) => {
    let newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Actualizar una tarea existente
app.put("/tasks/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let nuevo_estado = req.body.completed;
    let task = tasks.find((t) => t.id === id);
    if (task) {Ñ
        task.completed = nuevo_estado;
        return res.status(200).json(task);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    };
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});