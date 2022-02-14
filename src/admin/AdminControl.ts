import prompt from 'prompt-sync';
import { Control } from '../lib/Control';
import { Game } from '../state/Game';
import { Rules } from '../state/Rules';

export class AdminControls extends Control {
  constructor(private rules: Rules, private game: Game) {
    super();
  }

  protected controls = [
    {
      name: 'Set Rounds',
      control: async () => {
        this.rules.rounds = +prompt({ sigint: true })('Enter the number of rounds: ');
        this.game.points = new Array(this.rules.rounds).fill(0);
      },
    },
    {
      name: 'Set max tries',
      control: () => {
        this.rules.maxChances = +prompt({ sigint: true })('Enter the maximum allowed chances: ');
      },
    },
  ];

  async start() {
    await this.executeController('ADMIN');
  }
}
