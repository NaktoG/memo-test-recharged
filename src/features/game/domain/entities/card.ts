export type CardId = string;

export type CardStatus = 'hidden' | 'selected' | 'matched';

export interface TileDefinition {
  readonly id: string;
  readonly categoryId: string;
  readonly label: string;
  readonly imageSrc: string;
}

export interface GameCard {
  readonly id: CardId;
  readonly pairId: string;
  readonly label: string;
  readonly imageSrc: string;
  readonly status: CardStatus;
}
