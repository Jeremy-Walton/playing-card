# Playing Card Web Component

This repo provides simple web components for a playing card and deck of multiple cards.

## Components

### Playing Card

Playing Card is a simple component that displays a single playing card. It has two required attributes, `rank` and `suit`, and some optional attributes to change the appearance or interaction of the card. The `faceDown` attribute can be added to display the card face down. The `flippable` attribute can be added to allow the card to be flipped over by clicking on it.

```html
<jw-playing-card rank='A' suit='S'></jw-playing-card>
<!-- or -->
<jw-playing-card rank='3' suit='H' faceDown></jw-playing-card>
<!-- or -->
<jw-playing-card rank='J' suit='D' flippable></jw-playing-card>
<!-- or -->
<jw-playing-card rank='8' suit='C' faceDown flippable></jw-playing-card>
```

Cards can be interacted with via javascript as well. They respond to the `click` method to flip the card over. If flippable is set to false, the card will not flip over when `click` is called.

```html
<jw-playing-card id='card' rank='J' suit='D' flippable></jw-playing-card>
```

```js
const card = document.getElementById('card');
card.click();
```

Cards have a variety of css variables that can be customized to change their appearance. The following variables are available:

- `--color-red`: The color of the red suits.
- `--color-black`: The color of the black suits.
- `--shadow-color`: The shadow color of the card.
- `--shadow-color-hover`: The shadow color of the card when hovered if flippable.
- `--scale`: The size of the card.
- `--x-aspect`: The width of the card if you need to adjust the aspect ratio.
- `--y-aspect`: The height of the card if you need to adjust the aspect ratio.

```css
jw-playing-card {
  --scale: 3;
}
```

### Card Deck

Card Deck is a simple component that displays a deck of playing cards. Cards can be added or removed from the deck.
Cards can either be slotted into the deck or added via javascript. When added via javascript, cards can be shuffled or reset to a standard deck of 52 cards.

```html
<jw-card-deck></jw-card-deck>

<jw-card-deck>
  <jw-playing-card rank="3" suit="H" facedown></jw-playing-card>
  <jw-playing-card rank="A" suit="H"></jw-playing-card>
</jw-card-deck>
```

The deck can be interacted with via javascript as well. It has the following methods:

- `addCard(cardObject)`: Adds a card to the end of the deck.
- `removeCard()`: Removes the last card from the deck.
- `setup(faceDown = false, flippable = true)`: Generates a standard deck of 52 cards.
- `shuffle()`: Shuffles the cards in the deck.

```html
<jw-card-deck id='deck'></jw-card-deck>
```

```js
const deck = document.getElementById('deck');
deck.addCard({ rank: 'A', suit: 'S', faceDown: false, flippable: true });
deck.removeCard();
deck.setup(true, false);
deck.shuffle();
```

Decks have a variety of css variables that can be customized to change their appearance. The following variables are available:

- `--overlap`: How much the cards overlap.

You can also set variables of cards within the deck by using the card part selector.

```css
jw-card-deck::part(card) {
  --scale: 3;
}
```

## Installation

```bash
yarn add @jeremywalton/playing-card
# or
npm install @jeremywalton/playing-card
```

## Usage

1. Import the component

```js
import { JWPlayingCard, JWCardDeck } from "@jeremywalton/playing-card";
```

2. Use the component

```html
<jw-playing-card rank='A' suit='S' faceDown flippable></jw-playing-card>

<jw-card-deck></jw-card-deck>

<jw-card-deck>
  <jw-playing-card rank="3" suit="H" facedown></jw-playing-card>
  <jw-playing-card rank="A" suit="H"></jw-playing-card>
</jw-card-deck>
```

## Development

1. Clone the repo
2. Run `yarn install`
3. Run `yarn vite`
4. Navigate to the local address it provides
