#define enA 2
#define in1 3
#define in2 4

#define enB 8
#define in3 9
#define in4 10

bool analog = false;
int speed;

//variables for sending sensor data at intervals
unsigned long previousMillis = 0; 
const long interval = 2000; 

#define ledPin 30
int ledState = LOW;   

void setup() {
  pinMode(ledPin, OUTPUT);
  // put your setup code here, to run once:
  Serial.begin(19200);
  speed = 165;
  analogWrite(enA, 0);
  analogWrite(enB, 0);
}

void loop() {
  // put your main code here, to run repeatedly:
  readSerial();

  //stores the amount of milliseconds that have passed since
  //the program was started
  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis >= interval) {
    //update the previousMillis so we can measure the
    //time difference for executing the function properly
    previousMillis = currentMillis;

    sendSensorData();
    if (ledState == LOW) {
      ledState = HIGH;
    } else {
      ledState = LOW;
    }

    digitalWrite(ledPin, ledState);
  }
}

void readSerial() {
  
  char receivedCommand;
  
  if(Serial.available() > 0) {
    
    receivedCommand = Serial.read();
    
    if(receivedCommand == 'f') {
      analogWrite(enA, speed);
      analogWrite(enB, speed);
      digitalWrite(in1, HIGH);
      digitalWrite(in2, LOW);
      digitalWrite(in3, HIGH);
      digitalWrite(in4, LOW);
    }

    if(receivedCommand == 'l') {
      analogWrite(enA, speed);
      analogWrite(enB, speed);
      digitalWrite(in1, HIGH);
      digitalWrite(in2, LOW);
      digitalWrite(in3, LOW);
      digitalWrite(in4, HIGH);
    }

    if(receivedCommand == 'r') {
      analogWrite(enA, speed);
      analogWrite(enB, speed);
      digitalWrite(in1, LOW);
      digitalWrite(in2, HIGH);
      digitalWrite(in3, HIGH);
      digitalWrite(in4, LOW);
    }

    if(receivedCommand == 'b') {
      analogWrite(enA, speed);
      analogWrite(enB, speed);
      digitalWrite(in1, LOW);
      digitalWrite(in2, HIGH);
      digitalWrite(in3, LOW);
      digitalWrite(in4, HIGH);
    }

    if(receivedCommand == 's') {
      analogWrite(enA, 0);
      analogWrite(enB, 0);
      digitalWrite(in1, LOW);
      digitalWrite(in2, LOW);
      digitalWrite(in3, LOW);
      digitalWrite(in4, LOW);
    }

    if(receivedCommand == 'a') {
      analog = true;
    }

    if(receivedCommand == 'd') {
      analog = false;
    }

    if(isDigit(receivedCommand) && analog) {
      if(receivedCommand == '1') {
        speed = 85;
      }
      if(receivedCommand == '2') {
        speed = 125;
      }
      if(receivedCommand == '3') {
        speed = 200;
      }
    }
  }
}

void sendSensorData() {
  
    Serial.write("test");  
  
}
