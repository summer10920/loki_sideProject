# Loki Side Project

本專案採用 [Nx](https://nx.dev) monorepo 架構，方便管理多個前端應用程式。主要包含兩個現代化應用：`loki-angular` (Angular 19) 及 `loki-react` (React 19)。

---

## 🚀 技術堆疊

### 核心工具
- **Nx 版本**：21.1.3
- **Node.js**：20+ (建議)
- **TypeScript**：5.7.2
- **包管理工具**：npm

### 應用程式框架
- **loki-angular**：Angular 19.2.14 + Tailwind CSS
- **loki-react**：React 19.0.0 + Vite + Tailwind CSS

### 開發工具
- **建構工具**：Angular CLI (Angular) / Vite (React)
- **測試框架**：Vitest
- **程式碼規範**：ESLint + Prettier
- **樣式**：SCSS + Tailwind CSS

---

## 📁 專案結構

```
loki_sideProject/
├── apps/
│   ├── loki-angular/          # Angular 19 應用
│   └── loki-react/            # React 19 應用
├── nx.json                    # Nx 工作空間配置
├── package.json               # 依賴管理
├── tsconfig.base.json         # TypeScript 基礎配置
└── vitest.workspace.ts        # Vitest 工作空間配置
```

---

## 🛠️ 開發指令

### loki-angular (Angular 19)

```bash
# 啟動開發伺服器
npx nx serve loki-angular
# 🌐 http://localhost:4200

# 建構生產版本
npx nx build loki-angular
# 📁 輸出：dist/apps/loki-angular

# 執行測試
npx nx test loki-angular

# 程式碼檢查
npx nx lint loki-angular
```

### loki-react (React 19)

```bash
# 啟動開發伺服器
npx nx serve loki-react
# 🌐 http://localhost:4200 (自動選擇可用 port)

# 建構生產版本
npx nx build loki-react
# 📁 輸出：dist/loki-react

# 執行測試 (Vitest)
npx nx test loki-react

# 程式碼檢查
npx nx lint loki-react
```

---

## 🔍 Nx 工作空間管理

### 查看專案資訊
```bash
# 列出所有專案
npx nx show projects

# 查看特定專案詳細資訊
npx nx show project loki-angular
npx nx show project loki-react

# 查看專案依賴圖
npx nx graph
```

### 批次操作
```bash
# 建構所有專案
npx nx run-many -t build

# 檢查所有專案程式碼
npx nx run-many -t lint

# 執行所有測試
npx nx run-many -t test
```

### 受影響專案操作
```bash
# 只建構受變更影響的專案
npx nx affected -t build

# 只測試受變更影響的專案
npx nx affected -t test
```

---

## 🚀 快速開始

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **啟動 Angular 應用**
   ```bash
   npx nx serve loki-angular
   ```

3. **啟動 React 應用**（新視窗）
   ```bash
   npx nx serve loki-react
   ```

4. **查看專案依賴關係**
   ```bash
   npx nx graph
   ```

---

## 🎯 專案特色

### Angular 應用 (loki-angular)
- ✅ Angular 19 最新版本
- ✅ Standalone Components 架構
- ✅ Angular Material UI
- ✅ NgRx 狀態管理
- ✅ Tailwind CSS + SCSS
- ✅ 現代化 Signals API

### React 應用 (loki-react)
- ✅ React 19 最新版本
- ✅ Vite 高效能建構
- ✅ React Router 路由管理
- ✅ Vitest 現代測試框架
- ✅ Tailwind CSS + SCSS
- ✅ 完整 TypeScript 支援

---

## 🔧 常用 Nx 指令備忘

| 指令 | 用途 |
|------|------|
| `npx nx serve <project>` | 啟動開發伺服器 |
| `npx nx build <project>` | 建構專案 |
| `npx nx test <project>` | 執行測試 |
| `npx nx lint <project>` | 程式碼檢查 |
| `npx nx graph` | 查看依賴圖 |
| `npx nx reset` | 清除快取 |

---

## 📚 參考資源

- [Nx 官方文件](https://nx.dev)
- [Angular 19 文件](https://angular.io/)
- [React 19 文件](https://react.dev/)
- [Vite 文件](https://vitejs.dev/)
- [Tailwind CSS 文件](https://tailwindcss.com/)

---

## 🤝 貢獻指南

1. Fork 此專案
2. 建立功能分支：`git checkout -b feature/new-feature`
3. 提交變更：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 建立 Pull Request

---

**享受現代化的全端開發體驗！** 🎉
