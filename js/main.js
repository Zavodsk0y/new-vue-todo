new Vue({
    el: "#todo-container",
    data: {
        firstColumnCards: [],
        secondColumnCards: [],
        thirdColumnCards: [],
        cardName: '',
        firstColumnQuantity: 0,
        secondColumnQuantity: 0,
        taskName: ''
    },
    methods: {
        addCard() {
            if (this.firstColumnQuantity < 3) {
                let card = {name: this.cardName, tasks: [], taskName: ''}
                this.firstColumnCards.push(card)
                this.firstColumnQuantity += 1
                console.log(this.firstColumnCards)
            }
        },
        addTask(cardIndex) {
            console.log(cardIndex)
            let task = {taskName: this.firstColumnCards[cardIndex].taskName, completed: false}
            this.firstColumnCards[cardIndex].tasks.push(task)
            this.firstColumnCards[cardIndex].taskName = ''
            console.log(this.firstColumnCards[cardIndex].tasks)
        },
        completeTask(card, taskIndex, cardIndex) {
            console.log(card)
            console.log(cardIndex)
            card.tasks[taskIndex].completed = !card.tasks[taskIndex].completed
            if (this.isCardHalfCompleted(card)) this.moveCardToInProgress(cardIndex)
            if (this.isCardCompleted(card)) {
                alert('pizda')
                this.moveCardToDone(cardIndex)
            }
        },
        moveCardToInProgress(cardIndex) {
            this.secondColumnCards.push(this.firstColumnCards[cardIndex])
            this.firstColumnCards.splice(cardIndex, 1)
        },
        moveCardToDone(cardIndex) {
            this.thirdColumnCards.push(this.secondColumnCards[cardIndex])
            this.secondColumnCards.splice(cardIndex, 1)
        },
        isCardHalfCompleted(card) {
            let tasks = card.tasks
            let completedTasks = tasks.filter(task => task.completed)
            return completedTasks.length / tasks.length >= 0.5
        },
        isCardCompleted(card) {
            let tasks = card.tasks
            let completedTasks = tasks.filter(task => task.completed)
            return completedTasks.length / tasks.length >= 1
        }

    }
})