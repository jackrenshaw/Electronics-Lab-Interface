const express = require("express");
const path = require('path');

const { spawn } = require('child_process');
const ls = spawn('ngspice', ['rc.cir']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

const PORT = process.env.PORT || 5000
app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery-ui-dist')));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));