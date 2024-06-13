import { OpCardDeck } from "./op-card-deck"
import Deck from "./models/Deck"
import PlayingCard from "./models/PlayingCard"

['deck-1', 'deck-2'].forEach((deckId, index) => {
  const deck: OpCardDeck = document.getElementById(deckId) as OpCardDeck

  if (index === 0) {
    deck.deck = new Deck([new PlayingCard('5', 'S', false), new PlayingCard('4', 'D', false)])
  }

  const shuffleButton = document.getElementById(`${deckId}-shuffle`) as HTMLButtonElement
  const form = document.getElementById(`${deckId}-form`) as HTMLFormElement

  shuffleButton.addEventListener('click', () => {
    deck.shuffle()
  })

  document.getElementById(`${deckId}-remove`)?.addEventListener('click', (_event) => {
    deck.removeCard()
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const newCard = new PlayingCard(formData.get('rank') as string, formData.get('suit') as string)
    deck.addCard(newCard)
  })
})
