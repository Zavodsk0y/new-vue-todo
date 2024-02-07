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
            }
        },
        addTask(cardIndex) {
            let task = {taskName: this.firstColumnCards[cardIndex].taskName, completed: false}
            this.firstColumnCards[cardIndex].tasks.push(task)
            this.firstColumnCards[cardIndex].taskName = ''
        },
        completeTask(card, taskIndex, cardIndex) {
            card.tasks[taskIndex].completed = !card.tasks[taskIndex].completed
            if (this.isCardHalfCompleted(card)) this.moveCardToInProgress(cardIndex)
            if (this.isCardCompleted(card)) {
                this.moveCardToDone(cardIndex)
            }
        },
        moveCardToInProgress(cardIndex) {
            console.log(cardIndex)
            this.secondColumnCards.push(this.firstColumnCards[cardIndex])
            this.firstColumnCards.splice(cardIndex, 1)
        },
        moveCardToDone(cardIndex) {
            console.log(cardIndex)
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