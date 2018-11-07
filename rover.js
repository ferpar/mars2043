function Rover(x, y, dir, name) {

    this.x = x
    this.y = y
    this.dir = dir
    this.score = 0
    this.name = name
    this.disabled = false
    this.mine = null;
    this.mineScore = 5;
    this.mineCost= 2;

}

Rover.prototype.turnRight = function () {

    switch (this.dir) {
        case "N":
            this.dir = "E";
            playingField.updateAll();
            break;
        case "E":
            this.dir = "S";
            playingField.updateAll();
            break;
        case "S":
            this.dir = "W";
            playingField.updateAll();
            break;
        case "W":
            this.dir = "N";
            playingField.updateAll();
            break;
    }

    console.log("New Rover Direction: " + this.dir);

}

Rover.prototype.turnLeft = function () {

    switch (this.dir) {
        case "N":
            this.dir = "W";
            playingField.updateAll();
            break;
        case "E":
            this.dir = "N";
            playingField.updateAll();
            break;
        case "S":
            this.dir = "E";
            playingField.updateAll();
            break;
        case "W":
            this.dir = "S";
            playingField.updateAll();
            break;
    }

    console.log("New Rover Direction: " + this.dir);

}

Rover.prototype.moveAhead = function () {

    if (this.disabled === true) return

    switch (this.dir) {
        case "N":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.y -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
        case "E":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.x += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
        case "S":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.y += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
        case "W":
            if (!this.checkObstacles(true)) {
                playingField.field[this.x][this.y] = "_";
                this.x -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(true) === "rover") {
                console.log("cannot move forward: rover ahead")
            } else {
                console.log("cannot move forward: obstacle ahead");
            }
            break;
    }

    console.log("Rover's new position>: [ " + this.x + ", " + this.y + "]");



}

Rover.prototype.moveBack = function () {

    if (this.disabled === true) return

    switch (this.dir) {
        case "N":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.y += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
        case "E":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.x -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
        case "S":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.y -= 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
        case "W":
            if (!this.checkObstacles(false)) {
                playingField.field[this.x][this.y] = "_";
                this.x += 1;
                playingField.updateAll();
            } else if (this.checkObstacles(false) == "rover") {
                console.log("cannot move backwards: rover behind")
            } else {
                console.log("cannot move rearwards: obstacle behind");
            }
            break;
    }

    console.log("Rover's new position>: [ " + this.x + ", " + this.y + "]");



}

Rover.prototype.shoot = function () {

}

Rover.prototype.plantMine = function () {
    this.mine = new Mine(this.x, this.y, 1, this.name);
    // debugger
    setTimeout(function () {
        playingField.mines.push(this.mine);
        console.log(`planted mine @ [${this.x},${this.y}]`);
        this.score-=this.mineCost;
        document.querySelector(`#${this.name}-points`).value = this.score;
        playingField.updateAll();
    }.bind(this), 1500)
}

Rover.prototype.checkObstacles = function (sense) {

    // parameters: --sense: boolean true --> forward sense.

    var that = this;

    function obstacleLogic(adjSquare, obstPos) {
        switch (adjSquare) {
            case "X":
                return true;
            case ".":
                that.score++;
                document.querySelector(`#${that.name}-points`).value = that.score;

                //code to remove sample from collection

                var sampIndex = playingField.samples.findIndex(function (sample) {
                    return (sample.x === obstPos[0] && sample.y === obstPos[1])
                });
                playingField.samples.splice(sampIndex, 1);
                // console.log(playingField.samples.length);
                return false;
            case "_":
                return false;
            case undefined:
                return true;
            case "m":

                var mineIndex = playingField.mines.findIndex(function (mine) {
                    return (mine.x === obstPos[0] && mine.y === obstPos[1])
                });

                that.disabled = true;

                debugger

                that.score -= that.mineScore;
                document.querySelector(`#${that.name}-points`).value = that.score;

                var ownerName = playingField.mines[mineIndex].owner;
                var ownerIndex = playingField.rovers.findIndex((owner) => owner.name === ownerName);
                var mineOwner = playingField.rovers[ownerIndex];
                debugger
                mineOwner.score += that.mineScore;
                document.querySelector(`#${ownerName}-points`).value = mineOwner.score;

                playingField.mines.splice(mineIndex, 1);



                setTimeout(() => { that.disabled = false }, 3000);

                return false;

            default:
                return true;
        }
    }

    if (sense) {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y - 1], [this.x, this.y - 1]);
            case "E":
                try { return obstacleLogic(playingField.field[this.x + 1][this.y], [this.x + 1, this.y]); }
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }

            case "S":
                return obstacleLogic(playingField.field[this.x][this.y + 1], [this.x, this.y + 1]);
            case "W":
                try { return obstacleLogic(playingField.field[this.x - 1][this.y], [this.x - 1, this.y]); }
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }
        }
    } else {
        switch (this.dir) {
            case "N":
                return obstacleLogic(playingField.field[this.x][this.y + 1], [this.x, this.y + 1]);
            case "E":
                try { return obstacleLogic(playingField.field[this.x - 1][this.y], [this.x - 1, this.y]); }
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }
            case "S":
                return obstacleLogic(playingField.field[this.x][this.y - 1], [this.x, this.y - 1]);
            case "W":
                try { return obstacleLogic(playingField.field[this.x + 1][this.y], [this.x + 1, this.y]); }
                catch (error) {
                    console.log('field limit reached');
                    return "undefined"
                }
        }
    }

}