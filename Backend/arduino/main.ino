void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
        byte nr = Serial.read();
        if(nr == "ConTest"){
          ConnectonText.Test();
        }
        Serial.print("The following char was received: ");
        Serial.println(nr, DEC);
    }
}