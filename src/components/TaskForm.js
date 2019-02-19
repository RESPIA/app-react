import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            name : "",
            status : false
        }
    }
    // updated form //#endregion
    
    componentWillMount() {
        if(this.props.taskEditting)
        {
            this.setState({
                id : this.props.taskEditting.id,
                name : this.props.taskEditting.name,
                status : this.props.taskEditting.status
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        //console.log(nextProps);
        if(nextProps && nextProps.taskEditting)
        {
            this.setState({
                id : nextProps.taskEditting.id,
                name : nextProps.taskEditting.name,
                status : nextProps.taskEditting.status
            })
        }

        // reset form in case is edit=>new
        if(nextProps && nextProps.taskEditting === null)
        {
        //console.log("edit->add");
        this.setState({
            // id = "" => case add (and id !== "" => case edit)
            id : "",
            name : "",
            status : false
        });
        }
    
    }
    
    

    // onchange
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === "status")
        {
          value = target.value === "true" ? true : false;
        }

        this.setState({
            [name] : value
        })
        console.log(name + " - " + value);
    }

    onSubmit = (event) =>{
        event.preventDefault();
        // send data to app via props onSubmit for insert to task list

        this.props.onSubmit(this.state);
        //console.log(this.state);

        //this.onCloseForm();
        this.onClear();

    }


    onClear = () =>{
        this.setState({
          name : "",
          status : false
        })
    }



    render() {
        var {id} = this.state;
        return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">{ id !== "" ? "Cập nhật công việc" : "Thêm Công Việc" }</h3>
                        <div href="/" onClick={this.props.onCloseForm}>
                            <span className="glyphicon glyphicon-remove-circle"></span>
                        </div>
                    </div>
                    <div className="panel-body">
                        <form  onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.onChange} className="form-control" />
                            </div>
                            <label>Trạng Thái :</label>
                            <select name="status" value={this.state.status} onChange={this.onChange} className="form-control" required="required">
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Lưu</button>&nbsp;
                                <button type="reset" className="btn btn-danger" onClick={this.props.onCloseForm}>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>

        );
    }
}

export default TaskForm;