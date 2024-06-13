// Lit
import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import Deck from './models/Deck'

@customElement('op-card-deck')
export class OpCardDeck extends LitElement {

  @state()
  deck: Deck

  constructor() {
    super()
    this.deck = new Deck()

    this.deck.shuffle()
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
