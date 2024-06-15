// Lit
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type Card = {
  rank: string
  suit: string
  faceDown: boolean
  locked: boolean
}

@customElement('jw-card-deck')
export default class JWCardDeck extends LitElement {
  static SUITS = ['H', 'D', 'C', 'S']
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  @property({ type: Array })
  cards: Card[] = []

  addCard(card: Card) {
    this.cards.push(card)
    this.requestUpdate()
  }

  removeCard() {
    this.cards.pop()
    this.requestUpdate()
  }

  setup() {
    this.cards = JWCardDeck.SUITS.map(suit => {
      return JWCardDeck.RANKS.map(rank => {
        return { rank, suit, faceDown: false, locked: false }
      })
    }).flat()
  }

  shuffle() {
    const shuffledCards = this.cards

    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    this.cards = shuffledCards

    this.requestUpdate()
  }

  render() {
    return html`
      ${this.cards.map((card: Card) =>
        html`<jw-playing-card rank=${card.rank} suit=${card.suit} .faceDown=${card.faceDown} .locked=${card.locked}></jw-playing-card>`
      )}
    `
  }

  static styles = css`
    :host {
      display: flex;
    }

    jw-playing-card {
      z-index: 1;

      &:not(:first-child) {
        margin-left: -4.5rem;
      }

      &:hover {
        z-index: 2;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'jw-card-deck': JWCardDeck
  }
}
