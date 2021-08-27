const express = require("express");

const app = express();
const cors = require("cors");
const morgan = require("morgan");

const args = process.argv.slice(2);

const routes = require("./routes");

require("dotenv").config();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "production";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(env == "development" ? "dev" : "tiny"));

app.use("/api", routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// Initialize ngrok if requested

if (args.includes("ngrok")) {
    const ngrok = require("ngrok");
    (async function () {
        try {
            const url = await ngrok.connect(port);
            console.log(`Tunnel created at: ${url}`);
        } catch (err) {
            console.error("Couldn't initialize tunnel");
            console.error(err);
        }
    })();
}
