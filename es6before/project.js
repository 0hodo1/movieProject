const form = document.getElementById("film-form")
const titleElement = document.querySelector("#title")
const directorElement = document.querySelector("#director")
const urlElement = document.querySelector("#url")
const cardBody = document.querySelectorAll(".card-body")[1]
const clear = document.getElementById("clear-films")

//UI objesi
const ui = new UI()

//Storage Objesi
const storage = new Storage()

//Tüm Eventleri yükleme
eventListeners()

function eventListeners(){
    form.addEventListener("submit",addFilm)
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmFromStorage()
        ui.loadAllFilms(films)
    })
    cardBody.addEventListener("click",deleteFilm)
    clear.addEventListener("click",clearAllFilms)
}
function addFilm(e){
    const title = titleElement.value
    const director = directorElement.value
    const url = urlElement.value

    if (title === "" || director === "" || url === ""){
        ui.displayMessages("Boş bırakılamaz!","danger")
    }
    else{
        const newFilm = new Film(title,director,url)

        ui.addFilmToUI(newFilm)
        storage.addFilmToStorage(newFilm)
        ui.displayMessages("Film eklendi","success")
    }

    ui.clearInputs(titleElement,urlElement,directorElement)
    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target)
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
    }

    ui.displayMessages("Silme işlemi tamamlandı","success")
}

function clearAllFilms(){
    if(confirm("Emin misiniz?")){
        ui.clearAllFilmsFromUI()
        storage.clearAllFilmsFromStorage()
    }
}