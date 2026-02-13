<template>
  <el-sub-menu v-if="item.children" :index="item.name">
    <template #title>
      <el-icon v-if="item.icon" class="menu-icon">
        <component :is="getIconComponent(item.icon)" />
      </el-icon>
      <span>{{ transName(item) }}</span>
      <el-tag v-if="item.is_hot" size="small" type="danger" effect="plain">Hot</el-tag>
    </template>
    <SidebarMenuItem v-for="(child, idx) in item.children" :key="`${item.name}-${idx}`" :item="child" :transName="transName" />
  </el-sub-menu>
  <el-menu-item v-else :index="item.name">
    <el-icon v-if="item.icon" class="menu-icon">
      <component :is="getIconComponent(item.icon)" />
    </el-icon>
    <span>{{ transName(item) }}</span>
    <el-tag v-if="item.is_hot" size="small" type="danger" effect="plain">Hot</el-tag>
  </el-menu-item>
</template>

<script setup>
import { computed } from 'vue'

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
.menu-icon {
  margin-right: 10px;
  font-size: 18px;
  transition: all 0.3s ease;
}

:deep(.el-menu-item) {
  border-radius: 6px;
  margin: 4px 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

:deep(.el-menu-item::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(180deg, #606060 0%, #404040 100%);
  transition: height 0.3s ease;
  border-radius: 0 2px 2px 0;
}

:global(.dark) :deep(.el-menu-item::before) {
  background: linear-gradient(180deg, #808080 0%, #505050 100%);
}

:deep(.el-menu-item:hover) {
  background-color: var(--el-bg-color-light);
  transform: translateX(4px);
}

:deep(.el-menu-item:hover::before) {
  height: 60%;
}

:deep(.el-menu-item.is-active::before) {
  height: 80%;
  background-color: #ffffff;
}

:global(.dark) :deep(.el-menu-item.is-active::before) {
  background-color: #ffffff;
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, #404040 0%, #2a2a2a 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateX(4px);
  font-weight: 700;
}

:global(.dark) :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, #505050 0%, #353535 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

:deep(.el-menu-item.is-active::before) {
  height: 80%;
  background-color: #ffffff;
}

:deep(.el-sub-menu__title) {
  border-radius: 6px;
  margin: 4px 8px;
  transition: all 0.3s ease;
  position: relative;
}

:deep(.el-sub-menu__title::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(180deg, #606060 0%, #404040 100%);
  transition: height 0.3s ease;
  border-radius: 0 2px 2px 0;
}

:global(.dark) :deep(.el-sub-menu__title::before) {
  background: linear-gradient(180deg, #808080 0%, #505050 100%);
}

:deep(.el-sub-menu__title:hover) {
  background-color: var(--el-fill-color-light);
  transform: translateX(4px);
}

:deep(.el-sub-menu__title:hover::before) {
  height: 60%;
}

:deep(.el-sub-menu.is-active > .el-sub-menu__title::before) {
  height: 80%;
  background-color: #ffffff;
}

:global(.dark) :deep(.el-sub-menu.is-active > .el-sub-menu__title::before) {
  background-color: #ffffff;
}

:deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  background: linear-gradient(135deg, #404040 0%, #2a2a2a 100%);
  color: #ffffff;
  font-weight: 700;
}

:global(.dark) :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  background: linear-gradient(135deg, #505050 0%, #353535 100%);
  color: #ffffff;
}

:deep(.el-sub-menu.is-active > .el-sub-menu__title::before) {
  height: 80%;
}

:deep(.el-menu-item .el-tag) {
  margin-left: 8px;
}

:deep(.el-sub-menu__title .el-tag) {
  margin-left: 8px;
}

:deep(.el-menu--collapse .el-menu-item) {
  margin: 2px 4px;
}

:deep(.el-menu--collapse .el-sub-menu__title) {
  margin: 2px 4px;
}
</style>
