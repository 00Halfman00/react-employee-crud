import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';;;;
import { updateEmployee, destroyEmployee } from './store';

class Detail extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
    this.save = this.save.bind(this);
  }
  save(ev){
    ev.preventDefault();
    this.props.updateEmployee({ name: this.state.name, id: this.props.match.params.id, history: this.props.history });
  }
  componentDidMount(){
    const employee = this.props.employees.find(e => e.id === this.props.match.params.id*1);
    console.log(this.props.employees);
    if(employee){
      this.setState({ name: employee.name });
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.employees.length && prevProps.employees.length === 0){
      const employee = this.props.employees.find(e => e.id === this.props.match.params.id*1);
      if(employee){
        this.setState({ name: employee.name });
      }
    }
  }
  render(){
    const { name } = this.state;
    const { save } = this;
    return (
      <div>
        <form onSubmit={ save }>
          <input value={ name } onChange={ ev => this.setState({ name: ev.target.value })}/>
          <button>Update</button>
        </form>
        <button onClick={ ()=> this.props.destroy({id: this.props.match.params.id, history: this.props.history }) }>Destroy</button>
      </div>
    );
  }
}




export default connect(
  ({ employees})=> {
    return {
      employees
    };
  },
  (dispatch)=> {
    return {
      updateEmployee: (employee)=> { dispatch(updateEmployee(employee))},
      destroy: (obj)=> {
        dispatch(destroyEmployee(obj)); 
      }
    };
  }
)(Detail);
