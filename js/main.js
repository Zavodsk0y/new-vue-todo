new Vue({
    el: "#todo-container",
    data: {
        firstColumnCards: [],
        secondColumnCards: [],
        thirdColumnCards: [],
        cardName: '',
        firstColumnQuantity: 0,
        secondColumnQuantity: 0,
        taskName: '',
        isFirstColumnBlocked: false
    },
    methods: {
        addCard() {
            if (this.firstColumnQuantity < 3 && !this.isFirstColumnBlocked) {
                let card = {name: this.cardName, tasks: [], taskName: ''}
                this.firstColumnCards.push(card)
                this.firstColumnQuantity += 1
                this.saveDataToLocalStorage()
            }
        },
        addTask(cardIndex) {
            let task = {taskName: this.firstColumnCards[cardIndex].taskName, completed: false}
            this.firstColumnCards[cardIndex].tasks.push(task)
            this.firstColumnCards[cardIndex].taskName = ''
            this.saveDataToLocalStorage()
        },
        completeTask(card, taskIndex, cardIndex) {
            card.tasks[taskIndex].completed = !card.tasks[taskIndex].completed

            if (this.isCardHalfCompleted(card) && this.secondColumnQuantity < 5) this.moveCardToInProgress(cardIndex)
            if (this.isCardCompleted(card)) {
                this.moveCardToDone(cardIndex)
            }
            this.saveDataToLocalStorage()
        },
        moveCardToInProgress(cardIndex) {
            console.log(cardIndex)
            this.secondColumnCards.push(this.firstColumnCards[cardIndex])
            Vue.delete(this.firstColumnCards, cardIndex)
            this.firstColumnQuantity -= 1
            this.secondColumnQuantity += 1
            this.saveDataToLocalStorage()
        },
        moveCardToDone(cardIndex) {
            console.log(cardIndex)
            this.thirdColumnCards.push(this.secondColumnCards[cardIndex])
            Vue.delete(this.secondColumnCards, cardIndex)
            this.secondColumnQuantity -= 1
            this.saveDataToLocalStorage()
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
        },
        saveDataToLocalStorage() {
            const dataToStore = {
                firstColumnCards: this.firstColumnCards,
                secondColumnCards: this.secondColumnCards,
                thirdColumnCards: this.thirdColumnCards,
                firstColumnQuantity: this.firstColumnQuantity,
                secondColumnQuantity: this.secondColumnQuantity,
                isFirstColumnBlocked: this.isFirstColumnBlocked
            }
            localStorage.setItem('todoAppData', JSON.stringify(dataToStore))
        },

    },
    mounted() {
        const storedData = JSON.parse(localStorage.getItem('todoAppData'))
        this.firstColumnCards = storedData.firstColumnCards
        this.secondColumnCards = storedData.secondColumnCards
        this.thirdColumnCards = storedData.thirdColumnCards
        this.firstColumnQuantity = storedData.firstColumnQuantity
        this.secondColumnQuantity = storedData.secondColumnQuantity
        this.isFirstColumnBlocked = storedData.isFirstColumnBlocked
    }
})