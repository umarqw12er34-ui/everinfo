import React, { useEffect, useState } from "react";
import { Plus, X, ExternalLink, Github, Eye } from "lucide-react";
import supabase from "../lib/supabaseClient";

type Project = {
  id: string;
  title: string;
  description: string;
  image_url?: string | null;
  demo_url?: string | null;
  github_url?: string | null;
  technologies: string[];
  created_at?: string;
};

const ADMIN_PASSWORD = "portfolio2024";

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    demo_url: "",
    github_url: "",
    technologies: "",
    image_url: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function addProject() {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in title and description");
      return;
    }

    try {
      const { error } = await supabase
        .from("portfolio_projects")
        .insert([{
          title: formData.title,
          description: formData.description,
          demo_url: formData.demo_url || null,
          github_url: formData.github_url || null,
          image_url: formData.image_url || null,
          technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean)
        }]);

      if (error) {
        console.error("Error adding project:", error);
        alert("Error adding project");
        return;
      }

      setFormData({
        title: "",
        description: "",
        demo_url: "",
        github_url: "",
        technologies: "",
        image_url: ""
      });
      setShowAddModal(false);
      fetchProjects();
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding project");
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase
        .from("portfolio_projects")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project");
        return;
      }

      fetchProjects();
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting project");
    }
  }

  function openAddFlow() {
    setPassword("");
    setShowPasswordModal(true);
  }

  function submitPassword(e?: React.FormEvent) {
    e?.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowPasswordModal(false);
      setShowAddModal(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  }

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">My Projects</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              A collection of projects I've worked on, showcasing my skills and experience.
            </p>
          </div>

          <button
            onClick={openAddFlow}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
            No projects yet. Add your first project!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                {project.image_url ? (
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Eye className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-500">No preview image</p>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={submitPassword} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Admin Access</h3>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">Enter admin password to add projects.</p>

              <div className="space-y-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Password"
                  autoFocus
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 rounded-md text-sm bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-auto max-h-[90vh]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addProject();
              }}
              className="p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Project</h3>
                <button type="button" onClick={() => setShowAddModal(false)} className="text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Project Title *</label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 block mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 block mb-1">Demo URL</label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 block mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 block mb-1">Technologies (comma-separated)</label>
                  <input
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-md bg-gray-100">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">
                    Add Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;