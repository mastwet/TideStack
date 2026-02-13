<template>
  <el-footer>
    <div class="footer-content">
      <span>&copy; 2017-2019 <el-link href="#" type="primary">WebStack</el-link> design by <el-link href="https://github.com/mastwet" target="_blank" type="primary">mastwet</el-link></span>
      <el-button type="primary" :icon="ArrowUp" circle @click="scrollToTop" />
    </div>
  </el-footer>
</template>

<script setup>
import { ArrowUp } from '@element-plus/icons-vue'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.el-footer {
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px;
  margin-top: 32px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.footer-content span {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  font-weight: 500;
}

:global(.dark) .footer-content span {
  color: #c0c0c0;
}

:deep(.el-button--circle) {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #606060 0%, #404040 100%);
  border: none;
  color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:deep(.el-button--circle:hover) {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

:deep(.el-button--circle:active) {
  transform: translateY(-2px) scale(0.95);
}

@media (max-width: 768px) {
  .el-footer {
    padding: 16px;
    flex-direction: column;
    gap: 12px;
  }

  .footer-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>
