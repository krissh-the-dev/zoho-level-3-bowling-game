import prompt from 'prompt-sync';
import { Game } from '../state/game';
import { Rules } from '../state/rules';

export class GamePlay {
  roll() {
    return Math.round(Math.random() * 10) + 1;
  }

  turn(player: number, isFinal: boolean = false) {
    let rollRes = 0;
    const turnHistory = [];
    let turnPoint = 0;

    const chances = Rules.maxChances + (isFinal && Game.hasBonus[player] ? 2 : 0);

    for (let i = 0; i < chances; i++) {
      prompt()('Press any key to roll');

      rollRes = this.roll();
      console.log(`This roll :            ${rollRes}`);

      turnHistory.push(rollRes);
      if (rollRes === 10 && i === 0) {
        // strike
        console.log('STRIKE!');
        turnPoint += 10;
        Game.hasBonus[player] = true;
        break;
      } else if (rollRes === 10 && i === 1) {
        //spare
        console.log('SPARE!');
        turnPoint += 5;
        Game.hasBonus[player] = true;
        break;
      }
    }

    turnPoint += turnHistory.reduce((sum, pt) => sum + pt, 0);

    console.log(`This turn: ${turnHistory.join(', ')}`);
    console.log(`Player\'s points: ${turnPoint}`);
    return { history: turnHistory, points: turnPoint };
  }

  round(isFinal: boolean = false) {
    Game.history = new Array(Game.players).fill([]);
    for (let player = 0; player < Game.players; player++) {
      console.log(`Player ${player + 1}'s turn`);
      const { history, points } = this.turn(player, isFinal);
      Game.history[player] = history;
      Game.points[player] += points;
    }
  }

  play() {
    for (let round = 0; round < Rules.rounds; round++) {
      console.log(`Round ${round + 1}`);

      prompt()('Press any key to continue');
      this.round(round === Rules.rounds - 1);
      console.log('Game summary: ');

      for (let player = 0; player < Game.players; player++) {
        console.log(`Player ${player + 1}: ${Game.points[player]} points`);
      }
    }
  }
}