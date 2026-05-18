<template>
  <div class="skeleton-list">
    <div v-for="i in count" :key="i" class="skeleton-card">
      <div class="sk sk--tag" />
      <div class="sk sk--title" />
      <div class="sk sk--title sk--title-short" />
      <div class="sk sk--body" />
      <div class="sk sk--body" />
      <div class="sk sk--body sk--body-short" />
      <div class="sk sk--link" />
      <div class="sk sk--rule" />
    </div>
  </div>
</template>

<script setup>
defineProps({ count: { type: Number, default: 4 } })
</script>

<style scoped>
.skeleton-list {
  width: 100%;
}
.skeleton-card {
  padding: 2rem 0 1.5rem;
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
  margin-bottom: 0.6rem;
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
  border-radius: 2px;
}
.sk--title {
  height: 28px;
  width: 72%;
  margin-top: 0.5rem;
}
.sk--title-short {
  width: 45%;
}
.sk--body {
  height: 14px;
  width: 100%;
}
.sk--body-short {
  width: 60%;
}
.sk--link {
  height: 14px;
  width: 100px;
  margin-top: 0.5rem;
}
.sk--rule {
  height: 1px;
  width: 100%;
  margin-top: 1.5rem;
  background: var(--clr-rule);
  animation: none;
}
</style>
