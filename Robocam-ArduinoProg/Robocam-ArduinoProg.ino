//include DHT11 library
#include <dht11.h>

//defines pins for H bridge PWM(enA, enB) and switching 
//polarity(to control motor direction)
#define enA 2
#define in1 3
#define in2 4

#define enB 8
#define in3 9
#define in4 10

//defines pins for sensors, unnecessary but helps with readability
#define DHT11PIN 22
dht11 DHT11;
const int gasPin = A0;

//enables reading different "velocities" for robot and
//setting PWM accordingly, otherwise it will be a constant PWM signal
bool analog = false;
int speed;

//variables for sending sensor data at intervals
unsigned long previousMillis = 0;

//number of milliseconds between reading sensor data again
const long interval = 1000; 

#define ledPin 30
int ledState = LOW;   

// put your setup code here, to run once:
void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(gasPin, INPUT);
  pinMode(DHT11PIN, INPUT);

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
        speed = 80;
      }
      if(receivedCommand == '2') {
        speed = 110;
      }
      if(receivedCommand == '3') {
        speed = 135;
      }
      if(receivedCommand == '4') {
        speed = 175;
      }
      if(receivedCommand == '5') {
        speed = 205;
      }
    }
  }
}

void sendSensorData() {

  int readDHT11 = DHT11.read(DHT11PIN);
  int humidity = DHT11.humidity;
  int temperature = DHT11.temperature;

  //analog read will go up to 1000 here
  int gasValue = analogRead(gasPin);

  String _humidity = "";
  _humidity = _humidity + humidity;

  String _temperature = "";
  _temperature = _temperature + temperature;

  String _gasValue = "";
  _gasValue = _gasValue + gasValue;
  Serial.println("H" + _humidity + "T" + _temperature + "G" + _gasValue + "E");  
}
