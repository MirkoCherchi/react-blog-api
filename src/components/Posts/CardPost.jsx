import React from "react";

function CardPost({ title, img, content, category, tags }) {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <img src={img} alt={title} />
      <p>{content}</p>
      <p>
        <strong>Categoria:</strong> {category}
      </p>
      <div className="tags">
        <strong>Tags:</strong>
        {tags.map((tag) => (
          <span key={tag.id} className="tag">
            {" "}
            {"#"}
            {tag.name}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CardPost;
