//https://github.com/bhagman/Tone

#include <Tone.h>

#define dirPin 2
#define stepPin 3

Tone SMPin[1];     //state how many pins there are

#define D2 NOTE_D2
#define E2 NOTE_E2
#define F2 NOTE_F2
#define G2 NOTE_G2
#define A2 NOTE_A2     //initialize the notes
#define B2 NOTE_B3
#define C3 NOTE_C3
#define D3 NOTE_D3
#define E3 NOTE_E3
#define F3 NOTE_F3
#define G3 NOTE_G3
#define GS3 NOTE_GS3
#define A3 NOTE_A3
#define AS3 NOTE_AS3
#define B3 NOTE_B3
#define C4 NOTE_C4
#define D4 NOTE_D4
#define E4 NOTE_E4
#define F4 NOTE_F4
#define G4 NOTE_G4
#define GS4 NOTE_GS4
#define A4 NOTE_A4
#define B4 NOTE_B4
#define C5 NOTE_C5
#define D5 NOTE_D5
#define E5 NOTE_E5
#define F5 NOTE_F5
#define G5 NOTE_G5
#define NONE 5000

int one = 500,     //initialize the notes
two = 250,
four = 125,
eight = 62,
sixT = 31;

int notes[] = {
  D4, eight,
  D4, eight,
  D5, four,
  GS3, four,
  NONE, eight,
  G3, eight,
  NONE, eight,
  F3, eight,
  NONE, eight,
  D3, four,
  E2, eight,
  F2, eight,
  G2, eight,
  
  C4, eight,
  C4, eight,
  D5, four,
  GS3, four,
  NONE, eight,
  G3, eight,
  NONE, eight,
  F3, eight,
  NONE, eight,
  D3, four,
  E2, eight,
  F2, eight,
  G2, eight,
  
  B3, eight,
  B3, eight,
  D5, four,
  GS3, four,
  NONE, eight,
  G3, eight,
  NONE, eight,
  F3, eight,
  NONE, eight,
  D3, four,
  E2, eight,
  F2, eight,
  G2, eight,
  
  AS3, eight,
  AS3, eight,
  D5, four,
  GS3, four,
  NONE, eight,
  G3, eight,
  NONE, eight,
  F3, eight,
  NONE, eight,
  D3, four,
  E2, eight,
  F2, eight,
  G2, eight,



  F4, four,
  F4, eight,
  F4, eight,
  NONE, eight,
  F4, eight,
  NONE, eight,
  F4, four,
  D4, four,
  D4, two,

  F4, four,
  F4, eight,
  F4, eight,
  NONE, eight,
  G4, eight,
  NONE, eight,
  GS4, eight,
  A4, eight,
  G4, sixT,
  A4, sixT,
  G4, eight,
  D4, eight,
  F4, eight,
  G4, eight,
  NONE, four,
  
  F4, four,
  F4, eight,
  F4, eight,
  NONE, eight,
  G4, eight,
  NONE, eight,
  GS4, eight,
  NONE, eight,
  A4, eight,
  NONE, eight,
  C5, eight,
  NONE, eight,
  A4, eight + four,

  D5, four,
  D5, four,
  D5, eight,
  A4, eight,
  D5, eight,
  C5, two,
};

void setup() {
  // Set the spinning direction clockwise:
  digitalWrite(dirPin, HIGH);
  SMPin[0].begin(stepPin);   //initialize the pins
}

void loop() {
  for (int i = 0; i < sizeof(notes)/sizeof(notes[0]); i += 2) {
    if (notes[i] == 5000) {
      delay(notes[i + 1] * 2);
      continue;
    }
    SMPin[0].play(notes[i]); //play a note
    delay(notes[i + 1]);
    SMPin[0].stop(); //stop
    delay(notes[i + 1]);
  }

  delay(5000);

}
