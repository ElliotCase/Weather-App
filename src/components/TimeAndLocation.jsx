import { formatToLocalTime } from "../weatherService.JS";
import PropTypes from "prop-types";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

TimeAndLocation.propTypes = {
  weather: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    timezone: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};

export default TimeAndLocation;
