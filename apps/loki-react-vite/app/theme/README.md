# Loki Theme System

這是一個統一的主題管理系統，整合了 Tailwind CSS 和 Material-UI 的 dark mode 功能。

## 架構特色

### 🎯 單一 Provider 設計
- **統一管理**：一個 `ThemeProvider` 處理所有主題相關邏輯
- **簡化架構**：移除了原本分離的 `LokiThemeProvider` 和 `MuiProvider`
- **效能優化**：使用 `useMemo` 和 `useCallback` 避免不必要的重新渲染

### 🌓 完整的 Dark Mode 支援
- **自動偵測**：支援系統偏好設定自動切換
- **持久化**：使用 localStorage 記住使用者選擇
- **即時更新**：DOM class 和 Material-UI 主題同步更新
- **流暢切換**：使用 requestAnimationFrame 確保性能

### 🏗️ 模組化架構
- **職責分離**：每個目錄都有明確的功能定位
- **易於維護**：結構化程度高，便於擴展和修改
- **統一匯出**：通過 `index.ts` 統一管理匯出接口

## 檔案結構

```
theme/
├── config/                   # 配置管理
│   ├── menu.ts              # 選單配置
│   ├── links.ts             # 連結配置
│   ├── meta.ts              # 元資料配置
│   └── index.ts             # 配置統一匯出
├── components/               # UI 元件
│   ├── ThemeToggle.tsx      # 主題切換按鈕
│   ├── Header.tsx           # 頁首元件
│   ├── Footer.tsx           # 頁尾元件
│   ├── AsideMenu.tsx        # 側邊選單元件
│   └── index.ts             # 元件統一匯出
├── context/                  # React Context
│   └── LokiThemeContext.ts  # 主題 Context 定義
├── hooks/                    # 自定義 Hook
│   └── useLokiTheme.ts      # 主題狀態管理 Hook
├── providers/                # Context 提供者
│   └── ThemeProvider.tsx    # 統一的主題提供者
├── Layout/                   # 佈局元件
│   └── index.tsx            # 主要佈局元件
└── index.ts                 # 主題系統統一匯出
```

## 使用方式

### 1. 基本設定

在應用程式根部使用 `ThemeProvider`：

```tsx
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. 使用主題 Hook

在任何元件中使用主題狀態：

```tsx
import { useLokiTheme } from './theme';

function MyComponent() {
  const { isDark, toggleTheme } = useLokiTheme();

  return (
    <div className={isDark ? 'dark-style' : 'light-style'}>
      <button onClick={toggleTheme}>
        {isDark ? '切換到淺色' : '切換到深色'}
      </button>
    </div>
  );
}
```

### 3. 使用佈局系統

使用完整的佈局元件：

```tsx
import { Layout } from './theme';

function App() {
  return (
    <Layout>
      <YourPageContent />
    </Layout>
  );
}
```

### 4. 使用個別 UI 元件

直接使用內建的 UI 元件：

```tsx
import { ThemeToggle, Header, Footer, AsideMenu } from './theme';

function CustomLayout() {
  return (
    <div>
      <Header />
      <main>
        <AsideMenu />
        <div>
          <YourContent />
          <ThemeToggle />
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

### 5. 使用配置系統

存取主題相關配置：

```tsx
import { menuConfig, links, meta } from './theme';

function Navigation() {
  return (
    <nav>
      {menuConfig.map(item => (
        <a key={item.id} href={item.url}>
          {item.title}
        </a>
      ))}
    </nav>
  );
}
```

## 開發者指南

### 新增配置

在 `config/` 目錄下新增配置檔案：

```typescript
// config/newConfig.ts
export const newConfig = {
  // 你的配置內容
};

// config/index.ts
export { newConfig } from './newConfig';
```

### 新增 UI 元件

在 `components/` 目錄下新增元件：

```tsx
// components/NewComponent.tsx
import { useLokiTheme } from '../hooks/useLokiTheme';

export const NewComponent = () => {
  const { isDark } = useLokiTheme();
  
  return (
    <div className={isDark ? 'dark-styles' : 'light-styles'}>
      {/* 元件內容 */}
    </div>
  );
};

// components/index.ts
export { NewComponent } from './NewComponent';
```

### 擴展主題功能

如需新增主題相關功能：

1. **擴展 Context**：在 `LokiThemeContext.ts` 中新增新的狀態
2. **更新 Hook**：在 `useLokiTheme.ts` 中新增對應邏輯
3. **修改 Provider**：在 `ThemeProvider.tsx` 中實作新功能

## 整合說明

### Tailwind CSS
- 自動在 `<html>` 元素上添加/移除 `dark` class
- 可以使用 `dark:` 前綴定義深色模式樣式

### Material-UI
- 自動切換 Material-UI 的 `light`/`dark` mode
- 提供完整的調色盤配置
- 支援 `CssBaseline` 的色彩方案

### React Router
- 整合頁面元資料管理
- 支援動態路由配置
- 提供連結和選單配置

## 主題配置

### 色彩設定
```typescript
// 淺色模式
primary: '#1976d2'    // 藍色
secondary: '#dc004e'  // 粉紅色
background: '#f5f5f5' // 淺灰色

// 深色模式  
primary: '#90caf9'    // 淺藍色
secondary: '#f48fb1'  // 淺粉色
background: '#121212' // 深色
```

### 字體設定
- 主字體：Inter, system-ui, sans-serif
- 標題字重：600
- 內文行高：1.6

## 架構優勢

### 🔧 開發體驗
- **TypeScript 支援**：完整的類型定義
- **熱重載**：開發時即時更新
- **程式碼分割**：按功能模組化載入

### 📦 維護性
- **單一職責**：每個模組專注特定功能
- **易於測試**：清晰的介面邊界  
- **擴展友好**：新增功能不影響現有結構

### ⚡ 性能優化
1. **記憶化計算**：使用 `useMemo` 快取主題物件
2. **回調函數快取**：使用 `useCallback` 避免子元件重新渲染
3. **非阻塞更新**：使用 requestAnimationFrame 更新 DOM
4. **智慧偵測**：只在必要時監聽系統主題變化
5. **按需載入**：元件和配置分離，支援 lazy loading

## 最佳實踐

### 元件開發
```tsx
// ✅ 推薦：使用 Hook 獲取主題狀態
const { isDark, toggleTheme } = useLokiTheme();

// ✅ 推薦：使用條件類別
className={`base-styles ${isDark ? 'dark:text-white' : 'text-black'}`}

// ❌ 避免：直接操作 DOM
document.documentElement.classList.toggle('dark');
```

### 樣式管理
```scss
// ✅ 推薦：使用 Tailwind 的 dark: 變體
.my-component {
  @apply text-gray-900 dark:text-gray-100;
}

// ✅ 推薦：利用 CSS 變數
.my-component {
  color: var(--text-primary);
}
```

### 配置管理
```typescript
// ✅ 推薦：集中管理配置
export const themeConfig = {
  colors: { /* ... */ },
  spacing: { /* ... */ },
} as const;

// ❌ 避免：分散的魔術數字
const spacing = '16px';
```

## 故障排除

### 主題沒有正確切換
- 確認 `ThemeProvider` 包裹在應用程式最外層
- 檢查 Tailwind CSS 是否正確配置 `dark:` 變體

### Material-UI 元件沒有跟隨主題
- 確認元件在 `ThemeProvider` 內部
- 檢查是否有其他 `ThemeProvider` 覆蓋設定

### 佈局元件沒有正確顯示
- 確認已正確匯入對應的元件
- 檢查 CSS 樣式是否正確載入

### 配置無法存取
- 確認配置檔案已正確匯出
- 檢查匯入路徑是否正確

### 首次載入閃爍問題
- 確認 `suppressHydrationWarning={true}` 已設定
- 檢查 localStorage 讀取邏輯

### 性能問題
- 檢查是否過度使用 `useEffect`
- 確認記憶化邏輯是否正確實作
- 使用 React DevTools 檢查不必要的重新渲染

## 測試建議

### 單元測試
```typescript
// 測試主題 Hook
import { renderHook, act } from '@testing-library/react';
import { useLokiTheme } from './hooks/useLokiTheme';

test('應該正確切換主題', () => {
  const { result } = renderHook(() => useLokiTheme());
  
  act(() => {
    result.current.toggleTheme();
  });
  
  expect(result.current.isDark).toBe(true);
});
```

### 整合測試
```typescript
// 測試元件與主題整合
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './providers/ThemeProvider';
import MyComponent from './MyComponent';

test('元件應該根據主題顯示正確樣式', () => {
  render(
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
  
  // 檢查預設淺色主題
  expect(screen.getByTestId('my-component')).toHaveClass('light-mode');
});
```

## 未來擴展

這個架構設計考慮了未來的擴展需求：

- **新增配置類型**：可以在 `config/` 目錄下新增更多配置檔案
- **擴展 UI 元件**：`components/` 目錄支援按功能分組
- **多主題支援**：基礎架構已支援多主題擴展
- **國際化支援**：配置系統可以輕鬆整合 i18n
- **動畫系統**：可擴展主題切換動畫
- **自定義主題**：支援使用者自定義主題色彩

## 版本紀錄

- **v1.0.0** - 初始版本，統一 Tailwind 和 MUI 主題系統
- **v1.1.0** - 重構架構，模組化設計
- **v1.2.0** - 新增配置系統和佈局元件 