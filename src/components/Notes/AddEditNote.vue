<template>
  <div
    class="card p-4 mb-5"
    :class="`has-background-${bgColor}-dark`"
  >
    <article
      v-if="showMessage"
      class="message is-success"
    >
      <div class="message-body">
        Note was updated succesfully.
      </div>
    </article>

    <label
      v-if="label"
      class="label has-text-white"
    >
      {{ label }}
    </label>

    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          placeholder="Add a new note"
          ref="newNoteRef"
          v-autofocus
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * imports
   */
  import { ref } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'

  /**
   * props
   */

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'success'
    },
    placeholder: {
      type: String,
      default: 'Type something...'
    },
    label: {
      type: String
    }
  })

  /**
   * emits
   */

  const emit = defineEmits(['update:modelValue'])

  const showMessage = ref(false)
  const newNoteRef = ref(null)
  const focusTextarea = () => {
    newNoteRef.value.focus()
  }

  defineExpose({
    focusTextarea,
    showMessage
  })

</script>