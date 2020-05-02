// Get all DOM elements
const checkBox = document.querySelector('.powerCheckbox')
const displayText = document.querySelector('.displayText')
const textDisplay = document.querySelector('.textDisplay')
const padsRow1 = document.querySelectorAll('.key1, .key2, .key3, .key4')
const padsRow2 = document.querySelectorAll('.key5, .key6, .key7, .key8')
const padsRow3 = document.querySelectorAll('.key9, .key10, .key11, .key12')
const allPads = document.querySelectorAll('.box')
const volumeInput = document.querySelector('.volumeInput')
const volumeDisplay = document.querySelector('.volumeDisplay')
const newTheme = document.querySelector('.newTheme')
let themeDisplay = document.querySelector('.themeDisplay')

// See if there's a change in the checkbox
checkBox.addEventListener('change', () => 
{
    // If the checkbox is checked we can use the drum pad, and colors appears

    if(checkBox.checked)
    {
        volumeDisplay.textContent = Math.floor(volumeInput.value * 100)

        // Change the theme (colors)
        document.documentElement.setAttribute('data-theme', 'fire');
        textDisplay.textContent = 'Welcome'
        window.removeEventListener('keydown', audioPlay2)
        window.addEventListener('keydown', audioPlay)
        for (let i = 0; i < allPads.length; i++) 
        {
            allPads[i].addEventListener('mousedown', clickAudio)
        }
        volumeInput.addEventListener('mousemove', () =>
        {
            volumeDisplay.textContent = Math.floor(volumeInput.value * 100)
        })
        newTheme.addEventListener('mousedown', displayThemeAudio)
        
        // Remove the animation on the pressed keys
        allPads.forEach(pads => pads.addEventListener('transitionend', scaleRemove))
    }

    // If the checkbox is not checked we can't use the drum pad and no colors or audio
    else
    {
        volumeDisplay.textContent = ''
        document.documentElement.setAttribute('data-theme', 'default');
        textDisplay.textContent = ''
        window.removeEventListener('keydown', audioPlay2)
        window.removeEventListener('keydown', audioPlay)
        for (let i = 0; i < allPads.length; i++) 
        {
            allPads[i].removeEventListener('mousedown', clickAudio)
        }
        for (let i = 0; i < allPads.length; i++) 
        {
            allPads[i].removeEventListener('mousedown', clickAudio)
        }
        volumeInput.addEventListener('mousemove', () =>
        {
            volumeDisplay.textContent = ''
        })
        themeDisplay.textContent = 'Sea'
    }
})

// Function that remove the scale and border after the animation is finished
function scaleRemove()
{
    this.classList.remove('pressed')
    this.classList.remove('pressed2')
}

// Function that plays audio when the key is pressed and theme is fire
function audioPlay(event) 
{
    // Take the audio according to the keyCode
    const audio = document.querySelector(`audio[data-key='${event.keyCode}']`)
    if(!audio)
    {
      return;
    }
    
    // Take the data-id of the audio selected to display it
    const nameAudio = audio.getAttribute('data-id')
    textDisplay.textContent = nameAudio

    // Take the keyCode from the key pressed
    const pads = document.querySelector(`.box[data-key='${event.keyCode}']`)

    // Define the audio volume depending on the input
    audio.volume = volumeInput.value

    // If no audio stop the function
    audio.currentTime = 0
    audio.play()
    pads.classList.add('pressed')
}

// Function that plays audio when the key is pressed and theme is sea
function audioPlay2(event)
{
    const audio = document.querySelector(`audio[data-info='${event.keyCode}']`)
    if(!audio)
    {
      return;
    }
    const nameAudio = audio.getAttribute('data-id')
    audio.volume = volumeInput.value
    textDisplay.textContent = nameAudio
    const pads = document.querySelector(`.box[data-key='${event.keyCode}']`)
    audio.currentTime = 0
    audio.play()
    pads.classList.add('pressed2')
}

// Function to play audio on click and theme is fire
function clickAudio(event) 
{
    // Take the elements depending on the click
    const padsName = event.srcElement.className;
    const padsClass = document.querySelector(`.box[class='${padsName}']`)
    const padsKey = padsClass.getAttribute('data-key')

    // Take each pad, and add the class pressed if clicked 
    const pads = document.querySelector(`.box[data-key='${padsKey}']`)
    pads.classList.add('pressed')
    const audio = document.querySelector(`audio[data-key='${padsKey}']`)
    if(!audio) 
    {
      return;
    }

    // Define the audio volume depending on the input
    audio.volume = volumeInput.value
    const nameAudio = audio.getAttribute('data-id')
    textDisplay.textContent = nameAudio

    audio.currentTime = 0
    audio.play()
}

// Function to play audio on click and theme is sea
function clickAudio2(event) {
    
    // Take the elements depending on the click
    const padsName = event.srcElement.className;
    const padsClass = document.querySelector(`.box[class='${padsName}']`)
    const padsKey = padsClass.getAttribute('data-key')
    
    // Take each pad, and add the class pressed if clicked 
    const pads = document.querySelector(`.box[data-key='${padsKey}']`)
    pads.classList.add('pressed2')
    const audio = document.querySelector(`audio[data-info='${padsKey}']`)
    if(!audio) {
      return;
    }

    // Define the audio volume depending on the input
    audio.volume = volumeInput.value
    const nameAudio = audio.getAttribute('data-id')
    textDisplay.textContent = nameAudio

    audio.currentTime = 0
    audio.play()
}


// Function that display different theme colors and audio 
function displayThemeAudio()
{
    let themeContent = themeDisplay.textContent
    if(themeContent == 'Sea' && checkBox.checked) 
    {
        document.documentElement.setAttribute('data-theme', 'sea');
        themeDisplay.textContent = 'Fire'
        // Remove the first audio on keydown
        window.removeEventListener('keydown', audioPlay)
        // Put the new audio  on keydown
        window.addEventListener('keydown', audioPlay2)
        for (let i = 0; i < allPads.length; i++) 
        {
            // Remove the first audio on click
            allPads[i].removeEventListener('mousedown', clickAudio)
        }
        for (let i = 0; i < allPads.length; i++) 
        {
            // Put the new audio  on click
            allPads[i].addEventListener('mousedown', clickAudio2)
        }
    }
    else if(themeContent == 'Fire' && checkBox.checked) 
    {
        document.documentElement.setAttribute('data-theme', 'fire');
        themeDisplay.textContent = 'Sea'
        window.removeEventListener('keydown', audioPlay2)
        window.addEventListener('keydown', audioPlay)
        for (let i = 0; i < allPads.length; i++) 
        {
            allPads[i].removeEventListener('mousedown', clickAudio2)
        }
        for (let i = 0; i < allPads.length; i++) 
        {
            allPads[i].addEventListener('mousedown', clickAudio)
        }
    }
}

const loopButton = document.querySelector('.replayButton')

function loopAudio(event)
{
    const audio = document.querySelector(`audio[data-key='${event.keyCode}']`)
    audio.setAttribute('loop')
}

function loopAudio2(event)
{
    const audio = document.querySelector(`audio[data-info='${event.keyCode}']`)
    audio.setAttribute('loop')
}
