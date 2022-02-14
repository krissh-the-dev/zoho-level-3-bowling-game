import prompt from 'prompt-sync';
import { Control } from '../lib/Control';
import { Game } from '../state/game';
import { Rules } from '../state/rules';

export class AdminControls extends Control {
  constructor() {
    super();
  }

  protected controls = [
    {
      name: 'Set Rounds',
      control: async () => {
        Rules.rounds = +prompt({ sigint: true })('Enter the number of rounds: ');
        Game.points = new Array(Rules.rounds).fill(0);
      },
    },
    {
      name: 'Set max tries',
      control: () => {
        Rules.maxChances = +prompt({ sigint: true })('Enter the maximum allowed chances: ');
      },
    },
  ];

  async start() {
    await this.executeController('ADMIN');
  }
}
