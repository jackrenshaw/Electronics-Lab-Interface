const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 5000
app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery-ui-dist')));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));