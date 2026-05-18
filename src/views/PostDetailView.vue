<template>
  <div class="detail">
    <nav class="detail__nav">
      <button class="nav-back" @click="router.back()"><span>←</span> Back</button>
      <router-link to="/" class="nav-home">The Dispatch</router-link>
    </nav>

    <ErrorBoundary fallback-message="Could not load this post." @retry="load">
      <!-- Loading skeleton -->
      <div v-if="loading" class="detail__skeleton">
        <div class="sk sk--tag" />
        <div class="sk sk--h1" />
        <div class="sk sk--h1 sk--h1-short" />
        <div class="sk sk--meta" />
        <div class="sk sk--rule" />
        <div v-for="i in 6" :key="i" class="sk sk--body" />
      </div>

      <!-- 404 / error state -->
      <div v-else-if="error" class="detail__error">
        <template v-if="error.message === 'NOT_FOUND'">
          <p class="detail__error-code">404</p>
          <h2>Post not found</h2>
          <p>This post may have been removed or never existed.</p>
        </template>
        <template v-else>
          <p class="detail__error-code">⚡</p>
          <h2>Failed to load post</h2>
          <p>{{ error.message }}</p>
          <button class="btn-retry" @click="load">Retry</button>
        </template>
        <router-link to="/" class="btn-home">← Back to all posts</router-link>
      </div>

      <!-- Post content -->
      <article v-else-if="post" class="detail__article">
        <div class="detail__meta">
          <span class="detail__tag">{{ category }}</span>
          <time class="detail__date">{{ formattedDate }}</time>
        </div>

        <h1 class="detail__title">{{ post.title }}</h1>

        <div class="detail__byline" v-if="post.author || post.user">
          <div class="detail__avatar">
            {{ initials }}
          </div>
          <span>{{ authorName }}</span>
        </div>

        <div class="detail__rule" />

        <!-- Rendered HTML content -->
        <div v-if="hasHtml" class="detail__body prose" v-html="post.body || post.content" />
        <!-- Plain text content -->
        <div v-else class="detail__body prose">
          <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
        </div>
      </article>
    </ErrorBoundary>

    <!-- Footer nav -->
    <div class="detail__footer-nav" v-if="post && !loading">
      <router-link to="/" class="footer-link">← All posts</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ErrorBoundary from '../components/ErrorBoundary.vue'
import { usePost } from '../composables/usePosts.js'

const route = useRoute()
const router = useRouter()
const { post, loading, error, fetchPost } = usePost()

function load() {
  fetchPost(route.params.id)
}

onMounted(load)
watch(() => route.params.id, load)

const formattedDate = computed(() => {
  if (!post.value) return ''
  const d = post.value.createdAt || post.value.created_at || post.value.publishedAt
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
})

const category = computed(() => {
  if (!post.value) return ''
  return post.value.category || post.value.tag || post.value.tags?.[0] || 'Essay'
})

const hasHtml = computed(() => {
  const body = post.value?.body || post.value?.content || ''
  return /<[a-z][\s\S]*>/i.test(body)
})

const paragraphs = computed(() => {
  const body = post.value?.body || post.value?.content || ''
  return body.split('\n').filter(Boolean)
})

const authorName = computed(() => {
  const a = post.value?.author || post.value?.user
  if (!a) return 'Anonymous'
  if (typeof a === 'string') return a
  return a.name || a.username || a.email || 'Author'
})

const initials = computed(() => {
  return authorName.value.slice(0, 2).toUpperCase()
})
</script>

<style scoped>
.detail {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1.5rem 6rem;
}

/* NAV */
.detail__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0 0;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--clr-rule);
  padding-bottom: 1.25rem;
}
.nav-back {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  color: var(--clr-muted);
  transition: color 0.2s;
  padding: 0;
}
.nav-back:hover {
  color: var(--clr-ink);
}
.nav-home {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--clr-ink);
  text-decoration: none;
  letter-spacing: -0.02em;
}
.nav-home:hover {
  color: var(--clr-accent);
}

/* SKELETON */
.detail__skeleton {
  padding-top: 1rem;
}
.sk {
  background: linear-gradient(
    90deg,
    var(--clr-rule) 25%,
    color-mix(in srgb, var(--clr-rule) 60%, transparent) 50%,
    var(--clr-rule) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  border-radius: 3px;
  margin-bottom: 0.75rem;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.sk--tag {
  height: 18px;
  width: 80px;
}
.sk--h1 {
  height: 42px;
  width: 85%;
  margin-top: 0.5rem;
}
.sk--h1-short {
  width: 50%;
}
.sk--meta {
  height: 14px;
  width: 160px;
}
.sk--rule {
  height: 1px;
  width: 100%;
  margin: 1.5rem 0;
  background: var(--clr-rule);
  animation: none;
}
.sk--body {
  height: 14px;
  width: 100%;
}
.sk--body:nth-child(odd) {
  width: 88%;
}

/* ARTICLE */
.detail__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  animation: fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.detail__tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--clr-accent);
  background: color-mix(in srgb, var(--clr-accent) 10%, transparent);
  padding: 0.2em 0.6em;
  border-radius: 2px;
}
.detail__date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--clr-muted);
}
.detail__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--clr-ink);
  margin-bottom: 1.5rem;
  animation: fadeUp 0.5s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.detail__byline {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--clr-muted);
  animation: fadeUp 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.detail__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--clr-accent);
  color: var(--clr-paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 700;
  flex-shrink: 0;
}
.detail__rule {
  height: 1px;
  background: var(--clr-rule);
  margin: 1.75rem 0 2.5rem;
  animation: fadeUp 0.5s 0.12s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.detail__body {
  animation: fadeUp 0.5s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* PROSE */
.prose {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--clr-body);
}
.prose :deep(p) {
  margin-bottom: 1.4em;
}
.prose :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--clr-ink);
  margin: 2.5em 0 0.75em;
  letter-spacing: -0.02em;
}
.prose :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--clr-ink);
  margin: 2em 0 0.5em;
}
.prose :deep(a) {
  color: var(--clr-accent);
  text-underline-offset: 3px;
}
.prose :deep(blockquote) {
  border-left: 3px solid var(--clr-accent);
  margin: 2em 0;
  padding: 0.5em 1.5em;
  font-style: italic;
  color: var(--clr-muted);
}
.prose :deep(pre),
.prose :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.88em;
  background: color-mix(in srgb, var(--clr-ink) 6%, transparent);
  border-radius: 3px;
}
.prose :deep(pre) {
  padding: 1em 1.25em;
  overflow-x: auto;
}
.prose :deep(code) {
  padding: 0.15em 0.35em;
}
.prose :deep(img) {
  max-width: 100%;
  border-radius: 4px;
}

/* ERROR */
.detail__error {
  text-align: center;
  padding: 5rem 0;
}
.detail__error-code {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 900;
  color: color-mix(in srgb, var(--clr-ink) 12%, transparent);
  margin-bottom: 0.5rem;
}
.detail__error h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--clr-ink);
  margin-bottom: 0.5rem;
}
.detail__error p {
  color: var(--clr-muted);
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}
.btn-retry {
  background: var(--clr-accent);
  color: var(--clr-paper);
  border: none;
  padding: 0.6rem 1.6rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  cursor: pointer;
  margin-bottom: 1rem;
  display: block;
  margin: 0 auto 1rem;
}
.btn-home {
  display: inline-block;
  margin-top: 1rem;
  color: var(--clr-muted);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  text-decoration: none;
  border-bottom: 1px solid var(--clr-rule);
}
.btn-home:hover {
  color: var(--clr-ink);
}

/* FOOTER NAV */
.detail__footer-nav {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--clr-rule);
  animation: fadeUp 0.5s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.footer-link {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  color: var(--clr-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link:hover {
  color: var(--clr-ink);
}
</style>
