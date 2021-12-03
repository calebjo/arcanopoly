document.addEventListener("DOMContentLoaded", () => {
    const tavernSquare = document.getElementById('sq-0');
    const tavernText = tavernSquare.getElementsByTagName('p');

    tavernSquare.onclick = function() {
        console.log('In tavernSquare onclick')
        tavernText.innerText = 'Hello!';
    }

    const rect = tavernSquare.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);

    let playerPos = 0;
    const player = document.getElementById('sq-3').children[0];
    console.log(player);

    player.style.transform = 'translate(100px, 200px)';
});