let boxes =document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnContainer=document.querySelector(".turn-container");
let turnFocus= document.querySelector(".bg"); //focuses the turns

let turnO=true; //player X, player O
let isGameOver = false; 
let count=0;

// let arr=["apple","banana","litchi"];    //1d array
// let arr2=[
//     ["apple","banana"],
//     ["potato","carrot"],
//     ["pants","shirts"]
// ];  //2d array

const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnFocus();
};

const updateTurnFocus=()=>{
        if (turnO) {
            turnFocus.style.left="0px"; //adjust the focus hover bar
        }else{
            turnFocus.style.left="85px"; 
        }

};


boxes.forEach(box=>{
    box.addEventListener("click", ()=>{
        // console.log("box was clicked!");
        // box.innerHTML="box";
        if(turnO){  //player Os turn
            box.innerText = "O";
            turnO=false;
        }else{    //player Xs turn
            box.innerText = "X";
            turnO=true;
        }
        box.disabled = true;
        count++;
        updateTurnFocus();

        checkWinner();

        if(count === 9 && !isGameOver){
            showDraw(); //draw if all boxes are winners
        }
    });
}); //for each box add the event listner



//to check the winner

const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText = "";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations!\n Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    isGameOver=true;    //make game as over
};

const showDraw=()=>{
    msg.innerText="Well Played!\nIt's a draw!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
    isGameOver=true;    //make game as over
};

const checkWinner=()=>{
    let winnerFound=false;  //when all the boxes are filled but no draw message is diaplayed

    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(
        //     boxes[pattern[0]], 
        //     boxes[pattern[1]], 
        //     boxes[pattern[2]]
        // );

        let postval1 = boxes[pattern[0]].innerText;
        let postval2 = boxes[pattern[1]].innerText;
        let postval3 = boxes[pattern[2]].innerText;

        if (postval1 != "" && postval2 != "" && postval3 != ""){
            if (postval1 === postval2 && postval2=== postval3) {
                // console.log("Winner", postval1);
                showWinner(postval1);
                winnerFound=true;
                return; //stop when winner is found
            }
        }
    }

    if (!winnerFound && count === 9 ) {
        showDraw();
    }
};
updateTurnFocus();

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);