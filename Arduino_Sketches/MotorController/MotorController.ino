// Define stepper motor connections and steps per revolution:
#define dirPin 2
#define stepPin 3//#define stepPin 3
#define stepsPerRevolution 200

void setup() {
  // Declare pins as output:
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);

}

void loop() {
  while(Serial.available() == 0){} // Wait 
  int percent = Serial.readString().toInt();
  // Set the spinning direction clockwise:
  digitalWrite(dirPin, LOW); //HIGH = clockwise, LOW = aounterclockwise;
    // Spin the stepper motor 1 revolution slowly:
    for (int i = 0; i < 50 * percent /*times*/ * stepsPerRevolution; i++) {
      // These four lines result in 1 step:
      digitalWrite(stepPin, HIGH);
      delayMicroseconds(500);
      digitalWrite(stepPin, LOW);
      delayMicroseconds(500);
    }
  delay(1000);
}


// https://stackoverflow.com/questions/9072320/split-string-into-string-array
String splitAtChar(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}
