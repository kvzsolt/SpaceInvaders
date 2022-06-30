const numberOfAliens = 30;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function generateMap(){
    const grid = document.querySelector('.grid')
    for (let i = 0; i < 576; i++) {
        const square = document.createElement('div')
        square.setAttribute('id', i.toString())
        grid.appendChild(square)
    }
}

function placeAliens(){
    const squares = Array.from(document.querySelectorAll('.grid div'));
    const invaders = ['invader01', 'invader02', 'invader03', 'invader04', 'invader05', 'invader06'];
    for (let i = 0; i <= numberOfAliens; i++) {
        let rand = squares[Math.floor(Math.random() * 96)];
        if (rand.classList.length < 1) {
            rand.classList.add(invaders[getRandomInt(6)])
            }
    }
}


function gameOver(randomChoice, randomMoves) {
    if (randomChoice + randomMoves > 544) {
            window.open('/game-over', "_self");
    }
}

function moveAliens() {
    const squares = Array.from(document.querySelectorAll('.grid div'));
    const invaders = ['invader01', 'invader02', 'invader03', 'invader04', 'invader05', 'invader06'];
    const moves = [31, 32, 33, 31, 32, 33, 1, -1, 64, 63, 65, 64, 63, 65];
    let randomMoves = moves[getRandomInt(6)];
    let randomChoice = getRandomInt(576);
    if (invaders.includes(squares[randomChoice].classList.value)) {
        gameOver(randomChoice, randomMoves)
        const invaderClass = squares[randomChoice].getAttribute('class');
        squares[randomChoice].classList.remove(invaderClass);
        if (squares[randomChoice + randomMoves].classList.value === '') {
            squares[randomChoice + randomMoves].classList.add(invaderClass);
        } else {
            squares[randomChoice].classList.add(invaderClass);
        }
    }

}

function placeBoss() {
    const squares = Array.from(document.querySelectorAll('.grid div'));
    const boss = ['bossLeftUp', 'bossLeftDown', 'bossRightUp', 'bossRightDown'];
    let direction = [79, 111, 80, 112];

    for (let i = 0; i <= boss.length-1; i++) {
        let rand = squares[direction[i]];
        rand.classList.add(boss[i]);
    }
}

function placeShooter(){
    const bottomSquares = Array.from(document.querySelectorAll('.grid div')).slice(-32,-1);
    bottomSquares[16].classList.add('shooter')
}

function moveShooter(){
    const shooter = document.getElementsByClassName('shooter')
    document.addEventListener('keydown', function (key){
        switch (key.keyCode){
            case 37:
                if (shooter[0].getAttribute('id') !== '544') {
                    shooter[0].previousElementSibling.classList.add('shooter');
                    shooter[1].classList.remove('shooter')
                }
                break;
            case 39:
                shooter[0].nextElementSibling.classList.add('shooter');
                shooter[0].classList.remove('shooter')
                break;
        }
    if (isWin()) {
        window.open('/win', "_self");
    }
    })

}

function shoot(){
    document.addEventListener('keydown', function (key) {
        const shooter = document.getElementsByClassName('shooter')[0]
        const squares = document.querySelectorAll('.grid div')
        if (key.keyCode === 32) {
            let nextBulletId = parseInt(shooter.getAttribute('id')) - 32
            squares[nextBulletId].setAttribute('class', 'bullet')

            do {
                let currentBulletId = nextBulletId
                nextBulletId = currentBulletId - 32

                squares[nextBulletId].setAttribute('class', 'bullet')
                squares[currentBulletId].removeAttribute('class')

            } while (nextBulletId >= 32 && squares[nextBulletId - 32].getAttribute('class') === null)
                squares[nextBulletId].removeAttribute('class')

            if (nextBulletId >= 32) {
                squares[nextBulletId - 32].removeAttribute('class')
            }
        }

    })
}

function isWin(){
    let listOfAliens = Array.from(document.querySelectorAll('.invader01, .invader02, .invader03, .invader04, .invader05, .invader06'));
    return listOfAliens.length === 0;
}

function main(){
    generateMap()
    placeShooter()
    placeAliens()
    moveShooter()
    setInterval(moveAliens, 0)
    shoot()
    //placeBoss()
}

main()