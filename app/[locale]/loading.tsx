export default function Loading() {
  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-950">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4 max-w-2xl">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
            <div className="h-10 w-96 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            <div className="h-6 w-80 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-6 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 space-y-3">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
