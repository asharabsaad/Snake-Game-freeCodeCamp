// get the html elements 
const gameBoard = document.getElementById('game-board')

// Define game variables
const gridSize = 20; 
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';

// Dra game map, snake, food
function draw(){
    gameBoard.innerHTML = ''
    drawSnake()
    drawFood()
   
}

function drawSnake(){
    snake.forEach((segment)=>{
        const snakeElement = createGameElement('div','snake')
        setPosition(snakeElement,segment)
        gameBoard.appendChild(snakeElement)
    })
}

function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element,position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

draw()

function drawFood(){
    const foodElement = createGameElement('div','food')
    setPosition(foodElement,food);
    gameBoard.appendChild(foodElement);
}

function generateFood(){
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x,y};
}

function move(){
    const head = {...snake[0]};
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        
    }
    snake.unshift(head);

    snake.pop();

    if(head.x === food.x && head.y === food.y){
        food = generateFood();
        clearInterval();
    }

}

setInterval(()=>{
    move();
    draw();
},1000)