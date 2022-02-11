String input;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); //init Serial
  
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("Input A Command.");
  while (Serial.available() == 0) {
    // Wait for Input Data
  }
  input = Serial.readString();
  Serial.println("Command was recieved: `" + input + "");
  if (input.startsWith("A")) {
    Serial.println("'B'");
  }
  //done.
}
