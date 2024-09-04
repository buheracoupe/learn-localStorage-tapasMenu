const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const itemInput = document.querySelector('[name=item]')//selecting the input with attribute won't work, figure out why
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const deleteBtn = document.getElementById("delete-btn");
  const clearBtn = document.getElementById("clear-btn");

  

  function handleSubmission(event){
    event.preventDefault()
    console.log(itemInput)
    const text = itemInput.value;
    const item = {
        text,
        done: false,
    }
    items.push(item)
    populateList(items, itemsList)
    localStorage.setItem("items", JSON.stringify(items))
    this.reset()
  }

  function populateList(array = [], list){
list.innerHTML = array.map((item, i) => {
    return `<li>
    <input type="checkbox" data-index=${i} id="items${i}" ${item.done ? "checked" : ''}>
    <label for="items${i}">${item.text}</label> 
            </li>`
}).join("")//map is going to return an array when what we need is one big string
  }
  
  function toggleDone(event){
    if(!event.target.matches("input")) return;//not inequality did not work here investigate why?
    console.log(event.srcElement.dataset.index)
    const index = event.srcElement.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items))
    populateList(items, itemsList)
    // line 35-37 change our property, update that to local storage and update rendered content
  }
function deleteList(event){
items.splice(0, items.length)
populateList(items, itemsList)
}
function clearChecks(){
items.forEach(item => {
    item.done = false;
});
populateList(items,itemsList)
}

  addItems.addEventListener("submit", handleSubmission)
populateList(items, itemsList)//populate the list from localStorage if items already exist
itemsList.addEventListener("click", toggleDone)
deleteBtn.addEventListener("click", deleteList)
clearBtn.addEventListener("click", clearChecks)
  //remember that each item is an object and these object have text properties for line label element in populateListg