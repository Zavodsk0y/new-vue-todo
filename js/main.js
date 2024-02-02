Vue.component('columns', {
    props: ['cards'],
    template: `
    <div class="columns">
        <div class="column" id="important-column">
            <h2 class="t-a-c">Бэклог</h2>
            <input type="text" v-model="name" placeholder="Название карточки">
            <button @click="addCard(name)">+</button>
            <ul>
                <li v-for="(card, index) in cards">{{card.name}} {{card.tasks}}</li>
                <input type="text" v-model="taskName" placeholder="Добавьте задачу">
                <button @click="addTaskToCard(card)">+</button>
            </ul>
        </div>
        <div class="column" id="important-column">
            <h2 class="t-a-c">В работе</h2>
        </div>
        <div class="column" id="important-column">
            <h2 class="t-a-c">Готово</h2>
        </div>
    </div>
    `,
    methods: {
        addCard(name) {
            let card = {name: name, tasks: []}
            this.cards.push(card)
            this.name = ""
            console.log(this.cards)
        },
        addTaskToCard(card) {
            console.log(Object.values(this.cards[0].tasks))
        }
    },
    data() {
        return {
            name: null,
            taskName: null,
        }
    }
})


new Vue({
    el: "#todo-container",
    data: {
        cards: [
        ]
    }
})