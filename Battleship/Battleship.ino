#include <ArduinoJson.h>

void sendData()
{
  StaticJsonDocument<128> resJson;
  JsonObject data = resJson.createNestedObject("data");

  String resTxt = "";
  serializeJson(resJson, resTxt);
  Serial.println(resTxt); 
}

void setup()
{
  Serial.begin(115200);
  while(!Serial)
  {
    //empty
  }

  pinMode(2,OUTPUT);      //blue LED
  pinMode(3,OUTPUT);      //white LED
  pinMode(4,OUTPUT);      //red LED
  pinMode(5,OUTPUT);      //orange LED

  digitalWrite(2,LOW);    //blue LED
  digitalWrite(3,LOW);   //white LED
  digitalWrite(4,LOW);    //red LED
  digitalWrite(5,LOW);    //orange LED
}

void loop()
{
  if(Serial.available()>0)
  {
    int byteIn = Serial.read();
    if(byteIn == 'A')
    {
      Serial.flush();

      digitalWrite(2,HIGH);
      digitalWrite(3,HIGH);
      delay(500);
      digitalWrite(2,LOW);
      digitalWrite(3,HIGH);
      delay(500);
    }
    else if(byteIn == 'B')
    {
      Serial.flush();

      digitalWrite(4,HIGH);
      digitalWrite(5,HIGH);
      delay(500);
      digitalWrite(4,LOW);
      digitalWrite(5,LOW);
      delay(500);
    }
  }
}
