import PlayingCard from "./PlayingCard"

class Deck {
  static SUITS = ['H', 'D', 'C', 'S']
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  static defaultCards(): PlayingCard[] {
    return Deck.SUITS.map(suit => {
      return Deck.RANKS.map(rank => {
        return new PlayingCard(rank, suit, false)
      })
    }).flat()
  }

  cards: PlayingCard[]

  constructor(cards: PlayingCard[] = Deck.defaultCards()) {
    this.cards = cards
  }

  shuffle() {
    const shuffledDeck = this.cards

    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    this.cards = shuffledDeck
  }
}

export default Deck
