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
        ctx.drawImage(covid.image, covid.x--, covid.y--, covid.w, covid.h)
        })
    }

    // DRAW COVID ICONS
    let covids = []       
    setInterval(function(){
    let covid = {
        x: 1000,
        y: 790,
        w: 50,
        h: 40,
        image: covidimage
    }
    if(covids.length <= 25){
        covids.push(covid);
    }
    }, 1000)

    // DRAW AVATAR
    function drawAvatar(){
        ctx.drawImage(avatar.image, avatar.x, avatar.y, avatar.w, avatar.h)
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
        w: 20,
        h: 20,
        image: avatarimage
    }
    // DECLARE OBJECTS - COUNTRIES
    let countryUSA = {
        name: "United States",
        x: 170,
        y: 300,
        image: countryUSAimage
    }
    let countryUK = {
        name: "United Kingdom",
        x: 490,
        y: 220,
        image: countryUKimage
    }
    let countryIndia = {
        name: "India",
        x: 730,
        y: 330,
        image: countryIndiaimage
    }
    let countryAUS = {
        name: "Australia",
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

    // DETECT COVID COLLISION
    function detectCovidCollision(avatar){
        covids.forEach(
            (covid) => {
                if(
                    avatar.x < covid.x + covid.w &&
                    avatar.x + avatar.w > covid.x &&
                    avatar.y < covid.y + covid.h &&
                    avatar.y + avatar.h > covid.y    
                ){
                    console.log("Avatar struck by COVID!");
                }
            }
        )
    }

    // DETECT COLLISION --> AVATAR/USA
    function detectCollisionUSA(avatar, countryUSA){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryUSA = {x: countryUSA.x, y: countryUSA.y, width: 50, height: 40}

        if (avatar.x < countryUSA.x + countryUSA.width &&
        avatar.x + avatar.width > countryUSA.x &&
        avatar.y < countryUSA.y + countryUSA.height &&
        avatar.y + avatar.height > countryUSA.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('current-country').innerHTML = 
            `United States`
            }; 
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[1].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[1].deaths;
        }
    }   
    // DETECT COLLISION --> UK
    function detectCollisionUK(avatar, countryUK){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryUK = {x: countryUK.x, y: countryUK.y, width: 50, height: 40}

        if (avatar.x < countryUK.x + countryUK.width &&
        avatar.x + avatar.width > countryUK.x &&
        avatar.y < countryUK.y + countryUK.height &&
        avatar.y + avatar.height > countryUK.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('current-country').innerHTML = 
            `United Kingdom`
            }; 
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[6].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[6].deaths;
        }
    }  
    // DETECT COLLISION --> INDIA
    function detectCollisionIndia(avatar, countryIndia){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryIndia = {x: countryIndia.x, y: countryIndia.y, width: 50, height: 40}

        if (avatar.x < countryIndia.x + countryIndia.width &&
        avatar.x + avatar.width > countryIndia.x &&
        avatar.y < countryIndia.y + countryIndia.height &&
        avatar.y + avatar.height > countryIndia.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('current-country').innerHTML = 
            `India`
            };
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[21].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[21].deaths;
        }
    }
    // DETECT COLLISION --> AUSTRALIA
    function detectCollisionAUS(avatar, countryAUS){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryAUS = {x: countryAUS.x, y: countryAUS.y, width: 50, height: 40}

        if (avatar.x < countryAUS.x + countryAUS.width &&
        avatar.x + avatar.width > countryAUS.x &&
        avatar.y < countryAUS.y + countryAUS.height &&
        avatar.y + avatar.height > countryAUS.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('current-country').innerHTML = 
            `Australia`
            }; 
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[29].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[29].deaths;
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
    
        detectCovidCollision(avatar);
        detectCollisionUSA(avatar, countryUSA);
        detectCollisionUK(avatar, countryUK);
        detectCollisionIndia(avatar, countryIndia);
        detectCollisionAUS(avatar, countryAUS);
        animateId = window.requestAnimationFrame(animate);
    }
      //animate()
      //window.cancelAnimationFrame(animateId) to stop it
      //requestAnimationFrame cancelAnimationFrame(id)
    
    function startGame() {
        document.getElementById("start-button").remove();
    }
  };
  
  
  
  