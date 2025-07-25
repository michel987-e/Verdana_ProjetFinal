#include <WiFi.h>
#include <WebServer.h>
#include "DHT.h"

const char* ssid = "a5G";
const char* password = "12341111";

WebServer server(80);

#define DHTPIN 25
#define DHTTYPE DHT22
#define soil_moisture_pin 14
#define photoPin 34

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(ssid, password);
  Serial.print("Connexion au WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnecté !");
  Serial.print("IP locale : ");
  Serial.println(WiFi.localIP());

  server.on("/", []() {
    server.send(200, "text/html", "<h1>Page ESP32</h1>>");
  });
  server.on("/data", []() {
    float tempC = dht.readTemperature();
    float humiditeAir = dht.readHumidity();

    int soilValue = analogRead(soil_moisture_pin);
    int soilPercent = map(soilValue, 4095, 0, 0, 100);

    int luminositeBrute = analogRead(photoPin);
    float maxRaw = 448.0;
    float maxLux = 20000.0;
    float luminositeLux = (luminositeBrute / maxRaw) * maxLux;

    Serial.println(F("================================="));
    Serial.println(F("Mesures actuelles :"));
    Serial.print(F("Température : ")); Serial.print(tempC); Serial.println(F(" °C"));
    Serial.print(F("Humidité air : ")); Serial.print(humiditeAir); Serial.println(F(" %"));
    Serial.print(F("Humidité sol : ")); Serial.print(soilPercent); Serial.println(F(" %"));
    Serial.print(F("Luminosité : ")); Serial.print(luminositeLux); Serial.println(F(" lux"));

    String json = "{";
    json += "\"temperature\": " + String(tempC, 2) + ",";
    json += "\"humidity\": " + String(humiditeAir, 2) + ",";
    json += "\"soil_moisture\": " + String(soilPercent) + ",";
    json += "\"light\": " + String(luminositeLux, 2);
    json += "}";

    server.send(200, "application/json", json);
  });

  server.begin();
  Serial.println("Serveur démarré");
}

void loop() {
  server.handleClient();
}