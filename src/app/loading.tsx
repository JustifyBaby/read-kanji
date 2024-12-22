import { HEADER_HEIGHT } from "@/utils/global";
import "./loader.css";

const Loading = () => {
  return (
    <div
      className={`bg-black w-full h-screen absolute flex items-center justify-center`}
      id='loader-wrapper'>
      <div className='loader'>
        <h2>Now Loading...</h2>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
