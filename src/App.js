import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import demo from './training/demo';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm : false,
      taskEditting : null,
      filter : {
        name : '',
        status : -1
      },

      keyword : '',
      sortBy : 'name',
      sortValue : 1
    };
    //this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount = () => {
    //console.log('call');
    if(localStorage && localStorage.getItem('tasks'))
    {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }

  onClearForm = () =>{
    this.setState({
        //id : "",
        name : "",
        status : false
    })    
  }

  onClearFormFiter = () =>{
    this.setState({
      filter : {
        name : '',
        status : -1
      }
    });
  }


  // show form
  onShowForm = () =>{
    this.setState({
      isDisplayForm : true
    })
  }

  // close form
  onCloseForm = (event) =>{
    //event.preventDefault();
    this.setState({
      isDisplayForm : false
    })
  }

  // Toggle form
  ToggleForm = () =>{
    if(this.state.isDisplayForm && this.state.taskEditting !== null)
    {
      this.setState({
        isDisplayForm : true,
        taskEditting : null
      })
    }else{
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditting : null
      })
    }

  }
  

  // generate id
  s4()
  {
    return Math.floor(1+Math.random() * 0x10000).toString(16).substring(1);
  }

  generateId()
  {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4() + this.s4() + "-" + this.s4();
  }

  // add new data
  onSubmit = (data) => {
    //console.log(data);
    var { tasks } = this.state;

    // id = null => add new data
    if(data.id === ""){
      data.id = this.generateId();
      //console.log(data);
      tasks.push(data);
    }else{
      var index  = this.findIndex(data.id);
      tasks[index] = data;
    }
   
    this.setState({
        tasks : tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));

    // clear form filter
    this.onClearFormFiter();
    // close form
    this.onCloseForm();


  }

  // find id
  findIndex = (id)=>{
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task,index)=>{
      if(task.id === id)
      {
         result = index;
      }
    })
    return result;
  }

  // update status
  onUpdateStatus = (id) =>{
    console.log(id);
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1)
    {
      tasks[index].status =  !tasks[index].status;
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

  // delete data
  onDelete = (id) =>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1)
    {
      tasks.splice(index,1);
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

  // updated data
  onUpdate = (id) =>{
    this.onShowForm();
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var data = tasks[index];
    console.log(data);

    this.setState({
      taskEditting : data
    })
    //return data;
    //console.log(id);
    //this.onCloseForm();
    this.onClearForm();
  }

  // on onFillter
  onFillter = (fillterName, fillterStatus) => {
    fillterStatus = parseInt(fillterStatus,10);

    this.setState({
      filter : {
        name :fillterName,
        status : fillterStatus
      }
    },()=>{
      console.log(this.state.filter);
    })
    
  }
  // search click data
  onSearch = (keyword) => {
    //console.log(keyword);
    this.setState({
      keyword : keyword
    })
  }

  // sort
  onSort = (sortBy,SortValue) =>{
    //console.log(sortBy + " - " + SortValue);
    //event.preventDefault();
    this.setState({
      sortBy : sortBy,
      sortValue : SortValue
    },()=>{
      //console.log(this.state.sortBy + '-' + this.state.sortValue);
    })
    //console.log(this.state);
  }
  

  render() {
    
    var {tasks,isDisplayForm,taskEditting,filter,keyword,sortBy,sortValue} =  this.state;
    var elementForm = isDisplayForm === true  ? <TaskForm 
                                                  onSubmit={this.onSubmit} 
                                                  onCloseForm={this.onCloseForm}
                                                  onUpdate = {this.onUpdate}
                                                  taskEditting = {taskEditting}
                                                  />  : "";
    // fillter
    if(filter)
    {
      // fillter name
      if(filter.name)
      {
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
        });
        console.log(tasks);
      }
      // fillter status
      tasks = tasks.filter((task)=>{
        if(filter.status === -1)
        {
          return task;
        }else{
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

   
    // search keyword on click
    if(keyword)
    {
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    
    
    // sortby sortBy,sortValue
    // sort name
    if(sortBy === 'name')
    {
      tasks.sort((a,b)=>{
        //console.log(a.name);
        //console.log(b.name);
        if(a.name > b.name) return  sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      })
    }

    // sort status
    if(sortBy === 'status')
    {
      tasks.sort((a,b)=>{
        if(a.status > b.status) return  -sortValue;
        else if(a.status < b.status) return sortValue;
        else return 0;
      })
    }


    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {elementForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
            <button type="button" className="btn btn-primary" onClick={this.ToggleForm}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <br />
            <br />
            <TaskControl onSearch={this.onSearch}  onSort={this.onSort}/>
            <br />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList 
                    tasks={tasks}
                    onUpdateStatus={this.onUpdateStatus}
                    onDelete = {this.onDelete}
                    onUpdate = {this.onUpdate}
                    onFillter = {this.onFillter}
                    />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
