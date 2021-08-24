const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database } = require('./keys');
// Intializations
const app = express();
// require('./li}b/passport');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});
// Routes
app.use(require('./routes/index'));
app.use('/links', require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname, 'public')));
