const express = require("express");
const logger = require("./logger");
const routes = require("./routes");
const connectToDatabase = require("./database");
const { HttpError } = require("./error");


const app = express()
const port = process.env.port || 3000;


const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };
  

app.use(cors(corsOptions));

app.use(express.json());


app.use('/api', routes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500)
        .send({ error: err.message });
});


app.get('/*', (req, res) => {
    return new HttpError(404, "Page not found");
})

async function startServer() {
    await connectToDatabase();


    app.listen(port, () => {
        logger.info('Server listening at http://localhost:' + port);
    });


}

module.exports = startServer;