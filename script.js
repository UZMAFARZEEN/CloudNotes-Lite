const firebaseConfig = {
  apiKey: "YOUR_API_KEY"
  authDomain: "cloudnotes-7060c.firebaseapp.com",
  projectId: "cloudnotes-7060c",
  storageBucket: "cloudnotes-7060c.firebasestorage.app",
  messagingSenderId: "296564127708",
  appId: "1:296564127708:web:15eedd4ba198c50c938119",
  measurementId: "G-CWPGQ7MZLS"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addNote() {
  let input = document.getElementById("noteInput");
  let note = input.value.trim();

  if (note === "") return;

  db.collection("notes").add({
    text: note
  })
  .then(() => {
    input.value = "";
  })
  .catch(error => {
    console.error("Error adding note:", error);
  });
}

function loadNotes() {
  let list = document.getElementById("notesList");

  db.collection("notes").onSnapshot(snapshot => {
    list.innerHTML = "";

    snapshot.forEach(doc => {
      let li = document.createElement("li");
      li.innerHTML =
        doc.data().text +
        ` <button onclick="deleteNote('${doc.id}')">Delete</button>`;
      list.appendChild(li);
    });
  }, error => {
    console.error("Error loading notes:", error);
  });
}

function deleteNote(id) {
  db.collection("notes").doc(id).delete()
    .catch(error => {
      console.error("Error deleting note:", error);
    });
}

loadNotes();
