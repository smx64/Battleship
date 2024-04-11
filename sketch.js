//set game board dimensions && gameplay screen
let grid_dimension = 7;
let gameFlag = 1;

//initializing aesthetic asset variables
let backgroundImage;
let shipImage1, shipImage2, shipImage3;
let gameFont_bold, gameFont_light;

//arrays for class objects
let p1_battlegrid_array = [];
let p1_battleships_array = [];

//array containing block sizes of all battleships
let ship_sizes = [2,3,4];
let shipNumber = 0;
let rotateFlag = 0;

function preload()
{
  backgroundImage = loadImage("./Waves.jpg");
  shipImage1 = loadImage("./Ship_Destroyer.png");
  shipImage2 = loadImage("./Ship_Cruiser.png");
  shipImage3 = loadImage("./Ship_Carrier.png");

  gameFont_bold = loadFont("./ChakraPetch-Bold.ttf");
  gameFont_light = loadFont("./ChakraPetch-Light.ttf");
}

//class initialization for the game board
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
    this.grid_placedFlag = 0;
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
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(0,255,0,100);
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_col);
          }
        }
      }
      //rotating the ship 90* and checking for game board boundaries
      else if(rotateFlag == 90 && (this.grid_id_row+_ship_blockSize) < grid_dimension)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(0,255,0,100);
          p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_col);
          }
        }        
      }
      //rotating the ship 180* and checking for game board boundaries
      else if(rotateFlag == 180 && (this.grid_id_col-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(0,255,0,100);
          p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_col);
          }
        }        
      }
      //rotating the ship 270* and checking for game board boundaries
      else if(rotateFlag == 270 && (this.grid_id_row-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(0,255,0,100);
          p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_occupiedFlag == 0)
          {
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_row);
            p1_battleships_array[_shipNumber].shipGrids.push(p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_col);
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
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(255,0,0,100);
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 90 && (this.grid_id_row+i < grid_dimension))
          {
            p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(255,0,0,100);
            p1_battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 180 && (this.grid_id_col-i >= 0))
          {
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(255,0,0,100);
            p1_battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 270 && (this.grid_id_row-i >= 0))
          {
            p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(255,0,0,100);
            p1_battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 0;
          }
        }
      }
    }
    else
    {
      //resetting hoverFlag & fill once mouse moves away, and if any ship is not placed in the grid
      if(this.grid_placedFlag != 1)
      {
        this.grid_fillColor = color(0,0,25,100);
      }

      this.grid_hoverFlag = 0;
    }
  }
  // 
  gridOccupied()
  {
    this.grid_fillColor = color(0,255,0,100);
    this.grid_placedFlag = 1;
  }
}

//class initialization for the ships
class P1_Battleships
{
  constructor(_shipLength)
  {
    this.shipLength = _shipLength;
    this.shipGrids = [];
  }
}

//function to generate ship images and page text content
function setupScreenTexts(_shipNumber, _ship_blockSize)
{
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255);

  textFont(gameFont_bold);
  textSize(50);
  text("SETUP | PLAYER "+gameFlag, width/2, height-(height/1.11));

  switch(_shipNumber)
  {
    case 0: //destroyer
      textSize(35);
      textFont(gameFont_bold);
      text("DESTROYER", width/1.4, height/1.235);

      textSize(20);
      textFont(gameFont_light);
      image(shipImage1, width/1.55, height/1.8, width/2.5, height/2.5);
      text("SHIP NUMBER: "+(_shipNumber+1)+" / "+p1_battleships_array.length, width/1.85, height/1.28);
      text("SHIP SIZE: "+_ship_blockSize+" Blocks", width/1.85, height/1.22)
      break;

    case 1: //cruiser
      textSize(35);
      textFont(gameFont_bold);
      text("CRUISER", width/1.4, height/1.235);

      textSize(20);
      textFont(gameFont_light);
      image(shipImage2, width/1.55, height/1.95, width/2.25, height/2.25);
      text("SHIP NUMBER: "+(_shipNumber+1)+" / "+p1_battleships_array.length, width/1.85, height/1.28);
      text("SHIP SIZE: "+_ship_blockSize+" Blocks", width/1.855, height/1.22)
      break;

    case 2: //carrier
      textSize(35);
      textFont(gameFont_bold);
      text("CARRIER", width/1.4, height/1.235);

      textSize(20);
      textFont(gameFont_light);
      image(shipImage3, width/1.45, height/1.85, width/2.2, height/2.2);
      text("SHIP NUMBER: "+(_shipNumber+1)+" / "+p1_battleships_array.length, width/1.85, height/1.28);
      text("SHIP SIZE: "+_ship_blockSize+" Blocks", width/1.855, height/1.22)
      break;
  }

  textFont(gameFont_light);
  textSize(20);
  text("Press [ R ] to rotate ship's orientation", width/5.1, height/1.14);
  text("Click [ LEFT MOUSE ] button to place the ship", width/4.58, height/1.09);
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(backgroundImage);

  //instantiating matrix (game board)
  let init_gridPosY = int(height/3.75);
  for(let i=0; i<grid_dimension; i++)
  {
    let init_gridPosX = int(width/9);
    p1_battlegrid_array.push([]);

    for(let j=0; j<grid_dimension; j++)
    {
      let gridObject = new P1_Battlegrid(init_gridPosX, init_gridPosY, i, j)
      p1_battlegrid_array[i].push(gridObject);
      init_gridPosX += p1_battlegrid_array[i][j].grid_separation;
    }
    
    init_gridPosY += p1_battlegrid_array[i][i].grid_separation;
  }

  //instantiating each ship in their own class
  for(let i=0; i<ship_sizes.length; i++)
  {
    let shipObject = new P1_Battleships(ship_sizes[i]);
    p1_battleships_array.push(shipObject);
  }
}

function draw()
{
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
        
        //shipNumber is just a loop variable
        if(shipNumber < p1_battleships_array.length)
        {          
          //ship_blockSize is the size of the respective ship in blocks
          let ship_blockSize = p1_battleships_array[shipNumber].shipLength;
          
          //passing ship_blockSize-1 as paramter because iterator starts from 0
          p1_battlegrid_array[gridRow][gridColumn].gridColor(ship_blockSize-1, shipNumber);

          //generating ship images and related text content
          setupScreenTexts(shipNumber, ship_blockSize);
          
          //on mouse-click: "place" the ship & send coordinates to Battleship class
          if(mouseButton == LEFT && mouseIsPressed == true && p1_battlegrid_array[gridRow][gridColumn].grid_hoverFlag == 1)
          {
            //remove all the grid IDs from Battleship, except the latest ones for the given ship_blockSize
            p1_battleships_array[shipNumber].shipGrids.splice(0, p1_battleships_array[shipNumber].shipGrids.length-(ship_blockSize*2));
            print(p1_battleships_array[shipNumber]);

            for(let i=0; i<p1_battleships_array[shipNumber].shipGrids.length; i+=2)
            {
              p1_battlegrid_array[p1_battleships_array[shipNumber].shipGrids[i]][p1_battleships_array[shipNumber].shipGrids[i+1]].gridOccupied();
            }

            imageMode(CORNER);
            background(backgroundImage);

            shipNumber++;
            mouseIsPressed = false;
          }
        }
        //all ships have been placed
        else
        {
          gameFlag = 2;
          break;
        }
      }
    }
  }

  // --- PLAYER 2 SETUP SCREEN --- //

  else if(gameFlag == 2)
  {
    //
  }
}