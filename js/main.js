// Vue.component('columns', {
//     props: ['cards'],
//     template: `
//
//     `,
//     methods: {
//         addCard(name) {
//             let card = {name: name, tasks: []}
//             this.cards.push(card)
//             this.name = ""
//             console.log(this.cards)
//         },
//         addTaskToCard(card) {
//             console.log(Object.values(this.cards[0].tasks))
//         }
//     },
//     data() {
//         return {
//             name: null,
//             taskName: null,
//         }
//     }
// })


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
                let card = {name: this.cardName, tasks: []}
                this.firstColumnCards.push(card)
                this.firstColumnQuantity += 1
                console.log(this.firstColumnCards)
            }
        },
        addTask(cardIndex) {
            console.log(cardIndex)
            let task = {taskName: this.taskName, completed: false}
            this.firstColumnCards[cardIndex].tasks.push(task)
            console.log(this.firstColumnCards[cardIndex].tasks)
        },
        completeTask(card, taskIndex) {
            card.tasks[taskIndex].completed = !card.tasks[taskIndex].completed
        }


    }
})