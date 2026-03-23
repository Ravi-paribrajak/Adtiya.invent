export default function Loading() {
  return (
    <main className="min-h-screen p-4 md:p-8 pt-32 overflow-x-hidden">
      {/* Upgraded Container to match the new Desktop layout */}
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Hero Header Skeleton */}
        <div className="text-center mb-20 flex flex-col items-center">
          {/* Status Pill */}
          <div className="w-48 h-8 bg-blue-100/50 dark:bg-blue-900/20 rounded-full animate-pulse mb-6 border border-blue-200/50 dark:border-blue-800/50"></div>
          {/* Main Title (Two lines for desktop) */}
          <div className="w-3/4 max-w-2xl h-12 md:h-20 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl animate-pulse mb-6"></div>
          {/* Subtitle */}
          <div className="w-2/3 max-w-xl h-6 bg-gray-200/60 dark:bg-gray-800/60 rounded-lg animate-pulse"></div>
        </div>

        {/* 2. S-Tier Hero Card Skeleton */}
        <div className="mb-24">
          <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2rem] p-4 md:p-6 shadow-sm border border-white/50 dark:border-gray-700/50 flex flex-col md:flex-row gap-8 items-center">
            
            {/* Huge Desktop Thumbnail Placeholder */}
            <div className="w-full md:w-[55%] aspect-video flex-shrink-0 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl animate-pulse"></div>

            {/* Hero Content Placeholder */}
            <div className="flex-grow w-full flex flex-col justify-center py-6 md:pr-8 space-y-5">
              <div className="w-full h-10 md:h-12 bg-gray-200/60 dark:bg-gray-800/60 rounded-xl animate-pulse"></div>
              <div className="w-4/5 h-10 md:h-12 bg-gray-200/60 dark:bg-gray-800/60 rounded-xl animate-pulse mb-4"></div>
              
              <div className="w-full h-5 bg-gray-200/60 dark:bg-gray-800/60 rounded-md animate-pulse"></div>
              <div className="w-3/4 h-5 bg-gray-200/60 dark:bg-gray-800/60 rounded-md animate-pulse"></div>
              
              <div className="flex items-center justify-between mt-8 pt-4">
                <div className="w-32 h-6 bg-gray-200/60 dark:bg-gray-800/60 rounded-md animate-pulse"></div>
                <div className="w-40 h-12 bg-gray-200/60 dark:bg-gray-800/60 rounded-full animate-pulse"></div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Bento Grid & Command Center Skeleton */}
        <div className="mb-20">
          
          {/* Command Center Title & Filter Placeholder */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-48 h-8 bg-gray-200/60 dark:bg-gray-800/60 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200/60 dark:bg-gray-800/60 rounded-full animate-pulse hidden sm:block"></div>
          </div>
          
          <div className="w-full h-20 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-800/50 mb-10 animate-pulse"></div>

          {/* Grid Layout (Renders 6 dummy cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[1.5rem] p-5 shadow-sm border border-white/50 dark:border-gray-700/50 flex flex-col h-full"
              >
                {/* Thumbnail Skeleton */}
                <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-200/60 dark:bg-gray-800/60 animate-pulse mb-5"></div>

                {/* Card Content Skeleton */}
                <div className="flex flex-col flex-grow space-y-3">
                  <div className="w-full h-6 bg-gray-200/60 dark:bg-gray-800/60 rounded-md animate-pulse"></div>
                  <div className="w-2/3 h-6 bg-gray-200/60 dark:bg-gray-800/60 rounded-md animate-pulse"></div>
                  
                  <div className="flex items-center justify-between mt-auto pt-6">
                    <div className="w-24 h-4 bg-gray-200/60 dark:bg-gray-800/60 rounded-md animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-200/60 dark:bg-gray-800/60 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}