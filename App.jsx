import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  GraduationCap, Users, UserCheck, BookOpen, Calendar, 
  Plus, Trash2, LayoutDashboard, Check, X 
} from 'lucide-react';

export default function SchoolManagementSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Local States
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', roll_no: '', grade: '', parent_phone: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', phone: '' });

  // Fetch data from Supabase if configured
  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase.from('students').select('*');
    if (!error && data) setStudents(data);
  };

  const fetchTeachers = async () => {
    const { data, error } = await supabase.from('teachers').select('*');
    if (!error && data) setTeachers(data);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.grade) return;
    
    // Save to Supabase
    const { data, error } = await supabase.from('students').insert([newStudent]).select();
    if (!error && data) {
      setStudents([...students, data[0]]);
    } else {
      // Local fallback for UI test
      setStudents([...students, { ...newStudent, id: Date.now().toString() }]);
    }
    setNewStudent({ name: '', roll_no: '', grade: '', parent_phone: '' });
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.subject) return;

    // Save to Supabase
    const { data, error } = await supabase.from('teachers').insert([newTeacher]).select();
    if (!error && data) {
      setTeachers([...teachers, data[0]]);
    } else {
      // Local fallback
      setTeachers([...teachers, { ...newTeacher, id: Date.now().toString() }]);
    }
    setNewTeacher({ name: '', subject: '', phone: '' });
  };

  const handleDeleteStudent = async (id) => {
    await supabase.from('students').delete().eq('id', id);
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <div className="w-64 bg-indigo-950 text-white flex flex-col justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold text-indigo-400 mb-8 flex items-center gap-2">
            <GraduationCap size={28} /> SmartSchool
          </h1>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-indigo-600' : 'hover:bg-indigo-900'}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'students' ? 'bg-indigo-600' : 'hover:bg-indigo-900'}`}
            >
              <GraduationCap size={20} /> Students
            </button>
            <button 
              onClick={() => setActiveTab('teachers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'teachers' ? 'bg-indigo-600' : 'hover:bg-indigo-900'}`}
            >
              <Users size={20} /> Teachers
            </button>
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-8">

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">विद्यालय विवरण (Dashboard)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                <p className="text-gray-500 text-sm">कुल विद्यार्थी (Students)</p>
                <h3 className="text-3xl font-bold">{students.length} जना</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
                <p className="text-gray-500 text-sm">शिक्षक (Teachers)</p>
                <h3 className="text-3xl font-bold">{teachers.length} जना</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
                <p className="text-gray-500 text-sm">कक्षाहरू (Classes)</p>
                <h3 className="text-3xl font-bold">1 - 10</h3>
              </div>
            </div>
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">विद्यार्थी व्यवस्थापन (Students)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">नयाँ विद्यार्थी थप्नुहोस्</h3>
                <form onSubmit={handleAddStudent} className="space-y-4">
                  <input 
                    type="text" placeholder="विद्यार्थीको नाम" required 
                    value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full p-2 border rounded-lg" 
                  />
                  <input 
                    type="text" placeholder="Roll No." required 
                    value={newStudent.roll_no} onChange={(e) => setNewStudent({...newStudent, roll_no: e.target.value})}
                    className="w-full p-2 border rounded-lg" 
                  />
                  <input 
                    type="text" placeholder="कक्षा (Grade)" required 
                    value={newStudent.grade} onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                    className="w-full p-2 border rounded-lg" 
                  />
                  <input 
                    type="text" placeholder="अभिभावकको फोन" 
                    value={newStudent.parent_phone} onChange={(e) => setNewStudent({...newStudent, parent_phone: e.target.value})}
                    className="w-full p-2 border rounded-lg" 
                  />
                  <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700">
                    विद्यार्थी सेभ गर्नुहोस्
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">विद्यार्थीहरूको सूची</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-semibold text-gray-600">
                      <th className="p-3">Roll No</th>
                      <th className="p-3">नाम</th>
                      <th className="p-3">कक्षा</th>
                      <th className="p-3">सम्पर्क</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((st) => (
                      <tr key={st.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-semibold">{st.roll_no}</td>
                        <td className="p-3 font-medium">{st.name}</td>
                        <td className="p-3">{st.grade}</td>
                        <td className="p-3 text-sm text-gray-500">{st.parent_phone}</td>
                        <td className="p-3">
                          <button onClick={() => handleDeleteStudent(st.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TEACHERS TAB */}
        {activeTab === 'teachers' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">शिक्षक व्यवस्थापन (Teachers)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">नयाँ शिक्षक थप्नुहोस्</h3>
                <form onSubmit={handleAddTeacher} className="space-y-4">
                  <input 
                    type="text" placeholder="शिक्षकको नाम" required 
                    value={newTeacher.name} onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                    className="w-full p-2 border rounded-lg" 
                  />
                  <input 
                    type="text" placeholder="पढाउने विषय (Subject)" required 
                    value={newTeacher.subject} onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                    className="w-full p-2 border rounded-lg" 
                  />
                  <input 
                    type="text" placeholder="फोन नम्बर" 
                    value={newTeacher.phone} onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                    className="w-full p-2 border rounded-lg" 
                  />
                  <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700">
                    शिक्षक सेभ गर्नुहोस्
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">शिक्षक विवरण सूची</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-semibold text-gray-600">
                      <th className="p-3">नाम</th>
                      <th className="p-3">विषय</th>
                      <th className="p-3">फोन</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((tc) => (
                      <tr key={tc.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{tc.name}</td>
                        <td className="p-3">{tc.subject}</td>
                        <td className="p-3 text-sm text-gray-500">{tc.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
