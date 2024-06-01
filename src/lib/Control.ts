import prompt from 'prompt-sync';
import { decorate } from '../util/decorate';

export class Control {
    constructor() {}
    protected controls!: { name: string; control: () => Promise<void> | void }[];

    async executeController(name: string) {
        let exitFlag = false;

        while (!exitFlag) {
            let idx = 0;
            console.log(decorate(name));

            for (const control of this.controls) {
                idx += 1;
                console.log(`${idx} ${control.name}`);
            }

            console.log(`0. Back / Exit`);

            const selection = +prompt({ sigint: true })('Enter your choice: ');
            if (selection > idx) {
                console.log('Invalid choice');
            } else if (selection === 0) {
                exitFlag = true;
            } else {
                await this.controls[selection - 1].control();
            }
        }
    }
}
