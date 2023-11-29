import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
function Inputs() {
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          className="text-xl font-light p-2 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Inputs;