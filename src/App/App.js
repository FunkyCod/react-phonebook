import React, { Component } from "react";

import { GlobalStyle } from "../theme/GlobalStyle.styled";
import ContactForm from "../components/ContactForm";
import Section from "../components/Section";
import ContactList from "../components/ContactList";
import Filter from "../components/Filter";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import initialContacts from "../data/contacts.json";

class App extends Component {
  // состояние. публичное свойство state. свойство экземпляра, всегда объект. от свойств этого объекта зависит разметка
  state = {
    contacts: [],
    filter: "",
  };

  //функция (метод) обработки контактов которая добавляем новый контакт
  handleAddContact = (newContact) =>
    this.setState(
      ({ contacts }) => ({
        contacts: [...contacts, newContact],
      }),
      Notify.success("Contact is add phonebook")
    );

  //функция (метод) проверки на уникальность контактов
  handleCheckUniqueContact = (name) => {
    //берем наши контакты из state
    const { contacts } = this.state;
    //переменная которая проверяет существует ли контакт в массиве контактов
    //ставим !! если что то найдет то получим true в противном случае false
    const isExistContact = !!contacts.find((contact) => contact.name === name);
    //если контакт существует то выводим сообщение
    isExistContact && Notify.failure("Contact is already exist");
    //но так как у нас функция проверяет на уникальность то мы ставим инверсию (тоесть не существует контакта значит он уникальный)
    return !isExistContact;
  };

  //метод для удаления контактов, в него будет приходить id и отталкиваться от предыдущего состояния используеться колбек и
  // из деструктуризации наши контакты и их же будем возвращать используя метод filter на каждой итерации будет приходить контакт
  // и будем фильтровать id  (id который не равен id который мы хотим удалить)
  handleRemoveContact = (id) =>
    this.setState(
      ({ contacts }) => ({
        contacts: contacts.filter((contact) => contact.id !== id),
      }),
      Notify.success("Contact is delete")
    );
  //обработчик фильтр handleFilterChange в него будет приходить фильтр и будем менять наш стейт filter
  handleFilterChange = (filter) => this.setState({ filter });

  //метод фильтрации контактов , будем брать из нашего state contacts и filter, будем возвращать отфильтрованный список контактов
  //при этом не будем изменять тот который находиться у нас в state, методом фильтр на каждой итерации приходит контакт и делаем проверку контакта
  // который будет содержать символы которые находяться в нашем фильтре но мы не должны привязываться к регистру, то что вводим большие или маленькие символы
  //приводим все в нижний регистр методом toLowerCase().includes(filter.toLowerCase()) и фильтр тоже к нижнему регистру
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // localStorage

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    } else {
      this.setState({ contacts: initialContacts });
    }
    // console.log(parsedContacts);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <GlobalStyle />
        <Section title="Phonebook">
          <ContactForm
            onAdd={this.handleAddContact}
            onCheckUnique={this.handleCheckUniqueContact}
          />
        </Section>
        <Section title="Contacts">
          <h3>Find contacts by name</h3>
          <Filter filter={filter} onChange={this.handleFilterChange} />
          <ContactList
            contacts={visibleContacts}
            onRemove={this.handleRemoveContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
