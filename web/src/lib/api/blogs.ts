export const fetchBlogs = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/blogs");
    const data = response.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchBlog = async (id: string | undefined) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/blogs/${id}`);
    const data = response.json();
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const deleteBlog = async (id: string | undefined) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/blogs/${id}`, {
      method: "DELETE",
    });
    const data = response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateBlog = async (id: string | undefined) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/blogs/${id}`, {
      method: "PUT",
    });
    const data = response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};