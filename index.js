const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

// const BASE_URL = `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`;

app.use(express.json());

//Welcome home route
app.get("/", (req, res) => {
  res.send("Welcome to Amazaon Scraper API");
});

const generateScraperUrl = (API_KEY) =>
  `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`;

//Get product details
app.get("/products/:productId?api_key=", async (req, res) => {
  //get Id from Url
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
//Get product Reviews
app.get("/products/:productId/reviews?api_key=", async (req, res) => {
  //get Id from Url
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
//Get product offers
app.get("/products/:productId/offers?api_key=", async (req, res) => {
  //get Id from Url
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
//Get serach results
app.get("/search/:searchQuery?api_key=", async (req, res) => {
  //get Id from Url
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//run the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
