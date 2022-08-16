import React, { Component } from "react";

class CardEditor extends Component {
  state = {
    front: "",
    back: ""
  };

  render() {
    const rows = this.props.cards.map((card, i) => {
      return (
        <tr key={i}>
          <td>{card.front}</td>
          <td>{card.back}</td>
          <td>
            <button data-index={i} onClick={this.deleteCard}>
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="editor">
        <h1>Card Editor</h1>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <br />
        <input
          onChange={this.handleChange}
          name="front"
          placeholder="Front of Card"
          value={this.state.front}
        />
        <input
          onChange={this.handleChange}
          name="back"
          placeholder="Back of Card"
          value={this.state.back}
        />
        <button id="btn-add" onClick={this.addCard}>
          Add Card
        </button>
        <hr />
        <button className="btn-switch" onClick={this.props.switchMode}>
          Switch to Viewer
        </button>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addCard = () => {
    this.props.addCard(this.state.front, this.state.back);
    this.setState({
      front: "",
      back: ""
    });
  };

  deleteCard = (e) => {
    this.props.deleteCard(e.target.dataset(index));
  };
}

class CardViewer extends Component {
  render() {
    return (
      <div className="viewer">
        <h1>Card Viewer</h1>
        <button className="btn-switch" onClick={this.props.switchMode}>
          Switch to Editor
        </button>
      </div>
    );
  }
}

class App extends Component {
  state = {
    editor: true,
    cards: []
  };

  render() {
    if (this.state.editor) {
      return (
        <div className="App">
          <CardEditor
            cards={this.state.cards}
            switchMode={this.switchMode}
            addCard={this.addCard}
            deleteCard={this.deleteCard}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <CardViewer cards={this.state.cards} switchMode={this.switchMode} />
        </div>
      );
    }
  }

  switchMode = () => {
    this.setState((state) => ({
      editor: !state.editor
    }));
  };

  addCard = (front, back) => {
    this.setState((state) => ({
      cards: [...state.cards, { front: front, back: back }]
    }));
  };

  deleteCard = (index) => {
    this.setState((state) => {
      const cards = [...state.cards];
      cards.splice(index, 1);
      return { cards: cards };
    });
  };
}

export default App;
