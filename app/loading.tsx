export default function Loading() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Profile Header Skeleton */}
        <div className="text-center mb-10 pt-4 flex flex-col items-center">
          <div className="w-32 h-6 bg-gray-200 rounded-full animate-pulse mb-4"></div>
          <div className="w-64 md:w-96 h-10 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
          <div className="w-48 h-5 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Project Feed Skeletons (We render 3 dummy cards) */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center"
            >
              {/* Thumbnail Skeleton */}
              <div className="w-full sm:w-40 h-40 sm:h-28 flex-shrink-0 bg-gray-200 rounded-xl animate-pulse"></div>

              {/* Card Content Skeleton */}
              <div className="flex-grow w-full space-y-3">
                <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}