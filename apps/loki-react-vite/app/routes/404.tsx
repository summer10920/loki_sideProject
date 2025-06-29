import { useLocation } from 'react-router';

export default function NotFoundComponent() {
  const location = useLocation();
  
  // 如果是 DevTools 或其他系統請求，返回空內容
  if (location.pathname.includes('.well-known') || 
      location.pathname.includes('chrome-extension') ||
      location.pathname.includes('devtools')) {
    return null;
  }

  // 對於真正的 404 頁面，顯示友好的錯誤訊息
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        404
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        抱歉，找不到您要的頁面：{location.pathname}
      </p>
      <a 
        href="/" 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        回到首頁
      </a>
    </div>
  );
} 