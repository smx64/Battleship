//set game board dimensions & gameplay-related flags
let grid_dimension = 7;
let gameFlag = 0;
let p1_shipNumber = 0;
let p2_shipNumber = 0;
let rotateFlag = 0;
let oneLoop = 0;

let activeSide = 'R';
let allDestroyed_P1 = 0;
let allDestroyed_P2 = 0;
let total_shipGrids = 0;

let shipDestroyed = 0;
let shipID_Destroyed = 0;
let shipRemain_P1, shipRemain_P2;

//initializing aesthetic asset variables
let backgroundImage;
let connectButton;
let shipImage1, shipImage2, shipImage3;
let gameFont_bold, gameFont_light;
let bgm_setup, bgm_gameplay;
let explosionSound, splashSound;

//arrays for class objects for each player
let p1_battlegrid_array = [];
let p1_battleships_array = [];
let p2_battlegrid_array = [];
let p2_battleships_array = [];

//array containing block sizes of all battleships
let ship_sizes = [2,3,4];
let ship_names = ["DESTROYER", "CRUISER", "CARRIER"];
let ship_clickCounter_P1 = [0,0,0];
let ship_clickCounter_P2 = [0,0,0];

function preload()
{
  backgroundImage = loadImage("./Waves.jpg");
  homeImage = loadImage("./HomeScreen.png");
  shipImage1 = loadImage("./Ship_Destroyer.png");
  shipImage2 = loadImage("./Ship_Cruiser.png");
  shipImage3 = loadImage("./Ship_Carrier.png");

  gameFont_bold = loadFont("./ChakraPetch-Bold.ttf");
  gameFont_light = loadFont("./ChakraPetch-Light.ttf");

  bgm_setup = loadSound("./SetupScore.mp3");
  bgm_gameplay = loadSound("./GameplayScore.mp3");
  explosionSound = loadSound("./Explosion.mp3");
  splashSound = loadSound("./WaterSplash.wav");
}

//function to start game on button click
function gameConnect()
{
    connectButton.hide();
    gameFlag = 1;

    //starting background music for setup screens
    bgm_setup.playMode('untilDone');
    bgm_setup.loop();
}

//class initialization for the game board - player 1
class P1_Battlegrid
{
  constructor(_grid_xPos, _grid_yPos, _grid_id_row, _grid_id_col)
  {
    this.grid_xPos = _grid_xPos;
    this.grid_yPos = _grid_yPos;
    this.grid_size = 60;
    this.grid_separation = this.grid_size+5;
    this.grid_id_row = _grid_id_row;
    this.grid_id_col = _grid_id_col;
    this.grid_fillColor = color(0,0,25,100);
    this.grid_strokeColor = color(150);

    this.grid_hoverFlag = 0;
    this.grid_occupiedFlag = 0;
    this.clickedFlag = 0;
  }
  //function to draw squares of the matrix
  drawGrid()
  {
    rectMode(CENTER);
    fill(this.grid_fillColor);
    stroke(this.grid_strokeColor);
    strokeWeight(3);
    
    rect(this.grid_xPos, this.grid_yPos, this.grid_size);
  }
  //function to change fill color of squares on mouse-hover
  gridColor(_ship_blockSize, _shipNumber)
  {
    //logic to detect mouse-hover over each square
    if(dist(this.grid_xPos, this.grid_yPos, mouseX, mouseY) <= this.grid_size/2)
    {
      //checking whether ships are within the matrix boundaries & in 0* position
      if(rotateFlag == 0 && (this.grid_id_col+_ship_blockSize) < grid_dimension)
      {
        //looping for every ship size in ship_sizes array
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(0,255,0);
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_strokeColor = color(0,200,0);
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0
          if(p1_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_col);
          }
          else
          {
            p1_battleships_array[_shipNumber].shipGrids = [];
          }
        }
      }
      //rotating the ship 90* and checking for game board boundaries
      else if(rotateFlag == 90 && (this.grid_id_row+_ship_blockSize) < grid_dimension)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(0,255,0);
          p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_strokeColor = color(0,200,0);
          p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0
          if(p1_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_col);
          }
          else
          {
            p1_battleships_array[_shipNumber].shipGrids = [];
          }
        }        
      }
      //rotating the ship 180* and checking for game board boundaries
      else if(rotateFlag == 180 && (this.grid_id_col-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(0,255,0);
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_strokeColor = color(0,200,0);
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0
          if(p1_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_col);
          }
          else
          {
            p1_battleships_array[_shipNumber].shipGrids = [];
          }
        }        
      }
      //rotating the ship 270* and checking for game board boundaries
      else if(rotateFlag == 270 && (this.grid_id_row-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(0,255,0);
          p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_strokeColor = color(0,200,0);
          p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0
          if(p1_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_col);
          }
          else
          {
            p1_battleships_array[_shipNumber].shipGrids = [];
          }
        }        
      }
      else
      {
        for(let i=0; i<_ship_blockSize; i++)
        {
          //checking whether if the whole ship can fit onto the game board or not w.r.t. ship orientation
          if(rotateFlag == 0 && (this.grid_id_col+i < grid_dimension))
          {
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(255,0,0);
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_strokeColor = color(100,0,0);
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 90 && (this.grid_id_row+i < grid_dimension))
          {
            p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(255,0,0);
            p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_strokeColor = color(100,0,0);
            p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 180 && (this.grid_id_col-i >= 0))
          {
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(255,0,0);
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_strokeColor = color(100,0,0);
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 270 && (this.grid_id_row-i >= 0))
          {
            p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(255,0,0);
            p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_strokeColor = color(100,0,0);
            p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 0;
          }
        }
      }
    }
    else
    {
      //resetting hoverFlag & fill once mouse moves away, and if any ship is not placed in the grid
      if(this.grid_occupiedFlag != 1)
      {
        this.grid_fillColor = color(0,0,25,100);
        this.grid_strokeColor = color(150);
      }

      this.grid_hoverFlag = 0;
    }
  }
  //set grid color & occupiedFlag = 1 when square selected (on mouse-click)
  gridOccupied()
  {
    this.grid_occupiedFlag = 1;
    this.grid_fillColor = color(0,255,0);
    this.grid_strokeColor = color(0,200,0);
  }
  //highlight grid on mouse-hover during gameplay
  gameplay_gridHover()
  {
    if(this.clickedFlag != 1)
    {
      if(dist(this.grid_xPos, this.grid_yPos, mouseX, mouseY) <= this.grid_size/2)
      {
        this.grid_hoverFlag = 1;
        this.grid_fillColor = color(0,0,255,200);
        this.grid_strokeColor = color(255);
      }
      else
      {
        this.grid_hoverFlag = 0;
        this.grid_fillColor = color(0,0,25,100);
        this.grid_strokeColor = color(150);
      }
    }
  }
  //change grid color on mouse-click based on occupiedFlag value
  gameplay_gridClicked(_ship_sizes)
  {
    this.clickedFlag = 1; 
    this.grid_hoverFlag = 0;
    shipDestroyed = 0;

    if(this.grid_occupiedFlag == 1)
    {
      this.grid_fillColor = color(255,0,0,200);
      allDestroyed_P1 +=1;
      
      //light up red & orange leds for player 2 interface during gameplay
      arduinoLetterValue = 'S';

      explosionSound.playMode('restart');
      explosionSound.play();

      //functionality to count which ship got clicked
      for(let i=0; i<p1_battleships_array.length; i++)
      {
        for(let j=0; j<p1_battleships_array[i].shipGrids.length; j+=2)
        {
          if(this.grid_id_row == p1_battleships_array[i].shipGrids[j] && this.grid_id_col == p1_battleships_array[i].shipGrids[j+1])
          {
            ship_clickCounter_P1[i]++;
            if(ship_clickCounter_P1[i] == _ship_sizes[i])
            {
              shipDestroyed = 1;
              shipID_Destroyed = i;
              shipRemain_P2--;
            }
          }
        }
      }
    }
    else
    {
      this.grid_fillColor = color(0,255,0,215);

      //light up blue & white leds for player 2 interface during gameplay
      arduinoLetterValue = 'R';

      splashSound.playMode('restart');
      splashSound.play();
    }
  }
}

//class initialization for the ships - player 1
class P1_Battleships
{
  constructor(_shipLength, _shipType)
  {
    this.shipLength = _shipLength;
    this.shipType = _shipType;
    this.shipGrids = [];
  }
}

//class initialization for the game board - player 2
class P2_Battlegrid
{
  constructor(_grid_xPos, _grid_yPos, _grid_id_row, _grid_id_col)
  {
    this.grid_xPos = _grid_xPos;
    this.grid_yPos = _grid_yPos;
    this.grid_size = 60;
    this.grid_separation = this.grid_size+5;
    this.grid_id_row = _grid_id_row;
    this.grid_id_col = _grid_id_col;
    this.grid_fillColor = color(0,0,25,100);
    this.grid_strokeColor = color(150);

    this.grid_hoverFlag = 0;
    this.grid_occupiedFlag = 0;
    this.clickedFlag = 0;
  }
  //function to draw squares of the matrix
  drawGrid()
  {
    rectMode(CENTER);
    fill(this.grid_fillColor);
    stroke(this.grid_strokeColor);
    strokeWeight(3);
    
    rect(this.grid_xPos, this.grid_yPos, this.grid_size);
  }
  //function to change fill color of squares on mouse-hover
  gridColor(_ship_blockSize, _shipNumber)
  {
    //logic to detect mouse-hover over each square
    if(dist(this.grid_xPos, this.grid_yPos, mouseX, mouseY) <= this.grid_size/2)
    {
      //checking whether ships are within the matrix boundaries & in 0* position
      if(rotateFlag == 0 && (this.grid_id_col+_ship_blockSize) < grid_dimension)
      {
        //looping for every ship size in ship_sizes array
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(0,255,0);
          p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_strokeColor = color(0,200,0);
          p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0;
          if(p2_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_row);
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_col);
          }
          else
          {
            p2_battleships_array[_shipNumber].shipGrids = [];
          }
        }
      }
      //rotating the ship 90* and checking for game board boundaries
      else if(rotateFlag == 90 && (this.grid_id_row+_ship_blockSize) < grid_dimension)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(0,255,0);
          p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_strokeColor = color(0,200,0);
          p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0
          if(p2_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_row);
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_col);
          }
          else
          {
            p2_battleships_array[_shipNumber].shipGrids = [];
          }
        }        
      }
      //rotating the ship 180* and checking for game board boundaries
      else if(rotateFlag == 180 && (this.grid_id_col-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(0,255,0);
          p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_strokeColor = color(0,200,0);
          p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0
          if(p2_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_row);
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_col);
          }
          else
          {
            p2_battleships_array[_shipNumber].shipGrids = [];
          }
        }        
      }
      //rotating the ship 270* and checking for game board boundaries
      else if(rotateFlag == 270 && (this.grid_id_row-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(0,255,0);
          p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_strokeColor = color(0,200,0);
          p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1 & occupiedFlag = 0
          if(p2_battlegrid_array[this.grid_id_row][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_row);
            p2_battleships_array[_shipNumber].shipGrids.push(p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_col);
          }
          else
          {
            p2_battleships_array[_shipNumber].shipGrids = [];
          }
        }        
      }
      else
      {
        for(let i=0; i<_ship_blockSize; i++)
        {
          //checking whether if the whole ship can fit onto the game board or not w.r.t. ship orientation
          if(rotateFlag == 0 && (this.grid_id_col+i < grid_dimension))
          {
            p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(255,0,0);
            p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_strokeColor = color(100,0,0);
            p2_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 90 && (this.grid_id_row+i < grid_dimension))
          {
            p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(255,0,0);
            p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_strokeColor = color(100,0,0);
            p2_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 180 && (this.grid_id_col-i >= 0))
          {
            p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(255,0,0);
            p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_strokeColor = color(100,0,0);
            p2_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 270 && (this.grid_id_row-i >= 0))
          {
            p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(255,0,0);
            p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_strokeColor = color(100,0,0);
            p2_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 0;
          }
        }
      }
    }
    else
    {
      //resetting hoverFlag & fill once mouse moves away, and if any ship is not placed in the grid
      if(this.grid_occupiedFlag != 1)
      {
        this.grid_fillColor = color(0,0,25,100);
        this.grid_strokeColor = color(150);
      }

      this.grid_hoverFlag = 0;
    }
  }
  //set grid color & occupiedFlag = 1 when square selected (on mouse-click)
  gridOccupied()
  {
    this.grid_fillColor = color(0,255,0);
    this.grid_strokeColor = color(0,200,0);
    this.grid_occupiedFlag = 1;
  }
  //highlight grid on mouse-hover during gameplay
  gameplay_gridHover()
  {
    if(this.clickedFlag != 1)
    {
      if(dist(this.grid_xPos, this.grid_yPos, mouseX, mouseY) <= this.grid_size/2)
      {
        this.grid_hoverFlag = 1;
        this.grid_fillColor = color(0,0,255,200);
        this.grid_strokeColor = color(255);
      }
      else
      {
        this.grid_hoverFlag = 0;
        this.grid_fillColor = color(0,0,25,100);
        this.grid_strokeColor = color(150);
      }
    }
  }
  //change grid color on mouse-click based on occupiedFlag value
  gameplay_gridClicked(_ship_sizes)
  {
    this.clickedFlag = 1; 
    this.grid_hoverFlag = 0;
    shipDestroyed = 0;

    if(this.grid_occupiedFlag == 1)
    {
      this.grid_fillColor = color(255,0,0,200);
      allDestroyed_P2 +=1;

      //light up red & orange leds for player 1 interface during gameplay
      arduinoLetterValue = 'D';

      explosionSound.playMode('restart');
      explosionSound.play();

      //functionality to count which ship got clicked
      for(let i=0; i<p2_battleships_array.length; i++)
      {
        for(let j=0; j<p2_battleships_array[i].shipGrids.length; j+=2)
        {
          if(this.grid_id_row == p2_battleships_array[i].shipGrids[j] && this.grid_id_col == p2_battleships_array[i].shipGrids[j+1])
          {
            ship_clickCounter_P2[i]++;
            if(ship_clickCounter_P2[i] == _ship_sizes[i])
            {
              shipDestroyed = 2;
              shipID_Destroyed = i;
              shipRemain_P1--;
            }
          }
        }
      }
    }
    else
    {
      this.grid_fillColor = color(0,255,0,215);
      
      //light up blue & white leds for player 1 interface during gameplay
      arduinoLetterValue = 'C';

      splashSound.playMode('restart');
      splashSound.play();
    }
  }
  //
  gridColorReset()
  {
    this.grid_fillColor = color(0,0,25,150);
  }
}

//class initialization for the ships - player 2
class P2_Battleships
{
  constructor(_shipLength, _shipType)
  {
    this.shipLength = _shipLength;
    this.shipType = _shipType;
    this.shipGrids = [];
  }
}

//function to generate ship images and page text content - player 1
function p1_setupScreenTexts(_shipNumber, _ship_blockSize)
{
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255);

  textFont(gameFont_bold);
  textSize(50);
  text("SETUP | PLAYER 1", width/2, height-(height/1.11));

  switch(_shipNumber)
  {
    case 0: //destroyer
      image(shipImage1, width/1.55, height/1.8, width/2.5, height/2.5);
      break;

    case 1: //cruiser
      image(shipImage2, width/1.55, height/1.95, width/2.25, height/2.25);
      break;

    case 2: //carrier
      image(shipImage3, width/1.45, height/1.85, width/2.2, height/2.2);
      break;
  }

  textSize(35);
  textFont(gameFont_bold);
  text(p1_battleships_array[_shipNumber].shipType, width/1.4, height/1.235);

  textSize(20);
  textFont(gameFont_light);
  text("SHIP NUMBER: "+(_shipNumber+1)+" / "+p1_battleships_array.length, width/1.85, height/1.28);
  text("SHIP SIZE: "+_ship_blockSize+" Blocks", width/1.85, height/1.22)

  text("Press [ R ] to rotate ship's orientation", width/4.2, height/1.14);
  text("Click [ LEFT MOUSE ] button to place the ship", width/4.2, height/1.09);
}

//function to generate ship images and page text content - player 2
function p2_setupScreenTexts(_shipNumber, _ship_blockSize)
{
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255);

  textFont(gameFont_bold);
  textSize(50);
  text("SETUP | PLAYER 2", width/2, height-(height/1.11));

  //flipping images horizontally
  push();
  scale(-1,1);
    switch(_shipNumber)
    {
      case 0: //destroyer
        image(shipImage1, -width/3.1, height/1.8, width/2.5, height/2.5);    
        break;

      case 1: //cruiser
        image(shipImage2, -width/3.1, height/1.95, width/2.25, height/2.25);
        break;

      case 2: //carrier      
        image(shipImage3, -width/3.1, height/1.85, width/2.2, height/2.2);
        break;
    }
  pop();

  textSize(35);
  textFont(gameFont_bold);
  text(p2_battleships_array[_shipNumber].shipType, width/4.255, height/1.235);

  textSize(20);
  textFont(gameFont_light);
  text("SHIP NUMBER: "+(_shipNumber+1)+" / "+p1_battleships_array.length, width/2.25, height/1.28);
  text("SHIP SIZE: "+_ship_blockSize+" Blocks", width/2.25, height/1.22)

  text("Press [ R ] to rotate ship's orientation", width/1.365, height/1.14);
  text("Click [ LEFT MOUSE ] button to place the ship", width/1.365, height/1.09);
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(homeImage);

  shipRemain_P1 = ship_sizes.length;
  shipRemain_P2 = ship_sizes.length;

  //homescreen text
  fill(0,70);
  rectMode(CORNER);
  rect(0,0,width,height);

  fill(255);
  noStroke();
  textAlign(CENTER,CENTER);
  textFont(gameFont_bold);
  textSize(75);
  text("BATTLESHIP", width/2, height/3.7);

  textFont(gameFont_light);
  textSize(15);
  text("SHASHWAT MISHRA | 2024", width/1.08, height/1.03);

  //code snippet to create game splash screen
  connectButton = createButton("INITIATE GAME");
  connectButton.position(width/2.78,height/3);
  connectButton.style("width", width/3.5+"px");
  connectButton.style("height", height/25+"px");
  connectButton.style("border-radius", "5px");
  connectButton.mouseClicked(gameConnect);

  //instantiating matrix (game board) - player 1
  let p1_init_gridPosY = int(height/3.75);
  for(let i=0; i<grid_dimension; i++)
  {
    let p1_init_gridPosX = int(width/9);
    p1_battlegrid_array.push([]);

    for(let j=0; j<grid_dimension; j++)
    {
      let p1_gridObject = new P1_Battlegrid(p1_init_gridPosX, p1_init_gridPosY, i, j)
      p1_battlegrid_array[i].push(p1_gridObject);
      p1_init_gridPosX += p1_battlegrid_array[i][j].grid_separation;
    }
    
    p1_init_gridPosY += p1_battlegrid_array[i][i].grid_separation;
  }

  //instantiating each ship in their own class - player 1
  for(let i=0; i<ship_sizes.length; i++)
  {
    let p1_shipObject = new P1_Battleships(ship_sizes[i], ship_names[i]);
    p1_battleships_array.push(p1_shipObject);
  }

  //instantiating matrix (game board) - player 2
  let p2_init_gridPosY = int(height/3.75);
  for(let i=0; i<grid_dimension; i++)
  {
    let p2_init_gridPosX = int(width/1.66);
    p2_battlegrid_array.push([]);

    for(let j=0; j<grid_dimension; j++)
    {
      let p2_gridObject = new P2_Battlegrid(p2_init_gridPosX, p2_init_gridPosY, i, j)
      p2_battlegrid_array[i].push(p2_gridObject);
      p2_init_gridPosX += p2_battlegrid_array[i][j].grid_separation;
    }
    
    p2_init_gridPosY += p2_battlegrid_array[i][i].grid_separation;
  }

  //instantiating each ship in their own class - player 2
  for(let i=0; i<ship_sizes.length; i++)
  {
    let p2_shipObject = new P2_Battleships(ship_sizes[i], ship_names[i]);
    p2_battleships_array.push(p2_shipObject);
  }
}

function draw()
{
  if(gameFlag > 0)
  {
    imageMode(CORNER);
    background(backgroundImage);
  }

  // --- PLAYER 1 SETUP SCREEN --- //

  if(gameFlag == 1)
  {
    //drawing the matrix (game board)
    for(let gridRow=0; gridRow<grid_dimension; gridRow++)
    {
      for(let gridColumn=0; gridColumn<grid_dimension; gridColumn++)
      {
        p1_battlegrid_array[gridRow][gridColumn].drawGrid();

        //rotate the ship on key-press
        if(key == 'r' && keyIsPressed == true)
        {
          rotateFlag+=90;
          keyIsPressed = false;

          //ship orientation completes full circle
          if(rotateFlag == 360)
          {
            rotateFlag = 0;
          }
        }
        
        //p1_shipNumber is just a loop variable
        if(p1_shipNumber < p1_battleships_array.length)
        {          
          //ship_blockSize is the size of the respective ship in blocks
          let ship_blockSize = p1_battleships_array[p1_shipNumber].shipLength;
          
          //passing ship_blockSize-1 as paramter because iterator starts from 0
          p1_battlegrid_array[gridRow][gridColumn].gridColor(ship_blockSize-1, p1_shipNumber);

          //generating ship images and related text content
          p1_setupScreenTexts(p1_shipNumber, ship_blockSize);

          //on mouse-click: "place" the ship & send coordinates to Battleship class
          if(mouseButton == LEFT && mouseIsPressed == true && p1_battlegrid_array[gridRow][gridColumn].grid_hoverFlag == 1)
          {
            if(p1_battlegrid_array[gridRow][gridColumn].grid_occupiedFlag == 0)
            {
              //remove all the grid IDs from Battleship, except the latest ones for the given ship_blockSize
              p1_battleships_array[p1_shipNumber].shipGrids.splice(0, p1_battleships_array[p1_shipNumber].shipGrids.length-(ship_blockSize*2));

              for(let i=0; i<p1_battleships_array[p1_shipNumber].shipGrids.length; i+=2)
              {
                p1_battlegrid_array[p1_battleships_array[p1_shipNumber].shipGrids[i]][p1_battleships_array[p1_shipNumber].shipGrids[i+1]].gridOccupied();
              }            

              p1_shipNumber++;
              mouseIsPressed = false;
            }
            else
            {
              //keep the loop running on same shipNumber
            }
          }
        }
        //all ships have been placed
        else
        {
          textAlign(CENTER,CENTER);
          noStroke();
          fill(255);

          textFont(gameFont_bold);
          textSize(50);
          text("SETUP | PLAYER "+gameFlag, width/2, height-(height/1.11));
          textSize(30);
          text("Your ships have been placed!", width/1.85, height/2.2);
          textFont(gameFont_light);
          textSize(20);
          text("Press [ ENTER ] to confirm your setup", width/1.94, height/1.98);

          if(keyCode == ENTER && keyIsPressed == true)
          {
            gameFlag = 2;
            keyIsPressed = false;
            break;
          }
        }
      }
    }
  }

  // --- PLAYER 2 SETUP SCREEN --- //

  else if(gameFlag == 2)
  {
    //drawing the matrix (game board)
    for(let gridRow=0; gridRow<grid_dimension; gridRow++)
    {
      for(let gridColumn=0; gridColumn<grid_dimension; gridColumn++)
      {
        p2_battlegrid_array[gridRow][gridColumn].drawGrid();

        //rotate the ship on key-press
        if(key == 'r' && keyIsPressed == true)
        {
          rotateFlag+=90;
          keyIsPressed = false;

          //ship orientation completes full circle
          if(rotateFlag == 360)
          {
            rotateFlag = 0;
          }
        }

        //p2_shipNumber is just a loop variable
        if(p2_shipNumber < p2_battleships_array.length)
        {
          //ship_blockSize is the size of the respective ship in blocks
          let ship_blockSize = p2_battleships_array[p2_shipNumber].shipLength;
          
          //passing ship_blockSize-1 as paramter because iterator starts from 0
          p2_battlegrid_array[gridRow][gridColumn].gridColor(ship_blockSize-1, p2_shipNumber);

          //generating ship images and related text content
          p2_setupScreenTexts(p2_shipNumber, ship_blockSize);
          
          //on mouse-click: "place" the ship & send coordinates to Battleship class
          if(mouseButton == LEFT && mouseIsPressed == true && p2_battlegrid_array[gridRow][gridColumn].grid_hoverFlag == 1)
          {
            if(p2_battlegrid_array[gridRow][gridColumn].grid_occupiedFlag == 0)
            {
              //remove all the grid IDs from Battleship, except the latest ones for the given ship_blockSize
              p2_battleships_array[p2_shipNumber].shipGrids.splice(0, p2_battleships_array[p2_shipNumber].shipGrids.length-(ship_blockSize*2));

              for(let i=0; i<p2_battleships_array[p2_shipNumber].shipGrids.length; i+=2)
              {
                p2_battlegrid_array[p2_battleships_array[p2_shipNumber].shipGrids[i]][p2_battleships_array[p2_shipNumber].shipGrids[i+1]].gridOccupied();
              }

              p2_shipNumber++;
              mouseIsPressed = false;
            }
            else
            {
              //keep the loop running on same shipNumber
            }
          }
        }
        //all ships have been placed
        else
        {
          textAlign(CENTER,CENTER);
          noStroke();
          fill(255);

          textFont(gameFont_bold);
          textSize(50);
          text("SETUP | PLAYER "+gameFlag, width/2, height-(height/1.11));
          textSize(30);
          text("Your ships have been placed!", width/2.65, height/2.2);
          textFont(gameFont_light);
          textSize(20);
          text("Press [ ENTER ] to confirm your setup", width/2.47, height/1.98);

          if(keyCode == ENTER && keyIsPressed == true)
          {
            gameFlag = 3;

            //changing background music
            bgm_setup.stop();
            bgm_gameplay.playMode('untilDone');
            bgm_gameplay.loop();
            bgm_gameplay.setVolume(0.3);

            arduinoLetterValue = 'Y';
            keyIsPressed = false;
            break;
          }
        }
      }
    }
  }

  // --- MAIN GAMEPLAY INTERFACE --- //

  else if(gameFlag == 3)
  {
    // PLAYER 1 INTERFACE //
    for(let gridRow=0; gridRow<grid_dimension; gridRow++)
    {
      for(let gridColumn=0; gridColumn<grid_dimension; gridColumn++)
      {
        p2_battlegrid_array[gridRow][gridColumn].drawGrid();

        if(activeSide == 'R')
        {
          p2_battlegrid_array[gridRow][gridColumn].gameplay_gridHover();
          if(mouseButton == LEFT && mouseIsPressed == true && p2_battlegrid_array[gridRow][gridColumn].grid_hoverFlag == 1)
          {
            p2_battlegrid_array[gridRow][gridColumn].gameplay_gridClicked(ship_sizes);
            activeSide = 'L';
            mouseIsPressed = false;
          }
        }
        //resetting grid colors for player 2 matrix just during the first round
        else if(activeSide == 'L' && oneLoop == 0)
        {
          p2_battlegrid_array[gridRow][gridColumn].grid_fillColor = color(0,0,25,150);
          p2_battlegrid_array[gridRow][gridColumn].grid_strokeColor = color(150);
        }
      }
    }

    // PLAYER 2 INTERFACE //
    for(let gridRow=0; gridRow<grid_dimension; gridRow++)
    {
      for(let gridColumn=0; gridColumn<grid_dimension; gridColumn++)
      {
        p1_battlegrid_array[gridRow][gridColumn].drawGrid();

        if(activeSide == 'L')
        {
          p1_battlegrid_array[gridRow][gridColumn].gameplay_gridHover();
          if(mouseButton == LEFT && mouseIsPressed == true && p1_battlegrid_array[gridRow][gridColumn].grid_hoverFlag == 1)
          {
            p1_battlegrid_array[gridRow][gridColumn].gameplay_gridClicked(ship_sizes);
            activeSide = 'R';
            mouseIsPressed = false;
          }
        }
        //resetting grid colors for player 1 matrix just during the first round
        else if(activeSide == 'R' && oneLoop == 0)
        {
          p1_battlegrid_array[gridRow][gridColumn].grid_fillColor = color(0,0,25,150);
          p1_battlegrid_array[gridRow][gridColumn].grid_strokeColor = color(150);
        }
      }
    }

    //calculating the total number of grids occupied by ships (same for both players)
    if(oneLoop == 0)
    {
      for(let i=0; i<p1_battleships_array.length; i++)
      {
        total_shipGrids += p1_battleships_array[i].shipGrids.length;
      }
      total_shipGrids = total_shipGrids/2;      
    }

    //variable to run loops only for one round
    oneLoop = 1;

    //code snippet to display enemy ship counts
    noStroke();
    fill(255);
    textAlign(CENTER,CENTER);
    textFont(gameFont_bold);
    textSize(20);
    text("ENEMY SHIPS LEFT: "+shipRemain_P1, width/4.2, height/1.15);
    text("ENEMY SHIPS LEFT: "+shipRemain_P2, width/1.35, height/1.15);

    //black overlay & text depending on which side is active
    noStroke();
    rectMode(CORNER);

    textAlign(CENTER,CENTER);
    textFont(gameFont_bold);
    textSize(75);

    if(activeSide == 'R')
    {
      fill(0,200);
      rect(0, 0, width/2, height);

      fill(255);
      text("PLAYER 1", width/4, height/2);
    }
    else if(activeSide == 'L')
    {
      fill(0,200);
      rect(width/2, 0, width/2, height);

      fill(255);
      text("PLAYER 2", width/1.35, height/2);
    }

    //code snippet for displaying which ship destroyed for each player
    if(shipDestroyed !=0)
    {
      if(shipDestroyed == 1)
      {
        fill(255,100,100);
      }
      else if(shipDestroyed == 2)
      {
        fill(100,255,100);
      }
      noStroke();

      textAlign(CENTER,CENTER);
      textSize(20);
      textFont(gameFont_bold);      
      text("[ A PLAYER "+(shipDestroyed)+" SHIP HAS BEEN DESTROYED ]", width/2.1, height/1.1);
      textFont(gameFont_light);
      text(p1_battleships_array[shipID_Destroyed].shipType +" - "+p1_battleships_array[shipID_Destroyed].shipLength+" Blocks", width/2.1, height/1.06);
    }

    //code snippet to check whether all ships destroyed for a player & announce winner
    if(allDestroyed_P1 == total_shipGrids || allDestroyed_P2 == total_shipGrids)
    {
      //removes the "active player" overlay
      activeSide = 'X';
      bgm_gameplay.stop();

      fill(0,0,0,125);
      noStroke();
      rectMode(CENTER);
      rect(width/2, height/2, width, height);

      textAlign(CENTER,CENTER);
      textFont(gameFont_bold);
      textSize(60);
      fill(255);
      text("CONGRATULATIONS", width/2.05, height/2.35);
      textFont(gameFont_light);
      textSize(35);

      if(shipDestroyed == 1)
      {
        text("PLAYER 2", width/2.05, height/2);
        arduinoLetterValue = 'X';
      }
      else if(shipDestroyed == 2)
      {
        text("PLAYER 1", width/2.05, height/2);
        arduinoLetterValue = 'Y';
      }
    }
  }
}