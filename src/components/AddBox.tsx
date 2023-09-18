import regionMenu from "../assets/regionMenu.json";
import { useState } from "react";

interface Region {
  regionName: String;
  timeDiff: number;
}
interface Props {
  addRegion: (regionClicked: Region) => void;
}

const AddBox = ({ addRegion }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  let showContent = showMenu ? (
    <>
      <ul>
        {regionMenu.map((item) => (
          <li
            onClick={() => {
              addRegion(item);
              setShowMenu(false);
            }}
          >
            {item.regionName}
          </li>
        ))}
      </ul>
      <div id="menuBackground" onClick={() => setShowMenu(false)} />
    </>
  ) : (
    <div className="addSign" onClick={() => setShowMenu(true)}>
      <div>+</div>
    </div>
  );

  return <div className="box">{showContent}</div>;
};

export default AddBox;
