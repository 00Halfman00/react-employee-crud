import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Route} from 'react-router-dom';
import Employees from './Employees';
import Detail from './Detail';
import Create from './Create';
import { Provider, connect } from 'react-redux';
import store, { fetchEmployees } from './store';


class _App extends React.Component{
  constructor(){
    super();
  }
  componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/employees'>Employees ({ this.props.count })</Link>
            </li>
            <li>
      { this.props.count < 50 && <Link to='/create'>Create</Link> }
            </li>
          </ul>
          <Route path='/create' component={ Create } />
          <Route path='/employees/:id' component={ Detail } />
          <Route path='/employees' exact component={ Employees } />
        </div>
      </Router>
    );
  }
}

const App = connect(({ employees })=> {
  return {
    count: employees.length
  };
},(dispatch)=> {
  return {
    load: ()=> dispatch(fetchEmployees()) 
  };
})(_App);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
