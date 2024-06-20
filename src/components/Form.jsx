import { useState, useEffect } from "react";
import { FiEdit as Edit, FiSave as Save } from "react-icons/fi";
import Card from "./Card";

const listaTags = [
  "Viaggio",
  "Cucina",
  "Fitness",
  "Arte",
  "Musica",
  "Moda",
  "Sport",
  "Salute",
  "Film",
  "Libri",
  "Fotografia",
  "Natura",
  "Casa e Giardino",
  "Animazione",
  "Storia",
];

const listaCategorie = [
  "Tecnologia",
  "Notizie",
  "Tutorial",
  "Viaggi",
  "Cucina",
  "Sport",
  "Musica",
  "Film e TV",
  "Libri",
  "Salute e benessere",
  "Moda",
  "Finanza",
  "Automobili",
  "Fai da te",
  "Animazioni e fumetti",
];

const Form = () => {
  const [postArray, setPostArray] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    image: "",
    published: false,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (formData.published) {
      alert("Articolo pubblicato!");
    }
  }, [formData.published]);

  const handleField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedPosts = [...postArray];
      updatedPosts[editIndex] = { ...formData };
      setPostArray(updatedPosts);
      setEditIndex(null);
    } else {
      setPostArray([...postArray, { ...formData }]);
    }
    resetForm();
    setFormVisible(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      tags: [],
      image: "",
      published: false,
    });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const newPostArray = postArray.filter((_, i) => i !== index);
    setPostArray(newPostArray);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const postToEdit = postArray[index];
    setFormData({
      title: postToEdit.title,
      content: postToEdit.content,
      category: postToEdit.category,
      tags: postToEdit.tags,
      image: postToEdit.image,
      published: postToEdit.published,
    });
    setFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
    if (!formVisible) {
      resetForm();
    }
  };

  return (
    <div className="container">
      <button className="btnToggleForm" onClick={toggleFormVisibility}>
        {formVisible ? "Close Form" : "Open Form"}
      </button>
      {formVisible && (
        <PostForm
          formData={formData}
          handleField={handleField}
          handleSubmit={handleSubmit}
          listaCategorie={listaCategorie}
          listaTags={listaTags}
          editIndex={editIndex}
        />
      )}
      <div className="itemCard">
        <ul>
          {postArray.map((post, index) => (
            <li className="listItem" key={index}>
              <Card
                post={post}
                onDelete={() => handleDelete(index)}
                onEdit={() => handleEdit(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PostForm = ({
  formData,
  handleField,
  handleSubmit,
  listaCategorie,
  listaTags,
  editIndex,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      name="title"
      type="text"
      placeholder="Title"
      value={formData.title}
      onChange={(e) => handleField("title", e.target.value)}
    />
    <textarea
      name="content"
      placeholder="Content"
      value={formData.content}
      onChange={(e) => handleField("content", e.target.value)}
    />
    <select
      name="category"
      value={formData.category}
      onChange={(e) => handleField("category", e.target.value)}
    >
      <option value="">Select Category</option>
      {listaCategorie.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
    <div>
      <label>Tags:</label>
      {listaTags.map((tag, tagIndex) => (
        <label key={tagIndex}>
          <input
            type="checkbox"
            checked={formData.tags.includes(tag)}
            onChange={() => {
              const updatedTags = formData.tags.includes(tag)
                ? formData.tags.filter((t) => t !== tag)
                : [...formData.tags, tag];
              handleField("tags", updatedTags);
            }}
          />
          {tag}
        </label>
      ))}
    </div>
    <input
      name="image"
      type="text"
      placeholder="Image URL"
      value={formData.image}
      onChange={(e) => handleField("image", e.target.value)}
    />
    <label>
      <input
        name="published"
        type="checkbox"
        checked={formData.published}
        onChange={(e) => handleField("published", e.target.checked)}
      />
      Published
    </label>
    <button
      className={`btnSubmit ${editIndex !== null ? "btnSave" : ""}`}
      type="submit"
    >
      {editIndex !== null ? <Save className="iconSave" /> : "Submit"}
    </button>
  </form>
);

export default Form;
