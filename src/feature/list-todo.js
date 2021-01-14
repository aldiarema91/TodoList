import React from 'react';
import {Button, Modal} from 'react-bootstrap';

class ListTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      show_modal: false,
      id: null,
      title: '',
      desc: '',
      status: null,
      createdAt: '',
      type_modal: 0,
      title_modal: ''
    };
  }

  componentDidMount(){
    this.getLocalData()
  }

  async getLocalData(){
    const req = await JSON.parse(localStorage.getItem('todoList'))
    let todo = []
    for (var i = 0; i < req.length; i++) {
      if (req[i].status == 0) {
        todo.push(req[i])
      }
    }
    this.setState({todo: todo})

  }

  handleModal(type, id, title, desc, status, createdAt, show) {
    
    var title_modal = ''

    if (type == 1) {
      title_modal = 'Finished ?'
    }else if (type == 2) {
      title_modal = 'Edit'
    }else if (type == 3) {
      title_modal = 'Delete'
    }else if (type == 4) {
      title_modal = 'Add Todo List'
    }

    this.setState({ 
      id           : id,
      title        : title,
      desc         : desc,
      status       : status,
      createdAt    : createdAt,
      title_modal  : title_modal,
      type_modal   : type,
      show_modal   : show,
    })

  }

  handleSave(id_todo, type_of_save){
    var d = new Date(); 
    var datetime = d.getFullYear() + "-"
                    + (d.getMonth()+1)  + "-" 
                    + d.getDate() + " "  
                    + d.getHours() + ":"  
                    + d.getMinutes();

    let list_all = JSON.parse(localStorage.getItem('todoList'))
    let saving = []

    const {title, desc} = this.state

    if (type_of_save == 1) {
      for (var i = 0; i < list_all.length; i++) {
        if (list_all[i].id == id_todo) {
          list_all[i].status = 1
        }

        saving.push(list_all[i])
      }
    }else if (type_of_save == 2) {
      for (var i = 0; i < list_all.length; i++) {
        if (list_all[i].id == id_todo) {
          list_all[i].title = title
          list_all[i].description = desc
        }

        saving.push(list_all[i])
      }
    }else if (type_of_save == 3) {
      for (var i = 0; i < list_all.length; i++) {
        if (list_all[i].id != id_todo) {
          saving.push(list_all[i])
        }
      }
    }else if (type_of_save == 4) {
      
      var set_id = 0
      for (var i = 0; i < list_all.length; i++) {
        if (set_id < list_all[i].id) {
          set_id = list_all[i].id
        }
        saving.push(list_all[i])
      }

      var new_todo = { id: set_id+1, title: title, description: desc, status: 0, createdAt: datetime}
      saving.push(new_todo)
      console.log('neww', new_todo)

    }

    localStorage.setItem('todoList', JSON.stringify(saving));
    this.getLocalData()
    this.setState({ show_modal:false })
  }

  handleInput = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  render() {
    var todo_list = this.props.todo
    const {todo, show_modal, title, desc, status, createdAt, id, type_modal, title_modal} = this.state

    return (
      <div>
        <div align="right">
          <button 
            className="btn btn-primary" 
            onClick={() => this.handleModal(4, 99, '', '', 0, '', true)}
          >
            Add To Do List
          </button> 
        </div>
        {todo.map((list, i) => 
          <div className="row list-todo" key={i}>
            <div className="col-8">
              <h4 key={i}> { list.title } </h4>
            </div>
            <div className="col-4" align="right">
              <button 
                className="btn btn-warning" 
                onClick={() => this.handleModal(1, list.id, list.title, list.description, list.status, list.createdAt, true)}
              >
                Done
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => this.handleModal(2, list.id, list.title, list.description, list.status, list.createdAt, true)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => this.handleModal(3, list.id, list.title, list.description, list.status, list.createdAt, true)}
              >
                Hapus
              </button>
            </div>
          </div>
        )}

        <Modal show={show_modal} onHide={() => this.handleModal(null, null, '', '', null, '', false)}>
          <Modal.Header closeButton>
            <Modal.Title>{title_modal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {type_modal == 1 && 
              <div>
                <h3>{title}</h3>
                {desc}
                <br/>
                <small>Dibuat pada : {createdAt}</small>
              </div>
            }

            {type_modal == 2 && 
              <div>
                <h5>Title</h5>
                <input 
                  type="text" 
                  maxLength="40" 
                  name="title" 
                  value={title} 
                  className="form-control"
                  onChange={this.handleInput}
                />
                <br/>
                <h5>Description</h5>
                <textarea className="form-control" onChange={this.handleInput} name="desc">
                  {desc}
                </textarea>
                <br/>
                <small>Dibuat pada : {createdAt}</small>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.handleModal(null, null, '', '', null, '', false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => this.handleSave(id, type_modal)}>
                    Save
                  </Button>
                </Modal.Footer>
              </div>
              
            }

            {type_modal == 4 && 
              <div>
                <h5>Title</h5>
                <input 
                  type="text" 
                  maxLength="40" 
                  name="title" 
                  value={title} 
                  className="form-control"
                  onChange={this.handleInput}
                />
                <br/>
                <h5>Description</h5>
                <textarea className="form-control" onChange={this.handleInput} name="desc">
                  {desc}
                </textarea>
                <br/>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.handleModal(null, null, '', '', null, '', false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => this.handleSave(id, type_modal)}>
                    Save
                  </Button>
                </Modal.Footer>
              </div>
              
            }
            
          </Modal.Body>
          {type_modal != 2 && type_modal != 4 && <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleModal(null, null, '', '', null, '', false)}>
              Close
            </Button>
            <Button variant={type_modal == 3 ? 'danger' : 'primary'} onClick={() => this.handleSave(id, type_modal)}>
              {type_modal == 3 ? 'Delete' : 'Finished'}
            </Button>
          </Modal.Footer>}

        </Modal>

      </div>
    );
  }
}

export default ListTodo;
