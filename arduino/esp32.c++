#include "DHT.h"

#define DHTPIN 25
#define DHTTYPE DHT22
#define soil_moisture_pin 14

DHT dht(DHTPIN, DHTTYPE);

const int photoPin = 34;  

const int maxRaw = 448;
const int maxLux = 20000;

float tempC = 0;
float humidite = 0;
int luminositeBrute = 0;
float luminositeLux = 0;

void setup() {
  Serial.begin(115200);
  delay(100);
  dht.begin();
  Serial.println("Hello ESP32"); 
}

void loop() {
  tempC = dht.readTemperature();
  luminositeBrute = analogRead(photoPin);
  luminositeLux = map(luminositeBrute, 0, maxRaw, 0, maxLux);

  Serial.println(F("================================="));
  Serial.println(F("Mesures actuelles :"));
  Serial.print(F("Température : "));
  Serial.print(tempC);
  Serial.println(F(" °C"));

int soilValue = analogRead(soil_moisture_pin);
int soilPercent = map(soilValue, 4095, 0, 0, 100); 

Serial.print(F("Humidité : "));
Serial.print(soilPercent);
Serial.println(F(" %"));
Serial.print(F("Luminosité : "));
Serial.print(luminositeLux);
Serial.println(F(" lux"));
Serial.println(F("================================="));

  delay(5000);
}
