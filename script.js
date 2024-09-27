document.addEventListener("DOMContentLoaded", function() {
    let currentScreen = 1;
    let questionIndex = 0;
    let imgcontainer1 = false;
    let finalpicture = false;
    let isTransitioning = false;  // Add this flag to control transition states
    let qrvisible=true; 
    
    const maxQuestions = document.querySelectorAll('.questionbox').length;
    const questions = document.querySelectorAll('.questionbox');
    let text1Visible = false;
   
    const ovelay = [
        { upper: "A WHISKY NOVICE", lower: "A WHISKY EXPLORER" },
        { upper: "image3.jpg", lower: "image4.jpg" },
        { upper: "image5.jpg", lower: "image6.jpg" },
        { upper: "image7.jpg", lower: "image8.jpg" },
        { upper: "image9.jpg", lower: "image10.jpg" },
    ];
    const images = [
        { upper: "assets/images/questions/q1uppers.png", lower: "assets/images/questions/q1lower.png" },
        { upper: "image3.jpg", lower: "image4.jpg" },
        { upper: "image5.jpg", lower: "image6.jpg" },
        { upper: "image7.jpg", lower: "image8.jpg" },
        { upper: "image9.jpg", lower: "image10.jpg" },
    ];
    
    document.body.addEventListener("click", function() {
        if (isTransitioning) return; // Prevent multiple transitions
        if (currentScreen === 1) {
            switchScreen(2);
        }
        if (currentScreen === 5) {
            switchScreen(6);
        }
        // if (currentScreen === 6) {
        //     switchScreen(7);
        // }
        if (currentScreen === 7) {
            // switchScreen(8);
            // if(!qrvisible){

            
            if (!finalpicture) {
                document.querySelector('#final1').classList.add('screen-slide-up');
                // console.log(currentScreen + ' is not supported')
                setTimeout(() => {
                    document.querySelector('#final1').style.display = "none";
                    document.querySelector('#final2').style.display = "block";
                    // After text1 animation, show#details2 with slide up
                    document.querySelector('#final2').classList.add('slide-up-fade-in');
                }, 1000); // Match this with the duration of slide-up-fade-out animation
                finalpicture = true;
            } else {
                document.getElementById('screen7').classList.add('fade-out');
                // Move to the next screen with the entire screen fading out
                setTimeout(() => {
                    window.location.reload();
                }, 5000); // Duration of fade-out animation
            }

        // }else{
        //     qrvisible=false;
        //     document.querySelector('#final1screen').style.display="none";
        //     document.querySelector('#final2screen').style.display="block";
            
        // }
        }
        if (currentScreen === 8) {
          
            if (!finalpicture) {
                document.querySelector('#final1').classList.add('screen-slide-up');
                // console.log(currentScreen + ' is not supported')
                setTimeout(() => {
                    document.querySelector('#final1').style.display = "none";
                    document.querySelector('#final2').style.display = "block";
                    // After text1 animation, show#details2 with slide up
                    document.querySelector('#final2').classList.add('slide-up-fade-in');
                }, 1000); // Match this with the duration of slide-up-fade-out animation
                finalpicture = true;
            } else {
                document.getElementById('screen8').classList.add('fade-out');
                // Move to the next screen with the entire screen fading out
                setTimeout(() => {
                    window.location.reload();
                }, 5000); // Duration of fade-out animation
            }
            
        }
    });

    document.getElementById("welcomeButton").addEventListener("click", function() {
        switchScreen(3);
    });
    document.getElementById("startButton").addEventListener("click", function() {
        switchScreen(2);
    });

    document.getElementById("arrownotes").addEventListener("click", function() {
        // console.log("arrownotes clicked");
        if (!imgcontainer1) {
            // Trigger slide up and fade out for text1
            document.querySelector('#details1').classList.add('screen-slide-up');
            
            setTimeout(() => {
                document.querySelector('#details1').style.display = "none";
                document.querySelector('#details2').style.display = "flex";
                // After text1 animation, show#details2 with slide up
                // document.querySelector('#details2').classList.add('slide-up-fade-in');
            }, 1000); // Match this with the duration of slide-up-fade-out animation
            imgcontainer1 = true;
        } else {
            document.getElementById('details2').classList.add('screen-slide-up');
            // Move to the next screen with the entire screen sliding up
            setTimeout(() => {
            switchScreen(7);
            }, 1000); // Match this with the duration of screen-slide-up animation
        }
    });
    


    document.getElementById("arrow1").addEventListener("click", function() {
        if (isTransitioning) return; // Prevent multiple transitions
        document.getElementById('screen3').classList.add('screen-slide-up');
            // Move to the next screen with the entire screen sliding up
            setTimeout(() => {
                switchScreen(4);
            }, 1000); // Match this with the duration of screen-slide-up animation
        // if (text1Visible) {
        //     // Trigger slide up and fade out for text1
        //     document.querySelector('.text1').classList.add('slide-up-fade-out');
            
        //     setTimeout(() => {
        //         document.querySelector('.text1').style.display = "none";
        //         document.querySelector('.text2').style.display = "block";
        //         // After text1 animation, show text2 with slide up
        //         document.querySelector('.text2').classList.add('slide-up-fade-in');
        //     }, 1000); // Match this with the duration of slide-up-fade-out animation
        //     text1Visible = false;
        // } else {
            
        // }
    });

    document.querySelectorAll('.half').forEach((half, index) => {
        half.addEventListener('click', function () {
            handleSelection(index);
        });
    });

    document.querySelectorAll('.questionarrow').forEach((arrow) => {
        arrow.addEventListener('click', function () {
            if (isTransitioning) return; // Prevent multiple transitions
            const halves = document.querySelectorAll('.half');
            if (arrow.classList.contains('top')) {
                handleSelection(0); // Select the upper half
            } else if (arrow.classList.contains('bottom')) {
                handleSelection(1); // Select the lower half
            }
        });
    });

    let userSelections = {
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null
    };
    function goBack() {
        
    }
    document.getElementById("backButton").addEventListener('click', function () {
        if (isTransitioning || questionIndex === 0) return; // Prevent going back if on the first question
        questionIndex--; // Go to the previous question
        updateQuestion();
// console.log(questionIndex)
        const halves = document.querySelectorAll(`.question-${questionIndex + 1} .half`);
        console.log(halves.length)
        // Loop through each element and remove the "selected" and "dimmed" classes
        halves.forEach(half => {
            half.classList.remove('selected');
            half.classList.remove('dimmed');
        });
    })
    
    
    function handleSelection(selectedIndex) {
        if (isTransitioning) return; // Prevent multiple transitions
        const halves = document.querySelectorAll('.half');
        halves.forEach((half, index) => {
            if (index === selectedIndex) {
                half.classList.add('selected');
            } else {
                half.classList.add('dimmed');
            }
        });
    
        // Update the selected answer
        userSelections[`q${questionIndex + 1}`] = selectedIndex;
    console.log(userSelections)
        // Proceed to the next question after 1 second
        setTimeout(() => {
            if (questionIndex < maxQuestions - 1) {
                questionIndex++;
                updateQuestion();
            } else {
                const outcome = determineOutcome(userSelections);
                
                updateFinalScreen(outcome);
                switchScreen(5);
            }
        }, 1000);
    }
    

    function determineOutcome(selections) {
        if(selections.q1 === 0 && selections.q2 === 3 && selections.q3 === 4 &&
            selections.q4 === 7 && selections.q5 === 8 && selections.q6 === 10 && selections.q7 === 13) {
             return 'd12';
         } else if (selections.q1 === 0 && selections.q2 === 2 && selections.q3 === 5 &&
                    selections.q4 === 6 && selections.q5 === 8 && selections.q6 === 11 && selections.q7 === 13) {
             return 'd15';
         } else if (selections.q1 === 1 && selections.q2 === 3 && selections.q3 === 4 &&
                    selections.q4 === 6 && selections.q5 === 9 && selections.q6 === 11 && selections.q7 === 13) {
             return 'd18';
         } else if (selections.q1 === 1 && selections.q2 === 2 && selections.q3 === 5 &&
                    selections.q4 === 7 && selections.q5 === 9 && selections.q6 === 10 && selections.q7 === 13) {
             return 'dd21';
         } else if (selections.q1 === 0 && selections.q2 === 3 && selections.q3 === 4 &&
                    selections.q4 === 7 && selections.q5 === 8 && selections.q6 === 10 && selections.q7 === 12) {
             return 'd12_highball';
         } else if (selections.q1 === 1 && selections.q2 === 2 && selections.q3 === 5 &&
                    selections.q4 === 7 && selections.q5 === 9 && selections.q6 === 10 && selections.q7 === 12) {
             return 'dd21_old_fashioned';
         } 
         const outcomes = {
            d12: 0,
            d15: 0,
            d18: 0,
            dd21: 0,
            d12_highball: 0,
            dd21_old_fashioned: 0
        };

        // Increment the outcomes based on user's selections
        if(selections.q1 == 0 ){
            outcomes['d12']=outcomes['d12']+1;
            outcomes['d15']=outcomes['d15']+1;
            outcomes['d12_highball']=outcomes['d12_highball']+1;
        }
        if(selections.q1 == 1 ){
            outcomes['dd21_old_fashioned']=outcomes['dd21_old_fashioned']+1;
            outcomes['dd21']=outcomes['dd21']+1;
            outcomes['d18']=outcomes['d18']+1;
        }

        if(selections.q2== 3 ){
            outcomes['d12']=outcomes['d12']+1;
            outcomes['d18']=outcomes['d18']+1;
            outcomes['d12_highball']=outcomes['d12_highball']+1;
        }
        if(selections.q2== 2 ){
            outcomes['dd21_old_fashioned']=outcomes['dd21_old_fashioned']+1;
            outcomes['dd21']=outcomes['dd21']+1;
            outcomes['d15']=outcomes['d15']+1;
        }

        if(selections.q3== 4 ){
            outcomes['d12']=outcomes['d12']+1;
            outcomes['d18']=outcomes['d18']+1;
            outcomes['d12_highball']=outcomes['d12_highball']+1;
        }
        if(selections.q3== 5 ){
            outcomes['dd21_old_fashioned']=outcomes['dd21_old_fashioned']+1;
            outcomes['dd21']=outcomes['dd21']+1;
            outcomes['d15']=outcomes['d15']+1;
        }

        if(selections.q4== 6 ){
            outcomes['d15']=outcomes['d15']+1;
            outcomes['d18']=outcomes['d18']+1;
            
        }
        if(selections.q4== 7 ){
            outcomes['dd21_old_fashioned']=outcomes['dd21_old_fashioned']+1;
            outcomes['dd21']=outcomes['dd21']+1;
            outcomes['d12']=outcomes['d12']+1;
            outcomes['d12_highball']=outcomes['d12_highball']+1;
            
        }

        if(selections.q5== 8 ){
            outcomes['d12']=outcomes['d12']+1;
            outcomes['d15']=outcomes['d15']+1;
            
            outcomes['d12_highball']=outcomes['d12_highball']+1;
        }
        if(selections.q5== 9 ){
            outcomes['dd21_old_fashioned']=outcomes['dd21_old_fashioned']+1;
            outcomes['dd21']=outcomes['dd21']+1;
            outcomes['d18']=outcomes['d18']+1;
        }

        if(selections.q6== 10 ){
            outcomes['d12']=outcomes['d12']+1;
            outcomes['dd21_old_fashioned']=outcomes['dd21_old_fashioned']+1;
            outcomes['dd21']=outcomes['dd21']+1;
            outcomes['d12_highball']=outcomes['d12_highball']+1;
        }
        if(selections.q6== 11 ){
            
            outcomes['d15']=outcomes['d15']+1;
            outcomes['d18']=outcomes['d18']+1;
        }
        if(selections.q7== 12 ){
            outcomes['dd21_old_fashioned']=outcomes['dd21_old_fashioned']+1;
            outcomes['d12_highball']=outcomes['d12_highball']+1;
        }
        if(selections.q7== 13 ){
            outcomes['d12']=outcomes['d12']+1;
            outcomes['d15']=outcomes['d15']+1;
            outcomes['d18']=outcomes['d18']+1;
            outcomes['dd21']=outcomes['dd21']+1;
        }
        
        // console.log(outcomes);
        // Determine the most common outcome
        let maxOutcomes = [];
        let maxCount = 0;
        
        for (let outcome in outcomes) {
            if (outcomes[outcome] > maxCount) {
                maxOutcomes = [outcome];
                maxCount = outcomes[outcome];
            } else if (outcomes[outcome] === maxCount) {
                maxOutcomes.push(outcome);
            }
        }
        
        // Always return a recommendation based on the most selected outcome(s)
        if (maxOutcomes.length > 0) {
            return maxOutcomes[0]; // Return the first most common outcome
        }
        
        // This point will never be reached since maxOutcomes will always have at least one element
    }
    function updateQuestion() {
        const questions = document.querySelectorAll('.questionbox');
        const bottles = document.querySelectorAll('.bottle');
    if(questionIndex ==0){
        document.querySelector('#backButton').classList.add('hidden');
    }else{
        document.querySelector('#backButton').classList.remove('hidden');
    }
        // Hide all questions and bottles
        questions.forEach((question) => {
            question.style.display = 'none';
        });
    
        bottles.forEach((bottle) => {
            bottle.style.opacity = 0; // Hide with opacity for fade-in effect
            bottle.style.transition = 'opacity 2s'; // Set transition for fade-in effect
        });
    
        // Show the current question
        questions[questionIndex].style.display = 'block';
    
        // Show the corresponding bottle with fade-in effect
        bottles[questionIndex].style.opacity = 1;


        if(questionIndex==6){
            setTimeout(() => {
                bottles[7].style.opacity = 1;
            }, 2000);
        }
    
        // Reset styles for the 'half' elements
        document.querySelectorAll('.half').forEach(half => {
            half.classList.remove('selected');
            half.classList.remove('dimmed');
        });
    }

    function updateFinalScreen(outcome) {
        const imagePaths = {
            d12: 'assets/images/GFX D12 Bottle.png',
            d15: 'assets/images/D15_2.jpg',
            d18: 'assets/images/D18_1.jpg',
            dd21: 'assets/images/DD21_1.jpg',
            d12_highball: 'assets/images/D12_Highball.png',
            dd21_old_fashioned: 'assets/images/DD21_1.jpg'
        };


        const titles={
            d12: '12 YEAR OLD',
            d15: '15 YEAR OLD',
            d18: '18 YEAR OLD',
            dd21: 'DOUBLE DOUBLE 21',
            d12_highball: '12 YEAR OLD',
            dd21_old_fashioned: 'DOUBLE DOUBLE 21'
        }
        const subtitles={
            d12: 'NEAT',
            d15: 'NEAT',
            d18: 'NEAT',
            dd21: 'NEAT',
            d12_highball: 'HIGHBALL',
            dd21_old_fashioned: 'OLD FASHIONED'
        }
            
        const imagelookup = {
            d12: 'assets/images/D12-Lockup.png',
            d15: 'assets/images/D15-Lockup.png',
            d18: 'assets/images/D18-Lockup.png',
            dd21: 'assets/images/DD21_Lockup.png',
            d12_highball: 'assets/images/D12_Highball_lookup.png',
            dd21_old_fashioned: 'assets/images/DD21-Old-Fashioned-Lockup.png'
        };

        const descriptionPaths = {
            d12: 'assets/images/D12-Lockup-notes.png',
            d15: 'assets/images/D15-Lockup-notes.png',
            d18: 'assets/images/D18-Lockup-notes.png',
            dd21: 'assets/images/DD21-Lockup-notes.png',
            d12_highball: 'assets/images/D12_Highball_lookup-notes.png',
            dd21_old_fashioned: 'assets/images/DD21-Lockup-of-n.png'
        };

        // document.getElementById('Lockup').src = imagelookup[outcome];
        document.getElementById('finaltitle').textContent = titles[outcome];
        document.getElementById('finalsubtitle').textContent = subtitles[outcome];
        document.getElementById('lookupbackground').src = imagePaths[outcome];
        document.getElementById('lookupbackground').alt = outcome;
        document.getElementById('g12bottledetails').src = descriptionPaths[outcome];
    }

   
    

    function switchScreen(screenNumber) {
        if (isTransitioning || currentScreen === screenNumber) return; // Prevent multiple transitions
        isTransitioning = true;
        const currentActiveScreen = document.querySelector('.screen.active');
        const nextScreen = document.getElementById(`screen${screenNumber}`);
        

        currentActiveScreen.style.transition = "opacity 2s ease-in-out";
        currentActiveScreen.style.opacity = 0;


        var timerr=100;
        var timer2=500;
        if(screenNumber == 1 || screenNumber == 2 || screenNumber == 3){
            timerr=300;
            timer2=200;
        }

        console.log(screenNumber)
    
        setTimeout(() => {
            currentActiveScreen.classList.remove('active');
            nextScreen.classList.add('active');
    
            if(screenNumber == 1 || screenNumber == 2 || screenNumber == 3){
            nextScreen.style.transition = "opacity 1s ease-in-out";
            }else{
                nextScreen.style.transition = "opacity 2s ease-in-out";
            }
            nextScreen.style.opacity = 0;
    
            setTimeout(() => {
                nextScreen.style.opacity = 1;
                isTransitioning = false; // Allow transitions after fade-in is complete
            }, 50);
            currentScreen = screenNumber;    
            if(currentScreen == 7){
                document.getElementById("scan1").classList.add('text-slide-up');
                setTimeout(() => {
                    document.getElementById("scan1").classList.remove('text-slide-up');
                    document.getElementById("scan2").style.display = 'block';
                    document.getElementById("scan2").classList.add('text-slide-up');
                }, timer2);
            }
        }, timerr);


        if(screenNumber==6){
            setTimeout(() => {
                document.querySelector(".overlaylookup").style.display ="block"; 
            }, 3000);
        }



// console.log(currentScreen)
        if(screenNumber == 5){
            // console.log(" screen 5 ")
            setTimeout(() => {
                switchScreen(6);
            }, 5000);
        }

    }
});




document.getElementById("restartbutton").addEventListener('click', function () {
    window.location.reload();
})