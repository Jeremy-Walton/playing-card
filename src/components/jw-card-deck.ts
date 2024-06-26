// Lit
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type Card = {
  rank: string
  suit: string
  faceDown: boolean
  flippable: boolean
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

  setup(faceDown = false, flippable = true) {
    this.cards = JWCardDeck.SUITS.map(suit => {
      return JWCardDeck.RANKS.map(rank => {
        return { rank, suit, faceDown, flippable }
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
    if (this.cards.length === 0) {
      return html`<slot> </slot>`
    }

    return html`
      ${this.cards.map((card: Card) =>
        html`<jw-playing-card part='card' rank=${card.rank} suit=${card.suit} .faceDown=${card.faceDown} .flippable=${card.flippable}></jw-playing-card>`
      )}
    `
  }

  static styles = css`
    :host {
      --overlap: -70px;

      display: flex;
    }

    jw-playing-card, ::slotted(jw-playing-card) {
      z-index: 1;
    }

    jw-playing-card:not(:first-child), ::slotted(jw-playing-card:not(:first-child)) {
      margin-left: var(--overlap);
    }

    jw-playing-card:hover, ::slotted(jw-playing-card:hover) {
      z-index: 2;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'jw-card-deck': JWCardDeck
  }
}
