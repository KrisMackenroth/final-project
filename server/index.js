require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.use(express.json());

app.get('/api/exercises', (req, res) => {
  const sql = `
    select *
      from "exercises"
     order by "exerciseId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new ClientError(400, 'username, email and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "password", "email")
        values ($1, $2, $3)
        returning "userId", "username"
      `;
      const params = [username, hashedPassword, email];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "password" as "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/info', (req, res, next) => {
  const { userId, weight, height, birthday, sex } = req.body;
  if (!weight || !height || !birthday || !sex) {
    throw new ClientError(400, 'All info must be entered properly');
  }
  const sql = `
    insert into "accountInfo" ("userId", "weight", "height", "birthday", "sex")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [userId, weight, height, birthday, sex];
  db.query(sql, params)
    .then(result => {
      const [info] = result.rows;
      res.status(201).json(info);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/info', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "accountInfo"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/info', (req, res, next) => {
  const { userId } = req.user;
  const { weight, height, birthday, sex } = req.body;
  if (!weight || !height || !birthday || !sex) {
    throw new ClientError(400, 'All info must be entered properly');
  }
  const sql = `
    update "accountInfo"
    set "weight" = $1,
    "height" = $2,
    "birthday" = $3,
    "sex" = $4
 where "userId" = $5
returning *;
  `;
  const params = [weight, height, birthday, sex, userId];
  db.query(sql, params)
    .then(result => {
      const [info] = result.rows;
      res.status(201).json(info);
    })
    .catch(err => next(err));
});

app.delete('/api/info', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    delete from "accountInfo"
 where "userId" = $1
returning *;
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const sql = `
    delete from "users"
 where "userId" = $1
returning *;
  `;
      db.query(sql, params)
        .then(result => {
          res.status(201).json();
        });
    })
    .catch(err => next(err));
});

app.post('/api/exercises', (req, res, next) => {
  const { name, muscleGroup } = req.body;
  if (!name || !muscleGroup) {
    throw new ClientError(400, 'All info must be entered properly');
  }
  const sql = `
    insert into "exercises" ("name", "muscleGroup")
    values ($1, $2)
    returning *
  `;
  const params = [name, muscleGroup];
  db.query(sql, params)
    .then(result => {
      const [info] = result.rows;
      res.status(201).json(info);
    })
    .catch(err => next(err));
});

app.post('/api/workouts', (req, res, next) => {
  const { userId } = req.user;
  const { name, muscleGroup } = req.body;

  if (!name || !muscleGroup) {
    throw new ClientError(400, 'All info must be entered properly');
  }
  const sql = `
    insert into "workouts" ("userId", "name", "muscleGroup")
    values ($1, $2, $3)
    returning *
  `;
  const params = [userId, name, muscleGroup];
  db.query(sql, params)
    .then(result => {
      const [info] = result.rows;
      res.status(201).json(info);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
