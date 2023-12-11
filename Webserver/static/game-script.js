console.log('Game script loaded!');

function chooseOption(index) {
   fetch(`/games/choose`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'X-Option-Index': index.toString(),
     },
   })
     .then((response) => response.text())
     .then((html) => {
       document.getElementById('game-container').innerHTML = html;
     });
 }
 
 fetch('/games/template')
   .then((response) => response.text())
   .then((html) => {
     document.getElementById('game-container').innerHTML = html;
   });
 