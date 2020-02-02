class Styler {
    /**
     * Creates a new Styler for manipulating styles.
     */
    constructor() {
        // Define selectors for sequencer
        this.tempoLabel = "tempo-label";
        this.patternControl = "pattern-control";
        this.pattern = "pattern";
        this.patternActive = "pattern-active";
        this.noteGrid = "note-grid";
        this.note = "note";
        this.noteActive = "note-active";
    }

   /**
    * Toggles a .note's .noteActive class.
    * @param {*} note The note to toggle.
    */
    toggleNote(note) {
        $(note).toggleClass(this.noteActive);
    }

   /**
    * Removes the .noteActive class to any .notes that have the class
    * applied and do not have their beat toggled in the new pattern (grid).
    * Adds the class to .notes that have their beat toggled in the new
    * pattern.
    * @param {*} newPattern The new pattern to toggle notes from.
    */
    toggleNoteGrid(newPattern) {
        // Remove the note-active class from notes in the previous pattern and
        // add the class to notes in the new pattern

        // Get all of the sample rows in the note-grid
        var sampleRows  = $("." + this.noteGrid).children();

        for (var i = 0; i < sampleRows.length; i++) {
            // Get all of the notes in the sample row
            var notes = $(sampleRows[i]).children();

            // For each of the notes in the sample row, remove the 
            // note-active class unless the beat is toggled in the 
            // new pattern
            for (var j = 0; j < notes.length; j++) {
                var newBeat = newPattern[i][j];     // Get the beat in the pattern that corresponds with the note
                var button = $(notes[j]);

                if ((button).hasClass(this.noteActive) && !newBeat) {
                    button.removeClass(this.noteActive);
                } else {
                    if (newBeat) button.addClass(this.noteActive);
                }
            }
        }
    }

    /**
     * Adds the .pattern-active class to a .pattern.
     * @param {*} pattern The .pattern to add .pattern-active to.
     */
    togglePattern(pattern) {
        // Assign the pattern-active class to the button that was pressed
        // and remove it from the button that previously had the class
        var patternButtons = $("." + this.patternControl).children();

        for (var i = 0; i < patternButtons.length; i++) {
            var button = $(patternButtons[i]);

            if (button.hasClass(this.patternActive)) {
                button.removeClass(this.patternActive);
            }
        }

        $(pattern).addClass(this.patternActive);
    }

    /**
     * Replaces the .tempo-label's text with a new tempo.
     * @param {number} tempo The new tempo to write to .tempo-label.
     */
    writeTempo(tempo) {
        $("." + this.tempoLabel).text(String(tempo));
    }

    /**
     * Removes the .noteActive class from all .notes and adds the 
     * .pattern-active class to the first .pattern.
     */
    reset() {
        // Reset all of the notes
        var notes = $("." + this.note);
        for (var i = 0; i < notes.length; i++) {
            if ($(notes[i]).hasClass(this.noteActive)) $(notes[i]).removeClass(this.noteActive);
        }

        // Set the first pattern's class to pattern-active
        this.togglePattern($("." + this.pattern)[0]);
    }
}