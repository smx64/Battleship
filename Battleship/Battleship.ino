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

  // --- PLAYER 1 LIGHTS INITIALIZE --- //

  pinMode(2,OUTPUT);      //blue LED
  pinMode(3,OUTPUT);      //white LED
  pinMode(4,OUTPUT);      //red LED
  pinMode(5,OUTPUT);      //orange LED

  digitalWrite(2,LOW);    //blue LED
  digitalWrite(3,LOW);   //white LED
  digitalWrite(4,LOW);    //red LED
  digitalWrite(5,LOW);    //orange LED

  // --- PLAYER 2 LIGHTS INITIALIZE --- //

  pinMode(7,OUTPUT);      //blue LED
  pinMode(8,OUTPUT);      //white LED
  pinMode(9,OUTPUT);      //red LED
  pinMode(10,OUTPUT);      //orange LED

  digitalWrite(7,LOW);    //blue LED
  digitalWrite(8,LOW);   //white LED
  digitalWrite(9,LOW);    //red LED
  digitalWrite(10,LOW);    //orange LED
}

void loop()
{
  if(Serial.available()>0)
  {
    int byteIn = Serial.read();
    
    // --- PLAYER 1 LIGHTS --- //

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

    // --- PLAYER 2 LIGHTS --- //

    else if(byteIn == 'P') //BLUE - PLAYER 2
    {
      Serial.flush();

      digitalWrite(7,HIGH);
      digitalWrite(8,LOW);
      digitalWrite(9,LOW);
      digitalWrite(10,LOW);
    }
    else if(byteIn == 'Q') //WHITE - PLAYER 2
    {
      Serial.flush();

      digitalWrite(7,LOW);
      digitalWrite(8,HIGH);
      digitalWrite(9,LOW);
      digitalWrite(10,LOW);
    }
    else if(byteIn == 'R') //BLUE & WHITE - PLAYER 2
    {
      Serial.flush();

      digitalWrite(7,HIGH);
      digitalWrite(8,HIGH);
      digitalWrite(9,LOW);
      digitalWrite(10,LOW);
    }
    else if(byteIn == 'S') //RED & ORANGE - PLAYER 2
    {
      Serial.flush();

      digitalWrite(7,LOW);
      digitalWrite(8,LOW);
      digitalWrite(9,HIGH);
      digitalWrite(10,HIGH);
    }

    // --- ALL LIGHTS OFF --- //

    else if(byteIn == 'X') //PLAYER 1
    {
      Serial.flush();
      
      digitalWrite(2,LOW);
      digitalWrite(3,LOW);
      digitalWrite(4,LOW);
      digitalWrite(5,LOW);
    }
    else if (byteIn == 'Y') //PLAYER 2
    {
      Serial.flush();

      digitalWrite(7,LOW);
      digitalWrite(8,LOW);
      digitalWrite(9,LOW);
      digitalWrite(10,LOW);
    }
  }
}
