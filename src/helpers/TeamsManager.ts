import { gameData } from "../data/GameData.js";
import { Player } from "../entities/Player.js";

export class TeamsManager {
    private static _instance: TeamsManager;

    teams: Player[][] = [];

    private constructor() {
        this.buildTeams();
    }

    static get Instance(): TeamsManager {
        if (!this._instance) {
            this._instance = new TeamsManager();
        }
        return this._instance;
    }

    private buildTeams() {
        this.teams = [
            [
                new Player(205, 90, 40, "green", 4),
                new Player(245, 90, 40, "green", 4),
                new Player(205, 130, 40, "green", 4),
                new Player(245, 130, 40, "green", 4)
            ],
            [
                new Player(710, 205, 40, "red", 19),
                new Player(710, 245, 40, "red", 19),
                new Player(670, 205, 40, "red", 19),
                new Player(670, 245, 40, "red", 19)
            ],
            [
                new Player(595, 710, 40, "blue", 34),
                new Player(555, 710, 40, "blue", 34),
                new Player(595, 670, 40, "blue", 34),
                new Player(555, 670, 40, "blue", 34)
            ],
            [
                new Player(90, 595, 40, "yellow", 49),
                new Player(90, 555, 40, "yellow", 49),
                new Player(130, 595, 40, "yellow", 49),
                new Player(130, 555, 40, "yellow", 49)
            ]
        ];
    }

    reset() {
        this.buildTeams();
    }

    getTeam(index: number) {
        return this.teams[index];
    }

    getCurrentTeam(turnIndex: number) {
        return this.teams[turnIndex];
    }

    getMovablePlayers(turnIndex: number) {
        return this.teams[turnIndex].filter(p => p.canMove);
    }

    getTeamIndex(player: Player) {
        return this.teams.findIndex(team => team.includes(player));
    }

    renderTeams() {
        for (const team of this.teams) {
            for (const player of team) {
                player.canMove = gameData.playerTurn === this.getTeamIndex(player);
                player.draw();
                if (player.inPlay) player.move();
            }
        }
    }
}
