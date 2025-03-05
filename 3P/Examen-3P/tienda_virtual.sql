-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-03-2025 a las 05:37:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = '+00:00'; 
-- Asegúrate de incluir el símbolo '+' y usar formato hh:mm


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_virtual`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `creado_en`) VALUES
(4, 'Celulares', 'Dispositivos móviles', '2025-03-04 01:03:44'),
(5, 'Laptops', 'Computadores para todo tipo de actividades', '2025-03-04 01:04:33'),
(6, 'Auriculares', 'Dispositivos para escuchar música alámbricos e inalámbricos', '2025-03-04 01:05:10'),
(7, 'Televisores', 'Smart-TV -4k -para todos los gustos', '2025-03-04 01:05:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedido`
--

CREATE TABLE `detalles_pedido` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_pedido`
--

INSERT INTO `detalles_pedido` (`id`, `pedido_id`, `producto_id`, `cantidad`, `precio_unitario`) VALUES
(4, 2, 13, 2, 329.99),
(5, 3, 8, 5, 799.99),
(6, 4, 9, 1, 999.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('Pendiente','Enviado','Entregado','Cancelado') DEFAULT 'Pendiente',
  `transportista` varchar(255) DEFAULT NULL,
  `numero_seguimiento` varchar(255) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `usuario_id`, `total`, `estado`, `transportista`, `numero_seguimiento`, `creado_en`, `actualizado_en`) VALUES
(2, 9, 659.98, 'Cancelado', NULL, NULL, '2025-03-04 01:53:15', '2025-03-04 02:41:14'),
(3, 9, 3999.95, 'Cancelado', NULL, NULL, '2025-03-04 02:37:51', '2025-03-04 02:41:36'),
(4, 9, 999.99, 'Pendiente', NULL, NULL, '2025-03-04 03:10:50', '2025-03-04 03:10:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagenes` text DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `imagenes`, `stock`, `creado_en`, `categoria_id`) VALUES
(8, 'Samsung Galaxy S23', 'Celular de gama alta con cámara de 50MP, pantalla 6.1\" AMOLED', 799.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9NnmIQWgisCiR6deuWFEr_NNsBWamyZ-o-Q&s,https://mundotek.com.ec/wp-content/uploads/2023/02/s23ultra.jpg.webp', 30, '2025-03-04 01:24:12', 4),
(9, 'iPhone 14', 'Smartphone con procesador A15 Bionic, pantalla Super Retina', 999.99, 'https://i5.walmartimages.com/seo/Restored-Apple-iPhone-14-Pro-Max-Carrier-Unlocked-1TB-Deep-Purple-MQ953LL-A-Refurbished_cb8f75e5-1b8e-4c06-9776-0d995a314ada.88ab53492f6fe7e653033585616419b1.jpeg,https://www.bluemagic.ec/wp-content/uploads/2023/08/IPHONE-14-COLORES-3.jpeg', 19, '2025-03-04 01:26:50', 4),
(10, 'MacBook Pro 14', 'Laptop con procesador M1 Pro, pantalla Liquid Retina XDR', 1999.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5M9toZPy_RuXg9ZR8tXwRsaW2s_raWxv8Ow&s,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7bu_z4kUdqByG-Gy6FNaEh4pj1OM7LP891A&s', 15, '2025-03-04 01:29:58', 5),
(11, 'Dell XPS 13', 'Laptop ultradelgada con pantalla 13.4\" y procesador Intel Core i7', 1499.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6uE5pWOS7U1tbbOSCLArHwkij59j705dOdw&s,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4jixlVon0R2b0mDM8cIYsuokHtIzZFdtug&s', 25, '2025-03-04 01:31:07', 5),
(12, 'Sony WH-1000XM5', 'Auriculares inalámbricos con cancelación de ruido y 30 horas de batería', 349.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MQo3bpCPTZlTDRieALPCMDo4NU-YwOANQw&s,https://m.media-amazon.com/images/I/61ULAZmt9NL.jpg', 40, '2025-03-04 01:33:17', 6),
(13, 'Bose QuietComfort 45', 'Auriculares con cancelación de ruido y sonido premium', 329.99, 'https://m.media-amazon.com/images/I/513SArZRYRL.jpg,https://target.scene7.com/is/image/Target/GUEST_dd75c43a-3a00-4451-85bc-1a5ae1a2eb05?wid=800&hei=800&qlt=80&fmt=webp', 30, '2025-03-04 01:34:52', 6),
(14, 'LG OLED C1 55\"', 'Televisor OLED 4K con soporte para Dolby Vision y Atmos', 1499.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxvFnjRU6KStNIkJBbh8pkJLk114BgbY8uUw&s,https://www.lg.com/cac/images/tv-barra-de-sonido/md07528612/gallery/OLED55C1PUB_PTO_0_APM-1100x730.jpg', 10, '2025-03-04 01:36:16', 7),
(15, 'Samsung QN90A 65\"', 'Televisor QLED 4K con procesador Neo Quantum', 1799.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UAroQIcn_0Y3PTonXxmUcF4sf_MuMaPycg&s,https://i.rtings.com/assets/products/ucr7d4BW/samsung-qn90a-qled/design-medium.jpg?format=auto', 15, '2025-03-04 01:37:45', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `rol` enum('cliente','admin') NOT NULL DEFAULT 'cliente',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `bloqueado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasena`, `direccion`, `rol`, `creado_en`, `bloqueado`) VALUES
(7, 'Ana García', 'ana@example.com', '$2b$10$LgHs8m4IjZFH9amZMzszne7tQW8rH6T4kKZvgbqCmT8CPh744vhtG', 'Calle 123', 'cliente', '2025-03-03 14:37:21', 0),
(8, 'Nestor Macias', 'nestor@hotmail.com', '$2b$10$CkFr0DinGbBleQElJG4aAexg2h4ZjxQfPdivEwt534kQAlO4IsIz.', 'comite uwu', 'cliente', '2025-03-03 14:53:27', 0),
(9, 'Anthony Villarreal', 'anvillarreal@espe.edu.ec', '$2b$10$Jdkg7vLaZ2reYFC2nIdqL.ouZsr6nGFbWmfveZXlB.6AJHO5sWN.u', 'Av. del maestro y Bonifaz Cumba N60-122', 'admin', '2025-03-03 15:15:27', 0),
(11, 'Ariel Leonidas', 'alreyes2@espe.edu.ec', '$2b$10$hsswx1.FySQvXmtDHXXlYOn9VERRTunDP..Zokydu6y.Fuf/X1.4a', 'micasa', 'cliente', '2025-03-04 01:06:21', 0),
(16, 'maria', 'maria@gmail.com', '$2b$10$0A.yXqB39NuRQhxBKPVU5.JAFbkbchkYAmWjRuOlXulk9zybHOpXK', 'Sucasa', 'cliente', '2025-03-04 04:21:25', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_carrito` (`usuario_id`,`producto_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `carritos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD CONSTRAINT `detalles_pedido_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `detalles_pedido_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
