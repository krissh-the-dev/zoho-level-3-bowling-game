import prompt from 'prompt-sync';
import { Control } from '../lib/Control';
import { Game } from '../state/Game';
import { Rules } from '../state/Rules';
import { decorate } from '../util/decorate';
import { GamePlay } from './GamePlay';

export class PlayerControls extends Control {
  constructor(private rules: Rules, private game: Game) {
    super();
  }

  protected controls = [
    {
      name: 'Display rules',
      control: () => {
        console.log(decorate('RULES'));
        for (const [ruleName, ruleValue] of Object.entries(this.rules)) {
          console.log(`${ruleName} : ${ruleValue}`);
        }
      },
    },
    {
      name: 'Set number of players',
      control: () => {
        this.game.players = +prompt({ sigint: true })('Enter no. of players: ');
        console.log(`Set number of players to ${this.game.players}`);
      },
    },
    {
      name: 'Play',
      control: () => {
        new GamePlay(this.rules, this.game).play();
      },
    },
  ];

  async start() {
    await this.executeController('PLAYER');
  }
}
