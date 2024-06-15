import JWCardDeck from "./src/components/jw-card-deck"

const deck: JWCardDeck = document.getElementById('deck') as JWCardDeck
deck.setup()
deck.shuffle()
