type CardNumber = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "J" | "Q" | "K" | "X";
type CardSuit = "H" | "D" | "S" | "C";
interface CardInfo {
    suit: CardSuit | undefined,
    num: CardNumber | undefined
}

class Card {
    suit: CardSuit;
    number: CardNumber;
    image: string;
    /**
     * Card class that hold card information and image url 
     * 
     * @param suit suit on the card
     * @param number number/symbol on the card
     */
    constructor(suit?: CardSuit | undefined, number?: CardNumber | undefined) {
        this.suit = (suit === undefined) ? this.randomSuit() : suit;
        this.number = (number === undefined) ? this.randomNumber() : number;
        this.calcURLImage()
    }
    /**
     * Set the image url
     */
    calcURLImage() {
        if(this.number === "X") {
            this.image = "https://deckofcardsapi.com/static/img/XX.png";
        }
        else {
            this.image = "https://deckofcardsapi.com/static/img/" + this.number + this.suit + ".png";
        } 
    }
    /**
     * Randomize the suit on card
     * 
     * @returns suit on the card
     */
    randomSuit(): CardSuit {
        let randomNum: number = getRandomInt(4);
        switch(randomNum) {
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
    }
    /**
     * Randomize the number/symbol on card
     * 
     * @returns number/symbol on the card
     */
    randomNumber(): CardNumber {
        let randomNum: number = getRandomInt(13) + 1;
        switch(randomNum) {
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
    }
}

/**
 * Creates a random integer
 * 
 * @param max max number amount of numbers
 * @returns random interger from 0 to max - 1
 */
function getRandomInt(max): number {
    return Math.floor(Math.random() * max);
}

/**
 * Create a card class from a set of strings and return the url image
 * 
 * @param args argument of string with the first args as "Card"
 * @returns url for the card image
 */
export default function cardImgURL(args?: string[] | undefined): string {
    if(args === undefined) {
        return new Card().image;
    }
    args[0] = "";
    let cardInfoStr = args.join('');
    let cardInfoObj = strToCardInfo(cardInfoStr);
    return new Card(cardInfoObj.suit, cardInfoObj.num).image;
}

/**
 * Changes a string to an object of card number and card suit
 * 
 * @param str string with card information
 * @returns object of card number and card suit
 */
function strToCardInfo(str: string): CardInfo {
    str = str.toUpperCase();
    let stringSuitChange = {
        "HEART": "H",
        "SPADE": "S",
        "CLUB": "C",
        "DIAMOND": "D",
    }
    let stringNumberChange = {
        "10": "0",
        "ACE": "A",
        "JACK": "J",
        "QUEEN": "Q",
        "KING": "K",
        "JOKER": "X",
        "11": "J",
        "12": "Q",
        "13": "K"
    }
    let suitChange: CardSuit[] = ["H", "S", "C", "D"];
    let numChange: CardNumber[] = ["0", "2", "3", "4", "5", "6", "7", "8", "9", "A", "J", "Q", "K", "X"];
    let newStr: CardInfo = {
        suit: undefined,
        num: undefined
    };
    for(let i = 0; i < Object.keys(stringSuitChange).length; i++) {
        if(str.search(Object.keys(stringSuitChange)[i]) !== -1 && newStr.suit === undefined) {
            newStr.suit = stringSuitChange[Object.keys(stringSuitChange)[i]];
            str = str.replace(Object.keys(stringSuitChange)[i], "");
        }
    }
    for(let i = 0; i < Object.keys(stringNumberChange).length; i++) {
        if(str.search(Object.keys(stringNumberChange)[i]) !== -1 && newStr.num === undefined) {
            newStr.num = stringNumberChange[Object.keys(stringNumberChange)[i]];
            str = str.replace(Object.keys(stringNumberChange)[i], "");
        }
    }
    if(str.search("1") !== -1) {
        newStr.num = "A";
        str.replace("1", "");
    }
    for(let chara of suitChange) {
        if(str.search(chara) !== -1 && newStr.suit === undefined) {
            newStr.suit = chara;
            str = str.replace(chara, "");
        }
    }
    for(let chara of numChange) {
        if(str.search(chara) !== -1 && newStr.num === undefined) {
            newStr.num = chara;
            str = str.replace(chara, "");
        }
    }
    return newStr;
}