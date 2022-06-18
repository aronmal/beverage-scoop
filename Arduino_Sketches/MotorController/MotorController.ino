// Define stepper motor connections and steps per revolution:
#define dirPin 2
#define stepPin 3//#define stepPin 3
#define stepsPerRevolution 200

void setup() {
  // Declare pins as output:
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  while(Serial.available() == 0){} // Wait 
  int percent = Serial.readString().toInt();
  Serial.println(percent + "%");
  // Set the spinning direction clockwise:
  digitalWrite(dirPin, LOW); //HIGH = clockwise, LOW = aounterclockwise;
    // Spin the stepper motor 1 revolution slowly:
    for (int i = 0; i < 500 * percent /*times*/ * stepsPerRevolution; i++) {
      // These four lines result in 1 step:
      digitalWrite(stepPin, HIGH);
      delayMicroseconds(500);
      digitalWrite(stepPin, LOW);
      delayMicroseconds(500);
    }
  delay(1000);
  Serial.println("Finished"); // tell rpi: finish c: ~Miguel
}
