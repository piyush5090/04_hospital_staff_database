import React, { useState, useEffect } from 'react';
import StaffCard from '../cards/StaffCard';
import NewStaffForm from '../forms/NewStaffForm';
import StaffDetailForm from '../forms/StaffDetailsForm';
import axios from 'axios';

function Home() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [shift, setShift] = useState("All");
  const [status, setStatus] = useState("All");

  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [staffList, setStaffList] = useState([]);

  const roles = ["All", "Doctor", "Nurse", "Receptionist", "Pharmacist", "Technician", "Lab Assistant", "Admin", "Housekeeping", "Driver", "Security", "Physiotherapist", "Dietitian", "HR", "IT Support", "Maintenance"];
  const shifts = ['All', "Morning", "Evening", "Night"];
  const statusList = ['All', "Active", "On Leave", "Resigned"];

  const handleViewMore = (staff) => {
    setSelectedStaff(staff);
    setShowEditForm(true);
    setShowNewForm(false);
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/staff",{
          headers:{
            "x-api-key" : localStorage.getItem("PASSKEY"),
          }
        });
        setStaffList(res.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchStaff();
  }, [showEditForm, showNewForm]);

  const filteredStaff = staffList.filter((staff) => {
    const nameMatch = staff.name?.toLowerCase().includes(query.toLowerCase());
    const roleMatch = role === "All" || staff.role === role;
    const shiftMatch = shift === "All" || staff.shift === shift;
    const statusMatch = status === "All" || staff.status === status;
    return nameMatch && roleMatch && shiftMatch && statusMatch;
  });

  return (
    <div className='min-h-screen h-full w-full px-8 gap-4 my-4'>
      {showNewForm && (
        <NewStaffForm setShowNewForm={setShowNewForm} />
      )}

      {showEditForm && selectedStaff && (
        <StaffDetailForm
          staffData={selectedStaff}
          setShowEditForm={setShowEditForm  }
          onSave={(updatedData) => {
            console.log("Updated staff:", updatedData);
            setShowEditForm(false);
          }}
        />
      )}

      {/* Top Filter + Add */}
      <div className='h-[60px] gap-2 flex w-full bg-gray-400 rounded px-[10px] py-[10px]'>
        <input
          type='text'
          className='h-[40px] w-1/2 bg-gray-100 rounded-md outline-none px-2'
          placeholder='Search for staff members'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className='h-full flex w-1/2 bg-gray-400 justify-between'>
          <div className='flex gap-2'>
            <select className='h-full bg-gray-200 rounded-md px-[2px]' value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((role) => <option key={role}>{role}</option>)}
            </select>

            <select className='h-full bg-gray-200 rounded-md px-[2px]' value={shift} onChange={(e) => setShift(e.target.value)}>
              {shifts.map((shift) => <option key={shift}>{shift}</option>)}
            </select>

            <select className='h-full bg-gray-200 rounded-md px-[2px]' value={status} onChange={(e) => setStatus(e.target.value)}>
              {statusList.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>

          <button className='h-full bg-blue-500 text-white px-3 rounded-xl z-10' onClick={() => {
            setShowNewForm(true);
            setShowEditForm(false);
          }}>
            Add new +
          </button>
        </div>
      </div>

      {/* Staff cards */}
      <div className="flex flex-wrap">
        {filteredStaff.map((staff, index) => (
          <StaffCard key={index} staff={staff} onViewMore={handleViewMore} />
        ))}
      </div>
    </div>
  );
}

export default Home;
