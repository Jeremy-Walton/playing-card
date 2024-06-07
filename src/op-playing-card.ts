import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import club from './assets/Club.svg'
import diamond from './assets/Diamond.svg'
import heart from './assets/Heart.svg'
import spade from './assets/Spade.svg'

import jc from './assets/JC.png'
import jd from './assets/JD.png'
import jh from './assets/JH.png'
import js from './assets/JS.png'
import kc from './assets/KC.png'
import kd from './assets/KD.png'
import kh from './assets/KH.png'
import ks from './assets/KS.png'
import qc from './assets/QC.png'
import qd from './assets/QD.png'
import qh from './assets/QH.png'
import qs from './assets/QS.png'

@customElement('op-playing-card')
export class OpPlayingCard extends LitElement {
  @property({ type: String })
  rank = '1'

  @property({ type: String })
  suit = 'S'

  @property({ type: Boolean, reflect: true })
  red = false

  suitIcon() {
    const suitMap: { [index: string]: string } = {
      'C': club,
      'D': diamond,
      'H': heart,
      'S': spade,
    }

    return suitMap[this.suit] ?? spade
  }

  faceCardImage() {
    const faceMap: { [index: string]: { [index: string]: string } } = {
      'C': { 'J': jc, 'Q': qc, 'K': kc },
      'D': { 'J': jd, 'Q': qd, 'K': kd },
      'H': { 'J': jh, 'Q': qh, 'K': kh },
      'S': { 'J': js, 'Q': qs, 'K': ks },
    }

    return faceMap[this.suit][this.rank] ?? ''
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value)

    if (name === 'suit') {
      this.red = value == 'D' || value == 'H'
    }
  }

  renderCenter() {
    return this.rank == 'J' || this.rank == 'Q' || this.rank == 'K'
      ? html`<img class='face-card ${this.rank}' src=${this.faceCardImage()} />`
      : html`<img class='suit' src=${this.suitIcon()} alt='Suit' />`;
  }

  render() {
    return html`
      <div class='left'>
        ${this.rank}
        <img class='suit' src=${this.suitIcon()} alt='Suit' />
      </div>
      <div class='center'>
        ${this.renderCenter()}
      </div>
      <div class='right'>
        <img class='suit' src=${this.suitIcon()} alt='Suit' />
        ${this.rank}
      </div>
    `
  }

  static styles = css`
    :host {
      --x-aspect: 101.5px;
      --y-aspect: 144px;
      --scale: 1.5;

      --color: hsl(348, 8%, 12%);
      --shadow-color: hsl(213, 33%, 71%);

      display: grid;
      grid-template-columns: auto 10fr auto;
      background-color: white;
      color: var(--color);
      box-shadow: 0px 0.125rem 0.25rem 0px var(--shadow-color);
      border-radius: calc(var(--scale) * 0.5rem);

      width: calc(var(--scale) * var(--x-aspect));
      min-width: calc(var(--scale) * var(--x-aspect));
      height: calc(var(--scale) * var(--y-aspect));
      min-height: calc(var(--scale) * var(--y-aspect));
      padding: calc(var(--scale) * 0.3125rem);

      font-size: calc(var(--scale) * 1.25rem);
      box-sizing: border-box;
    }

    :host([red]) {
      --color: hsl(358, 72%, 43%);
    }

    .suit {
      width: calc(var(--scale) * 0.625rem);
    }

    .face-card {
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
      padding-block: calc(var(--scale) * 0.625rem);

      &:has(.face-card.J) {
        padding-inline: calc(var(--scale) * 0.3125rem);
      }

      align-items: center;
      justify-content: center;

      .suit {
        width: calc(var(--scale) * 1.625rem);
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'op-playing-card': OpPlayingCard
  }
}
