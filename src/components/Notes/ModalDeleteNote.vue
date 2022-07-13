<template>
  <div
    class="modal is-active"
  >
    <div class="modal-background"></div>
    <div
      class="modal-card"
      ref="modalDeleteNoteRef"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note</p>
        <button
          @click="$emit('update:modelValue', false)"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          @click="$emit('deleteNote')"
          class="button is-danger"
        >Delete</button>
        <button
          @click="$emit('update:modelValue', false)"
          class="button"
        >Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
  /**
   * imports
   */
  
  import { onMounted, onUnmounted, ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'

  /**
   * props
   */

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  /**
   * emits
   */

  const emit = defineEmits(['update:modelValue', 'deleteNote'])

  /**
   * Vue use
   */
  const modalDeleteNoteRef = ref(null)
  onClickOutside(modalDeleteNoteRef, (event) => {
    emit('update:modelValue', false)
  })

  /**
   * Key event
   */

  const handleKeyboard = e => {
      emit('update:modelValue', false)
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
  })

  onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
  })

</script>