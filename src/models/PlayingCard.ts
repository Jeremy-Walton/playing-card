class PlayingCard {
  rank: string
  suit: string
  faceDown: boolean

  constructor(rank: string, suit: string, faceDown: boolean = false) {
    this.rank = rank
    this.suit = suit
    this.faceDown = faceDown
  }
}

export default PlayingCard
