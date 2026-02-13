<template>
  <el-container class="main-container">
    <el-aside :width="sidebarOpen ? '240px' : '64px'" class="sidebar">
      <div class="logo-section">
        <h1 class="logo" :class="{ 'logo-collapsed': !sidebarOpen }">{{ sidebarOpen ? 'TideStack' : 'T' }}</h1>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="!sidebarOpen"
        :unique-opened="true"
        class="sidebar-menu"
        @select="handleMenuSelect"
      >
        <template v-for="(menu, idx) in items" :key="idx">
          <SidebarMenuItem :item="menu" :transName="transName" />
        </template>
        <el-menu-item index="about" @click="$router.push('/about')">
          <el-icon><Star /></el-icon>
          <template #title>关于本站</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-button :icon="sidebarOpen ? Fold : Expand" circle @click="toggleSidebar" />
          <el-input
            v-model="searchText"
            placeholder="搜索网站..."
            prefix-icon="Search"
            clearable
            style="width: 320px; margin-left: 20px"
            size="large"
            @input="handleSearch"
          />
        </div>
        <div class="header-right">
          <el-dropdown @command="handleLangChange">
            <span class="lang-selector">
              <el-image :src="lang.flag" style="width: 20px; height: 14px; margin-right: 5px" />
              {{ lang.name }}
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="langItem in langList"
                  :key="langItem.key"
                  :command="langItem"
                  :class="{ 'is-active': langItem.key === lang.key }"
                >
                  <el-image :src="langItem.flag" style="width: 20px; height: 14px; margin-right: 8px" />
                  {{ langItem.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-switch
            v-model="isDark"
            inline-prompt
            :active-icon="Moon"
            :inactive-icon="Sunny"
            @change="toggleTheme"
          />
          <el-link href="https://github.com/mastwet/TideStack" target="_blank" type="primary" :icon="Promotion">
            GitHub
          </el-link>
        </div>
      </el-header>

      <el-main class="main-content">
        <el-tabs v-model="activeTab" type="card" class="content-tabs" @tab-change="handleTabChange">
          <el-tab-pane label="全部" name="all">
            <div class="content-list">
              <MainContentItem v-for="(item, idx) in filteredItems" :key="idx" :item="item" :transName="transName" />
            </div>
          </el-tab-pane>
          <el-tab-pane
            v-for="item in items"
            :key="item.name"
            :label="transName(item)"
            :name="item.name"
            class="tab-pane"
          >
            <div class="content-list">
              <MainContentItem :item="item" :transName="transName" />
              <div v-if="item.children" class="sub-content">
                <MainContentItem
                  v-for="(child, idx) in item.children"
                  :key="idx"
                  :item="child"
                  :transName="transName"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <Footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, inject, nextTick } from 'vue'
import { Fold, Expand, ArrowDown, Moon, Sunny, Star, Promotion, Search } from '@element-plus/icons-vue'
import SidebarMenuItem from '../components/SidebarMenuItem.vue'
import MainContentItem from '../components/MainContentItem.vue'
import Footer from '../components/Footer.vue'
import itemsData from '../assets/data.json'

const theme = inject('theme')
const isDark = computed(() => theme?.isDark?.value ?? false)
const items = ref(itemsData)
const activeMenu = ref('all')
const activeTab = ref('all')
const searchText = ref('')
const sidebarOpen = ref(true)

const langList = ref([
  {
    key: 'zh',
    name: '简体中文',
    flag: './assets/images/flags/flag-cn.png',
  },
  {
    key: 'en',
    name: 'English',
    flag: './assets/images/flags/flag-us.png',
  },
])
const lang = ref(langList.value[0])

function transName(webItem) {
  return lang.value.key === 'en' ? webItem.en_name : webItem.name
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function toggleTheme() {
  theme?.toggleTheme()
}

function handleLangChange(selectedLang) {
  lang.value = selectedLang
}

function handleMenuSelect(index) {
  if (index === 'about') {
    $router.push('/about')
    return
  }

  const topLevelItem = items.value.find(item => {
    if (item.name === index) return true
    if (item.children) {
      return item.children.some(child => child.name === index)
    }
    return false
  })

  if (topLevelItem) {
    const isChildItem = index !== topLevelItem.name

    activeTab.value = topLevelItem.name
    activeMenu.value = isChildItem ? index : topLevelItem.name

    if (isChildItem) {
      nextTick(() => {
        const elementId = transName({ name: index })
        const element = document.getElementById(elementId)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 100)
        }
      })
    }
  }
}

function handleTabChange(tabName) {
  if (tabName === 'all') {
    activeMenu.value = 'all'
  } else {
    activeMenu.value = tabName
  }
}

function findParentCategory(childName) {
  for (const item of items.value) {
    if (item.children) {
      const child = item.children.find(c => c.name === childName)
      if (child) return item
    }
  }
  return null
}

function handleSearch(value) {
  if (!value) {
    activeTab.value = 'all'
  }
}

const filteredItems = computed(() => {
  if (!searchText.value) {
    return items.value
  }
  const searchLower = searchText.value.toLowerCase()
  return items.value.filter(item => {
    if (item.name && item.name.toLowerCase().includes(searchLower)) return true
    if (item.en_name && item.en_name.toLowerCase().includes(searchLower)) return true
    if (item.web && item.web.some(web => 
      (web.title && web.title.toLowerCase().includes(searchLower)) ||
      (web.desc && web.desc.toLowerCase().includes(searchLower))
    )) return true
    if (item.children) {
      return item.children.some(child => 
        child.name && child.name.toLowerCase().includes(searchLower)
      )
    }
    return false
  })
})
</script>

<style scoped>
.main-container {
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  background-color: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

:global(.dark) .sidebar {
  background-color: #1a1a1a !important;
}

.logo-section {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--el-border-color);
  padding: 0 12px;
  background: linear-gradient(135deg, #404040 0%, #2a2a2a 100%);
}

:global(.dark) .logo-section {
  background: linear-gradient(135deg, #404040 0%, #2a2a2a 100%);
}

.logo {
  font-size: 26px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.logo-collapsed {
  font-size: 28px;
}

.sidebar-menu {
  flex: 1;
  border-right: none;
  overflow-y: auto;
  padding: 8px 0;
}

:global(.dark) .sidebar-menu {
  background-color: #1a1a1a !important;
}

.sidebar-menu::-webkit-scrollbar {
  width: 4px;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background-color: var(--el-border-color);
  border-radius: 2px;
}

.header {
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:global(.dark) .header {
  background-color: #1a1a1a !important;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.lang-selector {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  color: var(--el-text-color-regular);
}

.lang-selector:hover {
  background-color: var(--el-fill-color-light);
  transform: translateY(-1px);
}

.main-content {
  background-color: var(--el-bg-color-page);
  padding: 24px;
  overflow-y: auto;
}

:global(.dark) .main-content {
  background-color: #0a0a0a !important;
}

.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-thumb {
  background-color: var(--el-border-color-darker);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--el-border-color-dark);
}

.content-tabs {
  background-color: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

:global(.dark) .content-tabs {
  background-color: #1a1a1a !important;
}

.content-list {
  padding-top: 8px;
}

.sub-content {
  margin-top: 32px;
  padding-left: 0;
  border-left: none;
}

:deep(.el-tabs__content) {
  padding: 8px 0 0;
}

:deep(.el-tabs__header) {
  margin-bottom: 20px;
}

:deep(.el-tabs__nav) {
  border: none;
  background-color: transparent;
}

:deep(.el-tabs__item) {
  border: none;
  padding: 12px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  color: var(--el-text-color-secondary);
  background-color: transparent;
  letter-spacing: 0.3px;
}

:global(.dark) :deep(.el-tabs__item) {
  color: #b0b0b0;
}

:deep(.el-tabs__item:hover) {
  color: var(--el-text-color-primary);
  background-color: var(--el-fill-color-light);
}

:global(.dark) :deep(.el-tabs__item:hover) {
  color: #ffffff;
  background-color: #252525;
}

:deep(.el-tabs__item.is-active) {
  color: #ffffff;
  background: linear-gradient(135deg, #404040 0%, #2a2a2a 100%);
  border-radius: 4px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

:global(.dark) :deep(.el-tabs__item.is-active) {
  color: #ffffff;
  background: linear-gradient(135deg, #505050 0%, #353535 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: var(--el-fill-color-blank);
  border-color: var(--el-border-color);
}

:global(.dark) :deep(.el-input__wrapper) {
  background-color: #2a2a2a !important;
  border-color: #3a3a3a !important;
}

:deep(.el-input__inner) {
  color: var(--el-text-color-primary);
  font-weight: 500;
  letter-spacing: 0.3px;
}

:global(.dark) :deep(.el-input__inner) {
  color: #ffffff !important;
}

:deep(.el-input__inner::placeholder) {
  color: var(--el-text-color-placeholder);
}

:global(.dark) :deep(.el-input__inner::placeholder) {
  color: #808080;
}

:deep(.el-input__wrapper:hover) {
  border-color: var(--el-border-color-light);
}

:global(.dark) :deep(.el-input__wrapper:hover) {
  border-color: #505050 !important;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #404040;
  box-shadow: 0 2px 8px rgba(64, 64, 64, 0.15);
}

:global(.dark) :deep(.el-input__wrapper.is-focus) {
  border-color: #606060 !important;
  box-shadow: 0 2px 8px rgba(96, 96, 96, 0.2);
}

:deep(.el-button--circle) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

:deep(.el-button--circle:hover) {
  transform: scale(1.05);
}

:deep(.el-switch) {
  --el-switch-on-color: #404040;
}

:global(.dark) :deep(.el-switch) {
  --el-switch-on-color: #606060;
}

:deep(.el-dropdown-menu) {
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

:global(.dark) :deep(.el-dropdown-menu) {
  background-color: #1a1a1a !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

:deep(.el-dropdown-menu__item) {
  color: var(--el-text-color-regular);
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
}

:global(.dark) :deep(.el-dropdown-menu__item:hover) {
  background-color: #252525 !important;
}

:deep(.el-dropdown-menu__item.is-active) {
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
}

:global(.dark) :deep(.el-dropdown-menu__item.is-active) {
  background-color: #252525 !important;
}

:deep(.el-select-dropdown) {
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
}

:global(.dark) :deep(.el-select-dropdown) {
  background-color: #1a1a1a !important;
}

:deep(.el-select-dropdown__item) {
  color: var(--el-text-color-regular);
}

:deep(.el-select-dropdown__item:hover) {
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
}

:global(.dark) :deep(.el-select-dropdown__item:hover) {
  background-color: #252525 !important;
}

:deep(.el-select-dropdown__item.is-selected) {
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
}

:global(.dark) :deep(.el-select-dropdown__item.is-selected) {
  background-color: #252525 !important;
}

@media (max-width: 768px) {
  .header {
    padding: 0 16px;
  }

  .header-left,
  .header-right {
    gap: 12px;
  }

  .main-content {
    padding: 16px;
  }

  .content-tabs {
    padding: 16px;
  }
}
</style>
