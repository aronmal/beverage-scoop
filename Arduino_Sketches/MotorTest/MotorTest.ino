/*Example sketch to control a stepper motor with A4988/DRV8825 stepper motor driver and Arduino without a library. More info: https://www.makerguides.com */

// Define stepper motor connections and steps per revolution:
#define dirPin 2
#define stepPin 3
#define stepsPerRevolution 200
#define amountOfDrinks 4

void setup() {
  // Declare pins as output:
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

int j = 0;
void loop() {
  // Set the spinning direction clockwise:
  digitalWrite(dirPin, LOW); //HIGH = clockwise, LOW = aounterclockwise;
  // Spin the stepper motor 1 revolution slowly:
  for (int i = 0; i < 69420 /*times*/ * stepsPerRevolution; i++) {
    // These four lines result in 1 step:
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(500);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(500);
    ++j;
    if(j % 50 == 0){
      digitalWrite(LED_BUILTIN, HIGH);
    } else{
      digitalWrite(LED_BUILTIN, LOW);
    }

    Serial.println("i: " + i);
  }
 
  
  delay(1000);
}
