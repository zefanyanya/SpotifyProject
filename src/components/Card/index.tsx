import React, { useState } from "react";
import "./index.css";
import { Button } from "@material-ui/core";

interface IProps {
  img: string;
  title: string;
  artists: string;
  duration: string;
  toggleSelect: () => void;
}

const Card: React.FC<IProps> = ({ title, artists, img, duration, toggleSelect }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleToggleSelect: () => void = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  };
  return (
    <div className="card">
      <img src={img} alt={title} className="img" />
      <div className="card_content">
        <h2 className="card_title">{title}</h2>
        <h4 className="card_artist">{artists}</h4>
        <h4 className="duration">{duration} sec</h4>
        <Button variant="contained" className="card_button" onClick={handleToggleSelect}>
          {isSelected ? "Deselect" : "Select"}
        </Button>
      </div>
    </div>
  );
};
export default Card;