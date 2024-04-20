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
  Serial.begin(9600);
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
    
    if(byteIn == 'A') //BLUE - PLAYER 1
    {
      Serial.flush();

      digitalWrite(2,HIGH);
      digitalWrite(3,LOW);
      digitalWrite(4,LOW);
      digitalWrite(5,LOW);
    }
    else if(byteIn == 'B') //WHITE - PLAYER 1
    {
      Serial.flush();

      digitalWrite(2,LOW);
      digitalWrite(3,HIGH);
      digitalWrite(4,LOW);
      digitalWrite(5,LOW);
    }
    else if(byteIn == 'C') //BLUE & WHITE - PLAYER 1
    {
      Serial.flush();

      digitalWrite(2,HIGH);
      digitalWrite(3,HIGH);
      digitalWrite(4,LOW);
      digitalWrite(5,LOW);
    }
    else if(byteIn == 'D') //RED & ORANGE - PLAYER 1
    {
      Serial.flush();

      digitalWrite(2,LOW);
      digitalWrite(3,LOW);
      digitalWrite(4,HIGH);
      digitalWrite(5,HIGH);
    }
    else //ALL LIGHTS OFF - PLAYER 1
    {
      Serial.flush();
      
      digitalWrite(2,LOW);
      digitalWrite(3,LOW);
      digitalWrite(4,LOW);
      digitalWrite(5,LOW);
    }
  }
}
