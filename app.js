import createError from 'http-errors';
import express from 'express';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {createRequire} from 'module';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
const compiler = webpack(webpackConfig);
import webpackDevMiddleware from 'webpack-dev-middleware';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';


const require = createRequire(import.meta.url);
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: '/',
    })
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
