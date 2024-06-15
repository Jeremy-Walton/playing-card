// Lit
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

// Suit images
import club from '../assets/Club.svg'
import diamond from '../assets/Diamond.svg'
import heart from '../assets/Heart.svg'
import spade from '../assets/Spade.svg'

// Face card images
import jc from '../assets/JC.png'
import jd from '../assets/JD.png'
import jh from '../assets/JH.png'
import js from '../assets/JS.png'
import kc from '../assets/KC.png'
import kd from '../assets/KD.png'
import kh from '../assets/KH.png'
import ks from '../assets/KS.png'
import qc from '../assets/QC.png'
import qd from '../assets/QD.png'
import qh from '../assets/QH.png'
import qs from '../assets/QS.png'
import back from '../assets/back.png'

@customElement('jw-playing-card')
export default class JWPlayingCard extends LitElement {
  @property({ type: String })
  rank = 'A'

  @property({ type: String })
  suit = 'S'

  @property({ type: Boolean })
  faceDown = false

  @property({ type: Boolean })
  locked = false

  constructor() {
    super()

    this.addEventListener('click', (_event) => this.click())
  }

  click() {
    if (this.locked) { return }

    this.faceDown = !this.faceDown
    this.requestUpdate()
  }

  #isRed() {
    return ['D', 'H'].includes(this.suit)
  }

  #isFaceCard() {
    return ['J', 'Q', 'K'].includes(this.rank)
  }

  #suitIcon() {
    return this.#suitMap()[this.suit].suitImage ?? spade
  }

  #faceCardImage() {
    return this.#suitMap()[this.suit][this.rank] ?? ''
  }

  #suitMap(): { [index: string]: { [index: string]: string } } {
    return {
      'C': { suitImage: club, 'J': jc, 'Q': qc, 'K': kc },
      'D': { suitImage: diamond, 'J': jd, 'Q': qd, 'K': kd },
      'H': { suitImage: heart, 'J': jh, 'Q': qh, 'K': kh },
      'S': { suitImage: spade, 'J': js, 'Q': qs, 'K': ks },
    }
  }

  #renderSide(left = true) {
    if (this.faceDown) { return null }

    const items = [
      this.rank,
      html`<img class='suit' src=${this.#suitIcon()} alt='Suit' />`
    ]

    return html`
      <div class='${left ? 'left' : 'right'}'>
        ${items[left ? 0 : 1]}
        ${items[left ? 1 : 0]}
      </div>
    `
  }

  #renderCenter() {
    if (this.faceDown) {
      return html`<img class='back' src=${back} />`
    }

    return this.#isFaceCard()
      ? html`<img class='face-card ${this.rank}' src=${this.#faceCardImage()} />`
      : html`<img class='suit' src=${this.#suitIcon()} alt='Suit' />`;
  }

  render() {
    this.classList.toggle('red', this.#isRed())
    this.classList.toggle('locked', this.locked)

    return html`
      ${this.#renderSide(true)}
      <div class='center'>
        ${this.#renderCenter()}
      </div>
      ${this.#renderSide(false)}
    `
  }

  static styles = css`
    :host {
      --color-black: hsl(348, 8%, 12%);
      --color-red: hsl(358, 72%, 43%);
      --current-color: var(--color-black);

      --x-aspect: 101.5px;
      --y-aspect: 144px;
      --scale: 1;

      --shadow-color-black: hsl(213, 33%, 71%);
      --shadow-color-gray: hsl(213, 33%, 31%);
      --current-shadow-color: var(--shadow-color-black);

      display: grid;
      grid-template-columns: auto 10fr auto;
      background-color: white;
      color: var(--current-color);
      box-shadow: 0px 2px 4px 0px var(--current-shadow-color);
      border-radius: calc(var(--scale) * 8px);

      width: calc(var(--scale) * var(--x-aspect));
      min-width: calc(var(--scale) * var(--x-aspect));
      height: calc(var(--scale) * var(--y-aspect));
      min-height: calc(var(--scale) * var(--y-aspect));
      padding: calc(var(--scale) * 6.4px);

      font-size: calc(var(--scale) * 20px);
      box-sizing: border-box;
      user-select: none;
    }

    :host(:hover:not(.locked)) {
      --current-shadow-color: var(--shadow-color-gray);

      cursor: pointer;
    }

    :host(.red) {
      --current-color: var(--color-red);
    }

    .suit {
      width: calc(var(--scale) * 10px);
    }

    .face-card, .back {
      width: 100%;
    }

    .left, .right {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .left {
      justify-content: start;
    }

    .right {
      justify-content: end;
    }

    .center {
      display: flex;
      padding-block: calc(var(--scale) * 10px);

      &:has(.face-card.J) {
        padding-inline: calc(var(--scale) * 5px);
      }

      &:has(.back)  {
        padding-block: 0;
      }

      align-items: center;
      justify-content: center;

      .suit {
        width: calc(var(--scale) * 26px);
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'op-playing-card': JWPlayingCard
  }
}