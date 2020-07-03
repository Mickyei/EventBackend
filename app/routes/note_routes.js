var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

  //Get event by id
  app.get('/events/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('events').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else { res.send(item); }
    });
  });

  //Get all events
  app.get('/events/', (req, res) => {
    
   db.collection('events').find({}).toArray(function (err, result) {
    if (err) {
        res.send(err);
    } else {
        res.send(JSON.stringify(result));
    }
})
   
  });

  //Delete event by id
  app.delete('/events/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('events').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else { res.send('Event ' + id + ' deleted!'); }
    });
  });

  //Post event
  app.post('/events', (req, res) => {
    const event = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date
    }

    db.collection('events').insert(event, (err, results) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(results.ops[0]);
      }
    });

  });

  //Update event
  app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const event = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date
    }
    db.collection('events').update(details, note, (err, result) => { 
      if (err) { 
        res.send({ 'error': 'An error has occurred' });
       } else {
          res.send(note); } });
  });




};