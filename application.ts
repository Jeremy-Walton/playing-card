import JWCardDeck from "./src/components/jw-card-deck"

const deck: JWCardDeck = document.getElementById('deck') as JWCardDeck
deck.setup()
deck.shuffle()

const deck2: JWCardDeck = document.getElementById('deck-2') as JWCardDeck
deck2.setup(true, false)
deck2.shuffle()
