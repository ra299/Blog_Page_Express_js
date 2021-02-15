//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "According to a recent survey, blogs have ranked as the third most trustworthy source of information, following only friends and family. That's right — bloggers are trusted more than celebrities, journalists, brands, and politicians.But how do you get people to fall in love with your blog in the first place? (Aside from remarkable content, of course.)Well, just as your website homepage is like the front door to your business, your blog's design — much like a welcome mat — is the front door to your business blog."
const aboutContent = "Following the Vivian Bose Commission report indicating serious wrongdoings of the Dalmia–Jain group, on 28 August 1969, the Bombay High Court, under Justice J. L. Nain, passed an interim order to disband the existing board of Bennett, Coleman & Co and to constitute a new board under the Government. The bench ruled that Under these circumstances, the best thing would be to pass such orders on the assumption that the allegations made by the petitioners that the affairs of the company were being conducted in a manner prejudicial to public interest and to the interests of the Company are correct.[26] Following that order, Shanti Prasad Jain ceased to be a director and the company ran with new directors on board, appointed by the Government of India, with the exception of a lone stenographer of the Jains. Curiously, the court appointed D K Kunte as Chairman of the Board. Kunte had no prior business experience and was also an opposition member of the Lok Sabha.";
const contactContent = "The newspaper has defended its practice in 2012 by stating that it includes a note of disclosure to the reader – though in a small font – that its contents are , that they are doing this to generate revenues just like all newspapers in the world do advertorials according to The Times of India owners.[5][44] According to Maya Ranganathan, this overlap in the function of a journalist to also act as a marketing and advertisement revenue seeker for the newspaper raises conflict of interest questions, a problem that has morphed into ever-larger scale in India and recognized by India's SEBI authority in July 2009.[44]";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
