var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'); 

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.send("Hello world!");
});

routes = require('./routes/tvshows')(app);




const username = process.env.OPENSHIFT_MONGODB_DB_USERNAME || '';
const password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '';
const host = process.env.OPENSHIFT_MONGODB_DB_HOST || 'mongodb.node-apis.svc';
const dbport = process.env.OPENSHIFT_MONGODB_DB_PORT || '';

const mongoUrl = username + ":"
  + password + "@"
  + host + ':'
  + dbport + '/'
  + "sampledb";//process.env.OPENSHIFT_APP_NAME;

//'mongodb://localhost/tvshows'
mongoose.connect(mongoUrl, function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});


  const ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
  const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
  server.listen(port, ip, function(){
    console.log("Conectado al puerto a " +ip+":"+port);
    console.log("el host de la db mongo es?"+process.env.OPENSHIFT_MONGODB_DB_HOST);
  });