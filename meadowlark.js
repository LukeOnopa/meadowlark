const express = require('express');
const fortune = require('./lib/fortune');

const app = express();

var handlebars = require('express-handlebars')
        .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', ((req, res) => {
    res.render('home');
}));

app.get('/about', ((req, res) => {
    res.render('about', { fortune: fortune.getFortune() });
}));

app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});