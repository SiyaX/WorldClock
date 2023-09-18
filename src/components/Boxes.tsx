// @ts-nocheck
import addTime from "../utils/addTime";
import moment from "moment";

interface TimeResponse {
  value: string; // 当前的时间，为2019-07-08T07:05:34.944Z格式
}
interface Region {
  regionName: string;
  timeDiff: number;
  code: number;
}
type RegionList = Region[] | {};
// 类型必须完全保持一致
// Region[] | {} 和 Region[]就不一样了

interface Props {
  regionList: RegionList;
  localTime: TimeResponse;
  removeRegion: (regionClicked: Region) => void;
}
const Boxes = ({ regionList, localTime, removeRegion }: Props) => {
  return (
    <>
      {regionList.map?.((item, index) => (
        <td key={index}>
          <div className="box" style={{ fontWeight: 300 }}>
            <h2>
              {String.fromCodePoint(...item.code.split(",")) +
                " " +
                item.regionName}
            </h2>
            <h3>
              {moment(
                addTime(localTime, item.timeDiff, "h").value.split(",")[0]
              ).format("YYYY-MM-DD")}
            </h3>
            <h3>
              {addTime(localTime, item.timeDiff, "h").value.split(",")[1]}
            </h3>
            <div
              className="closeSign"
              onClick={() => {
                removeRegion(item);
              }}
            >
              <div>&#10005;</div>
            </div>
          </div>
        </td>
      ))}
    </>
  );
};

export default Boxes;
