window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      document.getElementById('canvas').style = "visibility: visible;"
      startGame();
      animate();
    };
  
      // Grab canvas element in HTML and set dimensions:
      const canvas = document.getElementById('canvas');
      canvas.width = 1200;
      canvas.height = 800;

      // Canvas boilerplate code:
      const ctx = canvas.getContext('2d');
      
      // Use as cancel button: 
      let animateId = null;

      // declare images and drawings:
    //   let avatarimage = new Image()
    //   avatarimage.src = 'images/explorer.png'

        let avatarimage = new Image()
        avatarimage.src = 'images/avatar.png'

        let countryUSAimage = new Image()
        countryUSAimage.src = 'images/countryUSA.png'

        let countryUKimage = new Image()
        countryUKimage.src = 'images/countryUK.jpg'

        let countryInimage = new Image()
        countryInimage.src = 'images/countryIn.png'
      
    //   function drawSquare(){
    //       ctx.fillStyle="green";
    //       ctx.fillRect(15, 15, 15, 15); 
    //   }

      function drawAvatar(){
          ctx.drawImage(avatar.image, avatar.x, avatar.y, 20, 20)
      }
      function drawCountryUSA(){
          ctx.drawImage(countryUSA.image, countryUSA.x, countryUSA.y, 60, 60)
      }

      function drawCountryUK(){
        ctx.drawImage(countryUK.image, countryUK.x, countryUK.y, 35, 25)
    }
  
      function drawCountryIn(){
        ctx.drawImage(countryIn.image, countryIn.x, countryIn.y, 35, 25)  
      }


      //declare avatar object
      let avatar = {
          x: 10,
          y: 10,
          image: avatarimage
      }



      //declare country USA object
      let countryUSA = {
          x: 200,
          y: 220,
          image: countryUSAimage
      }

      //declare country UK object
      let countryUK = {
          x: 650,
          y: 135,
          image: countryUKimage
      }

      let countryIn = {
          x: 1050,
          y: 300,
          image: countryInimage
      }

      document.body.onkeypress = function(e){
        if(e.key === 'w'){ //Move up
            avatar.y-=10
        }
        if(e.key === 'd'){ //Move right
            avatar.x+=10
        }
        if(e.key === 'a'){ //Move left
            avatar.x-=10
        }
        if(e.key === 's'){ //Move down
            avatar.y+=10; 
        }
      }
      
      
      function animate(){       // Where the magic happens
        frames++;  
        ctx.clearRect(0, 0, canvas.width, canvas.height) //clears the canvas - flipping to a blank page
          //drawSquare();
          drawAvatar();
          drawCountryUSA();
          drawCountryUK();
          drawCountryIn();
          
  
          animateId = window.requestAnimationFrame(animate) //Game rendering -infinite loop that goes super fast
      }
      //animate()
  
      //window.cancelAnimationFrame(animateId) to stop it
  
      //requestAnimationFrame cancelAnimationFrame(id)
    
  
    function startGame() {
        document.getElementById("start-button").remove();
    }
  };
  
  
  
  