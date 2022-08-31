const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const inspirationBtn = document.querySelector("#random-inspiration");
const registerBtn= document.getElementById("register-form")
let idStarter=4;

const getAllQuotesBtn = document.getElementById("all-quotes");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getInspiration = () => {
    axios.get("http://localhost:4000/api/quotes/")
        .then(res => {
            const data = res.data;
            // console.log(data.quote)
            alert(data.quote);
    });
};


const registerQuote=(event) => {
    event.preventDefault();
    const registerInput = document.getElementById("register-quote");
    // console.log("this is main.js", registerInput.value);
    let quoteObj = {
        id: idStarter,
        quote: registerInput.value
    };
    idStarter++
    // console.log(quoteObj);
    registerInput.value="";
    axios.post("http://localhost:4000/api/register",quoteObj)
        .then(res=> {
            document.querySelector(".register-result").textContent=""
            document.querySelector(".quote-here").textContent="";
            let registered = document.createElement("p")
            registered.textContent="Registered new inspiration";
            document.querySelector(".register-result").appendChild(registered);
            console.log("Quote registered")
        });
    
};

const getAllQuotes = () => {  

    document.querySelector(".quote-here").textContent="";

    axios.get("http://localhost:4000/api/register/")
        .then(res => {
            // console.log("hello")
            for ( let i of res.data){
                createQuoteDisplay(i.quote, i.id);
                
                
            }})
    };

const createQuoteDisplay = (quote, id) =>{
    const quoteDisplay = document.createElement("div");
    quoteDisplay.classList.add(`id-${id}`);
    quoteDisplay.innerHTML= `<p class="quote-display">${quote}</p>
    <button onclick="deleteQuote(${id})">Delete</button><button onclick="editQuote(${id})">Edit</button>
    `;
    document.querySelector(".quote-here").appendChild(quoteDisplay)
}

const deleteQuote = id =>{
    console.log("delete clicked. main.js")
    
    axios.delete(`http://localhost:4000/api/quotes/${id}`). then (res => getAllQuotes())

}

const editQuote= id => {
    console.log("edit clicked main.js");
    const editForm = document.createElement("form");
    editForm.innerHTML= `<input type = "text" class="edit-form" placeholder = "Enter new inspiration"></input><input type="button" onclick="getEditForm(${id})" value="Submit" id='edit-${id}'> </input>`;
    console.log(editForm)
    document.querySelector(`.id-${id}`).appendChild(editForm);
    return submitEdit=document.querySelector(".edit-submit");
    
}

const getEditForm=(id) => {
    
    const formInput = document.querySelector(".edit-form").value;
    console.log("this is main.js");
    console.log(id)
    console.log(formInput)
    let formObj = {
        id,
        quote: formInput
    }
    axios.put(`http://localhost:4000/api/quotes/${id}`,formObj). then(res => getAllQuotes())
        
};

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
registerBtn.addEventListener("submit", registerQuote);
getAllQuotesBtn.addEventListener("click",getAllQuotes);
inspirationBtn.addEventListener("click",getInspiration);

