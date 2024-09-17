let add=document.querySelector(".add")
let newNote=document.querySelector(".newNote")
let close=document.querySelector(".close")
let text=document.querySelector('#text')
let noteArea=document.querySelector('.noteArea')
let dateArea=document.querySelector('.dateArea')
let saveNote=document.querySelector('.saveNote')
let calender=document.querySelector('.ri-calendar-line')
var currentNote
var currentNoteId

// open calender on phone

if(calender)calender.addEventListener('click',e=>{
  console.log("object");
  if(dateArea.classList.contains('Act')){
    noteArea.classList.remove('DeAct')
    dateArea.classList.remove('Act')
  }else{
    noteArea.classList.add('DeAct')
    dateArea.classList.add('Act')
  }
})
// open newNote
if(add)add.addEventListener('click',e=>{
if(newNote.classList.contains('show')){
 
    newNote.classList.remove('show')
}else{
    text.value=''
    newNote.classList.add('show')
    text.focus()
    
}})
if(close)close.addEventListener("click",e=>{
    newNote.classList.remove('show')
})


//save
if(text && saveNote)saveNote.addEventListener('click',e=>{
  const newDate = new Date();
 let date=newDate.toLocaleDateString()
    AddDate(date)
    let id = Math.floor(Math.random() * newDate).toString(36);
    
    if(currentNoteId){
      
      console.log('it exist');
      console.log(currentNoteId);
  let note=document.querySelector(`[keyId="${currentNoteId}"]`)
  
  if(note){console.log("note:",note);
  note.children[1].children[0].innerText=text.value;
  changeInStorage(currentNoteId,text.value)
  currentNoteId=null;
  }}
      else{

      createNote( date, text.value, id)
      console.log("new note:",id);
      setLocalStorage(id,text.value,date)
      }

    newNote.classList.remove('show') 
})


// edit and delete  Note 
noteArea.addEventListener('click',e=>{
  
  if(e.target.classList.contains('editNote')){
 
  newNote.classList.add('show') 
  currentNote=e.target.parentElement.parentElement.parentElement;
  text.value =currentNote.children[1].children[0].innerText;
  currentNoteId=currentNote.getAttribute('keyId') 
}
if(e.target.classList.contains('deleteNote')){
  currentNote=e.target.parentElement.parentElement.parentElement;
  currentNoteId=currentNote.getAttribute('keyId')
  deleteFromStorage(currentNoteId)
  date=currentNote.children[0].children[0].innerText;


  currentNote.remove() 
   removeDate(date)
    currentNoteId=null;

}
})

// create new note
function createNote(date,text,id){
 let note=document.createElement('div')
  note.classList.add('note')
  note.setAttribute('keyId',id)
  note.innerHTML= Note(date,text)
  noteArea.appendChild(note)
}

// add date
function AddDate(date) {
  const dateString = date.toString();
  const existingDates = document.querySelectorAll('.date');
  let existingDate = null;
  for (const d of existingDates) {
    if (d.textContent === dateString) {
      existingDate = d;
      break;
    }
  }
  if (existingDate) {
    return existingDate;
  } else {
    const newDate = document.createElement('p');
    newDate.classList.add('date');
    newDate.textContent = dateString;
    dateArea.appendChild(newDate);
    return newDate;
  }
}
// remove date
function removeDate(date) {
  const existingDates = document.querySelectorAll('.date');
  const notes = document.querySelectorAll('.note');

  let hasNoteWithDate = false;

  Array.from(notes).forEach(element => {
    if (element.children[0].children[0].textContent === date) {
      hasNoteWithDate = true;
      
    }
  });

  if (!hasNoteWithDate) {
    existingDates.forEach(dateElement => {
      if (dateElement.textContent === date) {
        dateElement.remove();
      }
    });
  }
}

// each note structure
function Note(date,text){
  return `  <div class="noteHead" >
  <p class="noteDate">${date}</p>
  <div> <i class="ri-edit-line editNote"></i>
  <i class="ri-delete-bin-6-line deleteNote"></i></div> 
</div>
<div class="noteBody"><p>${text}</p></div>`;
}


// get data from storage
function getLocalStorage(){
  let storage=localStorage.getItem('Notes')
  let List
if(storage==null){
  List=[]
}else{
  List=JSON.parse(storage)
}
return List
}

// set to storage
function setLocalStorage(id, text, date) {
  let List = getLocalStorage()
  let NoteInfo = {
    id: id,
    text: text,
    date: date,
  }
  List.push(NoteInfo)
  localStorage.setItem('Notes', JSON.stringify(List)) 
}
// show notes on load page
function createFromStorage(){
  let List = getLocalStorage()
  List.forEach(note => {
    createNote(note.date,note.text,note.id)
    AddDate(note.date)
  });
}
// delete from storage
function deleteFromStorage(id){

  let List = getLocalStorage()
  List.forEach((note,idx) => {
   
    if(note.id==id){
      List.splice(idx,1)
      localStorage.setItem('Notes',JSON.stringify(List))
    }
  });
}
// update in storage
function changeInStorage(id,text){
  let List = getLocalStorage()
  List.forEach((note,idx) => {
    
    if(note.id==id){
     note.text=text;

      localStorage.setItem('Notes',JSON.stringify(List))
    }
  });
}
//localStorage.clear()
createFromStorage()