const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Array de productos
const productos = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 50 },
    { id: 3, name: 'Teclado', price: 80 }
];

// 200 OK - Obtener todos los productos
app.get('/products', (req, res) => {
    res.status(200).json({ message: 'Lista de productos', data: productos });
});

// 201 Created - Agregar un nuevo producto
app.post('/products', (req, res) => {
    const newProduct = { id: productos.length + 1, ...req.body };
    productos.push(newProduct);
    res.status(201).json({ message: 'Producto creado', data: newProduct });
});

// 204 No Content - Eliminar un producto
app.delete('/products/:id', (req, res) => {
    const index = productos.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        productos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// 301 Moved Permanently
app.get('/redirect-permanent', (req, res) => {
    res.redirect(301, '/products');
});

// 302 Found (Temporal Redirect)
app.get('/redirect-temporary', (req, res) => {
    res.redirect(302, '/products');
});

// 400 Bad Request
app.get('/bad-request', (req, res) => {
    res.status(400).json({ error: 'Solicitud incorrecta' });
});

// 401 Unauthorized
app.get('/unauthorized', (req, res) => {
    res.status(401).json({ error: 'No autorizado' });
});

// 403 Forbidden
app.get('/forbidden', (req, res) => {
    res.status(403).json({ error: 'Acceso prohibido' });
});

// 404 Not Found - Producto no encontrado
app.get('/products/:id', (req, res) => {
    const product = productos.find(p => p.id == req.params.id);
    if (product) {
        res.status(200).json({ message: 'Producto encontrado', data: product });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// 500 Internal Server Error
app.get('/server-error', (req, res) => {
    res.status(500).json({ error: 'Error interno del servidor' });
});

// 503 Service Unavailable
app.get('/service-unavailable', (req, res) => {
    res.status(503).json({ error: 'Servicio no disponible' });
});

// Middleware para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});