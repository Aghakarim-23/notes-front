export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-300 rounded-full animate-spin absolute"></div>

        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
