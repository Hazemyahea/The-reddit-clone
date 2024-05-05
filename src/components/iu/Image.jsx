import { useState } from "react";

const Image = ({ number, ChosseAvatar }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked((clicked) => !clicked);

    ChosseAvatar(number); // Call the prop function to update avatar
  };

  return (
    <img
      src={`/images/profile${number}.png`}
      alt="profile2"
      srcset=""
      onClick={handleClick}
      className={` hover:scale-125 transition ${clicked && "scale-125"}`}
    />
  );
};

export default Image;
