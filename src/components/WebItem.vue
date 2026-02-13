<template>
  <div class="web-item-container">
    <h3 class="section-title" :id="transName(item)">
      <el-icon class="title-icon">
        <component :is="getIconComponent(item.icon)" />
      </el-icon>
      <span>{{ transName(item) }}</span>
      <el-tag v-if="item.is_hot" type="danger" effect="plain">Hot</el-tag>
    </h3>
    <el-row :gutter="[20, 20]">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(web, idx) in item.web" :key="idx">
        <el-card class="web-card" shadow="hover" @click="openweb(web.url)">
          <div class="card-content">
            <el-avatar :src="web.logo" :size="48" />
            <div class="web-info">
              <div class="web-title">{{ web.title }}</div>
              <div class="web-desc">{{ web.desc }}</div>
            </div>
            <el-icon class="arrow-icon" :size="20"><ArrowRight /></el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

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

function openweb(url) {
  window.open(url, '_blank')
}
</script>

<style scoped>
.web-item-container {
  margin-bottom: 48px;
}

.section-title {
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
}

:global(.dark) .section-title {
  color: #ffffff;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #404040, transparent);
  border-radius: 2px;
}

:global(.dark) .section-title::after {
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

.section-title .el-tag {
  margin-left: auto;
}

.web-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--el-border-color);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--el-bg-color);
}

:global(.dark) .web-card {
  background-color: #252525 !important;
}

.web-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border-color: var(--el-border-color-light);
}

.web-card:active {
  transform: translateY(-2px) scale(0.98);
}

.web-card:hover .web-desc {
  color: var(--el-text-color-primary);
}

:deep(.el-card__body) {
  padding: 16px;
  height: 100%;
  background-color: transparent !important;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-height: 76px;
}

.web-info {
  flex: 1;
  min-width: 0;
}

.web-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
  letter-spacing: 0.3px;
}

:global(.dark) .web-title {
  color: #ffffff;
}

.web-card:hover .web-title {
  color: #404040;
}

:global(.dark) .web-card:hover .web-title {
  color: #606060;
}

.web-desc {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.6;
  letter-spacing: 0.2px;
}

:global(.dark) .web-desc {
  color: #d0d0d0;
}

.arrow-icon {
  color: #606060;
  flex-shrink: 0;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-8px);
}

:global(.dark) .arrow-icon {
  color: #808080;
}

.web-card:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .web-item-container {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 20px;
    margin: 0 0 16px;
  }

  .title-icon {
    font-size: 22px;
    padding: 6px;
  }

  .web-card:hover {
    transform: translateY(-4px) scale(1.01);
  }

  :deep(.el-card__body) {
    padding: 14px;
  }

  .card-content {
    gap: 10px;
  }

  .arrow-icon {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 18px;
  }

  .title-icon {
    font-size: 20px;
    padding: 5px;
  }

  :deep(.el-card__body) {
    padding: 12px;
  }

  .web-title {
    font-size: 14px;
  }

  .web-desc {
    font-size: 12px;
  }
}
</style>
