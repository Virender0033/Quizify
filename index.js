/* creating quizify app */

let readlineSync = require('readline-sync');
let kuler = require('kuler');
let scores= [];
console.log(kuler('Welcome to Quizify','#5f47e3'))


const database ={
  data: [
    {
      question: ` I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?`,
      option:{
        a: " A shadow",
        b: " An echo",
        c: " A dream",  
        d: " A whisper"
      },
      correctAnswer:"b"
    },
    {
      question:  ` I have keys but no locks. I have space but no room. You can enter, but you can’t go outside. What am I?`,
      option:{
        a: " A keyboard",
        b: " A computer",
        c: " A house",
        d: " A riddle"
      },
      correctAnswer:"a"
    },
    {
      question: ` The more you take, the more you leave behind. What am I?`,
      option:{
        a: " memory",
        b: " time",
        c: " footsteps",
        d: " shadow"
      },
      correctAnswer:"c"
    },
    {
      question: ` A man is pushing his car along a road when he comes to a hotel. He shouts, "I’m bankrupt!" Why?`,
      option:{
        a: " He ran out of gas.",
        b:" He is in a board game.",
        c: " He lost all his money.",
        d: " His car broke down."
      },
      correctAnswer:"c"
    },
    {
      question: ` There are three boxes. One contains only apples, one contains only oranges, and one contains both apples and oranges. You have to pick one fruit from a box labeled both apples and oranges. Which box do you choose to determine the correct labeling of all boxes?`,
      option:{
        a: " The box labeled apples",
        b: " The box labeled oranges",
        c: " Any box",
        d: " The box labeled both apples and oranges"
      },
      correctAnswer: "d"
    }
  ]
}

function playgame(answer, correctAnswer){
  if(answer ==='a' || answer==='b' || answer ==='c' || answer==='d'){
    if(answer === correctAnswer){
      console.log(kuler("Correct Answer \n",'#22c55e'))
      return 1;
    }else{
      console.log(kuler("Wrong Answer \n",'#ef4444'))
      console.log(kuler(`Correct Answer: ${correctAnswer} \n`, '#22c55e'))
      return 0;
    }
  }else{
    console.log(answer +  " is not a valid option \n")
    return 0;
  }
}

function showQuestionsAndOptions(){
  let score=0;
  for(let i=0;i<database.data.length; i++){
    console.log(kuler(`Question ${i+1}.${database.data[i].question}\n`,"#2dd4bf"));
    for(let key in database.data[i].option){
      console.log(`${key}.${database.data[i].option[key]}`);
    }

    let answer;
    let isValidOption = false;
    while(!isValidOption){
      answer = readlineSync.question("Choose the correct option:\n").toLowerCase();
      if(answer ==='a' || answer==='b' || answer ==='c' || answer==='d'){
        isvalidOption = true;
        break;
      }  
    }    
    score += playgame(answer, database.data[i].correctAnswer );
  }
  return score;
}

function showleaderboard(){
  console.log(kuler("\nLeaderboard",'5f47e3'));

  scores.sort((a,b) => b.score - a.score);
  scores.forEach((user,index)=>{
    console.log(kuler(`${index+1}. ${user.name} : ${user.score}`,'#374151'));
  });
}

function startgame(){
  let userName = readlineSync.question(kuler("Enter your Name: \n","#ecc94b"));
  console.log(`\n${userName} Your Quiz Starts Now\n`);
  const userScore = showQuestionsAndOptions();

  console.log(`Your score is ${userScore} out of ${database.data.length}`);
  scores.push({name: userName, score: userScore});
  let anotherUser = readlineSync.question(kuler("\nDoes another user want to play? (y/n)",'#f43f5e')).toLowerCase();
  if(anotherUser === 'Yes' || anotherUser === 'y'){
    startgame();
  }else if(anotherUser ==='No' || anotherUser === 'n') {
    showleaderboard();
  }else{
    console.log("Invalid Input");
  }
}
startgame();