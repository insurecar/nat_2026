const fs = require('fs');
const Tour = require('../models/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }

  next();
};

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: 'Ok',
    requestedTime: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = async (req, res) => {
  const id = req.params.id;
  const tour1 = await Tour.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour1,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
