const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 5000
app = express();

app.get("/SPICE",function(req,res){
const { spawn } = require('child_process');
const ls = spawn('ngspice', ['rc.cir']);

var scopeData = [];
rawData = "";
ls.stdout.on('data', (data) => {
  rawData += data;
});

ls.stderr.on('error', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  const spiceRegex = /[0-9]{1,4}\t(([0-9]+\.[0-9]+)(e(\+|-)[0-9]+)?\t)([0-9]+\.[0-9]+)(e(\+|-)[0-9]+)+?/g
  var scopes = rawData.match(spiceRegex);
  var scopeData = [];
  for(var s of scopes){
    e = s.split("\t");
    scopeData.push([e[0],e[1],e[2]])
  }
  res.send(scopeData)
});
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery-ui-dist')));
app.use('/components.json', express.static(path.join(__dirname, 'config/components.json')));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));