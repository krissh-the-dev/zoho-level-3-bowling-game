import { AdminControls } from './admin/controls';
import { Control } from './lib/Control';
import { PlayerControls } from './player/controls';

export class Game extends Control {
  constructor() {
    super();
  }

  private adminController = new AdminControls();
  private playerControls = new PlayerControls();

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
