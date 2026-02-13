<script setup>
import { ref, provide, onMounted } from 'vue'

const isDark = ref(true)

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    setDarkThemeVariables()
  } else {
    document.documentElement.classList.remove('dark')
    setLightThemeVariables()
  }
}

function setDarkThemeVariables() {
  document.documentElement.style.setProperty('--el-bg-color-page', '#0a0a0a')
  document.documentElement.style.setProperty('--el-bg-color', '#1a1a1a')
  document.documentElement.style.setProperty('--el-bg-color-light', '#252525')
  document.documentElement.style.setProperty('--el-bg-color-lighter', '#2a2a2a')
  document.documentElement.style.setProperty('--el-text-color-primary', '#ffffff')
  document.documentElement.style.setProperty('--el-text-color-regular', '#f0f0f0')
  document.documentElement.style.setProperty('--el-text-color-secondary', '#c0c0c0')
  document.documentElement.style.setProperty('--el-text-color-placeholder', '#808080')
  document.documentElement.style.setProperty('--el-text-color-disabled', '#5a5a5a')
  document.documentElement.style.setProperty('--el-border-color', '#3a3a3a')
  document.documentElement.style.setProperty('--el-border-color-light', '#454545')
  document.documentElement.style.setProperty('--el-border-color-lighter', '#505050')
  document.documentElement.style.setProperty('--el-border-color-dark', '#353535')
  document.documentElement.style.setProperty('--el-border-color-darker', '#2a2a2a')
  document.documentElement.style.setProperty('--el-border-color-extra-light', '#555555')
  document.documentElement.style.setProperty('--el-fill-color-light', 'rgba(255,255,255,0.15)')
  document.documentElement.style.setProperty('--el-fill-color-lighter', 'rgba(255,255,255,0.08)')
  document.documentElement.style.setProperty('--el-fill-color-extra-light', 'rgba(255,255,255,0.03)')
  document.documentElement.style.setProperty('--el-fill-color-blank', '#1a1a1a')
}

function setLightThemeVariables() {
  document.documentElement.style.setProperty('--el-bg-color-page', '#ffffff')
  document.documentElement.style.setProperty('--el-bg-color', '#f5f7fa')
  document.documentElement.style.setProperty('--el-bg-color-light', '#ecf5ff')
  document.documentElement.style.setProperty('--el-bg-color-lighter', '#ffffff')
  document.documentElement.style.setProperty('--el-text-color-primary', '#303133')
  document.documentElement.style.setProperty('--el-text-color-regular', '#606266')
  document.documentElement.style.setProperty('--el-text-color-secondary', '#909399')
  document.documentElement.style.setProperty('--el-text-color-placeholder', '#a8abb2')
  document.documentElement.style.setProperty('--el-text-color-disabled', '#c0c4cc')
  document.documentElement.style.setProperty('--el-border-color', '#dcdfe6')
  document.documentElement.style.setProperty('--el-border-color-light', '#e4e7ed')
  document.documentElement.style.setProperty('--el-border-color-lighter', '#ebeef5')
  document.documentElement.style.setProperty('--el-border-color-dark', '#d4d7de')
  document.documentElement.style.setProperty('--el-border-color-darker', '#cdd0d6')
  document.documentElement.style.setProperty('--el-border-color-extra-light', '#f2f6fc')
  document.documentElement.style.setProperty('--el-fill-color-light', 'rgba(32,33,36,0.04)')
  document.documentElement.style.setProperty('--el-fill-color-lighter', 'rgba(32,33,36,0.02)')
  document.documentElement.style.setProperty('--el-fill-color-extra-light', 'rgba(32,33,36,0.01)')
  document.documentElement.style.setProperty('--el-fill-color-blank', '#ffffff')
}

provide('theme', {
  isDark,
  toggleTheme
})

onMounted(() => {
  document.documentElement.classList.add('dark')
  setDarkThemeVariables()
})
</script>

<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  min-height: 100%;
}

:root {
  --el-color-primary: #404040;
  --el-color-primary-light-3: #505050;
  --el-color-primary-light-5: #606060;
  --el-color-primary-light-7: #707070;
  --el-color-primary-light-8: #808080;
  --el-color-primary-light-9: #909090;
  --el-color-primary-dark-2: #303030;
  --el-color-primary-light: rgba(64, 64, 64, 0.1);
}

.dark {
  color-scheme: dark;
}

.dark body {
  background-color: var(--el-bg-color-page);
}

.dark .el-card {
  background-color: #252525 !important;
  border-color: var(--el-border-color) !important;
}

.dark .el-card__body {
  background-color: transparent !important;
  color: var(--el-text-color-primary) !important;
}

.dark .el-menu {
  background-color: #1a1a1a !important;
}

.dark .el-menu-item {
  background-color: transparent !important;
  color: var(--el-text-color-regular) !important;
}

.dark .el-menu-item:hover {
  background-color: var(--el-fill-color-light) !important;
  color: var(--el-text-color-primary) !important;
}

.el-menu-item.is-active {
  background: linear-gradient(135deg, #404040 0%, #2a2a2a 100%) !important;
  color: #ffffff !important;
  font-weight: 700;
}

.dark .el-menu-item.is-active {
  background: linear-gradient(135deg, #505050 0%, #353535 100%) !important;
  color: #ffffff !important;
  font-weight: 700;
}

.dark .el-sub-menu__title {
  color: var(--el-text-color-regular) !important;
  background-color: transparent !important;
}

.dark .el-sub-menu__title:hover {
  background-color: var(--el-fill-color-light) !important;
  color: var(--el-text-color-primary) !important;
}

.dark .el-sub-menu.is-active > .el-sub-menu__title {
  background: linear-gradient(135deg, #505050 0%, #353535 100%) !important;
  color: #ffffff !important;
  font-weight: 700;
}

.dark .el-dropdown-menu {
  background-color: #1a1a1a !important;
  border-color: var(--el-border-color) !important;
}

.dark .el-dropdown-menu__item {
  color: var(--el-text-color-regular) !important;
}

.dark .el-dropdown-menu__item:hover {
  background-color: #252525 !important;
  color: var(--el-text-color-primary) !important;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: var(--el-bg-color-lighter);
}

::-webkit-scrollbar-thumb {
  background-color: var(--el-border-color-light);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--el-border-color);
}

a {
  text-decoration: none;
  transition: color 0.3s ease;
}

button {
  font-family: inherit;
}

input, textarea, select {
  font-family: inherit;
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
