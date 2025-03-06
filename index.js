const btn = document.querySelector('#add')
const itemInProgress = document.querySelector('#todo')
const itemCompleted = document.querySelector('#completed')
const userInput = document.querySelector('.header-input')
const input = userInput.value
const toDoItem = {
    inProgress: [],
    completed: []
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const input = userInput.value
    if(input !== '') {
        toDoItem.inProgress.push({
            text: input,
            created: Date.now(),
            isComplete: false
        })
    }
    userInput.value = ''
    render(toDoItem)
})


const render = (toDoItem) => {
    const inProgresslistItems = toDoItem.inProgress.map((item) => {
        const el = document.createElement('li')
        const div = document.createElement('div')
        const removeBtn = document.createElement('button')
        const completeBtn = document.createElement('button')
        const spanEl = document.createElement('span')

        el.classList.add('todo-item')
        
        div.classList.add('todo-buttons')
        
        removeBtn.classList.add('todo-remove')
        completeBtn.classList.add('todo-complete')

        div.appendChild(removeBtn)
        div.appendChild(completeBtn)
        
        spanEl.classList.add('text-todo')
        spanEl.textContent = item.text

        el.appendChild(spanEl)
        el.appendChild(div)

        removeBtn.addEventListener('click', (e) => {
            const newList = toDoItem.inProgress.filter((i) => i.created !== item.created)
            toDoItem.inProgress = newList
            render(toDoItem)
        });

        completeBtn.addEventListener('click', (e) => {
            item.isComplete = true;
            const newList = toDoItem.inProgress.filter((i) => i.created !== item.created)
            toDoItem.inProgress = newList
            toDoItem.completed = [...toDoItem.completed, item]
            render(toDoItem)
        })

        return el
    });
    itemInProgress.replaceChildren(...inProgresslistItems)

    const completedlistItems = toDoItem.completed.map((item) => {
        const el = document.createElement('li')
        const div = document.createElement('div')
        const removeBtn = document.createElement('button')
        const completeBtn = document.createElement('button')
        const spanEl = document.createElement('span')

        el.classList.add('todo-item')
        
        div.classList.add('todo-buttons')
        
        removeBtn.classList.add('todo-remove')
        completeBtn.classList.add('todo-complete')

        div.appendChild(removeBtn)
        div.appendChild(completeBtn)
        
        spanEl.classList.add('text-todo')
        spanEl.textContent = item.text

        el.appendChild(spanEl)
        el.appendChild(div)

        removeBtn.addEventListener('click', (e) => {
            const newList = toDoItem.completed.filter((i) => i.text !== item.text)
            toDoItem.completed = newList
            render(toDoItem)
        });

        return el
    });
    itemCompleted.replaceChildren(...completedlistItems)    
}

render(toDoItem)