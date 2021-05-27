var items;
var input = document.querySelector('#input');
var list = document.querySelector('#items');

// if user had made list previously so we are fetching list from locak storage
if(localStorage.getItem('items')!=null){
    items = JSON.parse(localStorage.getItem('items'));
    for(i=0; i<items.length; i++){
        add(items[i])
    }
}
else{
    items = new Array();
    localStorage.setItem('items', JSON.stringify(items));
}

function setStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

document.querySelector('#add').addEventListener('click', function () {
    if(input.value == ""){
        alert("Text area is Empty");
        return;
    }
    items.push(input.value);
    add(input.value)
    input.value = "";
    setStorage();
})

input.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.querySelector('#add').click();
    }    
})

document.querySelector('#list').addEventListener('click', function (e) {

    if(e.target.tagName == 'DIV'){
        let item  = e.target.parentNode.innerHTML
        item = item.slice(0, item.length-11);
        let i;
        for(i=0; i<items.length; i++){
            if(items[i]==item){
                console.log(items[i], i)
                break;
            }
        }
        items.splice(i, 1);
        setStorage();
        del(i);
    }
})

function add(item) {
    var li = document.createElement('li');
    li.innerHTML = `${item}<div></div>`;
    li.className = "dont-show"
    list.appendChild(li);
    setTimeout(() => {
        li.className = "show secondry-p";
    }, 20);
}

function del(i) {
    list.childNodes[i+1].className ="primary-p delete";
    setTimeout(() => {
        list.removeChild(list.childNodes[i+1]);
    }, 100);
}
