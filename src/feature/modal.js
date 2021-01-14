import React from 'react';
import {Button, Modal} from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };

    this.wrapper = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    console.log('show_modal', this.props.show_modal)
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    const {isToggleOn} = this.state
    
    return (
      <div ref={this.wrapper} className="container card">
        <Button variant="primary" onClick={this.handleClick}>
          Launch demo modal
        </Button>

        <Modal show={isToggleOn} onHide={this.handleClick}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClick}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClick}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
