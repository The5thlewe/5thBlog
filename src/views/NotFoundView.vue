<template>
  <div class="not-found">
    <nav class="nf-nav">
      <router-link to="/" class="nf-logo">5th Dispatch</router-link>
    </nav>

    <div class="nf-content">
      <div class="nf-number" aria-hidden="true">404</div>
      <h1 class="nf-title">Page Not Found</h1>
      <p class="nf-body">
        The page you're looking for doesn't exist, was moved, or you mistyped the address.
      </p>
      <div class="nf-path">
        <span class="nf-path-label">Requested path</span>
        <code>{{ $route.fullPath }}</code>
      </div>
      <div class="nf-actions">
        <router-link to="/" class="btn-primary">Go home →</router-link>
        <button class="btn-back" @click="$router.back()">← Previous page</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
  min-height: 100vh;
}
.nf-nav {
  padding: 2rem 0 1.5rem;
  border-bottom: 1px solid var(--clr-rule);
  margin-bottom: 5rem;
}
.nf-logo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--clr-ink);
  text-decoration: none;
  letter-spacing: -0.02em;
}
.nf-content {
  animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.nf-number {
  font-family: var(--font-display);
  font-size: clamp(6rem, 20vw, 12rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: color-mix(in srgb, var(--clr-ink) 8%, transparent);
  margin-bottom: -0.1em;
  user-select: none;
}
.nf-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--clr-ink);
  margin-bottom: 1rem;
}
.nf-body {
  font-size: 1rem;
  color: var(--clr-muted);
  line-height: 1.7;
  max-width: 46ch;
  margin-bottom: 2rem;
}
.nf-path {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: color-mix(in srgb, var(--clr-ink) 5%, transparent);
  border: 1px solid var(--clr-rule);
  padding: 0.75rem 1rem;
  margin-bottom: 2.5rem;
  border-radius: 3px;
  flex-wrap: wrap;
}
.nf-path-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--clr-muted);
}
.nf-path code {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--clr-accent);
  word-break: break-all;
}
.nf-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
.btn-primary {
  background: var(--clr-ink);
  color: var(--clr-paper);
  text-decoration: none;
  padding: 0.7rem 1.8rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  transition: background 0.2s;
}
.btn-primary:hover {
  background: var(--clr-accent);
}
.btn-back {
  background: none;
  border: 1px solid var(--clr-rule);
  color: var(--clr-muted);
  padding: 0.7rem 1.4rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.btn-back:hover {
  border-color: var(--clr-ink);
  color: var(--clr-ink);
}
</style>
