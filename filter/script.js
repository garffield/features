const arrayList = [
    "Brasil", "Argentina", "Estados Unidos", "Canadá", "México",
    "Japão", "China", "Índia", "Coreia do Sul", "Austrália",
    "França", "Alemanha", "Reino Unido", "Itália", "Espanha",
    "Rússia", "África do Sul", "Egito", "Nigéria", "Marrocos"
  ];

let sortedCountries = arrayList.sort()
let input = document.getElementById("input");

input.addEventListener("keyup", (e) => {

    removeTyping();

    for (let i of sortedCountries){
        
        if (i.startsWith(input.value) && input.value != ""){
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayC('" + i + "')");
            let word = "<b>" + i.substring(0, input.value.length) + "</b>";
            word += i.substring(input.value.length);
            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }
    }
});

const displayC = (value) => {
    input.value = value
}

const removeTyping = () => {
    
    let items = document.querySelectorAll(".list-items");
    items.forEach(element => {
        element.remove()
    });
}