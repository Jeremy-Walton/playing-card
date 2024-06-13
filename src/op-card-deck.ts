// Lit
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import Deck from './models/Deck'
import PlayingCard from './models/PlayingCard'

@customElement('op-card-deck')
export class OpCardDeck extends LitElement {

  @property({ type: Object })
  deck: Deck

  constructor() {
    super()
    this.deck ??= new Deck()
  }

  addCard(card: PlayingCard) {
    this.deck.cards.push(card)
    this.requestUpdate()
  }

  removeCard() {
    this.deck.cards.pop()
    this.requestUpdate()
  }

  shuffle() {
    this.deck.shuffle()
    this.requestUpdate()
  }

  render() {
    return html`
      ${this.deck.cards.map(card =>
        html`<op-playing-card .card=${card}></op-playing-card>`
      )}
    `
  }

  static styles = css`
    :host {
      display: flex;
    }

    op-playing-card {
      z-index: 1;
    }

    op-playing-card:not(:first-child) {
      margin-left: -4.5rem;
    }

    op-playing-card:hover {
      z-index: 2;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'op-card-deck': OpCardDeck
  }
}
