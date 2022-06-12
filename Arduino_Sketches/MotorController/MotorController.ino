/*Example sketch to control a stepper motor with A4988/DRV8825 stepper motor driver and Arduino without a library. More info: https://www.makerguides.com */

// Define stepper motor connections and steps per revolution:
#define dirPin 2
int stepPin;//#define stepPin 3
#define stepsPerRevolution 200

void setup() {
  // Declare pins as output:
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);

}

void loop() {
  while(Serial..available() == 0){
    delay(200);
    Serial.println("ping");
    } // Wait for 



  //set StepPin
    
  // Set the spinning direction clockwise:
  digitalWrite(dirPin, HIGH); //HIGH = clockwise, LOW = aounterclockwise;

  // Spin the stepper motor 1 revolution slowly:
  for (int i = 0; i < times * stepsPerRevolution; i++) {
    // These four lines result in 1 step:
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(2000);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(2000);
  }

  delay(1000);
}
