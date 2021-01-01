class Game {
  constructor(){
    this.finished = false;
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(one_image)
    car2 = createSprite(300,200);
    car2.addImage(two_image)
    car3 = createSprite(500,200);
    car3.addImage(three_image)
    car4 = createSprite(700,200);
    car4.addImage(four_image)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getRank()
    if(allPlayers !== undefined){
      background(ground)
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if (player.distance > 4200 && !this.finished) {
      game.update(2)
      player.rank++
      this.finished = true;
      Player.updateRank(player.rank)
    }
    drawSprites();
  }
  end(){
    var message = createElement('h2')
    message.html("Congratulations "+player.name+ "! Your rank is "+ player.rank)
    message.position(displayWidth/2-70, displayHeight/Math.sqrt(16))
  }
}
