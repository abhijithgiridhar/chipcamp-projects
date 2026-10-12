# Chip Camp take-home kit: 15 projects

The website that goes with the take-home box. Live at https://abhijithgiridhar.github.io/chipcamp-projects/

The box has an Arduino Nano with its base board, a USB cable, 25 LEDs, 5 RGB LEDs, an IR sensor, a light sensor, a buzzer, a touch sensor, a raindrop sensor, a water level sensor, an ultrasonic sensor, a breadboard and jumper wires. It has no resistors, so every LED project says what to do with and without them.

## Files

- `projects.js`: the words, parts and wiring for each of the 15 projects
- `sketches/`: one tested Arduino sketch per project (Nano, ATmega328P)
- `build.js`: turns the above into the pages in `docs/` (GitHub Pages serves this folder)
- `src/`: styles and the small page script
- `print/make_card.js`: makes the QR card for the box (PDFs go to `print/pdf/`, not kept in git)
- `tests/run.js`: checks the pages and sketches

## Working on it

```
node build.js
node tests/run.js --compile
```

`--compile` needs the Arduino IDE installed, it uses the compiler that comes with it.

The sketches compile. They have not been run on every sensor module in the box, so the numbers in the sketches (thresholds, directions) are starting points that each project page tells the reader to check in the Serial Monitor.
