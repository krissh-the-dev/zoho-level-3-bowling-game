export class Game {
    private players = 2;
    private points = [0, 0];
    history = [[0]];
    hasBonus = [false];

    getNumberOfPlayers() {
        return this.players;
    }

    setNumberOfPlayers(count: number) {
        this.players = count;
        this.points = new Array(count).fill(0);
        this.history = new Array(count).fill([]);
    }

    getAllPoints() {
        return this.points;
    }

    getPoints(player: number) {
        return this.points[player];
    }

    setPoints(player: number, points: number) {
        this.points[player] = points;
    }

    addPoints(player: number, points: number) {
        this.points[player] += points;
    }
}
