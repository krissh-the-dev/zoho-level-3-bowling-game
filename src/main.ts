import { AdminControls } from './admin/AdminControl';
import { Control } from './lib/Control';
import { PlayerControls } from './player/PlayerControl';
import { Game } from './state/Game';
import { Rules } from './state/Rules';

export class PinBall extends Control {
  constructor() {
    super();
  }

  private game = new Game();
  private rules = new Rules();
  private adminController = new AdminControls(this.rules, this.game);
  private playerControls = new PlayerControls(this.rules, this.game);

  protected controls = [
    {
      name: 'Admin',
      control: () => {
        this.adminController.start();
      },
    },
    {
      name: 'Player',
      control: () => {
        this.playerControls.start();
      },
    },
  ];

  async start() {
    await this.executeController('PIN BALL');
  }
}
