window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      document.getElementById('canvas').style = "visibility: visible;";
      document.getElementById('sidebar').style = "visibility: visible;"
      startGame();
      animate();
    };
  
    // GRAB CANVAS ELEMENT IN HTML/SET DIMENSIONS
    const canvas = document.getElementById('canvas');
    canvas.width = 1100;
    canvas.height = 800;

    // CANVAS BOILER PLATE CODE
    const ctx = canvas.getContext('2d');
    
    let animateId = null;

    // CREATE NEW IMAGES
    let avatarimage = new Image()
    avatarimage.src = 'images/avatar.png'

    let covidimage = new Image()
    covidimage.src = 'images/covid.png'

    let countryUSAimage = new Image()
    countryUSAimage.src = 'images/american-flag.png'

    let countryUKimage = new Image()
    countryUKimage.src = 'images/countryUK.jpg'

    let countryIndiaimage = new Image()
    countryIndiaimage.src = 'images/countryIn.png'

    let countryAUSimage = new Image()
    countryAUSimage.src = 'images/countryAUS.png'
    

    function recordPosition(){
        document.getElementById('current-position').innerHTML = "Current Position:  " + avatar.x +",  "+ avatar.y
    }

    function drawCovids(){   
    covids.forEach((covid) => { 
        ctx.drawImage(covid.image, covid.x--, covid.y--, 50, 40)
        })
    }

    // DRAW COVID ICONS
    let covids = []       
    setInterval(function(){
    let covid = {
        x: 1000,
        y: 790,
        image: covidimage
    }
    if(covids.length <= 25){
        covids.push(covid);
    }
    }, 1000)

    // DRAW AVATAR
    function drawAvatar(){
        ctx.drawImage(avatar.image, avatar.x, avatar.y, 20, 20)
    }

    // DRAW INDIVIDUAL COUNTRIES
    function drawCountryUSA(){
        ctx.drawImage(countryUSA.image, countryUSA.x, countryUSA.y, 50, 30)
    }
    function drawCountryUK(){
        ctx.drawImage(countryUK.image, countryUK.x, countryUK.y, 50, 30)
    }
    function drawCountryIndia(){
        ctx.drawImage(countryIndia.image, countryIndia.x, countryIndia.y, 50, 30)  
    }
    function drawCountryAUS(){
        ctx.drawImage(countryAUS.image, countryAUS.x, countryAUS.y, 50, 30)  
    }

    // DECLARE OBJECTS - AVATAR
    let avatar = {
        x: 10,
        y: 10,
        image: avatarimage
    }
    // DECLARE OBJECTS - COUNTRIES
    let countryUSA = {
        x: 170,
        y: 300,
        image: countryUSAimage
    }
    let countryUK = {
        x: 490,
        y: 220,
        image: countryUKimage
    }
    let countryIndia = {
        x: 730,
        y: 330,
        image: countryIndiaimage
    }
    let countryAUS = {
        x: 930,
        y: 530,
        image: countryAUSimage
    }


    
    // CONTROL KEYS  
    document.body.onkeydown = function(e){
        if(e.keyCode == '38'){ //Move up
            avatar.y-=10
        }
        if(e.keyCode == '39'){ //Move right
            avatar.x+=10
        }
        if(e.keyCode == '37'){ //Move left
            avatar.x-=10
        }
        if(e.keyCode == '40'){ //Move down
            avatar.y+=10; 
        }
    }
    
    let frames = 0;
    let ready = false;

        // DETECT COLLISIONS --> AVATAR/USA
    function detectCollision(avatar, countryUSA){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryUSA = {x: countryUSA.x, y: countryUSA.y, width: 50, height: 40}

        if (avatar.x < countryUSA.x + countryUSA.width &&
        avatar.x + avatar.width > countryUSA.x &&
        avatar.y < countryUSA.y + countryUSA.height &&
        avatar.y + avatar.height > countryUSA.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            console.log('COLLISION! HOPE YOU HAVE INSURANCE, GURL!');
            document.getElementById('current-country').innerHTML = 
            `Current Country: United States`
            }; 
        }
    }
      
    function animate(){   
        frames++;  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAvatar();
        recordPosition();
        drawCovids();
        drawCountryUSA();
        drawCountryUK();
        drawCountryIndia();
        drawCountryAUS();
        
        detectCollision(avatar, countryUSA);
        animateId = window.requestAnimationFrame(animate);
    }
      //animate()
      //window.cancelAnimationFrame(animateId) to stop it
      //requestAnimationFrame cancelAnimationFrame(id)
    
    function startGame() {
        document.getElementById("start-button").remove();
    }
  };
  
  
  
  