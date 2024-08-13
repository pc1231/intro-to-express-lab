// import modules

const express = require('express');

// create Express app

const app = express()

// configure the app (app.set)



// mount Middleware (app.use)



// mount routes

app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`What a delight it is to see you once more, ${username}!`);
})
// Route to roll a number
app.get('/roll/:number', (req, res) => {
  const number = req.params.number;

  // Validation: Check if the number parameter is a valid number
  if (isNaN(number)) {
    return res.send('You must specify a number.');
  }

  // Convert the number parameter to an integer
  const maxNumber = parseInt(number, 10);

  // Generate a random number between 0 and the provided number
  const roll = Math.floor(Math.random() * (maxNumber + 1));

  // Respond with the rolled number
  res.send(`You rolled a ${roll}.`);
});
// Define the collectibles array
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Route to get a collectible by index
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);

  // Validation: Check if the index is within the bounds of the array
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!');
  }

  // Get the collectible item
  const item = collectibles[index];

  // Respond with the item details
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});
// Define the shoes array
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Route to filter shoes based on query parameters
app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  // Filter by min-price if provided
  if (req.query['min-price']) {
      const minPrice = parseFloat(req.query['min-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  // Filter by max-price if provided
  if (req.query['max-price']) {
      const maxPrice = parseFloat(req.query['max-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  // Filter by type if provided
  if (req.query.type) {
      const type = req.query.type.toLowerCase();
      filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type);
  }

  // Respond with the filtered list
  res.json(filteredShoes);
});
// tell the app to listen on port 3000

app.listen(3000, function() {
  console.log('Listening on port 3000')
})