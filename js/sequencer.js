class Sequencer {
    /**
     * Creates a new Sequencer.
     * 
     * @param {number} samples The number of samples stored in the Sequencer.
     * @param {number} patterns The number of patterns stored in the Sequencer.
     * @param {number} initialTempo The initial tempo of the Sequencer. Note that this should correspond to the value of .tempo-label.
     * @param {number} minTempo The minimum tempo allowed.
     * @param {number} maxTempo The maximum tempo allowed.
     * @param {number} tempoStep The value that the Sequencer should increment or decrement from the tempo when .tempo-up or .tempo-down are pressed.
     * @param {number} measures The number of measures in the Sequencer.
     * @param {number} subdivision The number of beats that are in each measure.
     */
    constructor(samples, patterns, initialTempo, minTempo, maxTempo, tempoStep, measures, subdivision) {
        this.numSamples = samples;
        this.tempo = initialTempo;
        this.minTempo = minTempo;
        this.maxTempo = maxTempo;
        this.tempoStep = tempoStep;
        this.measures = measures;
        this.subdivision = subdivision;
        this.numBeats = this.measures * this.subdivision;
        this.beat = 0;
        this.numPatterns = patterns;
        this.pattern = 0;
        this.patterns = [];
        this.samples = []
        this.sampleDir = "samples";
        this.sampleExt = ".wav";
        this.styler = new Styler();

        this.initializeSamples();
        this.initializePatterns();
    }

    /**
     * Populates the patterns array with the number of
     * patterns specified by the numPatterns property.
     */
    initializePatterns() {
        for (let i = 0; i < this.numPatterns; i++) {
            this.patterns[i] = this.initializePattern();
        }
    }

    /**
     * Returns a pattern with the number of samples 
     * specified by the numSamples property.
     */
    initializePattern() {
        let pattern = [];

        for (let i = 0; i < this.numSamples; i++) {
            pattern[i] = this.initializeGrid();
        }

        return pattern;
    }

    /**
     * Returns a grid with the number of beats specified
     * by the numBeats property.
     */
    initializeGrid() {
        let grid = [];

        for (let i = 0; i < this.numBeats; i++) {
            grid[i] = 0;
        }

        return grid;
    }

    /**
     * Populates the samples array with the samples in
     * /samples.
     */
    initializeSamples() {
        for (let i = 0; i < this.numSamples; i++) {
            this.samples[i] = new Audio(this.sampleDir + "/" + String(i) + this.sampleExt);
        }
    }

    /**
     * Increments the tempo and updates the .tempo-label.
     */
    incrementTempo() {
        if (!(this.tempo + this.tempoStep > this.maxTempo)) {
            this.tempo += this.tempoStep;
            this.styler.writeTempo(this.tempo);
        }
    }

    /**
     * Decrements the tempo and updates the .tempo-label.
     */
    decrementTempo() {
        if (!(this.tempo - this.tempoStep < this.minTempo)) {
            this.tempo -= this.tempoStep;
            this.styler.writeTempo(this.tempo);
        }
    }

    /**
     * Returns the amount of time in milliseconds that the 
     * interval should wait before calling the play() method.
     */
    getDelayInterval() {
        return Math.floor((60 / this.tempo * 1000) / this.subdivision);
    }

    /**
     * Toggles a beat for the selected .pattern and updates
     * the styling.
     * 
     * @param {*} note The .note that was pressed.
     */
    toggleNote(note) {
        const sample = Number($(note).parent().attr("id"));     // The sample that was triggered
        const beat = Number($(note).val());                     // The beat of the sample that was triggered

        this.patterns[this.pattern][sample][beat] = !this.patterns[this.pattern][sample][beat];     // Trigger beat in its sample grid
        this.styler.toggleNote(note);                         // Change the note's color
    }

    /**
     * Toggles a .pattern and updates the styling for the
     * .pattern and the .note-grid.
     * 
     * @param {*} pattern The .pattern that was pressed.
     */
    togglePattern(pattern) {
        const patternNumber = Number($(pattern).val());
        this.styler.togglePattern(pattern);
        this.styler.toggleNoteGrid(this.patterns[patternNumber]);
        this.pattern = patternNumber;
    }

    /**
     * Plays the samples that are toggled at the current beat.
     */
    play() {
        for (let sample = 0; sample < this.numSamples; sample++) {
            if (this.patterns[this.pattern][sample][this.beat]) {
                this.samples[sample].play();
                this.samples[sample].currentTime = 0;
            }
        }

        if (++this.beat == this.numBeats) this.beat = 0;
    }

    /**
     * Resets the sequencer: sets the sequencer's beat to 0,
     * clears the existing patterns, and resets the styling.
     */
    reset() {
        this.beat = 0;

        // To only reset the selected pattern, comment out the code below
        // and replace with the last two commented-out lines
        this.initializePatterns();
        this.styler.reset();

        // this.patterns[this.pattern] = this.initializePattern();
        // this.styler.toggleNoteGrid(this.patterns[this.pattern]);
    }
}
