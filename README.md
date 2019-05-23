# Mike’s Sudoku Solver (with React)

This is the React version of my Sudoku Solver. It’s [hosted on Heroku](https://mikes-react-sudoku-solver.herokuapp.com) (Heroku puts it in sleep mode after a period of inactivity, so it might take a few seconds to load). The [original version](https://github.com/MichaelAllenWarner/sudoku-solver) uses vanilla JS for the UI/UX; the readme over there summarizes how the solver works.

It finds solutions pretty quickly&mdash;more or less “instantly” for all but the most fiendish puzzles. Even at its most taxed, the solver never takes more than a second or so on my 2012 MacBook Pro. Here are a few extremely difficult puzzles you can paste into the string-entry box below the board, in case you’d like to see the solver in action at its “worst”:

* 5......8...3....69..6.8...3..8.7...61..2..7.......4.....7.9....2..1......4...5...
* 6.......5.9...4.2...3...8.....2.7.1.....5.....4.9.......8...3...2.1...7.5.......6
* ..9...4...7.3...2.8...6...71..8....6....1..7.....56...3....5..1.4.....9...2...7..
* .2..5...94....9.3...91....4..8....7.......6..6....7..3.1..9...8..52.....9....43..

That’s probably not the best way to show off my work, so here are a few easier ones that it can solve in a snap:

* .2....61.56..47..87.8..3..2..26.9....7....54..1..783.6..951..7....8.619..43..2...
* .543....77..1...4361.9..5.23..82.47...1.6.8.957....2..8.95.3...2...9..511...476..
* 1...97.239....6.5...23..74..7.5.8..135.....862.84...3...4.8391..1975...256..29..4
* ...1...6.3.....2..5.........17...........38............6.71..4.2.....3.....6..5..

One thing that was tricky about building this app was the input boxes in the cells of the table. Specifically, it turns out to be somewhat complicated to manually restrict what values the user may enter into an input box with the `type="number"` attribute&mdash;and if you don’t use the `number` type, then the virtual keyboard that deploys on mobile devices will have letters rather than numbers! The *need* for manual restriction stems from the fact that browsers are inconsistent in how they handle “invalid” inputs: some browsers permit them to appear in the box (typically with a warning of some sort, like a red outline), while some browsers don’t, and I wanted to enforce the latter behavior because only integers 1 through 9 should be allowed on a Sudoku board.

So it wasn’t enough to do something like `<input type="number" min="1" max="9">`. Instead, I had to use [controlled components](https://reactjs.org/docs/forms.html#controlled-components) in React, *but this wasn’t enough either*!

The fundamental problem is that although some browsers allow invalid inputs to appear in the box, they do *not* allow invalid inputs as the `value` property of the corresponding `HTMLInputElement` object (which, by the way, is not the same as the HTML `value` attribute that belongs to the `<input>` tag). This makes it *impossible* to detect what invalid input the user typed in!

The solution was to stop worrying about exactly what the user typed in. All that matters is whether what’s in the box is a valid input, and the `HTMLInputElement` interface includes a read-only `validity` property that tells you just that.

A strange secondary problem emerged when trying to clear the box in the case of an invalid input. Without going into detail&mdash;I found that it was insufficient to set the `value` attribute of the React `<input>` component to an empty string. Using a [ref](https://reactjs.org/docs/refs-and-the-dom.html) to clear the `value` property of the `HTMLInputElement` object itself did the trick.