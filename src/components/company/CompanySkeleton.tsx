const CompanySkeleton = () => {
    return (
      <div className="w-[200px] min-w-[200px] h-[250px] bg-white shadow rounded-[20px] flex flex-col items-center justify-center p-4 animate-pulse">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-full mb-4" />
        <div className="w-[80%] h-4 bg-gray-200 rounded mb-2" />
        <div className="w-[60%] h-3 bg-gray-100 rounded mb-1" />
        <div className="w-[40%] h-3 bg-gray-100 rounded" />
      </div>
    );
  };
  
  export default CompanySkeleton;
  