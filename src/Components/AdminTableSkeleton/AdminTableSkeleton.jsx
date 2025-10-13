const AdminTableSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b border-gray-100">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="py-4 px-4">
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-24 bg-gray-200 rounded-full h-2 animate-pulse"></div>
          <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <div className="w-20 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="w-20 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </td>
    </tr>
  ));
};

export default AdminTableSkeleton;
