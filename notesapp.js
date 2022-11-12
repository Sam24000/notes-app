shownotes();

// if user adds a note, add it to the localstorage
// write data in card and store into local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtext = document.getElementById("Textarea");
    let title = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
        // making array for storing data 
    }
    else {
        notesObj = JSON.parse(notes);
    }
//for title
let mytitle={
    mytitle: title.value,
    text: addtext.value
}

    notesObj.push(mytitle); //notesobj is array of objects.
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtext.value = "";
    title.value="";  // after adding remove typed title
    console.log(notesObj);

    shownotes();
})

//function to show element after/without refreshing 
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // store data in card form
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="cardnote my-3 mx-3 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.mytitle}</h5>
                    <p class="card-text"> ${element.text}</p>
                    <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete note</button>
                </div>
            </div> `;
    });

    // print local storage data in the display to show your data.

    let notesele = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesele.innerHTML = html;
    }
    else {
        notesele.innerHTML = `Add your notes.`;
    }
}

// function to delete a node

function deletenote(index) {
    console.log('deleting index', index);
    //reading localstorage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1); //deleting at position index, remove 1 items.

    localStorage.setItem("notes", JSON.stringify(notesObj)); //updating local storage after deleting given index.
    shownotes();
}

// making search filter to get notes by search bar.
let search = document.getElementById('searchtext');

search.addEventListener("input", function () { //taking input in seach bar
    let input = search.value  //taking input see in console while searching
    console.log('input event fired', input);

    //searching in cards of classname cardnote.
    let notecard = document.getElementsByClassName('cardnote');

    //getting text from cards.
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText; //[0] denotes that we are grabbing first p tag.

        if (cardtxt.includes(input)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardtxt);
    })

})
