#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const int photoPin = A1;
const int maxRaw = 448;
const int maxLux = 20000;

float tempC = 0;
float humidite = 0;
int luminositeBrute = 0;
float luminositeLux = 0;

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  tempC = dht.readTemperature();
  humidite = dht.readHumidity();
  luminositeBrute = analogRead(photoPin);
  luminositeLux = map(luminositeBrute, 0, maxRaw, 0, maxLux);
  Serial.println("----------------------------------");
  Serial.println("Mesures actuelles :");
  Serial.print("Température : ");
  Serial.print(tempC);
  Serial.println(" °C");
  Serial.print("Humidité : ");
  Serial.print(humidite);
  Serial.println(" %");
  Serial.print("Luminosité : ");
  Serial.print(luminositeLux);
  Serial.println(" lux");
  Serial.println("----------------------------------");
  delay(5000);
}
