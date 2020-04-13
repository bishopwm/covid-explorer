window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      document.getElementById('canvas').style = "visibility: visible;";
      document.getElementById('sidebar').style = "visibility: visible;";
      document.getElementById('explorer-stats').style = "visibility: visible;";
      document.getElementById('instructions').style = "visibility: hidden;";
      startGame();
      animate();
    };
  
    // GRAB CANVAS ELEMENT IN HTML/SET DIMENSIONS
    const canvas = document.getElementById('canvas');
    canvas.width = 1100;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    let animateId = null;

    // CREATE NEW IMAGES
    let avatarimage = new Image()
    avatarimage.src = 'images/traveler.png'

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
    
    let airportimage = new Image()
    airportimage.src = 'images/airport.png'

    let northpoleimage = new Image()
    northpoleimage.src = 'images/northpole.png'

    // DISPLAY AVATAR CURRENT POSITION
    function recordPosition(){
        document.getElementById('current-position').innerHTML = "Current Position:  " + avatar.x +",  "+ avatar.y
    }
    // ENLARGE COUNTRY ICONS ON COLLISION
    function enlargeIconUSA(){
        countryUSA.w = 80;
        countryUSA.h = 50;
        document.getElementById("checkmark-usa").src = "../images/checkmark.png";
    }
    function enlargeIconUK(){
        countryUK.w = 80;
        countryUK.h = 50;
        document.getElementById("checkmark-uk").src = "../images/checkmark.png";
    }
    function enlargeIconIndia(){
        countryIndia.w = 80;
        countryIndia.h = 50;
        document.getElementById("checkmark-india").src = "../images/checkmark.png";
    }
    function enlargeIconAUS(){
        countryAUS.w = 80;
        countryAUS.h = 50;
        document.getElementById("checkmark-aus").src = "../images/checkmark.png";
    }

    // DRAW START AND END POINTS

    function drawStartEnd(){
        ctx.drawImage(airport.image, airport.x, airport.y, airport.w, airport.h)
        ctx.drawImage(northpole.image, northpole.x, northpole.y, northpole.w, northpole.h)
    }

    // DRAW COVID ICONS
    function drawCovids(){   
    covids.forEach((covid) => { 
        ctx.drawImage(covid.image, covid.x-=2, covid.y-=2, covid.w, covid.h)
        })
    }

    let covids = []       
    setInterval(function(){
    let covid = {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.width,
        w: 50,
        h: 40,
        image: covidimage
    }
    if(covids.length <= 150){
        covids.push(covid);
    }
    }, 1000)

    // DRAW AVATAR ICON
    function drawAvatar(){
        ctx.drawImage(avatar.image, avatar.x, avatar.y, avatar.w, avatar.h)
    }
    // DRAW COUNTRIES
    function drawCountryUSA(){
        ctx.drawImage(countryUSA.image, countryUSA.x, countryUSA.y, countryUSA.w, countryUSA.h)
    }
    function drawCountryUK(){
        ctx.drawImage(countryUK.image, countryUK.x, countryUK.y, countryUK.w, countryUK.h)
    }
    function drawCountryIndia(){
        ctx.drawImage(countryIndia.image, countryIndia.x, countryIndia.y, countryIndia.w, countryIndia.h)  
    }
    function drawCountryAUS(){
        ctx.drawImage(countryAUS.image, countryAUS.x, countryAUS.y, countryAUS.w, countryAUS.h)  
    }

    // DECLARE START AND END POINT OBJECTS
    let airport = {
        x: 20,
        y: 700,
        w: 120,
        h: 85,
        image: airportimage
    }

    let northpole = {
        x: 860,
        y: 25,
        w: 80,
        h: 120,
        image: northpoleimage
    }
    // DECLARE AVATAR
    let avatar = {
        x: 170,
        y: 740,
        w: 40,
        h: 40,
        image: avatarimage,
        health: 3000
    }

    // DECLARE COUNTRIES
    let countryUSA = {
        name: "United States",
        x: 170,
        y: 300,
        w: 50,
        h: 30,
        image: countryUSAimage,
        healthScore: 1
    }
    let countryUK = {
        name: "United Kingdom",
        x: 490,
        y: 220,
        w: 50,
        h: 30,
        image: countryUKimage,
        healthScore: 2
    }
    let countryIndia = {
        name: "India",
        x: 730,
        y: 330,
        w: 50,
        h: 30,
        image: countryIndiaimage,
        healthScore: 3
    }
    let countryAUS = {
        name: "Australia",
        x: 930,
        y: 530,
        w: 50,
        h: 30,
        image: countryAUSimage,
        healthScore: 3
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
    
    // DETECT COVID COLLISION
    let frames = 0;
    let ready = false;

    function detectCovidCollision(avatar){
        covids.forEach(
            (covid) => {
                if(
                    avatar.x < covid.x + covid.w &&
                    avatar.x + avatar.w > covid.x &&
                    avatar.y < covid.y + covid.h &&
                    avatar.y + avatar.h > covid.y    
                ){
                    console.log("Explorer struck by COVID")
                    // avatar.health -= 25;
                    // document.getElementById('explorer-health').innerHTML = avatar.health;
                    if(frames % 1 === 0){ready = true};
                    if(ready){
                    avatar.health -= 1;
                    document.getElementById('explorer-health').innerHTML = avatar.health;
                    }
                }
            }
        )
    }

    // DETECT COLLISION --> AVATAR/USA
    function detectCollisionUSA(avatar, countryUSA){
        //console.log(countryUSA)
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20}; 
        //var countryUSA = {x: countryUSA.x, y: countryUSA.y, width: 50, height: 40};

        if(avatar.x < countryUSA.x + countryUSA.w &&
        avatar.x + avatar.width > countryUSA.x &&
        avatar.y < countryUSA.y + countryUSA.h &&
        avatar.y + avatar.height > countryUSA.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            enlargeIconUSA();
            document.getElementById('current-country').innerHTML = `United States`
            }; 
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[1].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[1].deaths;
            //console.log(countryUSA);
            document.getElementById('health-score').innerHTML = `Health Risk Score: ` + countryUSA.healthScore;
        };
        let usaCheck = document.getElementById('checkmark-usa').src;
        usaCheck = "../images/checkmark.png";
    }   
    // DETECT COLLISION --> AVATAR/UK
    function detectCollisionUK(avatar, countryUK){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryUK = {x: countryUK.x, y: countryUK.y, width: 50, height: 40}

        if (avatar.x < countryUK.x + countryUK.width &&
        avatar.x + avatar.width > countryUK.x &&
        avatar.y < countryUK.y + countryUK.height &&
        avatar.y + avatar.height > countryUK.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            enlargeIconUK();
            document.getElementById('current-country').innerHTML = `United Kingdom`
            }; 
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[6].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[6].deaths;
            document.getElementById('health-score').innerHTML = `Health Risk Score: ` + countryUK.healthScore;
        };
    }  
    // DETECT COLLISION --> AVATAR/INDIA
    function detectCollisionIndia(avatar, countryIndia){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryIndia = {x: countryIndia.x, y: countryIndia.y, width: 50, height: 40}

        if (avatar.x < countryIndia.x + countryIndia.width &&
        avatar.x + avatar.width > countryIndia.x &&
        avatar.y < countryIndia.y + countryIndia.height &&
        avatar.y + avatar.height > countryIndia.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            enlargeIconIndia();
            document.getElementById('current-country').innerHTML = `India`
            };
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[21].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[21].deaths;
            document.getElementById('health-score').innerHTML = `Health Risk Score: ` + countryIndia.healthScore;
        };
    }
    // DETECT COLLISION --> AVATAR/AUSTRALIA
    function detectCollisionAUS(avatar, countryAUS){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20} 
        var countryAUS = {x: countryAUS.x, y: countryAUS.y, width: 50, height: 40}

        if (avatar.x < countryAUS.x + countryAUS.width &&
        avatar.x + avatar.width > countryAUS.x &&
        avatar.y < countryAUS.y + countryAUS.height &&
        avatar.y + avatar.height > countryAUS.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            enlargeIconAUS();
            document.getElementById('current-country').innerHTML = `Australia`
            }; 
            document.getElementById('cases').innerHTML = `Reported Cases: ` + covidCases[29].active_cases;
            document.getElementById('deaths').innerHTML = `Deaths: ` + covidCases[29].deaths;
            document.getElementById('health-score').innerHTML = `Health Risk Score: ` + countryAUS.healthScore;
        };
    }

    function animate(){   
        frames++;  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAvatar();
        recordPosition();
        drawStartEnd();
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

        if(avatar.health <= 0){
            console.log("dead!", animateId)
            window.cancelAnimationFrame(animateId);
            if(alert('Your explorer is dead! Game over. Time to restart.')){} 
                else
                window.location.reload();
        } else {
            animateId = window.requestAnimationFrame(animate);
        }
        //animateId = window.requestAnimationFrame(animate);
        

    }
      //animate()
      console.log("canceling")
       //to stop it
      //requestAnimationFrame cancelAnimationFrame(id)
    
    function startGame() {
        document.getElementById("start-button").remove();
    }
  };
  
  
