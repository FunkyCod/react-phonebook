import { Component } from "react";
import PropTypes from "prop-types";
import { Form, FormLabel, Input } from "./ContactForm.styled";
import { nanoid } from "nanoid";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const INITIAL_STATE = {
  name: "",
  number: "",
};

class ContactForm extends Component {
  state = INITIAL_STATE;


  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAdd } = this.props;
    const isValidateForm = this.validateForm();
   
    if (!isValidateForm) return;

    onAdd({ id: nanoid(), name, number });
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;

    if (!name || !number) {
      Notify.failure("Some field is empty");
      return false;
    }
    
    return onCheckUnique(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {

    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmit} key={this.id}>
        <FormLabel>
          Name
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleChangeForm}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormLabel>
        <FormLabel>
          Number
          <Input
            type="tel"
            name="number"
            placeholder="Enter phone number"
            value={number}
            onChange={this.handleChangeForm}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormLabel>
        <button type="submit">Add contact</button>
      </Form>
    );
  }
}

ContactForm.propType = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactForm;
