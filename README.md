# Battleship - The Digital Experience
## ARTIST STATEMENT

_Battleship – The Digital Experience_ is more than a digital reimagining of a beloved board game – it’s a dialogue between human creativity and the transformative potential of AI. This project reflects my vision of collaborative artistry, where technology becomes a tool for expressing my personal narrative rather than overshadowing it. While AI played a role in crafting the opening cinematic, every detail – from the underlying script & concepts to the music progression – was shaped by my perspective, ensuring that the final piece feels authentic to me.

The cinematic opening, thus, sets the tone for an intense gameplay. Despite AI’s contribution, the soul of the experience – the fast-paced, competitive spirit of the original _Battleship_ – is unmistakably mine. I meticulously designed and sourced the music to mirror the energy of the game, amplifying the sense of nostalgia and engagement for players.

At its core, this project is a digital homage to the classic game, a deeply personal exploration that bridges my technical background with my artistic aspirations. The gameplay and coding were entirely my own work, a way to bring my childhood memories of _Battleship_ into a more modern medium while retaining its timeless charm. By blending these elements, I aimed to create something that feels not only innovative but also intimately handcrafted.

Through my work, I invite people to rediscover a classic game, now reimagined with a touch of cinematic flair, a hint of AI collaboration, and a whole lot of personal passion. It’s a tribute to the games that shaped our imaginations and a testament to the endless possibilities when art and technology converge.

## THE PROCESS

_**Languages:**_ JavaScript, p5.js, CSS, HTML  
_**AI Tools:**_ Midjourney, Adobe Firefly, Kling AI, Luma AI, ChatGPT, Udio  
_**Software:**_ VS Code, GitHub, Adobe Photoshop, Adobe After Effects, FL Studio

<p align = "center">
  <img src = "./Images/BattleshipBoardGame.JPG">
  Figure 0.1: The Original Battleship Board Game
</p>

_Battleship_ is a classic, two-player strategy game where players guess the locations of each other’s fleets on ruled grids. Each player marks their fleet on a concealed grid, taking turns to “fire shots” at the opposing player’s grid in an attempt to destroy their ships. The first one to destroy all ships of the other player wins the game.

Based on this, I've developed a 2D web-based videogame. It allows players to engage in split-screen gameplay, offering a side-by-side battle experience that captures the competitive spirit of the original. For added immersion, the game features a background score, and sound effects that respond to in-game events. Additionally, I've created a cinematic opening sequence familiarizing players with the game’s atmosphere, and ultimately blending into the actual gameplay to create a seamless connection.

## PART 1: IDEATION

### ▶️ **GAME INTERFACE & CODE**

The game starts off with the first player plotting the positions of their battleships in a 9 x 9 square matrix. Once they’re done, the second player repeats the same process.

<p align = "center">
  <img src = "./Images/PlayerSetupMatrix.jpg">
  <br>
  Figure 1.1: Player Setup Matrix
</p>

As there would be just 81 squares (9 x 9 matrix), as opposed to the original’s 12 x 12 dimensions, I’m limiting the quantity of battleships available with each player. The players generally have 5 ships of varying sizes, but given the smaller size of the battlefield, that quantity has been scaled down accordingly.

The ship sizes are calculated in blocks. Hence, players have ship sizes ranging between 2-5 blocks, either horizontally or vertically.

<p align = "center">
  <img src = "./Images/ShipSizesPlacement.jpg">
  <br>
  Figure 1.2: Ship Sizes & Orientation
</p>

I’ll be coding a 9 x 9 matrix instead of a full-sized board because anything beyond 9 would involve specific code for indices “10” and above, in addition to the code that’s there for rest of the matrix. For example, in a 10 x 10 matrix, if the block IDs range from 1.1, 1.2, 1.3 … 1.10, additional logic & code needs to be factored in for calculating individual row & column indices for 1.10, 2.10, 10.10 etc. Hence, in the interest of time and to keep the gameplay fast-paced, I’ll limit it to a 9 x 9 matrix.

<p align = "center">
  <img src = "./Images/ElementIDs.jpg">
  <br>
  Figure 1.3: Matrix Dimension & Element IDs
</p>

Once the players have set their ships, the game begins. Both players take turns in guessing the squares where the enemy's ships are placed, and destroying them. The gameplay interface has two matrices side-by-side in split-screen fashion. The left-half of the screen is Player 1’s console, and it displays a matrix for marking Player 2’s ships. The right-half of the screen displays the same, but from Player 2’s perspective.

<p align = "center">
  <img src = "./Images/GameplayInterface.jpg">
  <br>
  Figure 1.4: The Gameplay Interface
</p>

Whichever player destroys all the ships of the other player first, wins the game.

### ▶️ **SONIC IMMERSION**

In order to make the game immersive and more appealing, I plan on incorporating a background score that matches the theme of _Battleship_: probably some military-themed music, or something fast-paced during the actual gameplay.

Additionally, I plan on having event-specific sound effects for the game. For example, in case a player guesses a correct square and hits the other player’s ship, a “blast” sound would be played, or if the player misses, a "water splash" sound effect would be cued.

## PART 2: REALIZATION

Before I begin explaining about the gameplay and the development process, I want to briefly touch upon the challenges I faced while coding this. TBH, this was quite an ambitious endeavor, and I wasn't fully sure whether I'd be able to code all the functionalities that I had thought of during the ideation process.

This game, along with all its aspects, is a culmination of a (almost) month-long effort involving coding, debugging, retrying, experimenting, and learning new things, with bouts of frustration & stress sprinkled in-between, and the remaining time being devoted to my unrelenting determination to get all my elements (and the code) working. Building this from the ground up was nothing short of a rollercoaster ride, but extremely fun and exciting nevertheless.

At long last, I present to you ... **Battleship - The Digital Experience.**

<p align = "center">
  <img src = "./Images/SplashScreen.png">
  <br>
  Figure 2.1: Battleship - Digital Experience Splash Screen
</p>

### ▶️ **BATTLESHIP: PLAYER SETUP SCREENS**

The game starts off with the setup screens, wherein the players set their battleships' positions on the grid. In order to keep the duration of the game short, I chose to proceed with 7 x 7 matrices for both the players, instead of the initially proposed 9 x 9 matrices.

The setup screen displays the grid where the players would place their ships, the quantity of battleships they have and their respective sizes (in blocks), and the type of ship they're currently placing along with a reference image of the same. I utilized _Adobe Firefly_ for generating the ship images. I later touched up and color-graded them using _Adobe Photoshop_ to match my aesthetic. I also reduced their sizes slightly in order to optimize the game's performance, and the browser's resource utilization.

<p align = "center">
  <img src = "./Images/SetupScreen_Main.png">
  <br>
  Figure 2.2: Player Setup Screen - Player 1
</p>

On hovering over the grid with the mouse, the squares start lighting up based on what size of the ship the player's placing. The hover-state informs the player of the "placing" status i.e. whether they can place the ship in those squares or not. Squares being green on-hover mean that it's a valid placement. If it's an invalid placement, the squares would turn red.

I've coded in functionalities that check for the matrix's edges; or if the player's placing a second ship on top of another placed ship; or if the entire ship in its current orientation (horizontally or vertically) can fully fit within the matrix grid. If any of these conditions are detected by the code, the squares on-hover would turn red in real-time, indicating the placement status to the player.

<p align = "center">
  <img src = "./Images/SetupScreen_EdgeDetect.png">
  <br>
  Figure 2.3: Grid Edge Detection & Dynamic Color-Change
  <br>
  <br>
  <img src = "./Images/SetupScreen_ShipOverlap.png">
  <br>
  Figure 2.4: Ship Overlap Detection & Dynamic Color-Change
</p>

Additionally, players can rotate their ships in 360° fashion by pressing the [ R ] key on the keyboard. The code seamlessly checks for all the above conditions dynamically for any orientation the player chooses.

```
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
```

<p align = "center">
  <img src = "./Images/SetupScreen_Rotation.png">
  <br>
  Figure 2.5: Ship Rotation Functionality
</p>

The players "place" their ships by clicking the left-mouse button. Coding the placing part was quite complicated, because that involved passing the selected squares' coordinates from the *Battlegrid* class to the *Battleship* class. The *Battleship* class contains details regarding the player's ship positions, their respective size, and the type.

Every square has a unique ID which is a combination of its row and column number. This unique ID is the coordinate for that specific square. I was initially using math to ascertain coordinates and storing them in a single variable called *grid_id*, by using the formula ***(10 x i) + j***, where *i* was the square's row-number, and *j* was the column-number. This quickly became quite problematic when I needed to manipulate certain aspects during gameplay that revolved around a square's coordinate. As a solution, I replaced the single *grid_id* variable with two dedicated variables that stored the square's row & column numbers, *grid_id_row* and *grid_id_col*. These were simple to manipulate, and straightforward to pass off to functions, arrays, or classes during gameplay code execution.

Once this was sorted, I now had to figure out how to pass the ***correct*** coordinate sequence to the *Battleships* class on mouse-press. This turned out to be challenging as well. I was making use of certain flags like *grid_hoverFlag* and *grid_occupiedFlag* to filter the squares to be passed, but my code was either passing off wrong coordinates, or more number of squares than the ship size. I ultimately solved it using array modification functions.

The variable *grid_hoverFlag* for a square fluctuates between 0 and 1 depending on whether it's being hovered on by the mouse. Based on the variable values, I started passing all square coordinates that had *grid_hoverFlag* value as 1, and on mouse-press, I just trim the array to the particular ship size using the *splice()* function to retain the correct values of the ship coordinates.

```
//remove all the grid IDs from Battleship, except the latest ones for the given ship_blockSize
p1_battleships_array[p1_shipNumber].shipGrids.splice(0, p1_battleships_array[p1_shipNumber].shipGrids.length-(ship_blockSize*2));
```

<p align = "center">
  <img src = "./Images/SetupScreen_Placed.png">
  <br>
  Figure 2.6: All Ships - Successful Placement
  <br>
  <br>
  <img src = "./Images/SetupScreen_Player2.png">
  <br>
  Figure 2.7: Player Setup Screen - Player 2
</p>

Once both players have set their ships, the game begins.

### ▶️ **BATTLESHIP: GAMEPLAY INTERFACE**

The main gameplay interface consists of both players' matrices present in split-screen view. A black overlay disables half of the interface depending on which player's turn it is. Both players take turns to select squares, and ultimately, destroy all the ships of the other player.

<p align = "center">
  <img src = "./Images/Gameplay_Main.png">
  <br>
  Figure 2.8: Battleship - Gameplay Interface
</p>

A blue highlight appears on the square that is being hovered-on by the mouse. On mouse-press, the square's color would change either to green or red, depending on whether a ship's part is present there or not.

<p align = "center">
  <img src = "./Images/Gameplay_SquareClicked.png">
  <br>
  Figure 2.9: Gameplay - Mouse-Click Interaction
</p>

If a player destroys a ship completely, a notification pops up at the bottom informing about the type of ship destroyed, and its size. The notifications are color-coded to mitigate any confusion, where green-colored notification appears when Player 2 destroys Player 1's ship; and a red-colored notification appears when Player 1 destroys Player 2's ship.

Beneath the players' grids, I've provided an "enemy ship counter" which keeps the players informed about how many ships, of the other player, remain.

<p align = "center">
  <img src = "./Images/Gameplay_ShipDestroyed_P1.png">
  <br>
  Figure 2.10: Ship Destroyed Notification for Player 1
  <br>
  <br>
  <img src = "./Images/Gameplay_ShipDestroyed_P2.png">
  <br>
  Figure 2.11: Ship Destroyed Notification for Player 2
</p>

The game continues until a player destroys *all* the ships of the other player. Once the code detects that all ships for a particular player have been destroyed, the game ends. The black overlay goes away, revealing both the players' matrices in the background, and a congratulatory message is presented, along with the winning player's number on-screen.

<p align = "center">
  <img src = "./Images/Gameplay_Finished.png">
  <br>
  Figure 2.12: Winner Announcement & Grid Display
</p>

### ▶️ **BATTLESHIP: SONIC ELEMENTS**

In order to make the game more interesting, I've included background scores throughout the entirety of the game. An ominous pulsating piece of music plays repeatedly during the player setup screens, signalling "peace before the storm" and foreboding all-out warfare.

The music switches gears and becomes fast-paced & exhilerating during actual gameplay to infuse that competitive spirit among the players. It only comes to a stop when the game finishes, and the winner is announced.

In addition to the background scores, I've coded in scenario-specific sound effects as well. During gameplay, if on mouse-click, the player hits a part of a ship, an explosion sound is played, signifying the action. If the player misses, a water splash sound is cued for effect.

### ▶️ **BATTLESHIP: OPENING CINEMATIC**

Before diving into the process, I'd just like to mention that I had seriously _**overestimated**_ AI's simplicity. It took really long for me to have the AI tools generate some decent videos based on my vision for the sizzle reel. The constant back-and-forth with the prompts, and using multiple text-to-video models to generate footage for my video had me testing my patience!

The opening cinematic sequence, thus, is a collaboration between various AI tools and me. I started the movie-making process by jotting down some points about how I wanted my video to progress. I was envisioning a brief setup followed by an all-out war. I worked on _Midjourney_ for conceptualizing the stills for the video. These stills were later used as reference by image-to-video AI tools for generating full scenes.

<p align = "center">
  <img src = "./Images/KlingAI.png">
  <br>
  Figure 2.13: Kling AI - The Very First (Unsuccessful) Trial
</p>

I had divided my "screenplay" into 15 individual shots. I came across _Kling AI_ while searching for some decent AI video generators, and I think it did a decent job in reproducing the stills' aesthetic, and followed the direction prompts successfully most of the times. I've used _Luma AI_ for generating scenes which required less elements and "action". In order to prompt these tools correctly, and to know which keywords to use to maximize their output quality, I used _ChatGPT_ for enhancing some of my prompts. Those were then fed to _Kling AI_ for getting the desired results, and I must note that this step really helped me in achieving the correct aesthetic, as well as, having a consistent look throughout the scenes.

Once I had generated all the scenes, I imported them all into _Adobe After Effects_ for compositing & editing. I edited the video myself: color-grading, creating transitions & light sweeps, adding grain & noise, and most importantly, adding camera motion to give off that "chaotic action" feel to the whole video.

<p align = "center">
  <img src = "./Images/AfterEffects.png">
  <br>
  Figure 2.14: Adobe After Effects - Video Editing
</p>

The audio for the cinematic is a combination of sourced-audio and AI-generated elements. For audio generation, I've used _Udio_ - a text-to-audio AI tool. The sound of seagulls, the "marines announcement" at the beginning, the airplane fly-by sound, the blaring air-horn, the turret firing sound - all these were individually generated using _Udio_. For the end explosion, I sourced some stock audio from _YouTube_ as _Udio_ wasn't generating it the way I wanted it to (it didn't have that "oomph factor"). I arranged and mixed all these using _FL Studio_ to come up with the "final audio" that went into the video.