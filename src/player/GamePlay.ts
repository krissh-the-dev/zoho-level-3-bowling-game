import prompt from 'prompt-sync';
import { Game } from '../state/game';
import { Rules } from '../state/rules';

export class GamePlay {
  private static readonly STRIKE_BONUS = 10;
  private static readonly SPARE_BONUS = 5;
  private static readonly BONUS_ROLLS = 2;
  private static readonly PTS_PER_PIN = 1;

  private roll() {
    return Math.round(Math.random() * 10) + 1;
  }

  private turn(player: number, isFinal: boolean = false) {
    let rollRes = 0;
    const turnHistory = [];
    let turnPoint = 0;

    const chances =
      Rules.maxChances + (isFinal && Game.hasBonus[player] ? GamePlay.BONUS_ROLLS : 0);

    for (let i = 0; i < chances; i++) {
      prompt()('Press any key to roll');
      rollRes = this.roll();
      console.log(`This roll :            ${rollRes}`);

      turnHistory.push(rollRes);
      if (rollRes === 10) {
        console.log(i === 0 ? 'STRIKE' : 'SPARE');
        turnPoint += i === 0 ? GamePlay.STRIKE_BONUS : GamePlay.SPARE_BONUS;
        Game.hasBonus[player] = true;
        break;
      }
    }

    turnPoint += turnHistory.reduce((sum, knocks) => sum + knocks * GamePlay.PTS_PER_PIN, 0);

    console.log(`This turn: ${turnHistory.join(', ')}`);
    console.log(`Player's points: ${turnPoint}`);
    return { history: turnHistory, points: turnPoint };
  }

  private round(isFinal: boolean = false) {
    Game.history = new Array(Game.players).fill([]);
    for (let player = 0; player < Game.players; player++) {
      console.log(`Player ${player + 1}'s turn`);
      const { history, points } = this.turn(player, isFinal);
      Game.history[player] = history;
      Game.points[player] += points;
    }
  }

  public play() {
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
