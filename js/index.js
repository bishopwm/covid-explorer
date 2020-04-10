window.onload = () => {
    document.getElementById('start-button').onclick = () => {
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

        let countryimage = new Image()
        countryimage.src = 'images/x.png'
      
      function drawSquare(){
          ctx.fillStyle="green";
          ctx.fillRect(15, 15, 15, 15); 
      }

      function drawCountry(){
          ctx.drawImage(country.image, country.x, country.y, 80, 80)
      }
  
    //   function drawAvatar(){
    //       ctx.drawImage(avatar.image, avatar.x, avatar.y, 120, 200)
    //   }

      //declare avatar object
    //   let avatar = {
    //       x: 20,
    //       y: 20,
    //       image: avatarimage
    //   }

      //declare country object
      let country = {
          x: 200,
          y: 200,
          image: countryimage
      }
      
      
      function animate(){       // Where the magic happens
        frames++;  
        ctx.clearRect(0, 0, canvas.width, canvas.height) //clears the canvas - flipping to a blank page
          drawSquare();
          drawCountry();
          //drawAvatar();
  
          animateId = window.requestAnimationFrame(animate) //Game rendering -infinite loop that goes super fast
      }
      //animate()
  
      //window.cancelAnimationFrame(animateId) to stop it
  
      //requestAnimationFrame cancelAnimationFrame(id)
    
  
    function startGame() {
        document.getElementById("start-button").remove();
    }
  };
  
  
  
  