export default function BlogLoading() {
  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-4 max-w-2xl">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
          <div className="h-10 w-72 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        </div>
      </div>

      {/* Category filters */}
      <div className="py-8 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
          ))}
        </div>
      </div>

      {/* Featured post */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden grid lg:grid-cols-2">
            <div className="h-64 lg:h-80 bg-gray-200 dark:bg-gray-800" />
            <div className="p-8 space-y-4">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl mt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-800" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
                <div className="h-5 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
