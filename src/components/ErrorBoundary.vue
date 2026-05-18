<template>
  <slot v-if="!hasError" />
  <div v-else class="error-boundary">
    <div class="error-boundary__inner">
      <div class="error-boundary__icon">⚡</div>
      <h2 class="error-boundary__title">Something went wrong</h2>
      <p class="error-boundary__msg">{{ errorMessage }}</p>
      <div class="error-boundary__actions">
        <button class="btn-retry" @click="retry">Try again</button>
        <router-link to="/" class="btn-home">← Go home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const props = defineProps({
  fallbackMessage: {
    type: String,
    default: 'An unexpected error occurred.',
  },
})

const emit = defineEmits(['error', 'retry'])
const hasError = ref(false)
const errorMessage = ref(props.fallbackMessage)

onErrorCaptured((err) => {
  hasError.value = true
  errorMessage.value = err?.message || props.fallbackMessage
  emit('error', err)
  return false
})

function retry() {
  hasError.value = false
  errorMessage.value = props.fallbackMessage
  emit('retry')
}
</script>

<style scoped>
.error-boundary {
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.error-boundary__inner {
  text-align: center;
  max-width: 420px;
}
.error-boundary__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: grayscale(0.4);
}
.error-boundary__title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--clr-ink);
  margin-bottom: 0.5rem;
}
.error-boundary__msg {
  font-size: 0.95rem;
  color: var(--clr-muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
.error-boundary__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-retry {
  background: var(--clr-accent);
  color: var(--clr-paper);
  border: none;
  padding: 0.6rem 1.4rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-retry:hover {
  opacity: 0.8;
}
.btn-home {
  color: var(--clr-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border: 1px solid var(--clr-rule);
  transition:
    border-color 0.2s,
    color 0.2s;
}
.btn-home:hover {
  color: var(--clr-ink);
  border-color: var(--clr-ink);
}
</style>
