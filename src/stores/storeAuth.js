// stores/counter.js
import { defineStore, acceptHMRUpdate, setMapStoreSuffix } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/js/firebase'
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          
          // route to notes
          this.router.push('/')

          // call get notes
          storeNotes.init()
        } else {
          this.user = {}

          // route to notes
          this.router.replace('/auth')

          // clear notes
          storeNotes.clearNotes()
        }
      });
    },
    registerUser({ email, password }) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
    loginUser({ email, password }) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log('logout')
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        console.log('error')
      });
    }
  },
})