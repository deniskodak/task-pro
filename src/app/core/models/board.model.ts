import { BoardIcons } from "../services/icon.service";

export class Board {
  constructor(
    public name: string,
    public id: string,
    public iconName: BoardIcons,
    public backgroundImg?: string
  ) {}
}
