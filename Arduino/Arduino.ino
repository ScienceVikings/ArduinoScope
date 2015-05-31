float volts;
int pin = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  volts = 5.0f * ((float)analogRead(pin)/1023.0f);
  Serial.println(String(volts));
  delayMicroseconds(100);
}
