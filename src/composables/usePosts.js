import { ref, shallowRef } from 'vue'

const BASE = 'https://api.oluwasetemi.dev'

export function usePosts() {
  const posts = ref([])
  const loading = ref(false)
  const error = shallowRef(null)

  async function fetchPosts(page = 1, limit = 12) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE}/posts?page=${page}&limit=${limit}`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      // Normalize: API may return { data: [...] } or array directly
      posts.value = Array.isArray(data) ? data : (data.data ?? data.posts ?? [])
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { posts, loading, error, fetchPosts }
}

export function usePost() {
  const post = ref(null)
  const loading = ref(false)
  const error = shallowRef(null)

  async function fetchPost(id) {
    loading.value = true
    error.value = null
    post.value = null
    try {
      const res = await fetch(`${BASE}/posts/${id}`)
      if (res.status === 404) throw new Error('NOT_FOUND')
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      post.value = data.data ?? data
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { post, loading, error, fetchPost }
}
