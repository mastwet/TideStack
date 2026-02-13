<template>
  <div class="main-content-item">
    <template v-if="item.web">
      <WebItem :item="item" :transName="transName" />
    </template>
    <template v-else-if="item.children">
      <div class="category-section">
        <h3 class="category-title" :id="transName(item)">
          <el-icon class="title-icon">
            <component :is="getIconComponent(item.icon)" />
          </el-icon>
          <span>{{ transName(item) }}</span>
          <el-tag v-if="item.is_hot" type="danger" effect="plain">Hot</el-tag>
        </h3>
        <div class="sub-categories">
          <MainContentItem v-for="(child, idx) in item.children" :key="idx" :item="child" :transName="transName" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import WebItem from './WebItem.vue'

const props = defineProps({
  item: Object,
  transName: Function
})

const iconMap = {
  'linecons-star': 'Star',
  'linecons-doc': 'Document',
  'linecons-lightbulb': 'Lightbulb',
  'linecons-thumbs-up': 'ThumbsUp',
  'linecons-diamond': 'Diamond',
  'linecons-tag': 'Tag',
  'linecons-heart': 'Heart',
  'linecons-cog': 'Setting',
  'linecons-pencil': 'Edit',
  'linecons-user': 'User',
  'fa-bars': 'Menu',
  'fa-github': 'Promotion'
}

function getIconComponent(iconName) {
  return iconMap[iconName] || 'Menu'
}
</script>

<style scoped>
.main-content-item {
  margin-bottom: 48px;
}

.category-section {
  margin-bottom: 32px;
}

.category-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--el-border-color);
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  letter-spacing: 0.3px;
}

:global(.dark) .category-title {
  color: #ffffff;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #404040, transparent);
  border-radius: 2px;
}

:global(.dark) .category-title::after {
  background: linear-gradient(90deg, #606060, transparent);
}

.title-icon {
  font-size: 26px;
  color: #ffffff;
  background: linear-gradient(135deg, #505050 0%, #353535 100%);
  padding: 8px;
  border-radius: 8px;
}

:global(.dark) .title-icon {
  background: linear-gradient(135deg, #606060 0%, #404040 100%);
}

.sub-categories {
  padding-left: 20px;
  margin-top: 24px;
  border-left: 3px solid var(--el-border-color);
  padding-left: 16px;
}

@media (max-width: 768px) {
  .main-content-item {
    margin-bottom: 32px;
  }

  .category-section {
    margin-bottom: 24px;
  }

  .category-title {
    font-size: 20px;
    margin: 0 0 16px;
  }

  .title-icon {
    font-size: 22px;
    padding: 6px;
  }

  .sub-categories {
    padding-left: 12px;
    margin-top: 16px;
  }
}
</style>
