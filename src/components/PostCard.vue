<template>
  <article class="post-card" :style="{ '--delay': delay + 'ms' }">
    <div class="post-card__meta">
      <span class="post-card__tag">{{ category }}</span>
      <time class="post-card__date">{{ formattedDate }}</time>
    </div>
    <h2 class="post-card__title">{{ post.title }}</h2>
    <p class="post-card__excerpt">{{ excerpt }}</p>
    <router-link :to="`/post/${post.id}`" class="post-card__link">
      Read essay <span class="post-card__arrow">→</span>
    </router-link>
    <div class="post-card__rule" />
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
  delay: { type: Number, default: 0 },
})

const excerpt = computed(() => {
  const body = props.post.body || props.post.content || props.post.excerpt || ''
  const plain = body.replace(/<[^>]+>/g, '')
  return plain.length > 160 ? plain.slice(0, 160).trimEnd() + '…' : plain
})

const formattedDate = computed(() => {
  const d = props.post.createdAt || props.post.created_at || props.post.publishedAt
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
})

const category = computed(() => {
  return props.post.category || props.post.tag || props.post.tags?.[0] || 'Essay'
})
</script>

<style scoped>
.post-card {
  padding: 2rem 0 1.5rem;
  opacity: 0;
  transform: translateY(18px);
  animation: cardIn 0.5s var(--delay, 0ms) cubic-bezier(0.22, 1, 0.36, 1) forwards;
  cursor: default;
}
@keyframes cardIn {
  to {
    opacity: 1;
    transform: none;
  }
}
.post-card__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.post-card__tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--clr-accent);
  background: color-mix(in srgb, var(--clr-accent) 10%, transparent);
  padding: 0.2em 0.6em;
  border-radius: 2px;
}
.post-card__date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--clr-muted);
}
.post-card__title {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 3vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--clr-ink);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}
.post-card__excerpt {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--clr-body);
  margin-bottom: 1.2rem;
  max-width: 62ch;
}
.post-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  color: var(--clr-ink);
  text-decoration: none;
  border-bottom: 1.5px solid var(--clr-ink);
  padding-bottom: 0.1em;
  transition:
    color 0.2s,
    border-color 0.2s;
}
.post-card__link:hover {
  color: var(--clr-accent);
  border-color: var(--clr-accent);
}
.post-card__arrow {
  transition: transform 0.2s;
}
.post-card__link:hover .post-card__arrow {
  transform: translateX(4px);
}
.post-card__rule {
  width: 100%;
  height: 1px;
  background: var(--clr-rule);
  margin-top: 1.75rem;
}
</style>
