const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//1) Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 😀');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

const port = 3000;

//2 Routes handlers

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Ok',
    requestedTime: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((tour) => +tour.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const tour = tours.find((tour) => +tour.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated',
    },
  });
};

const deleteTour = (req, res) => {
  const tour = tours.find((tour) => +tour.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This rout has not implemented yet',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This rout has not implemented yet',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This rout has not implemented yet',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This rout has not implemented yet',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This rout has not implemented yet',
  });
};

//3 ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('.api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').patch(updateTour).delete(deleteTour).get(getTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//4. Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
