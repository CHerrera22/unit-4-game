//Le Crystals Collector

$(document).ready(function () {
    var yourNumber = 0;
    var randomNum = randomNumGen();

    //starting variables
    var wins = 0;
    var losses = 0;
    var crystals;

    function randomNumCrystals() {
       
        // i don't think i am linking the images to the crystals correctly, so they won't work
        return {
            amethyst: {
                points: Math.floor(Math.random() * 12) + 1,
                image: "images/amethyst.jpg"
            },
            emerald: {
                points: Math.floor(Math.random() * 12) + 1,
                image: "images/emerald.jpg"
            },
            ruby: {
                points: Math.floor(Math.random() * 12) + 1,
                image: "images/ruby.jpg"
            },
            diamond: {
                points: Math.floor(Math.random() * 12) + 1,
                image: "images/diamond.jpg"
            }
        };
    }

    //create a random number between 19 and 120.
    function randomNumGen() {
        return Math.floor(Math.random() * 102) + 19;
    }

    function setGame() {
        yourNumber = 0;
        crystals = randomNumCrystals();
        randomNum = randomNumGen();
        $("#game").text(randomNum);
    }

    function updateDom(didUserWin) {
        $("#win-area").empty();
ß
        //Win
        if (didUserWin === true) {
            $("#win-area").append($("<p>").text("You won! Great job!"));
            setGame();
            renderNumber();
        }
        //Loss
        else if (didUserWin === false) {
            $("#win-area").append($("<p>").text("Sorry, you lost."));
            setGame();
            renderNumber();
        }
        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);

        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");

        pWins.append(wSpan);
        pLosses.append(lSpan);

        $("#win-area").append(pWins);
        $("#win-area").append(pLosses);
    }

    function renderCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class='buttons' data-name='" + key + "'>");
            var crystalImg = $("<img alt='image' class='img-responsive icons'>").attr("src", crystals[key].imageUrl);
            crystalDiv.append(crystalImg);
            $("#buttons").append(crystalDiv);
        }
    }

    function updateNumber(crystal) {
        yourNumber += crystals[crystal.attr("data-name")].points;
    }

    function renderNumber() {
        var scoreNumDiv = $("<div id='totalPoints'>").text(yourNumber);
        $("#score").html();
        $("#score").html(scoreNumDiv);
    }

    //game start
    setGame();
    updateDom();
    renderCrystals();
    renderNumber();

    $(".buttons").on("click", function (event) {
        updateNumber($(this));
        renderNumber();

        if (yourNumber === randomNum) {
            wins++;
            setGame();
            updateDom(true);
        }
        else if (yourNumber > randomNum) {
            losses++;
            setGame();
            updateDom(false);
        }
    });
});