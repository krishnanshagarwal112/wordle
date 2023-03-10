import {word_function} from './words.js'

let words_arr = word_function()
let random_word = words_arr[Math.floor(Math.random() * words_arr.length )]


const letterBoxes = document.getElementsByClassName('item')
const keys = document.getElementsByClassName('key')
const key_arr = ['a','b','c','d','e',
                    'f','g','h','i','j',
                    'k',
                    'l','m','n','o','p',
                    'q','r','s','t','u',
                    'v','w','x','y','z']



let answer = random_word.toUpperCase()
let currentTry = ""
let currentRow= 0
let letterBoxCount = 0
let gameRunning = true




window.validWord = function(word){
    console.log(words_arr.includes(word.toLowerCase()))
    return words_arr.includes(word.toLowerCase())
}


window.addLetter = function(letter){
    if(gameRunning){
        if(currentTry.length != 5){
            currentTry += letter.innerHTML
            letterBoxes[letterBoxCount].innerHTML = letter.innerHTML
            letterBoxCount+=1
            console.log(currentTry)
        }
    }
    
}

window.enterButton = async function (){
    if(gameRunning){
        if(currentTry.length != 5){
            alert('Enter a 5 letter word !')
        }
        else{
            let validity = await validWord(currentTry)
            if(validity == true){
                check()
                setTimeout(() => {
                    if(answer == currentTry){
                        alert('You have won !')
                        gameRunning = false
                        return
                    }
                    else{
                        currentRow +=1 // moving to next row
                        currentTry = "" // reseting the currenTry
                    }
                }, 1000);
                setTimeout(() => {
                        if(currentRow > 5){
                            alert(`The word is ${answer}`)
                            gameRunning = false
                        }
                }, 1000);   
            }
            else{
                alert('Enter a valid word !')
            }
        }
    }
}

window.deleteButton = function(){
    if(gameRunning){
        if(currentTry.length > 0){
            currentTry = currentTry.slice(0,-1)
            letterBoxCount -=1
            letterBoxes[letterBoxCount].innerHTML = ""
        }
    }
}

function check(){
    for(let i = 0; i < 5; i++){
        letterBoxes[currentRow*5 + i].style.backgroundColor = "#3a3a3c";
        let key = getKey(currentTry[i])
        key.style.backgroundColor = "#3a3a3c"
    }
    for(let i = 0; i < 5; i++){
        let key = getKey(currentTry[i])
        if(currentTry[i] == answer[i]){
            letterBoxes[currentRow * 5 + i].style.backgroundColor = "#538d4e"
            letterBoxes[currentRow * 5 + i].style.border = "2px solid #538d4e"
            key.style.backgroundColor = "#538d4e"
        }
    }
    for(let i = 0; i < 5; i++){
        let key = getKey(currentTry[i])
        if(answer.includes(currentTry[i]) && answer[i] != currentTry[i]){
            letterBoxes[currentRow * 5 + i].style.backgroundColor = "#b59f3b"
            letterBoxes[currentRow * 5 + i].style.border = "2px solid #b59f3b"
            key.style.backgroundColor = "#b59f3b"
        }
    }

}

function getKey(letter){
    for(let i = 0; i < keys.length; i++){
        if(keys[i].innerHTML == letter){
            return keys[i]
        }
    }
}

window.addEventListener('keydown',(e)=>{
    if(key_arr.includes(e.key.toLowerCase())){
        if(gameRunning){
            if(currentTry.length != 5){
                currentTry += e.key.toUpperCase()
                letterBoxes[letterBoxCount].innerHTML = e.key.toUpperCase()
                letterBoxCount+=1
                console.log(currentTry)
            }
        }
    }
    if(e.key == 'Enter'){
        enterButton()
    }
    if(e.key == 'Backspace'){
        deleteButton()
    }
})




