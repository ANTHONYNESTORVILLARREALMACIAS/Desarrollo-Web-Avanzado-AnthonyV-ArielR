const jwt = require('jsonwebtoken');

const autenticacionMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ mensaje: 'No se proporcionó un token' });
    }
    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decodificado; // Asegúrate de que esto incluya el ID del usuario
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
};

module.exports = autenticacionMiddleware;