<template>
  <div class="edit">
    <AddEditNote
      ref="addEditNoteRef"
      v-model="noteContent"
      bgColor="link"
      placeholder="Edit note"
      label="Edit note"
    >
      <template #buttons>
        <button
          class="button is-link is-light mr-2"
          @click="$router.back()"
          :disabled="!noteContent"
        >
          Cancel
        </button>
        <button
          class="button is-link has-background-success"
          @click="editNote"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
  /**
   * imports
   */

  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { ref, onBeforeMount } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStoreNotes } from '@/stores/storeNotes'

  /**
   * store
   */

  const storeNotes = useStoreNotes()

  /**
   * route
   */
  
  const route = useRoute()

  /**
   * others
   */
  const noteContent = ref('')
  const addEditNoteRef = ref(null)
  const noteId = route.params.id

  const editNote = () => {
    storeNotes.editNote(noteId, noteContent.value)
    if (addEditNoteRef) {
      addEditNoteRef.value.showMessage = true
    }
  }

  onBeforeMount(() => {
    noteContent.value = storeNotes.getNoteContent(noteId)
  })
</script>