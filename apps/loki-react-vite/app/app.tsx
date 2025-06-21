export function App() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 loki">
        <span className="block text-yellow-300 text-2xl font-normal mb-2">
          Hello there,
        </span>
        Welcome loki-react-vite 👋
      </h1>
      <div className="mt-6 p-4 bg-white/20 rounded-md backdrop-blur-sm">
        <p className="text-lg">
          🎉 如果你看到漂亮的漸層背景和樣式，Tailwind v4 就成功運作了！
        </p>
        <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
          測試按鈕
        </button>
      </div>
    </div>
  );
}

export default App;
