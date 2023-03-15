function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(document).ready(function () {
    console.log(1);
    let second, woodCount, goldCount;
    let clicked = 0;
    let pickedBox = randomInt(1, 3);
    let pickedBall = randomInt(1, 2);
    let originalSetup = $("section").html();

    let grabBall = function (changeButtonLabel) {
        clicked++;
        switch ((clicked - 1) % 3) {
            case 0: // First Click
                $("section .box:nth-child(" + pickedBox + ")").addClass(
                    "selected"
                );
                $(
                    "section .box:nth-child(" +
                        pickedBox +
                        ") .ball:nth-child(" +
                        pickedBall +
                        ")"
                )
                    .addClass("hidden")
                    .clone()
                    .removeClass("hidden")
                    .appendTo("#result");
                break;
            case 1: // Second click
                second = $(
                    "section .box:nth-child(" +
                        pickedBox +
                        ") .ball:nth-child(" +
                        (3 - pickedBall) +
                        ")"
                );
                second
                    .addClass("hidden")
                    .clone()
                    .removeClass("hidden")
                    .appendTo("#result");

                $;
                woodCount = parseInt($("#woodcount").html());
                goldCount = parseInt($("#goldcount").html());
                if (second.hasClass("gold")) {
                    goldCount++;
                    $("#goldcount").html(goldCount);
                } else {
                    woodCount++;
                    $("#woodcount").html(woodCount);
                }
                $("#ratio").html(
                    Math.round(
                        (goldCount / (woodCount + goldCount) + Number.EPSILON) *
                            10000
                    ) / 100
                );
                if (changeButtonLabel){
                $("#grab").html("Reset");
                $("#grab").addClass("reset");}
                break;
            case 2: // Reset Button
                $("#result").empty();
                $("section").html(originalSetup);
                if (changeButtonLabel) {
                $("#grab").html("Grab a ball");
                $("#grab").removeClass("reset");}
                pickedBox = randomInt(1, 3);
                pickedBall = randomInt(1, 2);
                break;
        }
    };

    $("#grab").click(() => grabBall(true));
    $("#grabmore").click(() => {
        const timer = (ms) => new Promise((res) => setTimeout(res, ms));

        async function grabAll() {
            for (let i = 0; i < 30; i++) {
                grabBall(false)
                await timer(80)
            }
        }
        grabAll();
    });
});