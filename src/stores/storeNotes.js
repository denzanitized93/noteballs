// stores/counter.js
import { defineStore, acceptHMRUpdate, setMapStoreSuffix } from 'pinia'
import { collection, onSnapshot, setDoc, addDoc, deleteDoc , doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef

let getNoteSnapshots = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()

      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      this.getNotes()
    },
    async getNotes() {
      const q = query(notesCollectionRef, orderBy('created_at', 'desc'));

      // subscribe snapshot
      getNoteSnapshots = onSnapshot(q, (querySnapshot) => {
        let notes = []

        querySnapshot.forEach((doc) => {
          let data = doc.data()
          let note = {
            id: doc.id,
            content: data.content,
            created_at: data.created_at
          }
          notes.push(note)
        });

        this.notes = notes
        this.notesLoaded = true
      }, err => {
        console.log('error: ', err.message)
      });
    },
    async addNote(newNote) {
      let id = new Date().getTime().toString()
      // Add a new document with a generated id.
      await addDoc(notesCollectionRef, {
        content: newNote,
        created_at: id
      });

    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
    },
    async editNote(noteId, noteContent) {
      // Add/edit a new document in collection 'cities'
      await updateDoc(doc(notesCollectionRef, noteId), {
        content: noteContent
      });
    },
    clearNotes() {
      this.notes = []

      // unsubscribe
      if (getNoteSnapshots) getNoteSnapshots()
    }
  },

  getters: {
    getNoteContent: (state) => {
      return (noteId) => {
        return state.notes.find(note => note.id === noteId).content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalNotesContentCount: (state) => {
      let count = 0
      state.notes.forEach(note => count += note.content.length)

      return count
    }
  }
})