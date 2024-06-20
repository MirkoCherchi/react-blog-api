import { TiDeleteOutline as Delete } from "react-icons/ti";
import { FiEdit as Edit } from "react-icons/fi";

const Card = ({ post, onDelete, onEdit }) => {
  const { title, content, category, tags, image, published } = post;

  return (
    <div>
      <h2>{title}</h2>
      <div className="card">
        <div className="cardContent">
          {image && <img src={image} alt={title} />}
        </div>

        <div className="cardFooter">
          <p>{content}</p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Tags:</strong>{" "}
            {tags.map((tag, index) => (
              <span className="tag" key={index}>
                {"#"}
                {tag}{" "}
              </span>
            ))}
          </p>
          <p>{published ? "Pubblicato" : "Non Pubblico"}</p>
          <div className="btnFlex">
            <button onClick={onEdit} className="btnEdit">
              <Edit className="iconEdit" />
            </button>
            <button onClick={onDelete} className="btnDelete">
              <Delete className="iconDelete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
