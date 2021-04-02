"use strict";
exports.__esModule = true;
var Card = /** @class */ (function () {
  function Card(suit, number) {
    this.suit = suit === undefined ? this.randomSuit() : suit;
    this.number = number === undefined ? this.randomNumber() : number;
    this.calcURLImage();
  }
  Card.prototype.calcURLImage = function () {
    if (this.number === "X") {
      this.image = "https://deckofcardsapi.com/static/img/XX.png";
    } else {
      this.image =
        "https://deckofcardsapi.com/static/img/" +
        this.number +
        this.suit +
        ".png";
    }
  };
  Card.prototype.randomSuit = function () {
    var randomNum = getRandomInt(4);
    switch (randomNum) {
      case 0:
        return "H";
      case 1:
        return "D";
      case 2:
        return "S";
      case 3:
        return "C";
      default:
        return "H";
    }
  };
  Card.prototype.randomNumber = function () {
    var randomNum = getRandomInt(13) + 1;
    switch (randomNum) {
      case 1:
        return "A";
      case 2:
        return "2";
      case 3:
        return "3";
      case 4:
        return "4";
      case 5:
        return "5";
      case 6:
        return "6";
      case 7:
        return "7";
      case 8:
        return "8";
      case 9:
        return "9";
      case 10:
        return "0";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
    }
  };
  return Card;
})();
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function cardImgURL(args) {
  if (args === undefined) {
    return new Card().image;
  }
  args[0] = "";
  var cardInfoStr = args.join("");
  var cardInfoObj = strToCardInfo(cardInfoStr);
  return new Card(cardInfoObj.suit, cardInfoObj.num).image;
}
exports["default"] = cardImgURL;
console.log(cardImgURL());
console.log(cardImgURL(["CARD"]));
console.log(cardImgURL(["CARD", "10H"]));
console.log(cardImgURL(["CARD", "CLUBK"]));
console.log(cardImgURL(["CARD", "HEARTK"]));
console.log(cardImgURL(["CARD", "HK"]));
console.log(cardImgURL(["CARD", "HEarT", "4"]));
console.log(cardImgURL(["CARD", "ACE", "c"]));
console.log(cardImgURL(["CARD", "JOKER", "c", "   wdawdad d31131"]));
console.log(cardImgURL(["CARD", "3X"]));
function strToCardInfo(str) {
  str = str.toUpperCase();
  var stringSuitChange = {
    HEART: "H",
    SPADE: "S",
    CLUB: "C",
    DIAMOND: "D",
  };
  var stringNumberChange = {
    10: "0",
    ACE: "A",
    JACK: "J",
    QUEEN: "Q",
    KING: "K",
    JOKER: "X",
    11: "J",
    12: "Q",
    13: "K",
  };
  var suitChange = ["H", "S", "C", "D"];
  var numChange = [
    "0",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "J",
    "Q",
    "K",
    "X",
  ];
  var newStr = {
    suit: undefined,
    num: undefined,
  };
  for (var i = 0; i < Object.keys(stringSuitChange).length; i++) {
    if (
      str.search(Object.keys(stringSuitChange)[i]) !== -1 &&
      newStr.suit === undefined
    ) {
      newStr.suit = stringSuitChange[Object.keys(stringSuitChange)[i]];
      str = str.replace(Object.keys(stringSuitChange)[i], "");
    }
  }
  for (var i = 0; i < Object.keys(stringNumberChange).length; i++) {
    if (
      str.search(Object.keys(stringNumberChange)[i]) !== -1 &&
      newStr.num === undefined
    ) {
      newStr.num = stringNumberChange[Object.keys(stringNumberChange)[i]];
      str = str.replace(Object.keys(stringNumberChange)[i], "");
    }
  }
  if (str.search("1") !== -1) {
    newStr.num = "A";
    str.replace("1", "");
  }
  for (var _i = 0, suitChange_1 = suitChange; _i < suitChange_1.length; _i++) {
    var chara = suitChange_1[_i];
    if (str.search(chara) !== -1 && newStr.suit === undefined) {
      newStr.suit = chara;
      str = str.replace(chara, "");
    }
  }
  for (var _a = 0, numChange_1 = numChange; _a < numChange_1.length; _a++) {
    var chara = numChange_1[_a];
    if (str.search(chara) !== -1 && newStr.num === undefined) {
      newStr.num = chara;
      str = str.replace(chara, "");
    }
  }
  return newStr;
}
