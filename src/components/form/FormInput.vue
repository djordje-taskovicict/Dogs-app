<template>
  <div class="col">
    <label v-if="label" class="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :autocomplete="autocomplete"
      :required="required"
      :minlength="minlength"
    />
    <small v-if="hint" class="muted">{{ hint }}</small>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  id: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  autocomplete: { type: String, default: '' },
  required: { type: Boolean, default: false },
  minlength: { type: Number, default: undefined }
})
defineEmits(['update:modelValue'])
</script>
