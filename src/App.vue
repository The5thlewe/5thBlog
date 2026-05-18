<template>
  <div id="app-shell">
    <div class="progress-bar" :class="{ active: isNavigating }" />
    <router-view v-slot="{ Component, route }">
      <Transition :name="transitionName" mode="out-in">
        <Suspense @fallback="isNavigating = true" @resolve="isNavigating = false">
          <component :is="Component" :key="route.fullPath" />
          <template #fallback>
            <div class="suspense-fallback">
              <div class="suspense-spinner" />
              <p>Loading…</p>
            </div>
          </template>
        </Suspense>
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isNavigating = ref(false)
const transitionName = ref('fade')

const routeOrder = { Home: 0, PostDetail: 1, NotFound: 99 }

watch(
  () => route.name,
  (to, from) => {
    const toIdx = routeOrder[to] ?? 0
    const fromIdx = routeOrder[from] ?? 0
    transitionName.value = toIdx > fromIdx ? 'slide-left' : 'slide-right'
  },
)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,400&display=swap');

:root {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'DM Mono', 'Courier New', monospace;
  --clr-paper: #eae6dcc8;
  --clr-ink: #1a1814;
  --clr-body: #3d3930;
  --clr-muted: #8a8070;
  --clr-accent: #c0392b;
  --clr-rule: #e6e0d6;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  background: var(--clr-paper);
  color: var(--clr-body);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--clr-paper);
  min-height: 100vh;
}
#app-shell {
  position: relative;
  min-height: 100vh;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--clr-accent);
  width: 0%;
  transition:
    width 0.3s ease,
    opacity 0.3s ease;
  opacity: 0;
  z-index: 999;
}
.progress-bar.active {
  width: 70%;
  opacity: 1;
}

.suspense-fallback {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--clr-muted);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}
.suspense-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--clr-rule);
  border-top-color: var(--clr-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
