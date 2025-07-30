import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const departmentMap = {
  Doctor: ["General Medicine", "Surgery", "Pediatrics", "Orthopedics"],
  Nurse: ["ICU", "Ward", "Emergency", "OT"],
  Receptionist: ["Front Desk", "Billing"],
  Pharmacist: ["Pharmacy"],
  Technician: ["Radiology", "Pathology", "OT"],
  "Lab Assistant": ["Lab"],
  Admin: ["Administration"],
  Housekeeping: ["Sanitation"],
  Driver: ["Transport"],
  Security: ["Security"],
  Physiotherapist: ["Rehab"],
  Dietitian: ["Nutrition"],
  HR: ["Human Resources"],
  "IT Support": ["IT"],
  Maintenance: ["Maintenance"]
};

function StaffDetailForm({ staffData, setShowEditForm, onSave }) {
  const [photo, setPhoto] = useState(staffData.photo || "");
  const [role, setRole] = useState(staffData.role || "Doctor");
  const [shift, setShift] = useState(staffData.shift || "Morning");
  const [status, setStatus] = useState(staffData.status || "Active");
  const [department, setDepartment] = useState(staffData.department || "");
  const [salary, setSalary] = useState(staffData.salary || 0);
  const [joiningDate, setJoiningDate] = useState(staffData.dateJoined ? staffData.dateJoined.slice(0, 10) : "");
  const [isEdit, setIsEdit] = useState(false);

  const [fullName, setFullName] = useState(staffData.name || "");
  const [email, setEmail] = useState(staffData.email || "");
  const [phone, setPhone] = useState(staffData.phone || "");
  const [dob, setDob] = useState(staffData.DOB ? staffData.DOB.slice(0, 10) : "");
  const [specialization, setSpecialization] = useState(staffData.specialization || "");

  const roles = Object.keys(departmentMap);
  const shifts = ["Morning", "Evening", "Night"];
  const statusList = ["Active", "On Leave", "Resigned"];
  const availableDepartments = departmentMap[role] || ["General"];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); 
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedStaff = {
        name: fullName,
        email,
        phone,
        DOB: dob,
        specialization,
        role,
        shift,
        status,
        department,
        salary,
        dateJoined: joiningDate,
        photo 
      };

      const res = await axios.put(`http://localhost:5000/api/staff/${staffData.staffId}`, updatedStaff);
      console.log("Updated Successfully:", res.data);
      alert("Staff details updated successfully!");
      setIsEdit(false);
      setShowEditForm(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update staff details.");
    }
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-5xl h-[80%] bg-gray-100 rounded-xl shadow-2xl border border-blue-400 overflow-y-auto p-6">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold">Staff ID: {staffData.staffId}</h3>
        <RxCross2
          className="h-6 w-6 hover:text-red-500 hover:scale-110 transition duration-200 cursor-pointer"
          onClick={() => setShowEditForm(false)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="image" className="text-lg w-40">Upload Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={!isEdit}
              className="flex-1 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          {photo && (
            <div className="mt-2 flex justify-start ml-40">
              <img src={photo} alt="Preview" className="h-28 w-28 object-cover rounded-md border shadow" />
            </div>
          )}

          {[
            { id: "fullname", label: "Full Name", type: "text", value: fullName, setter: setFullName },
            { id: "email", label: "Email", type: "email", value: email, setter: setEmail },
            { id: "phone", label: "Phone", type: "number", value: phone, setter: setPhone },
            { id: "dob", label: "Date of Birth", type: "date", value: dob, setter: setDob },
            { id: "specialization", label: "Specialization", type: "text", value: specialization, setter: setSpecialization }
          ].map(({ id, label, type, value, setter }) => (
            <div key={id} className="flex items-center gap-4">
              <label htmlFor={id} className="text-lg w-40">{label}:</label>
              <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                disabled={!isEdit}
                placeholder={`Enter ${label}`}
                className="flex-1 h-10 bg-white border border-blue-400 px-3 rounded-md outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {[{ label: "Role", value: role, setter: setRole, options: roles },
            { label: "Shift", value: shift, setter: setShift, options: shifts },
            { label: "Status", value: status, setter: setStatus, options: statusList }
          ].map(({ label, value, setter, options }) => (
            <div key={label} className="flex items-center gap-4">
              <label className="text-lg w-28">{label}:</label>
              <select
                className="flex-1 h-10 bg-white border border-blue-400 rounded-md px-2 outline-none"
                value={value}
                onChange={(e) => setter(e.target.value)}
                disabled={!isEdit}
              >
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex items-center gap-4">
            <label className="text-lg w-28">Department:</label>
            <select
              className="flex-1 h-10 bg-white border border-blue-400 rounded-md px-2 outline-none"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={!isEdit}
            >
              <option value="">Select Department</option>
              {availableDepartments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="salary" className="text-lg w-28">Salary:</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter Salary"
              disabled={!isEdit}
              className="flex-1 h-10 bg-white border border-blue-400 px-3 rounded-md outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="joiningDate" className="text-lg w-28">Joining Date:</label>
            <input
              type="date"
              id="joiningDate"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              disabled={!isEdit}
              className="flex-1 h-10 bg-white border border-blue-400 px-3 rounded-md outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={handleUpdate}
          disabled={!isEdit}
          className={`px-6 py-2 rounded-lg shadow-md text-white transition-transform duration-200 ${
            isEdit
              ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => setIsEdit(!isEdit)}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-200 shadow-md"
        >
          {isEdit ? 'Lock' : 'Edit'}
        </button>

        <button
            type="button"
            onClick={async () => {
            const confirm = window.confirm("Are you sure you want to delete this staff member?");
            if (!confirm) return;

            try {
                await axios.delete(`http://localhost:5000/api/staff/${staffData.staffId}`);
                alert("Staff deleted successfully!");
                setShowEditForm(false);
            } catch (err) {
                console.error("Delete error:", err);
                alert("Failed to delete staff.");
            }
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-transform duration-200 shadow-md"
        >
                Delete
        </button>
        </div>
    </div>
  );
}

export default StaffDetailForm;
