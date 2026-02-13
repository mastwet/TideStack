<template>
  <div class="about-container">
    <el-page-header @back="goBack" title="返回首页">
      <template #content>
        <span class="page-title">关于本站</span>
      </template>
    </el-page-header>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="never" class="about-card">
          <template #header>
            <div class="card-header">
              <el-icon><InfoFilled /></el-icon>
              <span>关于网站</span>
            </div>
          </template>
          <div class="card-content">
            <p class="description">有一段时间我发现我的收藏夹越来越多，很难找到某个不常用的网站。所以就有了这个网站，这里收集的基本都是我自己浏览器收藏夹里的网站，我平时用的相对比较多的一些都在这里。</p>
            <p class="description">如果你也是设计师，如果你也正好喜欢设计，那希望这个网站能给你带来一些作用。</p>
            <el-tag type="info" size="large" class="qq-tag">
              <el-icon><ChatLineSquare /></el-icon>
              QQ群交流：304584722
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="author-section">
      <el-col :xs="24" :sm="8" :md="8">
        <el-card shadow="hover" class="author-card" @click="openViggo">
          <div class="author-info">
            <el-avatar :size="80" :src="authorImg" />
            <h3 class="author-name">Designer. mastwet.</h3>
            <p class="author-desc">Full-time UI designer with an enduring interest in Coding.</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16">
        <el-card shadow="never" class="project-card">
          <template #header>
            <div class="card-header">
              <el-icon><Promotion /></el-icon>
              <span>关于站长</span>
            </div>
          </template>
          <div class="card-content">
            <p class="description">
              这是一个公益项目，而且是
              <el-link href="https://github.com/WebStackPage/WebStackPage.github.io" target="_blank" type="primary">开源</el-link>
              的。你也可以拿来制作自己的网址导航。              如果你有更好的想法，可以通过 GitHub
              <el-link href="https://github.com/mastwet" target="_blank" type="primary">github.com/mastwet</el-link>
              中的联系方式找到我，欢迎与我交流分享。
            </p>
            <div class="github-link">
              <el-link href="https://github.com/mastwet/TideStack" target="_blank" type="primary" :icon="Promotion">
                GitHub 主页
              </el-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="project-section">
      <el-col :span="24">
        <el-card shadow="never" class="project-card">
          <template #header>
            <div class="card-header">
              <el-icon><Coin /></el-icon>
              <span>项目信息</span>
            </div>
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="项目名称">WebStack-vue3 (TideStack)</el-descriptions-item>
            <el-descriptions-item label="技术栈">Vue 3 + Vite + Element-Plus</el-descriptions-item>
            <el-descriptions-item label="开源协议">
              <el-tag type="success">MIT License</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="GitHub">
              <el-link href="https://github.com/mastwet/TideStack" target="_blank" type="primary">
                mastwet/TideStack
              </el-link>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { InfoFilled, ChatLineSquare, Promotion, Coin } from '@element-plus/icons-vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const authorImg = ref('./assets/images/logos/mastwet.png')

function goBack() {
  router.push('/')
}

function openViggo() {
  window.open('https://github.com/mastwet', '_blank')
}
</script>

<style scoped>
.about-container {
  padding: 32px 24px;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
  background-color: var(--el-bg-color-page);
}

:global(.dark) .about-container {
  background-color: #0a0a0a !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.3px;
}

.about-card,
.author-card,
.project-card {
  margin-bottom: 24px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--el-border-color);
  background-color: var(--el-bg-color);
}

:global(.dark) .about-card,
:global(.dark) .author-card,
:global(.dark) .project-card {
  background-color: #1a1a1a !important;
}

.about-card:hover,
.project-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--el-border-color);
  background: linear-gradient(90deg, var(--el-fill-color-light) 0%, transparent 100%);
  border-radius: 8px 8px 0 0;
  margin: -20px -20px 16px -20px;
  padding: 16px 20px;
}

:global(.dark) .card-header {
  color: #ffffff;
  background: linear-gradient(90deg, #252525 0%, transparent 100%);
}

.card-content {
  line-height: 1.8;
}

.description {
  color: var(--el-text-color-regular);
  margin-bottom: 16px;
  font-size: 15px;
  line-height: 1.8;
  letter-spacing: 0.3px;
}

:global(.dark) .description {
  color: #e8e8e8;
}

.qq-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(135deg, #606060 0%, #404040 100%);
  color: #ffffff;
}

.author-section,
.project-section {
  margin-top: 32px;
}

.author-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  background: linear-gradient(135deg, var(--el-bg-color) 0%, var(--el-bg-color-light) 100%);
}

.author-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: var(--el-border-color);
}

.author-info {
  text-align: center;
  padding: 20px;
}

.author-name {
  margin: 16px 0 8px;
  font-size: 18px;
  color: var(--el-text-color-primary);
  font-weight: 700;
  letter-spacing: 0.3px;
}

:global(.dark) .author-name {
  color: #ffffff;
}

.author-desc {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
  letter-spacing: 0.2px;
}

:global(.dark) .author-desc {
  color: #c0c0c0;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  letter-spacing: 0.3px;
}

:global(.dark) .page-title {
  color: #ffffff;
}

.author-desc {
  color: #c0c0c0;
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
  letter-spacing: 0.2px;
}

.github-link {
  margin-top: 24px;
}

.github-link :deep(.el-link) {
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  background: linear-gradient(135deg, #606060 0%, #404040 100%);
  color: #ffffff;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.github-link :deep(.el-link:hover) {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

:deep(.el-descriptions__label) {
  font-weight: 600;
  background-color: var(--el-fill-color-light);
}

:deep(.el-descriptions__body) {
  font-size: 15px;
}

:deep(.el-descriptions__label) {
  background-color: #252525 !important;
  color: var(--el-text-color-regular);
}

:deep(.el-descriptions__body) {
  background-color: #1a1a1a !important;
  color: var(--el-text-color-primary);
}

:deep(.el-descriptions__cell) {
  border-color: var(--el-border-color) !important;
}

:deep(.el-descriptions) {
  background-color: #1a1a1a !important;
}

:deep(.el-page-header) {
  background-color: transparent !important;
}

:deep(.el-page-header__content) {
  background-color: transparent !important;
}

:deep(.el-page-header__title) {
  color: var(--el-text-color-primary) !important;
}

:deep(.el-page-header__back) {
  color: var(--el-text-color-primary) !important;
}

:deep(.el-page-header__back:hover) {
  color: var(--el-text-color-regular) !important;
}

@media (max-width: 768px) {
  .about-container {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 18px;
  }

  .about-card,
  .author-card,
  .project-card {
    margin-bottom: 16px;
    border-radius: 8px;
  }

  .card-header {
    font-size: 16px;
    padding: 12px 16px;
  }

  .description {
    font-size: 14px;
  }

  .qq-tag {
    padding: 12px 20px;
    font-size: 14px;
  }

  .author-section,
  .project-section {
    margin-top: 24px;
  }

  .author-name {
    font-size: 18px;
  }
}
</style>
