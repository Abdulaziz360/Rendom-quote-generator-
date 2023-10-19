const fetch = require('node-fetch');
const axios = require('axios');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

// Configure your email transport
const transporter = nodemailer.createTransport({
    service: 'mughalmg575@gmail.com', // Replace with your email service (e.g., 'gmail', 'sendgrid').
    auth: {
        user: 'mughalmg575@gmail.com', // Replace with your email
        pass: 'kjpg fwpz pmfd hztk' // Replace with your email password
    }
});

// Schedule a daily job to send the email
const dailyEmailJob = schedule.scheduleJob('49 10 * * *', async () => {
    try {
        const { quote, author } = await getQuote(); // Fetch a random quote
        
        const mailOptions = {
            from: 'mughalmg575@gmail.com',
            to: 'azizmg575@gmail.com', // Replace with the user's email
            subject: 'Daily Random Quote',
            text: `${quote}\n\n- ${author}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error fetching and sending daily quote:', error);
    }
});


const getQuote = async (category) => {
  try {
      // const category = 'happiness'; // Replace with your desired category
      const apiKey = process.env.KEY; // Replace with your API key
      const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

      const response = await fetch(apiUrl, {
          headers: {
              'X-Api-Key': apiKey,
          },
      });

      if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
      }

      const quoteData = await response.json();
      const quote = quoteData[0].quote;
      const author = quoteData[0].author;

      return { quote, author };
  } catch (error) {
      console.error('Error fetching quote:', error);
      throw error;
  }
};

const quote_loader = async (req, res) => {
    try {
      const user=res.locals.user
          // const category=req.body.category
        const { quote, author } = await getQuote('future');
        // dailyEmailJob()
        res.render('home', { quote, author,user });
    } catch (error) {
        console.error('Error loading quote:', error);
        res.status(500).send('Error loading quote');
    }
};

const share_tweet_loader = async (req, res) => {
    try {
        const { quote } = req.query;

        if (!quote) {
            throw new Error('Quote not provided');
        }

        const twitterShareUrl = `https://twitter.com/intent/tweet/?text=${encodeURIComponent(quote)}`;
        res.redirect(twitterShareUrl);
    } catch (error) {
        console.error('Error sharing quote on Twitter:', error);
        res.status(500).send('Error sharing quote on Twitter');
    }
};

const share_whatsapp_loader = async (req, res) => {
    try {
        const { quote } = req.query;

        if (!quote) {
            throw new Error('Quote not provided');
        }

        const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(quote)}`;
        res.redirect(whatsappShareUrl);
    } catch (error) {
        console.error('Error sharing quote on WhatsApp:', error);
        res.status(500).send('Error sharing quote on WhatsApp');
    }
};

module.exports = {
    quote_loader,
    share_tweet_loader,
    share_whatsapp_loader
};
