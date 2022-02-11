String input;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); //init Serial
  
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("Input A Command.");
  while(Serial.available() == 0){} //wait for inout
  input = Serial.readString();
  Serial.print("Command was recieved: `" + input);
  //done.
}

/*


input = Serial.readString(); //Read input
    if(input.startsWith("JavaScript sucks balls dude")){
      Serial.println("Based.");
    } else if(input.startsWith("A")){
      Serial.println("B");
    } else{
      Serial.println("Command not found; Input: " + input);
    }


*/
