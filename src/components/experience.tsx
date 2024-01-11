import { WindowHeader } from './os/windowOs/windowHeader';

const Works = () => {
  return (
    <div id="works" className="flex flex-col p-5 bg-blue-500 h-screen">
      <div className="bg-white flex-1 flex justify-between p-3">
        <div>Some file</div>
        <div>
          <WindowHeader />
        </div>
      </div>
    </div>
  );
};

export default Works;
