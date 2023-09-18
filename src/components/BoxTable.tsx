// @ts-nocheck

import { ReactNode, useState } from "react";
import Boxes from "./Boxes";
import AddBox from "./AddBox";
import BlankBox from "./BlankBox";

interface TimeResponse {
  value: string; // 当前的时间，为2019-07-08T07:05:34.944Z格式
}
interface Region {
  regionName: String;
  number: number;
  code: string;
}
type RegionList = Region[] | {};
interface Props {
  localTime: TimeResponse;
}

const BoxTable = ({ localTime }: Props) => {
  // Initialize region list
  const [regionList, setRegionList] = useState<RegionList>(
    JSON.parse(localStorage.getItem("regionSelected")) || []
  );
  const [rowNum, setRowNum] = useState(
    JSON.parse(localStorage.getItem("rowNum")) || 1
  );

  // Define regionlist updating function
  const addRegion = (regionClicked: Region) => {
    let newRegionList = regionList.concat?.([regionClicked]);
    let newRowNum = Math.ceil((newRegionList.length + 1) / 3);
    /* 在这里因为.concat,.unshift,.push的区别特性浪费了大量时间
    同时需要注意因为regionList是array，更新时应该setState(Array)*/
    setRegionList(newRegionList);
    setRowNum(newRowNum);
    localStorage.setItem("regionSelected", JSON.stringify(newRegionList));
    localStorage.setItem("rowNum", JSON.stringify(newRowNum));
  };
  const removeRegion = (regionClicked: Region) => {
    const index = regionList.indexOf(regionClicked);
    if (index > -1) {
      let newRegionList = regionList;
      let newRowNum = Math.ceil((newRegionList.length + 1) / 3);
      newRegionList.splice?.(index, 1);
      setRegionList(newRegionList);
      setRowNum(Math.ceil((newRegionList.length + 1) / 3));
      localStorage.setItem("regionSelected", JSON.stringify(newRegionList));
      localStorage.setItem("rowNum", JSON.stringify(newRowNum));
    }
  };

  // Organize Table
  // const boxObj: ReactNode[] = [];
  const boxArray = [...Array(rowNum - 1).keys()];

  // for (let i = 0; i < rowNum - 1; i++) {
  //   boxObj.push(
  //     <tr>
  //       <Boxes
  //         regionList={regionList.slice(3 * i, 3 * i + 3)}
  //         localTime={localTime}
  //         removeRegion={removeRegion}
  //       />
  //     </tr>
  //   );
  // }

  // Last Row
  // boxObj.push(
  //   <tr>
  //     {regionList?.length % 3 !== 0 && (
  //       <Boxes
  //         regionList={regionList.slice?.(-regionList?.length % 3)}
  //         localTime={localTime}
  //         removeRegion={removeRegion}
  //       />
  //     )}
  //     <td>
  //       <AddBox addRegion={addRegion} />
  //     </td>
  //     {regionList.length % 3 === 1 && (
  //       <td>
  //         <BlankBox />
  //       </td>
  //     )}
  //   </tr>
  // );

  // return <tbody>{boxObj}</tbody>;

  return (
    <>
      {boxArray.map((item) => (
        <tr>
          <Boxes
            regionList={regionList.slice(3 * item, 3 * item + 3)}
            localTime={localTime}
            removeRegion={removeRegion}
          />
        </tr>
      ))}
      <tr>
        {regionList?.length % 3 !== 0 && (
          <Boxes
            regionList={regionList.slice?.(-regionList?.length % 3)}
            localTime={localTime}
            removeRegion={removeRegion}
          />
        )}
        <td>
          <AddBox addRegion={addRegion} />
        </td>
        {regionList.length % 3 === 1 && (
          <td>
            <BlankBox />
          </td>
        )}
      </tr>
    </>
  );
};

export default BoxTable;
