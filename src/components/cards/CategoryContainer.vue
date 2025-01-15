<template>
  <div class="flex-1 h-60 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
    <div class="flex justify-between text-sm">
      <div class="font-semibold">
        <span class="text-slate-500">{{ category }}: </span>{{ type }}
      </div>
      <span class="rounded bg-blue-500 text-white px-2">{{ length }}</span>
    </div>
    <hr class="my-2">
    <div class="overflow-y-scroll h-40 rounded space-y-1">
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
      <CategoryDetail />
    </div>
  </div>
</template>

<script>
import CategoryDetail from './CategoryDetail.vue';

export default {
  name: 'Category',
  components: { CategoryDetail },
  props: {
    category: String,
    type: String,
    length: Number,
    dataset: Array
  }
}
</script>