import { useDebugValue, useEffect } from "react";

function StaffCard({ staff, onViewMore }) {

  // useEffect(()=>{
  //   console.log(staff);
  // },[]);

  return (
    <div className="mt-6 ml-4 w-72 bg-white rounded-xl shadow-lg overflow-hidden flex transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-100 flex flex-col items-center py-3">
        <img
          src={staff.photo}
          alt="img"
          className="w-24 h-24 bg-white"
        />
        <h4 className="mt-2 font-semibold text-sm text-gray-700 text-center">
          {staff.name}
        </h4>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-between p-4 text-sm text-gray-700">
        <div className="space-y-1">
          <p><span className="font-medium">Role:</span> {staff.role}</p>
          <p><span className="font-medium">Shift:</span> {staff.shift}</p>
          <p><span className="font-medium">Staff ID:</span> {staff.staffId}</p>
          <p>
            <span className="font-medium">Status:</span>{' '}
            <span className="text-green-600 font-semibold">{staff.status}</span>
          </p>
        </div>

        <button
          className="mt-3 text-xs text-blue-600 hover:underline font-medium self-start"
          onClick={() => onViewMore(staff)}
        >
          View More →
        </button>
      </div>
    </div>
  );
}

export default StaffCard;
