mainGame()

function mainGame(){
    // game properties
    const gameMsg = document.getElementById('msg')
    // initial form
    const playersInfoUI = document.getElementById('players')
    const player1Name = document.getElementById('player1_name')
    const player1Id = document.getElementById('player1_id')
    const player2Name = document.getElementById('player2_name')
    const player2Id = document.getElementById('player2_id')
    const gameInputs = [player1Name, player1Id, player2Name, player2Id]
    let itemsOk = [] // to validate names and id's
    const startBtn = document.getElementById('startBtn')
    const resetBtn = document.getElementById('resetBtn')
    const boardUI = document.getElementById('board') // visible board
    let boardCells = document.querySelectorAll('.cell')
    let player1
    let player2 
    let playerTurn
    let endGame = false
    
    resetInputs() 
    startBtn.setAttribute('disabled', '')
    resetBtn.style.cursor = 'none'
    startGame() // allow the startBtn to be triggered
    
    startBtn.addEventListener('click', () => {
        boardUI.style.opacity = '1'  
        boardCells.forEach(cell => cell.classList.add('available'))
        // get form information
        playersInfoUI.innerHTML = ''
        const newList = document.createElement('ul')
        const player1UI = document.createElement('li')
        const player2UI = document.createElement('li')
        player1UI.classList.add('player1')
        player2UI.classList.add('player2')
        const inPlayer1Name = itemsOk.filter(item => item['index'] == 0)
        const inPlayer1Id = itemsOk.filter(item => item['index'] == 1)
        const inPlayer2Name = itemsOk.filter(item => item['index'] == 2)
        const inPlayer2Id = itemsOk.filter(item => item['index'] == 3)
        player1UI.innerText = `${inPlayer1Name[Object.keys(inPlayer1Name)[0]].inputValue } with "${inPlayer1Id[Object.keys(inPlayer1Id)[0]].inputValue}"`
        player2UI.innerText = `${inPlayer2Name[Object.keys(inPlayer2Name)[0]].inputValue } with "${inPlayer2Id[Object.keys(inPlayer2Id)[0]].inputValue}"`
        newList.appendChild(player1UI)
        newList.appendChild(player2UI)
        playersInfoUI.appendChild(newList)
        playersInfoUI.style.alignItems = 'stretch'
        gameMsg.innerText = 'Game starts' 
        // awaits for game turns
        gameFlow(inPlayer1Name, inPlayer1Id, inPlayer2Name, inPlayer2Id)
    })

    function gameFlow(inPlayer1Name, inPlayer1Id, inPlayer2Name, inPlayer2Id) {
        player1 = createPlayer(
            inPlayer1Name[Object.keys(inPlayer1Name)[0]].inputValue, 
            inPlayer1Id[Object.keys(inPlayer1Id)[0]].inputValue
        )
        player2 = createPlayer(
            inPlayer2Name[Object.keys(inPlayer2Name)[0]].inputValue, 
            inPlayer2Id[Object.keys(inPlayer2Id)[0]].inputValue
        )
        let board = [[null, null, null], [null, null, null], [null, null, null]]
        setPlayerTurn(board)
    }


    function resetInputs() {
        gameInputs.forEach(elem => {
            elem.value = ''
        })
    }


    function createPlayer(playerName, playerId) {
        return { playerName, playerId }
    }


    function switchPlayer(){
        // global turn state
        switch(playerTurn) {
            case undefined:
                return player1
            case player1:
                return player2
            case player2:
                return player1
        }
    }


    function setPlayerTurn(board){
        // initial turn
        if (!playerTurn) { 
            playerTurn = switchPlayer()
        }
        gameMsg.innerText = `Turn of ${playerTurn.playerName}`

        boardCells.forEach(cell => {
            // each game action 
            cell.addEventListener('click', () => {
                if (checkAvailablePlace(cell.dataset.line, cell.dataset.col, board)) {
                    if(checkEndGame(board)) {
                        gameMsg.innerText = 'No more place to play. Game Over'
                    } else {
                        board = updateBoard(cell.dataset.line, cell.dataset.col, playerTurn.playerId, board)
                        //console.table(board)
                        cell.innerText = playerTurn.playerId
                        cell.classList.remove('available')
                        playerTurn = switchPlayer()
                        endGame = checkEndGame(board)
                        if(!endGame) {
                            gameMsg.innerText = `Now the turn for ${playerTurn.playerName}`
                        }
                        return endGame
                    }
                } else if(checkEndGame(board))  {
                    gameMsg.innerText = 'No more places'
                }else {
                    gameMsg.innerText = 'Already taken, try again'
                }
            })
        })
    }

    function updateBoard(rowNumber, columnNumber, playerId, board){
        // update of board when a player sets an identifier on a coordinate (row, column) 
        board[rowNumber][columnNumber] = playerId
        return board
    }


    function checkAvailablePlace(rowNumber, columnNumber, board){
        return board[rowNumber][columnNumber] === null
    }


    function checkEndGame(board) {
        let diagonals = [
            [board[0][0], board[1][1], board[2][2]], 
            [board[0][2], board[1][1], board[2][0]]
        ]
        let firstCol = []
        let secondCol = []
        let thirdCol = []
    
        // create game scenarios        
        board.forEach(line => {
            firstCol.push(line[0])
            secondCol.push(line[1])
            thirdCol.push(line[2])
            // check for empty cells    
            let availableCells = line.filter(el => el === null)
            endGame = availableCells.length === 0 ? true : false
        })
        
        if (endGame === true){
            gameMsg.innerText = 'Game Over =)'
            return true
        } else {
            // check for a win case in scenarios
            let anyWinCase = false
            const scenarios = [...board, firstCol, secondCol, thirdCol, ...diagonals]
            scenarios.forEach((scenario, idx) => {
                let equalElems = scenario.every(elem => (elem === scenario[0] && elem !== null))
                if (equalElems) { 
                    /// console.log('scenario #', idx + 1, scenario) 
                    anyWinCase = true
                    boardCells.forEach(cell => {
                        cell.classList.remove('available')
                    })
                    resetBtn.removeAttribute('hidden')
                    resetBtn.removeAttribute('disabled')
                    resetBtn.classList.remove('disabled')
                    resetBtn.style.cursor = 'pointer'
                    resetBtn.style.opacity = 1
                    resetBtn.addEventListener('click', () => {
                        window.location.reload()
                    })
                    gameMsg.innerText = 'Game Over =)'
                }
            })
            return anyWinCase
        }
    }


    function resetInputs() {
        gameInputs.forEach(elem => {
            elem.value = ''
        })
    }


    function startGame() {
        gameInputs.forEach(elem => {
            elem.addEventListener('change', () =>  {
                if (elem.value.split(' ').join('') !== '') {
                    if (itemsOk.some(el => el.index === elem.dataset.id)){
                        gameMsg.innerText = 'Replaced value'
                        itemsOk.splice(itemsOk.findIndex(({index}) => index === elem.dataset.id), 1)
                        itemsOk.push({
                            'index': elem.dataset.id,
                            'inputValue': elem.value,
                        })
                    } else {
                        itemsOk.push({
                            'index': elem.dataset.id,
                            'inputValue': elem.value,
                        })
                    }
                    // activate start button
                    if (itemsOk.length === 4){
                        startBtn.classList.remove('disabled')
                        startBtn.removeAttribute('disabled')
                    }
                } else {
                    itemsOk.forEach(item => {
                        if (item.index === elem.dataset.id) {
                            itemsOk.splice(itemsOk.findIndex(({index}) => index === elem.dataset.id), 1)
                            gameMsg.innerText = 'Removed value, complete all fields to starts'
                            if (itemsOk.length < 4) {
                                startBtn.classList.add('disabled')
                                startBtn.setAttribute('disabled', '')
                            }
                        }
                    })
                }
            })
        })
    }
}
