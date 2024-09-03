const express =  require('express')
const app =  express();
const http = require('http');
const server  =  http.createServer(app);
const logger  =  require('morgan');
const cors =  require('cors');
const os = require('os');

// Obtener la IP local
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const localIp = getWifiIpAddress();
const port = process.env.PORT || 3000;
/**
 * RUTAS
 */
const users = require('./routes/usersRoutes');

app.use(cors({
    origin: '*', // Permitir todas las solicitudes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.disable('x-powered-by');
app.set('port', port);


// Configuración de Swagger
const swaggerOptions = {
swaggerDefinition: {
    openapi: '3.0.0',
    info: {
    title: 'DeliveryApp',
    version: '1.0.0',
    description: 'Documentation for Delivery App building with android and nodejs',
    contact: {
        name: 'JR solutions',
        email: 'roberto.eche95@gmail.com',
    },
    },
    servers: [
    {
        url: `http://${localIp}:${port}`,
        description: 'Development Server',
    },
    ],
}, apis: ['./routes/*.js', './controllers/*.js'], // Archivos donde tienes anotaciones de Swagger
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//en el module.exports esta esperando app, en los routes.
//llamando a las rutas.
users(app)

server.listen(port,localIp, function(){
    console.log('Application node js ' +  process.pid + ' started... on port ' + port + ' IP:  '+ localIp);
}); //puerto que va escuchar el servidor

app.use(function(err, req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(err);
    res.status(err.status || 500).send(err.stack);
    next();
});

module.express = {
    app:app,
    server: server
}

function getWifiIpAddress() {
    const interfaces = os.networkInterfaces();
    
    for (let interfaceName in interfaces) {
      if (interfaceName.toLowerCase().includes('wi-fi')) { // Filtrar solo el adaptador Wi-Fi
        const iface = interfaces[interfaceName];
        for (let i = 0; i < iface.length; i++) {
          const alias = iface[i];
          if (alias.family === 'IPv4' && !alias.internal) {
            return alias.address; // Retornar la dirección IPv4 del adaptador Wi-Fi
          }
        }
      }
    }
  
    return 'localhost'; // Retorna localhost como fallback si no se encuentra el adaptador Wi-Fi
}