"use strict";
exports.__esModule = true;
exports.cardImgURL = void 0;
var Card = /** @class */ (function () {
    /**
     * Card class that hold card information and image url
     *
     * @param suit suit on the card
     * @param number number/symbol on the card
     */
    function Card(suit, number) {
        this.suit = (suit === undefined) ? this.randomSuit() : suit;
        this.number = (number === undefined) ? this.randomNumber() : number;
        this.calcURLImage();
        this.color = this.suitToColor(this.suit);
        if (this.number === "X" || this.suit === "X") {
            this.message = "Joker";
        }
        else {
            this.message = this.cardInfoToString(this.number) + " of " + this.cardInfoToString(this.suit);
        }
    }
    /**
     * Set the image url
     */
    Card.prototype.calcURLImage = function () {
        if (this.number === "X" || this.suit === "X") {
            this.image = "https://deckofcardsapi.com/static/img/XX.png";
        }
        else {
            this.image = "https://deckofcardsapi.com/static/img/" + this.number + this.suit + ".png";
        }
    };
    /**
     * Randomize the suit on card
     *
     * @returns suit on the card
     */
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
    /**
     * Randomize the number/symbol on card
     *
     * @returns number/symbol on the card
     */
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
    Card.prototype.suitToColor = function (suit) {
        switch (suit) {
            case "H":
            case "D":
                return "red";
            case "C":
            case "S":
            case "X":
                return "black";
        }
    };
    Card.prototype.cardInfoToString = function (str) {
        switch (str) {
            case "A":
                return "Ace";
            case "2":
                return "Two";
            case "3":
                return "Three";
            case "4":
                return "Four";
            case "5":
                return "Five";
            case "6":
                return "Six";
            case "7":
                return "Seven";
            case "8":
                return "Eight";
            case "9":
                return "Nine";
            case "0":
                return "Ten";
            case "J":
                return "Jack";
            case "Q":
                return "Queen";
            case "K":
                return "King";
            case "H":
                return "Heart";
            case "S":
                return "Spade";
            case "C":
                return "Club";
            case "D":
                return "Diamond";
            case "X":
                return "Joker";
            default:
                return "";
        }
    };
    Card.prototype.setCard = function (suit, number) {
        this.suit = (suit === undefined) ? this.randomSuit() : suit;
        this.number = (number === undefined) ? this.randomNumber() : number;
        this.calcURLImage();
        this.color = this.suitToColor(this.suit);
        if (this.number === "X" || this.suit === "X") {
            this.message = "Joker";
        }
        else {
            this.message = this.cardInfoToString(this.number) + " of " + this.cardInfoToString(this.suit);
        }
    };
    return Card;
}());
/**
 * Create a card class from a set of strings and return the url image
 *
 * @param args argument of string with the first args as "Card"
 * @returns url for the card image
 */
function cardImgURL(args) {
    var card;
    if (args === undefined) {
        card = new Card();
    }
    else {
        args[0] = "";
        var cardInfoStr = args.join('');
        var cardInfoObj = strToCardInfo(cardInfoStr);
        card = new Card(cardInfoObj.suit, cardInfoObj.num);
    }
    return {
        image: card.image,
        message: card.message,
        color: card.color
    };
}
exports.cardImgURL = cardImgURL;
/**
 * Changes a string to an object of card number and card suit
 *
 * @param str string with card information
 * @returns object of card number and card suit
 */
function strToCardInfo(str) {
    str = str.toUpperCase();
    var stringSuitChange = {
        "HEART": "H",
        "SPADE": "S",
        "CLUB": "C",
        "DIAMOND": "D"
    };
    var stringNumberChange = {
        "ONE": "1",
        "TWO": "2",
        "THREE": "3",
        "FOUR": "4",
        "FIVE": "5",
        "SIX": "6",
        "SEVEN": "7",
        "EIGHT": "8",
        "NINE": "9",
        "TEN": "0",
        "10": "0",
        "ACE": "A",
        "JACK": "J",
        "QUEEN": "Q",
        "KING": "K",
        "11": "J",
        "12": "Q",
        "13": "K"
    };
    var suitChange = ["H", "S", "C", "D", "X"];
    var numChange = ["0", "2", "3", "4", "5", "6", "7", "8", "9", "A", "J", "Q", "K", "X"];
    var newStr = {
        suit: undefined,
        num: undefined
    };
    if (str.search("RANDOM") !== -1) {
        return newStr;
    }
    else if (str.search("JOKER") !== -1) {
        newStr.suit = "X";
        newStr.num = "X";
        return newStr;
    }
    for (var i = 0; i < Object.keys(stringSuitChange).length; i++) {
        if (str.search(Object.keys(stringSuitChange)[i]) !== -1 && newStr.suit === undefined) {
            newStr.suit = stringSuitChange[Object.keys(stringSuitChange)[i]];
            str = str.replace(Object.keys(stringSuitChange)[i], "");
        }
    }
    for (var i = 0; i < Object.keys(stringNumberChange).length; i++) {
        if (str.search(Object.keys(stringNumberChange)[i]) !== -1 && newStr.num === undefined) {
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
    console.log(str);
    return newStr;
}
/**
 * Creates a random integer
 *
 * @param max max number amount of numbers
 * @returns random interger from 0 to max - 1
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
