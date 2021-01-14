import React from 'react';

class ListDone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done_list: []
    };
  }

  componentDidMount(){
    this.getLocalData()
  }

  async getLocalData(){
    const req = await JSON.parse(localStorage.getItem('todoList'))
    let done = []
    for (var i = 0; i < req.length; i++) {
      if (req[i].status == 1) {
        done.push(req[i])
      }
    }
    this.setState({done_list: done})

  }

  render() {
    const {done_list} = this.state

    return (
      <div>
        {done_list.map((list, i) => 
          <div className="row list-todo" key={i}>
            <div className="col-10">
              <h4 key={i}> { list.title } </h4>
            </div>
            <div className="col-2" align="right">
              <button className="btn btn-warning">DONE!</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ListDone;
