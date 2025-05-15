const CategorySkeleton = () => {
    return (
      <div className="items-center p-4">
        <div className="w-[200px] h-[230px] rounded-[20px] bg-gray-100 flex flex-col items-center justify-center mb-4 animate-pulse">
          <div className="w-[150px] h-[150px] bg-gray-300 rounded-lg mb-2" />
          <div className="w-3/4 h-4 bg-gray-300 rounded" />
        </div>
      </div>
    );
  };
  
export default CategorySkeleton;  