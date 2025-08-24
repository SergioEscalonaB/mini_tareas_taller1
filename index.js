const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//Datos de prueba
let videojuegos = [
  {
    id: 1,
    nombre: "The Legend of Zelda: Breath of the Wild",
    genero: "Aventura",
    plataforma: "Nintendo Switch",
    precio: 59.99
  },
  {
    id: 2,
    nombre: "God of War",
    genero: "Acción",
    plataforma: "PlayStation 4",
    precio: 39.99
  },
  {
    id: 3,
    nombre: "Halo Infinite",
    genero: "Shooter",
    plataforma: "Xbox Series X",
    precio: 49.99
  },
];

app.get("/", (req, res) => {
  return res.json(videojuegos);
});

app.get("/mis-videojuegos", (req, res) => {
  return res.json([videojuegos[0], videojuegos[1], videojuegos[2]]);
});

app.post("/guardar-juego", (req, res) => {
  let nuevoJuego = {
    id: videojuegos.length + 1,
    titulo: req.body.titulo,
    precio: req.body.precio,
    genero: req.body.genero,
    plataforma: req.body.plataforma
  };
  videojuegos.push(nuevoJuego);
  return res.status(200).json(nuevoJuego);
});

app.put("/actualizar-precio/:id", (req, res) => {
  let id = parseInt(req.params.id);
    let nuevoPrecio = req.body.precio;
    let juego = videojuegos.find((j) => j.id === id);
    if (juego) {
      juego.precio = nuevoPrecio;
      return res.status(200).json(juego);
    } else {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    };
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
