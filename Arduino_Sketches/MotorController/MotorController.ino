// Define stepper motor connections and steps per revolution:
#define dirPin 2
#define stepPin 3//#define stepPin 3
#define enablePin 5; //TODO: recheck
#define stepsPerRevolution 200

void setup() {
  // Declare pins as output:
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() == 0){ 
    digitalWrite(enablePin, HIGH);
    return;
    } // HOLD UP, WAIT A MINIUTE 
    digitalWrite(enablePin, LOW);
  int percent = (int) Serial.readString().toInt();
  Serial.println(String(percent) + "%");
  // Set the spinning direction clockwise:
  digitalWrite(dirPin, LOW); //HIGH = clockwise, LOW = aounterclockwise;
    // Spin the stepper motor 1 revolution slowly:
    for (int i = 0; i < 300 * percent /*times*/ * stepsPerRevolution; i++) {
      // These four lines result in 1 step:
      digitalWrite(stepPin, HIGH);
      delayMicroseconds(600);
      digitalWrite(stepPin, LOW);
      delayMicroseconds(600);
    }
  delay(1000);
  Serial.println("Finished"); // tell rpi: finish c:
}
