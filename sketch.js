// set game board dimensions
let grid_dimension = 10;

// arrays for class objects
let battlegrid_array = [];
let battleships_array = [];

// array containing block sizes of all battleships
let ship_sizes = [2,3,3,4];
let shipNumber = 0;
let rotateFlag = 0;

// class initialization for the game board
class Battlegrid
{
  constructor(_grid_xPos, _grid_yPos, _grid_id_row, _grid_id_col)
  {
    this.grid_xPos = _grid_xPos;
    this.grid_yPos = _grid_yPos;
    this.grid_size = 60;
    this.grid_separation = this.grid_size+5;
    this.grid_id_row = _grid_id_row;
    this.grid_id_col = _grid_id_col;
    this.grid_fillColor = color(255);
    this.grid_strokeColor = color(0,0,50);

    this.grid_hoverFlag = 0;
    this.grid_occupiedFlag = 0;
  }
  // function to draw squares of the matrix
  drawGrid()
  {
    rectMode(CENTER);
    fill(this.grid_fillColor);
    stroke(this.grid_strokeColor);
    strokeWeight(3);
    
    rect(this.grid_xPos, this.grid_yPos, this.grid_size);
  }
  // function to change fill color of squares on mouse-hover
  gridColor(_ship_blockSize, _shipNumber)
  {
    // logic to detect mouse-hover over each square
    if(dist(this.grid_xPos, this.grid_yPos, mouseX, mouseY) <= this.grid_size/2)
    {
      // checking whether ships are within the matrix boundaries & in 0* position
      if(rotateFlag == 0 && (this.grid_id_col+_ship_blockSize) < grid_dimension)
      {
        // looping for every ship size in ship_sizes array
        for(let i=0; i<=_ship_blockSize; i++)
        {
          battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(0,255,0);
          battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_occupiedFlag == 0)
          {
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_row);
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_id_col);
          }
        }
      }
      //rotating the ship 90* and checking for game board boundaries
      else if(rotateFlag == 90 && (this.grid_id_row+_ship_blockSize) < grid_dimension)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(0,255,0);
          battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_occupiedFlag == 0)
          {
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_row);
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_id_col);
          }
        }        
      }
      //rotating the ship 180* and checking for game board boundaries
      else if(rotateFlag == 180 && (this.grid_id_col-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(0,255,0);
          battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_occupiedFlag == 0)
          {
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_row);
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_id_col);
          }
        }        
      }
      //rotating the ship 270* and checking for game board boundaries
      else if(rotateFlag == 270 && (this.grid_id_row-_ship_blockSize) >= 0)
      {
        for(let i=0; i<=_ship_blockSize; i++)
        {
          battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(0,255,0);
          battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 1;

          //push grid IDs onto Battleship class for grids having hoverFlag = 1
          if(battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_occupiedFlag == 0)
          {
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_row);
            battleships_array[_shipNumber].shipGrids.push(battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_id_col);
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
            battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_fillColor = color(255,0,0);
            battlegrid_array[this.grid_id_row][this.grid_id_col+i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 90 && (this.grid_id_row+i < grid_dimension))
          {
            battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_fillColor = color(255,0,0);
            battlegrid_array[this.grid_id_row+i][this.grid_id_col].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 180 && (this.grid_id_col-i >= 0))
          {
            battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_fillColor = color(255,0,0);
            battlegrid_array[this.grid_id_row][this.grid_id_col-i].grid_hoverFlag = 0;
          }
          else if(rotateFlag == 270 && (this.grid_id_row-i >= 0))
          {
            battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_fillColor = color(255,0,0);
            battlegrid_array[this.grid_id_row-i][this.grid_id_col].grid_hoverFlag = 0;
          }
        }
      }
    }
    else
    {
      //resetting hoverFlag & fill once mouse moves away
      this.grid_fillColor = color(255);
      this.grid_hoverFlag = 0;
    }
  }
}

// class initialization for the ships
class Battleships
{
  constructor(_shipLength)
  {
    this.shipLength = _shipLength;
    this.shipGrids = [];
  }
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(255);

  // instantiating matrix (game board)
  let init_gridPosY = int(height/9);
  for(let i=0; i<grid_dimension; i++)
  {
    let init_gridPosX = int(width/12);
    battlegrid_array.push([]);

    for(let j=0; j<grid_dimension; j++)
    {
      let gridObject = new Battlegrid(init_gridPosX, init_gridPosY, i, j)
      battlegrid_array[i].push(gridObject);
      init_gridPosX += battlegrid_array[i][j].grid_separation;
    }
    
    init_gridPosY += battlegrid_array[i][i].grid_separation;
  }

  // instantiating each ship in their own class
  for(let i=0; i<ship_sizes.length; i++)
  {
    let shipObject = new Battleships(ship_sizes[i]);
    battleships_array.push(shipObject);
  }
}

function draw()
{
  // drawing the matrix (game board)
  for(let gridRow=0; gridRow<grid_dimension; gridRow++)
  {
    for(let gridColumn=0; gridColumn<grid_dimension; gridColumn++)
    {
      battlegrid_array[gridRow][gridColumn].drawGrid();

      //rotate the ship on key-press
      if(key == 'r' && keyIsPressed == true)
      {
        rotateFlag+=90;
        keyIsPressed = false;

        if(rotateFlag == 360)
        {
          rotateFlag = 0;
        }
      }
      
      //shipNumber is just a loop variable
      if(shipNumber < battleships_array.length)
      {
        // ship_blockSize is the size of the respective ship in blocks
        let ship_blockSize = battleships_array[shipNumber].shipLength;
        
        // passing ship_blockSize-1 as paramter because iterator starts from 0
        battlegrid_array[gridRow][gridColumn].gridColor(ship_blockSize-1, shipNumber);
        
        // code to move on to next ship on mouse-press
        if(mouseButton == LEFT && mouseIsPressed == true)
        {
          //remove all the grid IDs from Battleship, except the latest ones for the given ship_blockSize
          battleships_array[shipNumber].shipGrids.splice(0, battleships_array[shipNumber].shipGrids.length-(ship_blockSize*2));

          shipNumber++;
          mouseIsPressed = false;
        }
      }
    }
  }
}