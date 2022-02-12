import { stdin, stdout } from 'process';
import readline, { ReadLine } from 'readline';

export class Scanner {
  readonly #reader: ReadLine;

  constructor() {
    this.#reader = readline.createInterface({
      input: stdin,
      output: stdout,
    });
  }

  getInput(label: string): Promise<string> {
    return new Promise(resolve =>
      this.#reader.question(label, a => {
        this.destroy();
        resolve(a);
      })
    );
  }

  destroy() {
    this.#reader.close();
  }
}
