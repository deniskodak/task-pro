import { Board } from './board.model';

export class DatabaseUser {
  constructor(public name: string, public boards: Board[]) {}
}
