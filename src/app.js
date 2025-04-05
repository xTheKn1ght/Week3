import express from 'express';

const app = express()
const port = 3000

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 1,
    name: 'Jessie',
    birthdate: '2018-04-15',
    weight: 4.2,  // in kg
    owner: 'Vlad',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg',
  };

  res.json(cat);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
