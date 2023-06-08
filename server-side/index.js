import express from 'express';
import cors from 'cors';
import pool from './models/db.js';
import session from 'express-session';
import passport from 'passport';

// import routes
import authRouter from './routes/authRouter.js';

const app = express();

// ------- app level middleware --------
app.use(express.urlencoded({ extended: true }));

// cross-origin access
app.use(cors({
    origin: ["http://localhost:8000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

// session
app.use(session({
    secret: 'we will get 348 out of 100 for cs348',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } // might cause trouble
}));

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());


// test connection of the pool
pool.query(
    'SELECT * FROM Test',
    function(err, results, fields) {
        console.log(err);
        console.log(results);
    }
);

// add routes
app.use('/auth', authRouter);

app.listen(3000 || process.env.port, () => {
    console.log("Server is running on port 3000.");
});

