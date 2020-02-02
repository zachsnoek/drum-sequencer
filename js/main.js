var interval;
let sequencer = new Sequencer(8, 4, 110, 70, 150, 5, 4, 4);

$(".play").click(function() {
    stop();
    interval = setInterval(function() {
        sequencer.play();
    }, sequencer.getDelayInterval());
});

$(".stop").click(stop);

$(".reset").click(function() {
    sequencer.reset();
});

$(".pattern").click(function() {
    sequencer.togglePattern(this);
});

$(".note").click(function() {
    sequencer.toggleNote(this);
});

$(".tempo-up").click(function() {
    stop();
    sequencer.incrementTempo();
});

$(".tempo-down").click(function() {
    stop();
    sequencer.decrementTempo();
});

function stop() {
    clearInterval(interval);
    sequencer.beat = 0;
}