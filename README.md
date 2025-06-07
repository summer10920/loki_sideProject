# LokiSideProject

本專案採用 [Nx](https://nx.dev) monorepo 架構，方便管理多個前端應用程式。主要包含兩個 app：`loki_angular` 及 `loki_devextreme`。

---

## Nx 版本與設定

- **Nx 版本**：21.1.2
- **專案管理**：Nx 統一管理多個 app 與函式庫，提升大型專案的維護與協作效率。
- **主要設定檔**：
  - `nx.json`：Nx 全域設定
  - `project.json`：各 app 的任務與細部設定
  - `package.json`：npm 套件管理

---

## 如何啟動與建置各 app

### loki_angular

- 啟動開發伺服器：
  ```sh
  npx nx serve loki_angular
  ```
  > 預設 http://localhost:4200/

- 建置（部屬用產出）：
  ```sh
  npx nx build loki_angular
  ```
  > 產出於 `dist/apps/loki_angular`，預設 production 模式

---

### loki_devextreme

- 啟動開發伺服器：
  ```sh
  npx nx serve loki_devextreme
  ```

- 建置（部屬用產出）：
  ```sh
  npx nx build loki_devextreme
  ```
  > 產出於 `dist/apps/loki_devextreme`

---

## 其他常用 Nx 指令

- 查看所有可用任務（targets）：
  ```sh
  npx nx show project loki_angular
  npx nx show project loki_devextreme
  ```
- 稽核程式碼格式：
  ```sh
  npx nx lint loki_angular
  npx nx lint loki_devextreme
  ```
- 產生依賴圖：
  ```sh
  npx nx graph
  ```

---

## 專案目錄結構簡介

- `apps/loki_angular/`：主 Angular + Tailwind 應用
- `apps/loki_devextreme/`：另一個 app，支援更多 targets
- `libs/`：可共用的函式庫（如有）
- 其他 Nx 設定檔與工具

---

## 參考資源

- [Nx 官方文件](https://nx.dev)
- [Angular 官方文件](https://angular.io/)
- [Tailwind CSS 文件](https://tailwindcss.com/)

---

如需更進階的部屬教學（如 Docker、雲端平台），歡迎再詢問！
