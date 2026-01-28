import React, { useEffect, useState } from "react";
import { FilePenLine, LoaderCircleIcon, Pencil, Plus, Trash, UploadCloud, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#8836d5", "#d27811", "#d42525", "#027cb9", "#11a849"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResumes, setShowCreateResumes] = useState(false);
  const [showUploadResumes, setShowUploadResumes] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get(`/api/users/resumes`, {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

// CREATE RESUME
  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(`/api/resumes/create`,{ title },
        { headers: { Authorization: token } 
      });
      const resumeId =
        data?.resume?._id ||
        data?.data?._id ||
        data?._id;

      setAllResumes([...allResumes, data.resume || data.data || data]);
      setTitle("");
      setShowCreateResumes(false);

      navigate(`/app/build/${resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

// UPLOAD RESUME  
  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);

      const { data } = await api.post(`/api/ai/upload-resume`,{ title, resumeText },
        { headers: { Authorization: token } }
      );
      const resumeId =
        data?.resume?._id ||
        data?.data?._id ||
        data?._id;

      setTitle("");
      setResume(null);
      setShowUploadResumes(false);
      navigate(`/app/build/${resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

// EDIT RESUME  
  const editTitle = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(`/api/resumes/update`, {
        resumeId: editResumeId,
        resumeData: { title }
      }, { headers: { Authorization: token } });

      const updatedTitle = data.resume?.title || title;

      toast.success(`"${updatedTitle}" updated successfully`);

      setAllResumes(allResumes.map(resume =>
        resume._id === editResumeId ? { ...resume, title: updatedTitle } : resume
      ));
      setTitle('');
      setEditResumeId('');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

// DELETE RESUME  
  const deleteResume = async (resumeId) => {
    const confirm = window.confirm("Hey, you wanna delete this resume?");
    if (!confirm) return;

    try {
      await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      });
      setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            Resume Dashboard
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Create, manage, and refine your resumes in one place
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-600">Quick Actions</p>
            <span className="text-xs text-slate-500">
              {allResumes.length} total resumes
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateResumes(true)}
              className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Plus className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
              <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
                Create Resume
              </p>
            </button>

            <button
              onClick={() => setShowUploadResumes(true)}
              className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <UploadCloud className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
              <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
                Upload Existing
              </p>
            </button>
          </div>
        </div>

        <hr className="border-slate-300 my-8 sm:w-[305px]" />

        {/* Resume Section */}
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-600 mb-3">Your Resumes</p>

          {allResumes.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              No resumes yet — start by creating your first one ✨
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
              {allResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length];
                return (
                  <button
                    key={resume._id}
                    onClick={() => navigate(`/app/build/${resume._id}`)}
                    className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                      borderColor: baseColor + "40",
                    }}
                  >
                    <FilePenLine
                      className="size-7 group-hover:scale-105 transition-all"
                      style={{ color: baseColor }}
                    />

                    <p
                      className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                      style={{ color: baseColor }}
                    >
                      {resume.title}
                    </p>

                    <p
                      className="absolute bottom-1 text-[11px] transition-all duration-300 px-2 text-center"
                      style={{ color: baseColor + "90" }}
                    >
                      Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-1 right-1 group-hover:flex items-center hidden"
                    >
                      <Trash
                        onClick={() => deleteResume(resume._id)}
                        className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                      />
                      <Pencil
                        onClick={() => {
                          setEditResumeId(resume._id);
                          setTitle(resume.title);
                        }}
                        className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Create Resume Modal */}
        {showCreateResumes && (
          <div
            onClick={() => setShowCreateResumes(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create Your Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter title for resume"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 transition-colors">
                Build Resume
              </button>
              <X
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResumes(false);
                  setTitle("");
                }}
              />
            </form>
          </div>
        )}

        {/* Upload Resume Modal */}
        {showUploadResumes && (
          <div
            onClick={() => setShowUploadResumes(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter title for resume"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />

              <label htmlFor="resume-input" className="block text-sm text-slate-700">
                Select Resume
                <div className="flex flex-col items-center justify-center gap-2 border text-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-indigo-500 hover:text-indigo-700 cursor-pointer transition-colors">
                  {resume ? (
                    <p className="text-indigo-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-14 stroke-1" />
                      <p>Upload Resume</p>
                    </>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="resume-input"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded 
              hover:bg-indigo-800 transition-colors">
                {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white"/>}
                {isLoading ? 'Uploading...' : 'Upload Resume'}
                
              </button>

              <X
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResumes(false);
                  setTitle("");
                }}
              />
            </form>
          </div>
        )}

        {/* Edit Resume Modal */}
        {editResumeId && (
          <div
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <form
              onSubmit={editTitle}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter title for resume"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 transition-colors">
                Update
              </button>
              <X
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
