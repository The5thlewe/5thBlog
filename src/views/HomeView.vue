<template>
  <div class="home">
    <header class="home__header">
      <div class="home__header-inner">
        <div class="home__kicker">Latest Writing</div>
        <h1 class="home__headline">5th Dispatch</h1>
        <p class="home__subline">Thoughts on code, craft, and the web—written with care.</p>
      </div>
      <div class="home__header-deco" aria-hidden="true">
        <span>№</span>
      </div>
    </header>

    <main class="home__content">
      <ErrorBoundary fallback-message="Failed to load posts. Please try again." @retry="load">
        <!-- Skeleton while loading -->
        <SkeletonLoader v-if="loading" :count="5" />

        <!-- Error state -->
        <div v-else-if="error" class="fetch-error">
          <p class="fetch-error__icon">✦</p>
          <p class="fetch-error__msg">{{ error.message || 'Could not fetch posts.' }}</p>
          <button class="btn-retry" @click="load">Retry</button>
        </div>

        <!-- Empty state -->
        <div v-else-if="!posts.length" class="empty-state">
          <p>No posts found yet.</p>
        </div>

        <!-- Posts list -->
        <TransitionGroup v-else name="list" tag="section" class="posts-list">
          <PostCard v-for="(post, i) in posts" :key="post.id" :post="post" :delay="i * 60" />
        </TransitionGroup>
      </ErrorBoundary>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'
import PostCard from '../components/PostCard.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import { usePosts } from '../composables/usePosts.js'

const { posts, loading, error, fetchPosts } = usePosts()

function load() {
  fetchPosts(1, 15)
}

onMounted(load)
</script>

<style scoped>
.home {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem 6rem;
}

/* HEADER */
.home__header {
  position: relative;
  padding: 5rem 0 3rem;
  border-bottom: 2px solid var(--clr-ink);
  margin-bottom: 0;
  overflow: hidden;
}
.home__header-inner {
  position: relative;
  z-index: 1;
}
.home__kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--clr-accent);
  margin-bottom: 0.75rem;
}
.home__headline {
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--clr-ink);
  margin-bottom: 1.25rem;
}
.home__subline {
  font-size: 1rem;
  color: var(--clr-muted);
  max-width: 44ch;
  line-height: 1.65;
}
.home__header-deco {
  position: absolute;
  right: -1rem;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: clamp(8rem, 20vw, 14rem);
  font-weight: 900;
  color: color-mix(in srgb, var(--clr-ink) 5%, transparent);
  user-select: none;
  line-height: 1;
  pointer-events: none;
}

/* CONTENT */
.home__content {
  padding-top: 0.5rem;
}
.posts-list {
  display: block;
}

/* FETCH ERROR */
.fetch-error {
  padding: 4rem 0;
  text-align: center;
}
.fetch-error__icon {
  font-size: 2rem;
  color: var(--clr-accent);
  margin-bottom: 0.5rem;
}
.fetch-error__msg {
  color: var(--clr-muted);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
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
  transition: opacity 0.2s;
}
.btn-retry:hover {
  opacity: 0.8;
}

.empty-state {
  padding: 4rem 0;
  color: var(--clr-muted);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

/* List transition */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.list-leave-to {
  opacity: 0;
}
</style>
