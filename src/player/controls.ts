import prompt from 'prompt-sync';
import { Control } from '../lib/Control';
import { Game } from '../state/game';
import { Rules } from '../state/rules';
import { decorate } from '../util/decorate';
import { GamePlay } from './gamePlay';

export class PlayerControls extends Control {
  constructor() {
    super();
  }

  protected controls = [
    {
      name: 'Display rules',
      control: () => {
        console.log(decorate('RULES'));
        for (const [ruleName, ruleValue] of Object.entries(Rules)) {
          console.log(`${ruleName} : ${ruleValue}`);
        }
      },
    },
    {
      name: 'Set number of players',
      control: () => {
        Game.players = +prompt({ sigint: true })('Enter no. of players: ');
        console.log(`Set number of players to ${Game.players}`);
      },
    },
    {
      name: 'Play',
      control() {
        new GamePlay().play();
      },
    },
  ];

  async start() {
    await this.executeController('PLAYER');
  }
}
