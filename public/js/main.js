const deleteButton = document.querySelectorAll(".delete")
const todoItem = document.querySelectorAll(".todoItem span")
const todoComplete = document.querySelectorAll(".todoItem span.completed")

Array.from(deleteButton).forEach( (el) => {
    el.addEventListener('click', deleteToDo)
})

Array.from(todoItem).forEach( (el) => {
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach( (el) => {
    el.addEventListener('click', undo)
})

async function deleteToDo() {
    //This is the variable that grabs the item you're deleting
  const todoText = this.parentNode.childNodes[1].innerText
    
    try{
        const response = await fetch('deleteToDo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json();
        console.log(data)
        ///Below refreshes the page
        location.reload()
    } catch (err){
        console.log(err)
    }
}




async function markComplete() {
    //This is the variable that grabs the item you're deleting
  const todoText = this.parentNode.childNodes[1].innerText
    
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json();
        console.log(data)
        ///Below refreshes the page
        location.reload()
    } catch (err){
        console.log(err)
    }
}


async function undo() {
    const todoText = this.parentNode.childNodes[1].innerText
        try{
            const response = await fetch('undo', {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    'rainbowUnicorn': todoText
                })
            })
            const data = await response.json();
            console.log(data)
            location.reload()
        } catch (err){
            console.log(err)
        }
}