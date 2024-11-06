const express = require('express');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'concert-db.cze40o6gungn.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'concertdbpassword',
    database: 'paradise-concerts',
    port: 3306,
  },
});

const app = express();

app.get('/', (req, res) => {
  knex
    .select()
    .from('venues')
    .then((result) => {
      // Create an HTML response with styling
      let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Venues</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              color: #333;
              padding: 20px;
              text-align: center;
            }
            .venue-card {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              padding: 15px;
              margin: 10px auto;
              max-width: 600px;
              transition: transform 0.2s;
            }
            .venue-card:hover {
              transform: scale(1.02);
            }
            h2 {
              color: #555;
            }
            .divider {
              border-top: 1px solid #ccc;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <h1>Featured Venues and Donuts</h1>
      `;

      result.forEach(venue => {
        htmlContent += `
          <div class="venue-card">
            <h2>${venue.location}</h2>
            <p><strong>Featured Donut:</strong> ${venue.featured_donut}</p>
          </div>
        `;
      });

      htmlContent += `
        </body>
        </html>
      `;

      res.send(htmlContent);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
      res.status(500).send('Error retrieving venues');
    });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

