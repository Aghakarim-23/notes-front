import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = ({style}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/notes")}
      className={style}
    >
      <MdOutlineArrowBack className="text-3xl" />
    </div>
  );
};

export default BackButton;
