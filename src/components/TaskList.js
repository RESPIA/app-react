import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
      constructor(props) {
        super(props);
        this.state = {
          filterName : '',
          filterStatus : -1 // -1 -> all, 
        }
      }
    

      onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;

        // send data to app
        this.props.onFillter(
          name === 'filterName' ? value : this.state.filterName,
          name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
          [name] : value
        })

        
      }

      render() {
        var {tasks} = this.props;
        var elementTask = tasks.map((task,index)=>{
          return <TaskItem 
                    key={task.id} 
                    index={index} 
                    task={task}
                    onUpdateStatus={this.props.onUpdateStatus}
                    onDelete = {this.props.onDelete}
                    onUpdate= {this.props.onUpdate}
                    />
        });
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
                </thead>
                <tbody>
              <tr>
                <td />
                <td>
                  <input name="filterName" onChange={this.onChange} type="text" className="form-control" />
                </td>
                <td>
                  <select name="filterStatus" onChange={this.onChange} className="form-control">
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {/* TaskItem     */}

              {elementTask}

            </tbody>
            </table>
        );
    }
}

export default TaskList;