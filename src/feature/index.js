import React from 'react';
import ListTodo from './list-todo'
import ListDone from './list-done'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      todo_all: [],
      todo_done: [],
      todo_not: [],
      loading: false,
    };

    this.handleTab = this.handleTab.bind(this);
  }

  handleTab(tab) {
    if (tab == 1) {
      this.setState({ tab1: true, tab2:false })
    }else{
      this.setState({ tab1: false, tab2:true })
    }
  }


  render() {
    const {tab1, tab2, loading} = this.state

    return (
      <div className="wrapper--todo-list">
        <h1 className="text-center text-white">TO DO LIST</h1>
        <br/>
        <div className="card card-main">
          <div className="card-header">
            <button onClick={() => this.handleTab(1)} className={ tab1 ? 'btn btn-tab active' : 'btn btn-tab' } >To Do</button>            
            <button onClick={() => this.handleTab(2)} className={ tab2 ? 'btn btn-tab active' : 'btn btn-tab' } >Finished</button>            
          </div>
          <div className="card-body">
            {tab1 && <ListTodo />}
            {tab2 && <ListDone />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
