<template>
  <div class="col">
    <label v-if="label" class="label" :for="id">{{ label }}</label>
    <select :id="id" class="select" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  id: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] } // [{value, label}]
})
defineEmits(['update:modelValue'])
</script>
