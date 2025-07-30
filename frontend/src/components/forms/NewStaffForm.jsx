import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { customAlphabet } from 'nanoid';

const departmentMap = {
  Doctor: ['General Medicine', 'Surgery', 'Pediatrics', 'Orthopedics'],
  Nurse: ['ICU', 'Ward', 'Emergency', 'OT'],
  Receptionist: ['Front Desk', 'Billing'],
  Pharmacist: ['Pharmacy'],
  Technician: ['Radiology', 'Pathology', 'OT'],
  'Lab Assistant': ['Lab'],
  Admin: ['Administration'],
  Housekeeping: ['Sanitation'],
  Driver: ['Transport'],
  Security: ['Security'],
  Physiotherapist: ['Rehab'],
  Dietitian: ['Nutrition'],
  HR: ['Human Resources'],
  'IT Support': ['IT'],
  Maintenance: ['Maintenance'],
};

const generateStaffId = customAlphabet('0123456789', 8); // 8-digit numeric ID

function NewStaffForm({ setShowNewForm }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    DOB: '',
    specialization: '',
    role: 'Doctor',
    shift: 'Morning',
    status: 'Active',
    department: '',
    salary: '',
    joiningDate: '',
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const roles = Object.keys(departmentMap);
  const shifts = ['Morning', 'Evening', 'Night'];
  const statusList = ['Active', 'On Leave', 'Resigned'];
  const availableDepartments = departmentMap[formData.role] || ['General'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const staffId = generateStaffId();

    const dataToSend = {
      ...formData,
      staffId,
      photo: preview || '',
      dateJoined: formData.joiningDate || new Date(),
    };

    try {
      const res = await axios.post('http://localhost:5000/api/staff', dataToSend);
      alert('Staff member added!');
      setShowNewForm(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-5xl h-[85%] bg-white rounded-xl shadow-2xl border border-blue-400 overflow-y-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold">Add New Staff Member</h3>
        <RxCross2
          className="h-6 w-6 hover:text-red-500 hover:scale-110 transition duration-200 cursor-pointer"
          onClick={() => setShowNewForm(false)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-4">
          {[
            { id: 'name', label: 'Full Name', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'phone', label: 'Phone', type: 'number' },
            { id: 'DOB', label: 'Date of Birth', type: 'date' },
            { id: 'specialization', label: 'Specialization', type: 'text' },
          ].map((field) => (
            <div key={field.id} className="flex items-center gap-4">
              <label htmlFor={field.id} className="text-lg w-40">
                {field.label}:
              </label>
              <input
                id={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={handleChange}
                className="flex-1 h-10 bg-white border border-blue-400 px-3 rounded-md outline-none"
              />
            </div>
          ))}

          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <label htmlFor="image" className="text-lg w-40">
              Upload Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handlePhotoChange}
              className="flex-1 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          {preview && (
            <div className="mt-2 flex justify-start ml-40">
              <img
                src={preview}
                alt="Preview"
                className="h-28 w-28 object-cover rounded-md border shadow"
              />
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Dropdowns */}
          {[
            { id: 'role', label: 'Role', options: roles },
            { id: 'shift', label: 'Shift', options: shifts },
            { id: 'status', label: 'Status', options: statusList },
          ].map((field) => (
            <div key={field.id} className="flex items-center gap-4">
              <label className="text-lg w-28">{field.label}:</label>
              <select
                id={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className="flex-1 h-10 bg-white border border-blue-400 rounded-md px-2 outline-none"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Department */}
          <div className="flex items-center gap-4">
            <label className="text-lg w-28">Department:</label>
            <select
              value={formData.department}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
              className="flex-1 h-10 bg-white border border-blue-400 rounded-md px-2 outline-none"
            >
              <option value="">Select Department</option>
              {availableDepartments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-4">
            <label htmlFor="salary" className="text-lg w-28">
              Salary:
            </label>
            <input
              type="number"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              className="flex-1 h-10 bg-white border border-blue-400 px-3 rounded-md outline-none"
              placeholder="Enter Salary"
            />
          </div>

          {/* Joining Date */}
          <div className="flex items-center gap-4">
            <label htmlFor="joiningDate" className="text-lg w-28">
              Joining Date:
            </label>
            <input
              type="date"
              id="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="flex-1 h-10 bg-white border border-blue-400 px-3 rounded-md outline-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-200 shadow-md"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default NewStaffForm;
