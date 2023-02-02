import PropTypes from "prop-types";
import { Input } from "../ContactForm/ContactForm.styled";
const Filter = ({ filter, onChange }) => {
  return (
    <Input
      type="text"
      name="filter"
      value={filter}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Enter name for Search"
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default Filter;
