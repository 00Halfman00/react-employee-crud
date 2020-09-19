import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Employees = ({ employees, match })=> {
  return (
        <ul>
          {
            employees.map( employee => {
              return (
                <li key={ employee.id} className={ match.params.id*1 === employee.id ? 'selected': ''}>
                  <Link to={`/employees/${ employee.id }`}>
                  { employee.name }
                  </Link>
                </li>
              );
            })
          }
        </ul>
  )
};

export default connect(
  ({ employees })=> {
    return {
      employees
    };
  }
)(Employees);
