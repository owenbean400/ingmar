const Discord = require("discord.js");
const Filesystem = require("fs");
const CardBot = require("./deckOfCards");

const fetch = require("fetch").fetchUrl;

const ingmar = new Discord.Client();

const config = JSON.parse(Filesystem.readFileSync("ingmar.json"));

// Utility Functions

function generateXkcdEmbed(comic) {
  let embed = new Discord.MessageEmbed()
    .setColor(config.color)
    .setTitle(comic.safe_title)
    .setURL(`https://xkcd.com/${comic.num}`)
    .setAuthor("XKCD", "https://xkcd.com/favicon.ico")
    .setImage(comic.img)
    .setTimestamp(
      new Date(
        parseInt(comic.year),
        parseInt(comic.month) - 1,
        parseInt(comic.day)
      )
    )
    .setFooter(comic.alt);
  return embed;
}

// Bot Commands

function catCommand(msg, args) {
  fetch("https://api.thecatapi.com/v1/images/search", (error, _, body) => {
    if (error) return;
    let data = JSON.parse(body);
    let embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setTitle("Random Cat")
      .setImage(data.url);
    msg.reply(embed);
  });
}

function cardCommand(msg, args) {
  let data = CardBot.cardImgURL(args);
  let embed = new Discord.MessageEmbed()
    .setColor(config.color)
    .setTitle(data.message)
    .setImage(data.image);
  msg.reply(embed);
}

function dogCommand(msg, args) {
  fetch("https://dog.ceo/api/breeds/image/random", (error, _, body) => {
    if (error) return;
    let data = JSON.parse(body);
    let embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setTitle("Random Dog")
      .setImage(data.message);
    msg.reply(embed);
  });
}

function foxCommand(msg, args) {
  fetch("https://randomfox.ca/floof/", (error, _, body) => {
    if (error) return;
    let data = JSON.parse(body);
    let embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setTitle("Random Fox")
      .setImage(data.image);
    msg.reply(embed);
  });
}

function kitsuCommand(msg, args) {
  // ...
}

function redditCommand(msg, args) {
  // ...
}

function xkcdCommand(msg, args) {
  if (args.length == 2) {
    if (args[1] == "random") {
      // Find a random comic
      fetch("https://xkcd.com/info.0.json", (error, _, body) => {
        if (error) return; // Dammit Alex
        let current = JSON.parse(body);
        let random = Math.round((current.num - 1) * Math.random()) + 1;
        fetch(`https://xkcd.com/${random}/info.0.json`, (error, _, body) => {
          if (error) return;
          let comic = JSON.parse(body);
          let embed = generateXkcdEmbed(comic);
          msg.reply(embed);
        });
      });
    } else {
      // Find a specific comic
      if (parseInt(args[1]).isNaN()) {
        fetch(`https://xkcd.com/${args[1]}/info.0.json`, (error, _, body) => {
          if (error) return;
          let reallyWeirdData = JSON.parse(body); // Dammit Nick
          let embed = generateXkcdEmbed(reallyWeirdData);
          msg.reply(embed);
        });
      }
    }
  } else {
    // Fetch the latest comic
    fetch("https://xkcd.com/info.0.json", (error, _, body) => {
      if (error) return;
      let comic = JSON.parse(body);
      let embed = generateXkcdEmbed(comic);
      msg.reply(embed);
    });
  }
}

// Bot Events
ingmar.on("message", (msg) => {
  if (msg.content.startsWith(config.prefix)) {
    let args = msg.content.substring(config.prefix.length).split(" ");
    switch (args[0]) {
      case "cat":
        catCommand(msg, args);
        break;
      case "dog":
        dogCommand(msg, args);
        break;
      case "fox":
        foxCommand(msg, args);
        break;
      case "kitsu":
        kitsuCommand(msg, args);
        break;
      case "reddit":
        redditCommand(msg, args);
        break;
      case "xkcd":
        xkcdCommand(msg, args);
        break;
      case "card":
        cardCommand(msg, args);
        break;
    }
  }
});

// Start the bot!
ingmar.login(config.token);
