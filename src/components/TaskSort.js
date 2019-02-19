import React, { Component } from 'react';

class TaskSort extends Component {
    onClickSort = (sortBy, sortValue) =>{
    
        //console.log(this.state);
        this.props.onSort(sortBy,sortValue);
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick={ () => this.onClickSort('name',1) }>
                        <p>
                        <span className="fa fa-sort-alpha-asc pr-5">
                            Tên A-Z
                            <i className="glyphicon glyphicon-glyphicon-ok mt-10" data-unicode="e013"></i>
                        </span>
                        </p>
                    </li>
                    <li onClick={ () => this.onClickSort('name',-1) }>
                        <p >
                        <span className="fa fa-sort-alpha-desc pr-5">
                            Tên Z-A
                        </span>
                        </p>
                    </li>
                    <li className="divider" />
                    <li onClick={ () => this.onClickSort('status',1) }><p>Trạng Thái Kích Hoạt</p></li>
                    <li onClick={ () => this.onClickSort('status',-1) }><p>Trạng Thái Ẩn</p></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default TaskSort;