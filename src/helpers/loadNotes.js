import { db } from "../firebase/firebase-config"


// cargaremos las notas de cierto usuario ( uid )
export const loadNotes = async ( uid ) =>{

  const noteSnap =  await db.collection(`${uid}/journal/notes`).get();

  const notes = [];

  console.log(noteSnap);

  // generamos un arreglo con nuestro snapshot

  noteSnap.forEach( snapHijo =>{
    //   console.log(snapHijo.data());

      notes.push({
          id: snapHijo.id,
          ...snapHijo.data()
      })
  });

//   console.log(notes);

  return notes;
}