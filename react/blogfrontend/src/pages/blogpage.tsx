import React, { useEffect, useState, type FormEvent } from "react";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  imageUrl?: string;
  category: string;
  createdAt: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addingCategory, setAddingCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");

  const [formData, setFormData] = useState<Omit<Blog, "_id" | "createdAt">>({
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    category: "",
  });
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/allblog");
      setBlogs(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/blog/createblog", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert("Blog created!");
      setFormData({
        title: "",
        subTitle: "",
        description: "",
        imageUrl: "",
        category: "",
      });
      fetchBlogs();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create blog");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/categories");
      console.log("Fetched categories:", res.data.data); // 👈 Add this
      setCategories(res.data.data || []);
    } catch (err: any) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return alert("Enter a category name");
    try {
      setAddingCategory(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/blog/createcategory",
        { category: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert("Category added!");
      setNewCategory("");
      await fetchCategories();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add category");
    } finally {
      setAddingCategory(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white px-6 py-10">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-800">
          📝 Blog Manager
        </h1>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Create a New Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Subtitle</label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => {
                  console.log("Rendering category:", cat); // 👈 Add this
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <input
                type="text"
                placeholder="Add new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                disabled={addingCategory}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {addingCategory ? "Adding..." : "Add"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Blog
            </button>
          </form>
        </div>

        {/* Blog Display */}
        <h2 className="text-2xl font-bold mb-4 text-gray-700">📚 All Blogs</h2>

        {loading && <p className="text-gray-500">Loading blogs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {blogs.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
              >
                <h3 className="text-xl font-bold mb-1 text-blue-700">
                  {blog.title}
                </h3>
                <p className="text-sm italic text-gray-500 mb-2">
                  {blog.subTitle}
                </p>
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-gray-700 mb-2 line-clamp-4">
                  {blog.description}
                </p>
                <div className="text-sm text-gray-500 flex justify-between items-center mt-2">
                  <span>📂 {blog.category}</span>
                  <span>
                    🕒 {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-gray-600">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
