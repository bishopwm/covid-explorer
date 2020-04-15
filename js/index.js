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

    let maskimage = new Image()
    maskimage.src = 'images/mask.png'

    let countryUSAimage = new Image()
    countryUSAimage.src = 'images/americanFlag.png'

    let countryUKimage = new Image()
    countryUKimage.src = 'images/britishFlag.png'

    let countryIndiaimage = new Image()
    countryIndiaimage.src = 'images/indianFlag.png'

    let countryChinaimage = new Image()
    countryChinaimage.src = 'images/chineseFlag.png'

    let countryAUSimage = new Image()
    countryAUSimage.src = 'images/australianFLag.png'
    
    let airportimage = new Image()
    airportimage.src = 'images/airport.png'

    let northpoleimage = new Image()
    northpoleimage.src = 'images/northpole.png'

    // DISPLAY AVATAR CURRENT POSITION
    function recordPosition(){
        document.getElementById('current-position').innerHTML = avatar.x +",  "+ avatar.y
    }
    // ENLARGE COUNTRY ICONS ON COLLISION
    function enlargeIconUSA(){
        countryUSA.w = 80;
        countryUSA.h = 90;
        document.getElementById("checkmark-usa").src = "../images/checkmark.png";
        countryUSA.countryVisited = true;
    }
    function enlargeIconUK(){
        countryUK.w = 80;
        countryUK.h = 90;
        document.getElementById("checkmark-uk").src = "../images/checkmark.png";
        countryUK.countryVisited = true;
    }
    function enlargeIconChina(){
        countryChina.w = 80;
        countryChina.h = 90;
        document.getElementById("checkmark-china").src = "../images/checkmark.png";
        countryChina.countryVisited = true;
    }
    function enlargeIconIndia(){
        countryIndia.w = 80;
        countryIndia.h = 90;
        document.getElementById("checkmark-india").src = "../images/checkmark.png";
        countryIndia.countryVisited = true;
    }
    function enlargeIconAUS(){
        countryAUS.w = 80;
        countryAUS.h = 90;
        document.getElementById("checkmark-aus").src = "../images/checkmark.png";
        countryAUS.countryVisited = true;
    }

    // PAUSE/PLAY TOGGLe
    // function toggleGameState() {
    //     document.getElementById("pause-button").addEventListener
    // }

    // DRAW START AND END POINTS, DETECT WIN
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

    function drawMasks(){
        masks.forEach((mask) => { 
            ctx.drawImage(mask.image, mask.x-=1, mask.y-=1, mask.w, mask.h)
            })       
    }
    
    let masks = []       
    setInterval(function(){
    let mask = {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.width,
        w: 60,
        h: 40,
        image: maskimage
    }
    if(masks.length <= 150){
        masks.push(mask);
    }
    }, 1200)


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
    function drawCountryChina(){
        ctx.drawImage(countryChina.image, countryChina.x, countryChina.y, countryChina.w, countryChina.h)
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
        y: 720,
        w: 60,
        h: 60,
        image: avatarimage,
        health: 200
    }

    // DECLARE COUNTRIES
    let countryUSA = {
        name: "United States",
        x: 170,
        y: 275,
        w: 60,
        h: 65,
        image: countryUSAimage,
        casesPerMillion: covidCases[1].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryUK = {
        name: "United Kingdom",
        x: 490,
        y: 220,
        w: 60,
        h: 65,
        image: countryUKimage,
        casesPerMillion: covidCases[6].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryChina = {
        name: "China",
        x: 820,
        y: 300,
        w: 60,
        h: 65,
        image: countryChinaimage,
        casesPerMillion: covidCases[212].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryIndia = {
        name: "India",
        x: 730,
        y: 330,
        w: 60,
        h: 65,
        image: countryIndiaimage,
        casesPerMillion: covidCases[21].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryAUS = {
        name: "Australia",
        x: 930,
        y: 530,
        w: 60,
        h: 65,
        image: countryAUSimage,
        casesPerMillion: covidCases[29].total_cases_per_1m_population,
        countryVisited: false
    }

    let gameOver = false;
    //let gameInPlay = true;

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
    
    // DETECT WIN
    function detectWin(avatar, northpole){
        //var avatar = {x: avatar.x, y: avatar.y, width: avatar.w, height: avatar.h, health: avatar.health}; 
       // var northpole = {x: northpole.x, y: northpole.y, width: northpole.w, height: northpole.h}
        
        if(avatar.x < northpole.x + northpole.w &&
        avatar.x + avatar.w > northpole.x &&
        avatar.y < northpole.y + northpole.h &&
        avatar.y + avatar.h > northpole.y) {
                console.log("winner!");

                if(
                    countryUSA.countryVisited === true &&
                    countryUK.countryVisited === true &&
                    countryChina.countryVisited === true &&
                    countryIndia.countryVisited === true &&
                    countryAUS.countryVisited === true
                ){
                    gameOver = true;
                    window.cancelAnimationFrame(animateId);
                    alert('Well done! You win!');
                    
                }
        };
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
                    if(frames % 1 === 0){ready = true};
                    if(ready){
                    avatar.health -= 1;
                    document.getElementById('explorer-health').innerHTML = avatar.health;
                    }
                }
            }
        )
    }

    // DETECT MASK COLLISION
    function detectMaskCollision(avatar){
        masks.forEach(
            (mask) => {
                if(
                    avatar.x < mask.x + mask.w &&
                    avatar.x + avatar.w > mask.x &&
                    avatar.y < mask.y + mask.h &&
                    avatar.y + avatar.h > mask.y    
                ){
                    if(frames % 1 === 0){ready = true};
                    if(ready){
                    avatar.health += 1;
                    document.getElementById('explorer-health').innerHTML = avatar.health;
                    }
                }
            }
        )
    }   

    // DETECT COLLISION --> AVATAR/USA
    function detectCollisionUSA(avatar, countryUSA){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20, health: avatar.health}; 
       
        if(avatar.x < countryUSA.x + countryUSA.w &&
        avatar.x + avatar.width > countryUSA.x &&
        avatar.y < countryUSA.y + countryUSA.h &&
        avatar.y + avatar.height > countryUSA.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            avatar.health -= 25;
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconUSA();
            document.getElementById('current-country').innerHTML = `United States`
            }; 
            document.getElementById('cases').innerHTML = covidCases[1].cases;
            document.getElementById('deaths').innerHTML = covidCases[1].deaths;
            document.getElementById('health-score').innerHTML = countryUSA.casesPerMillion;
        };
        let usaCheck = document.getElementById('checkmark-usa').src;
        usaCheck = "../images/checkmark.png";

    }   
    // DETECT COLLISION --> AVATAR/UK
    function detectCollisionUK(avatar, countryUK){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20, health: avatar.health} 

        if (avatar.x < countryUK.x + countryUK.w &&
        avatar.x + avatar.width > countryUK.x &&
        avatar.y < countryUK.y + countryUK.h &&
        avatar.y + avatar.height > countryUK.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            avatar.health -= 25;
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconUK();
            document.getElementById('current-country').innerHTML = `United Kingdom`
            }; 
            document.getElementById('cases').innerHTML = covidCases[6].cases;
            document.getElementById('deaths').innerHTML = covidCases[6].deaths;
            document.getElementById('health-score').innerHTML = countryUK.casesPerMillion;
        };
    } 
    // DETECT COLLISION --> AVATAR/CHINA
    function detectCollisionChina(avatar, countryChina){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20, health: avatar.health} 

        if (avatar.x < countryChina.x + countryChina.w &&
        avatar.x + avatar.width > countryChina.x &&
        avatar.y < countryChina.y + countryChina.h &&
        avatar.y + avatar.height > countryChina.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            avatar.health -= 25;
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconChina();
            document.getElementById('current-country').innerHTML = `China`
            }; 
            document.getElementById('cases').innerHTML = covidCases[212].cases;
            document.getElementById('deaths').innerHTML = covidCases[212].deaths;
            document.getElementById('health-score').innerHTML = countryChina.casesPerMillion;
        };
    } 
    // DETECT COLLISION --> AVATAR/INDIA
    function detectCollisionIndia(avatar, countryIndia){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20, health: avatar.health} 

        if (avatar.x < countryIndia.x + countryIndia.w &&
        avatar.x + avatar.width > countryIndia.x &&
        avatar.y < countryIndia.y + countryIndia.h &&
        avatar.y + avatar.height > countryIndia.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            avatar.health -= 25;
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconIndia();
            document.getElementById('current-country').innerHTML = `India`
            };
            document.getElementById('cases').innerHTML = covidCases[21].cases;
            document.getElementById('deaths').innerHTML = covidCases[21].deaths;
            document.getElementById('health-score').innerHTML = countryIndia.casesPerMillion;
        };
    }
    // DETECT COLLISION --> AVATAR/AUSTRALIA
    function detectCollisionAUS(avatar, countryAUS){
        var avatar = {x: avatar.x, y: avatar.y, width: 20, height: 20, health: avatar.health} 

        if (avatar.x < countryAUS.x + countryAUS.w &&
        avatar.x + avatar.width > countryAUS.x &&
        avatar.y < countryAUS.y + countryAUS.h &&
        avatar.y + avatar.height > countryAUS.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            avatar.health -= 25;
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconAUS();
            document.getElementById('current-country').innerHTML = `Australia`
            }; 
            document.getElementById('cases').innerHTML = covidCases[29].cases;
            document.getElementById('deaths').innerHTML = covidCases[29].deaths;
            document.getElementById('health-score').innerHTML = countryAUS.casesPerMillion;
        };
    }

    function animate(){   
        frames++;  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAvatar();
        recordPosition();
        //toggleGameState();
        drawStartEnd();
        drawCovids();
        drawMasks();
        drawCountryUSA();
        drawCountryUK();
        drawCountryChina();
        drawCountryIndia();
        drawCountryAUS();
    
        detectCovidCollision(avatar);
        detectMaskCollision(avatar);
        
        detectCollisionUSA(avatar, countryUSA);
        detectCollisionUK(avatar, countryUK);
        detectCollisionChina(avatar, countryChina);
        detectCollisionIndia(avatar, countryIndia);
        detectCollisionAUS(avatar, countryAUS);
        if(!gameOver){
            detectWin(avatar, northpole);
        } else {
            window.cancelAnimationFrame(animateId);
        }
        if(avatar.health <= 0){
            console.log("dead!", animateId)
            window.cancelAnimationFrame(animateId);
            if(alert('Your explorer is dead! Game over. Time to restart.')){} 
                else
                window.location.reload();
        } else {
            animateId = window.requestAnimationFrame(animate);
        }
    }
      //console.log("canceling")
    
    function startGame() {
        document.getElementById("start-button").remove();
    }
  };
  
  
