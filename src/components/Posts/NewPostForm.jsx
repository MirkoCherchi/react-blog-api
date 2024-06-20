import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

function NewPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    published: false,
  });
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesResponse = await axios.get(`${apiUrl}/categories`);
        setCategories(categoriesResponse.data);

        const tagsResponse = await axios.get(`${apiUrl}/tags`);
        setAvailableTags(tagsResponse.data);
      } catch (error) {
        console.error(
          "Errore durante il recupero delle categorie e dei tag:",
          error
        );
        setError("Errore durante il recupero delle categorie e dei tag");
      }
    };

    fetchCategoriesAndTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/posts`, {
        title: formData.title,
        content: formData.content,
        categoryId: formData.category,
        tags: formData.tags,
        published: formData.published,
      });

      console.log("Nuovo post creato:", response.data);

      setFormData({
        title: "",
        content: "",
        category: "",
        tags: [],
        published: false,
      });
      setError(null);
    } catch (error) {
      console.error("Errore durante la creazione del nuovo post:", error);
      setError(
        "Errore durante la creazione del nuovo post. Riprova più tardi."
      );
    }
  };

  const handleTagChange = (tagId) => {
    const updatedTags = formData.tags.includes(tagId)
      ? formData.tags.filter((tag) => tag !== tagId)
      : [...formData.tags, tagId];

    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const handlePublishedChange = () => {
    setFormData({
      ...formData,
      published: !formData.published,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tags:</label>
        {availableTags.map((tag) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              id={`tag-${tag.id}`}
              value={tag.id}
              checked={formData.tags.includes(tag.id)}
              onChange={() => handleTagChange(tag.id)}
            />
            <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
          </div>
        ))}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={formData.published}
            onChange={handlePublishedChange}
          />
          Pubblicato
        </label>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Crea Post</button>
    </form>
  );
}

export default NewPostForm;
