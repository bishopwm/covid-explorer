window.onload = () => {
    // HIDE MOBILE CONTROLS
    document.getElementsByClassName('mobile-controls').style = "visibility: hidden;";
    if(screen.width >= 500){
        document.getElementById('start-button').onclick = () => {
        document.getElementById('canvas').style = "visibility: visible;";
        document.getElementById('sidebar').style = "visibility: visible;";
        document.getElementById('explorer-stats').style = "visibility: visible;";
        document.getElementById('instructions').style = "visibility: hidden;";
        document.getElementById('main-body').style = "overflow: hidden;"
        startGame();
        animate();
        };
    } else {
        document.getElementById('start-button-mobile').onclick = () => {
            document.getElementById('canvas').style = "visibility: visible;";
            document.getElementById('sidebar').style = "visibility: visible;";
            document.getElementById('explorer-stats').style = "visibility: visible;";
            document.getElementById('instructions').style = "visibility: hidden;";
            document.getElementById('main-body').style = "overflow: auto;";
            document.getElementById('start-button-mobile').style = "visibility: hidden;";
            // SHOW MOBILE CONTROLS
            document.getElementById('mobile-up').style = "visibility: visible";
            document.getElementById('mobile-right').style = "visibility: visible";
            document.getElementById('mobile-left').style = "visibility: visible";
            document.getElementById('mobile-down').style = "visibility: visible";
            startGame();
            animate();
        };
    }
  
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
    countryAUSimage.src = 'images/australianFlag.png'

    let countryARGimage = new Image()
    countryARGimage.src = 'images/argentineFlag.png'
    
    let airportimage = new Image()
    airportimage.src = 'images/airport.png'

    let northpoleimage = new Image()
    northpoleimage.src = 'images/northpole.png'

    let whoimage = new Image()
    whoimage.src = 'images/who.png'

    // DISPLAY AVATAR CURRENT POSITION
    function recordPosition(){
        document.getElementById('current-position').innerHTML = avatar.x +",  "+ avatar.y
    }
    // ENLARGE COUNTRY ICONS ON COLLISION
    function enlargeIconUSA(){
        countryUSA.w = 80;
        countryUSA.h = 90;
        document.getElementById("checkmark-usa").src = 'images/checkmark.png';
        countryUSA.countryVisited = true;
        // document.getElementById("mask-fact").style = "visibility: visible;";
        // document.getElementById("country-welcome").innerHTML = `Welcome to the ${countryUSA.name}! Stay Safe.`
        //     $('#mask-fact')
        //         .delay(500)
        //         .queue(function (next) { 
        //             $(this).css('visibility', 'hidden'); 
        //             next(); 
        //         });
    }
    function enlargeIconUK(){
        countryUK.w = 80;
        countryUK.h = 90;
        document.getElementById("checkmark-uk").src = 'images/checkmark.png';
        countryUK.countryVisited = true;
    }
    function enlargeIconChina(){
        countryChina.w = 80;
        countryChina.h = 90;
        document.getElementById("checkmark-china").src = 'images/checkmark.png';
        countryChina.countryVisited = true;
    }
    function enlargeIconIndia(){
        countryIndia.w = 80;
        countryIndia.h = 90;
        document.getElementById("checkmark-india").src = 'images/checkmark.png';
        countryIndia.countryVisited = true;
    }
    function enlargeIconAUS(){
        countryAUS.w = 80;
        countryAUS.h = 90;
        document.getElementById("checkmark-aus").src = 'images/checkmark.png';
        countryAUS.countryVisited = true;
    }
    function enlargeIconARG(){
        countryARG.w = 80;
        countryARG.h = 90;
        document.getElementById("checkmark-arg").src = 'images/checkmark.png';
        countryARG.countryVisited = true;
    }

    // DRAW START AND END POINTS, DETECT WIN
    function drawStartEnd(){
        ctx.drawImage(airport.image, airport.x, airport.y, airport.w, airport.h)
        ctx.drawImage(northpole.image, northpole.x, northpole.y, northpole.w, northpole.h)
        ctx.drawImage(who.image, who.x, who.y, who.w, who.h)
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
    function drawCountryARG(){
        ctx.drawImage(countryARG.image, countryARG.x, countryARG.y, countryARG.w, countryARG.h)  
    }

    // DECLARE START AND END POINT OBJECTS
    let airport = {
        x: 20,
        y: 700,
        w: 140,
        h: 105,
        image: airportimage
    }

    let northpole = {
        x: 860,
        y: 25,
        w: 100,
        h: 140,
        image: northpoleimage
    }
    let who = {
        x: 360,
        y: 300,
        w: 60,
        h: 65,
        image: whoimage
    }

    // DECLARE AVATAR
    let avatar = {
        x: 170,
        y: 730,
        w: 60,
        h: 60,
        image: avatarimage,
        health: 30000
    }

    // DECLARE COUNTRIES

    let countryUSA = {
        name: "United States",
        x: 170,
        y: 275,
        w: 60,
        h: 65,
        image: countryUSAimage,
        //casesPerMillion: covidCases[1].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryUK = {
        name: "United Kingdom",
        x: 490,
        y: 200,
        w: 60,
        h: 65,
        image: countryUKimage,
        //casesPerMillion: covidCases[6].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryChina = {
        name: "China",
        x: 820,
        y: 300,
        w: 60,
        h: 65,
        image: countryChinaimage,
        //casesPerMillion: covidCases[212].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryIndia = {
        name: "India",
        x: 730,
        y: 330,
        w: 60,
        h: 65,
        image: countryIndiaimage,
        //casesPerMillion: covidCases[21].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryAUS = {
        name: "Australia",
        x: 930,
        y: 530,
        w: 60,
        h: 65,
        image: countryAUSimage,
        //casesPerMillion: covidCases[29].total_cases_per_1m_population,
        countryVisited: false
    }
    let countryARG = {
        name: "Argentina",
        x: 310,
        y: 490,
        w: 60,
        h: 65,
        image: countryARGimage,
        //casesPerMillion: covidCases[50].total_cases_per_1m_population,
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

    // MOBILE: CONTROL BUTTONS    
    $('#mobile-up').click(function(){
        avatar.y-=50;
    });
    $('#mobile-right').click(function(){
        avatar.x+=50;
    });
    $('#mobile-left').click(function(){
        avatar.x-=50;
    }); 
    $('#mobile-down').click(function(){
        avatar.y+=50;
    });
    
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
                    document.getElementById("winner-popup").style = "visibility: visible;";
                    $('#play-again-button').click(function(){
                        window.location.reload();
                    });    
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

    // DETECT WHO COLLISION
    function detectCollisionWHO(avatar, who){
        var avatar = {x: avatar.x, y: avatar.y, w: avatar.w, h: avatar.h, health: avatar.health}; 
       
        if(avatar.x < who.x + who.w &&
        avatar.x + avatar.w > who.x &&
        avatar.y < who.y + who.h &&
        avatar.y + avatar.h > who.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
        document.getElementById("mask-fact").style = "visibility: visible;";
        document.getElementById("country-welcome").innerHTML = `Friendly reminder from the World Health Org!`
            $('#mask-fact')
                .delay(500)
                .queue(function (next) { 
                    $(this).css('visibility', 'hidden'); 
                    next(); 
                });
            }
        };
    } 


    // DETECT COLLISION --> AVATAR/USA
    function detectCollisionUSA(avatar, countryUSA){
        var avatar = {x: avatar.x, y: avatar.y, w: avatar.w, h: avatar.h, health: avatar.health}; 
       
        if(avatar.x < countryUSA.x + countryUSA.w &&
        avatar.x + avatar.w > countryUSA.x &&
        avatar.y < countryUSA.y + countryUSA.h &&
        avatar.y + avatar.h > countryUSA.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconUSA();
            document.getElementById('current-country').innerHTML = `United States`
            }; 
            document.getElementById('cases').innerHTML = jsondata.countries_stat[1].cases;
            document.getElementById('deaths').innerHTML = jsondata.countries_stat[1].deaths;
            document.getElementById('health-score').innerHTML = jsondata.countries_stat[1].total_cases_per_1m_population;
        };
        let usaCheck = document.getElementById('checkmark-usa').src;
        usaCheck = "../images/checkmark.png";
    }   

    // DETECT COLLISION --> AVATAR/UK
    function detectCollisionUK(avatar, countryUK){
        var avatar = {x: avatar.x, y: avatar.y, w: avatar.w, h: avatar.h, health: avatar.health} 

        if (avatar.x < countryUK.x + countryUK.w &&
        avatar.x + avatar.w > countryUK.x &&
        avatar.y < countryUK.y + countryUK.h &&
        avatar.y + avatar.h > countryUK.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconUK();
            document.getElementById('current-country').innerHTML = `United Kingdom`
            }; 
            document.getElementById('cases').innerHTML = jsondata.countries_stat[6].cases;
            document.getElementById('deaths').innerHTML = jsondata.countries_stat[6].deaths;
            document.getElementById('health-score').innerHTML = jsondata.countries_stat[6].total_cases_per_1m_population;
        };
    } 
    // DETECT COLLISION --> AVATAR/CHINA
    function detectCollisionChina(avatar, countryChina){
        var avatar = {x: avatar.x, y: avatar.y, w: avatar.w, h: avatar.h, health: avatar.health} 

        if (avatar.x < countryChina.x + countryChina.w &&
        avatar.x + avatar.w > countryChina.x &&
        avatar.y < countryChina.y + countryChina.h &&
        avatar.y + avatar.h > countryChina.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconChina();
            document.getElementById('current-country').innerHTML = `China`
            }; 
            document.getElementById('cases').innerHTML = jsondata.countries_stat[212].cases;
            document.getElementById('deaths').innerHTML = jsondata.countries_stat[212].deaths;
            document.getElementById('health-score').innerHTML = jsondata.countries_stat[212].total_cases_per_1m_population;
        };
    } 
    // DETECT COLLISION --> AVATAR/INDIA
    function detectCollisionIndia(avatar, countryIndia){
        var avatar = {x: avatar.x, y: avatar.y, w: avatar.w, h: avatar.h, health: avatar.health} 

        if (avatar.x < countryIndia.x + countryIndia.w &&
        avatar.x + avatar.w > countryIndia.x &&
        avatar.y < countryIndia.y + countryIndia.h &&
        avatar.y + avatar.h > countryIndia.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconIndia();
            document.getElementById('current-country').innerHTML = `India`
            };
            document.getElementById('cases').innerHTML = jsondata.countries_stat[21].cases;
            document.getElementById('deaths').innerHTML = jsondata.countries_stat[21].deaths;
            document.getElementById('health-score').innerHTML = jsondata.countries_stat[21].total_cases_per_1m_population;
        };
    }
    // DETECT COLLISION --> AVATAR/AUSTRALIA
    function detectCollisionAUS(avatar, countryAUS){
        var avatar = {x: avatar.x, y: avatar.y, w: avatar.w, h: avatar.h, health: avatar.health} 

        if (avatar.x < countryAUS.x + countryAUS.w &&
        avatar.x + avatar.w > countryAUS.x &&
        avatar.y < countryAUS.y + countryAUS.h &&
        avatar.y + avatar.h > countryAUS.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconAUS();
            document.getElementById('current-country').innerHTML = `Australia`
            }; 
            document.getElementById('cases').innerHTML = jsondata.countries_stat[29].cases;
            document.getElementById('deaths').innerHTML = jsondata.countries_stat[29].deaths;
            document.getElementById('health-score').innerHTML = jsondata.countries_stat[29].total_cases_per_1m_population;
        };
    }

    // DETECT COLLISION --> AVATAR/ARGENTINA
    function detectCollisionARG(avatar, countryARG){
        var avatar = {x: avatar.x, y: avatar.y, w: avatar.w, h: avatar.h, health: avatar.health} 

        if (avatar.x < countryARG.x + countryARG.w &&
        avatar.x + avatar.w > countryARG.x &&
        avatar.y < countryARG.y + countryARG.h &&
        avatar.y + avatar.h > countryARG.y) {
        if(frames % 1 === 0){ready = true};
        if(ready){
            document.getElementById('explorer-health').innerHTML = avatar.health;
            enlargeIconARG();
            document.getElementById('current-country').innerHTML = `Argentina`
            }; 
            document.getElementById('cases').innerHTML = jsondata.countries_stat[50].cases;
            document.getElementById('deaths').innerHTML = jsondata.countries_stat[50].deaths;
            document.getElementById('health-score').innerHTML = jsondata.countries_stat[50].total_cases_per_1m_population;
        };
    }

    // ANIMATE FUNCTION
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
        drawCountryARG();

        // NAVIGATION IN MOBILE:
        if(screen.width <= 500){
            $('#canvas').click(function(){
               console.log("hello!");
                })   
        }
    
        detectCovidCollision(avatar);
        detectMaskCollision(avatar);
        detectCollisionWHO(avatar, who);
        
        detectCollisionUSA(avatar, countryUSA);
        detectCollisionUK(avatar, countryUK);
        detectCollisionChina(avatar, countryChina);
        detectCollisionIndia(avatar, countryIndia);
        detectCollisionAUS(avatar, countryAUS);
        detectCollisionARG(avatar, countryARG);
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
  
  
