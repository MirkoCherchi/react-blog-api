import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

function NewPostForm({ onNewPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    published: false,
    img: null,
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

    const categoryIdInt = parseInt(formData.category, 10);
    if (isNaN(categoryIdInt)) {
      setError("Category Id deve essere un numero intero");
      return;
    }

    const tagsArray = formData.tags.map((tagId) => parseInt(tagId, 10));
    if (!Array.isArray(tagsArray) || tagsArray.some(isNaN)) {
      setError("Tags deve essere un array di numeri");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("categoryId", categoryIdInt);
    formDataToSend.append("published", formData.published);

    tagsArray.forEach((tagId) => {
      formDataToSend.append("tags", tagId);
    });

    if (formData.img) {
      formDataToSend.append("img", formData.img);
    }

    try {
      const response = await axios.post(`${apiUrl}/posts`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Nuovo post creato:", response.data);

      setFormData({
        title: "",
        content: "",
        category: "",
        tags: [],
        published: false,
        img: null,
      });
      setError(null);

      // Chiamiamo la funzione per aggiornare i post nel componente genitore
      if (typeof onNewPostCreated === "function") {
        onNewPostCreated();
      }
    } catch (error) {
      console.error("Errore durante la creazione del nuovo post:", error);
      setError(
        "Errore durante la creazione del nuovo post. Riprova più tardi."
      );
    }
  };

  const handleTagChange = (tagId) => {
    if (formData.tags.includes(tagId)) {
      const updatedTags = formData.tags.filter((tag) => tag !== tagId);
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    } else {
      const updatedTags = [...formData.tags, tagId];
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    }
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
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, img: file });
          }}
        />
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
