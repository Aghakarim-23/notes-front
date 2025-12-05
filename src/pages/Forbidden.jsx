const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 to-red-200">
      <div className="bg-white p-16 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-8xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Forbidden</h2>
        <p className="text-gray-700">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
