import PropTypes from "prop-types";

import {
  ButtonDelete,
  ContactListLi,
  ContactListBox,
} from "./ContactList.styled";

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <ContactListLi>
      {name}: {number}
      <ButtonDelete onClick={() => onRemove(id)}>Delete</ButtonDelete>
    </ContactListLi>
  );
};


const ContactList = ({ contacts, onRemove }) => {

  if (contacts.length === 0) return null;
  
  return (
    <ContactListBox>
    
      {contacts.map((contact, id) => (
        <ContactListItem {...contact} key={id} onRemove={onRemove} />
      ))}
    </ContactListBox>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func,
};

export default ContactList;
