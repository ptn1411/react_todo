import React, { Component } from "react";

export default class todo extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      date: "",
      data: [],
      edit: false,
    };
    this.onChangInput = this.onChangInput.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.rednderTodo = this.rednderTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onChangInput = (e) => {
    this.setState({
      title: e.target.value,
      date: Date.now(),
    });
  };
  onClickAdd = () => {
    const { title, date, data } = this.state;

    if (title) {
      const jsonTodo = { id: Date.now(), title: title, date: date };
      this.setState({
        data: [...data, jsonTodo],
      });
      this.setState({
        id: "",
        title: "",
        date: "",
      });
    }
  };
  onClickEdit = () => {
    const { id, title, date, data } = this.state;
    if (title) {
      const index = data.findIndex((value) => value.id === id);
      console.log(index);
      data[index].title = title;
      data[index].date = date;
      this.setState({
        data: data,
      });
      this.setState({ edit: false });
      this.setState({
        id: "",
        title: "",
        date: "",
      });
    }
  };
  editTodo = (id, value) => {
    console.log(id, value);
    this.setState({ edit: true });
    this.setState({ id: id, title: value, date: Date.now() });
  };
  deleteTodo = (id) => {
    const check = window.confirm("Ban muon xoa khong?");
    if (check) {
      const { data } = this.state;
      const result = data?.filter((value) => value.id !== id);
      this.setState({ data: result });
    }
  };

  rednderTodo(data) {
    return data.map((value, index) => (
      <li key={index}>
        {value.title}
        <span>{value.date}</span>
        <button onClick={() => this.editTodo(value.id, value.title)}>
          Edit
        </button>
        <button onClick={() => this.deleteTodo(value.id)}>Delete</button>
      </li>
    ));
  }
  render() {
    const { title, data, edit } = this.state;

    return (
      <>
        <h1>Hello</h1>
        <input
          type="text"
          name="name"
          onChange={this.onChangInput}
          value={title}
        />

        {edit ? (
          <button onClick={this.onClickEdit}>Update</button>
        ) : (
          <button onClick={this.onClickAdd}>Add</button>
        )}
        <ul>{data ? this.rednderTodo(data) : ""}</ul>
      </>
    );
  }
}
