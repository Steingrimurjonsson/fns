import { BrowserRouter as Router, Route, NavLink, Switch, useRouteMatch, useParams, Link, Redirect, browserHistory } from "react-router-dom"
import airports from "./data/airports.json"
import citiesJ from "./data/cities.json"
import React, { useState } from 'react';
import LogInAsAdmin from "./LoginApp";
import $ from 'jquery';
import classNames from 'classnames/bind';
import { Form, FormControl, FormGroup, Col, Row, Button, InputGroup } from 'react-bootstrap';
import { DatePicker } from 'react-datepicker';

function FormExample() {
  
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
   // this.event.handleSubmit(this.textInput.value);
    const form = event.currentTarget;
  //  if (form.checkValidity() === false) {
     // event.preventDefault();
     event.window.location = "example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies"
      //event.stopPropagation();
   // } 
    setValidated(true);
 
   
 //handleSubmit =  window.location.replace('http://www.google.com');
   
  
   // console.log(form.value);
    // let { cityN } = useParams();
    // var c = citiesJ.cities.city = [cityN];
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
       <Form.Row>
        <Form.Group as={Col} md="10" controlId="fromV">
          <Form.Label>FROM</Form.Label>
          <Form.Control
            required
            type="text"
            name="inputText"
            placeholder="Where would you like to travel from"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    
      <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>

              </Form.Label>
              <Col sm={10}>


                <Form.Check

                  label="More than 1 stop?"
                  name="formHorizontalRadios"
                  type="switch"
                  id="custom-switch"
                />
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Cheapest"
                  name="formHorizontalRadios"

                />

              </Col>
              <Col sm={15}>
                <Form.Label column sm={15}>
                  Departure
    </Form.Label>
                <Form.Check
                  type="date"
                  id="date"
                  label="Departure"
               
                />
                <Form.Label column sm={15}>
                  Return
    </Form.Label>

                <Form.Check
                  type="date"
                  id="date"
                  label="Return"
               
                />
              </Col>
            </Form.Group>
  
            <Button type="submit">Go to ticket!</Button>
            
            </Form>
  );
}


class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      dataInput: '',
      data: []
    }
    this._handleInputText = this._handleInputText.bind(this);
  }

  _handleInputText(input) {
    this.setState({
      dataInput: input.target.value
    });
  }


  render() {

    let filteredCities = this.props.cities.filter(
      (city) => {
        return city.name.toLowerCase().indexOf(this.state.dataInput.toLowerCase()) !== -1;
      }
    );
    var hideShowList = classNames({
      'hiddenList': true,
      'showList': this.state.dataInput
    });



    return (
      <div>

        <form>
          <input
            type='text'
            value={this.state.dataInput}
            onChange={this._handleInputText}
            placeholder={this.props.placeholder}
          />
        </form>

        <ul style={{ listStyle: 'none' }}>
          {filteredCities.map(
            (city) =>

              <Link to={`${'all/' + city.name}`}>
                <li className={hideShowList}
                  key={city.id}>
                  {city.name && city.component ? city.component : city.name}
                </li>
              </Link>
          )}
        </ul>

      </div>
    );
  }
}

class Pic extends React.Component { // MAKE COUNTRY VALUE LOWER CASE 

  componentDidMount() {
    cities.map((city) =>
      fetch("https://api.teleport.org/api/urban_areas/slug:" + city.name + "/images/")
        .then(response => response.json())
        .then(data => this.setState({ data: data }))

    );

  };
  render() {

    var mySubString = JSON.stringify(([this.state])).split('web":"').pop().split('"')[0];
    console.log(mySubString);


    return (
      <div>
        <ul >
          {cities.map(
            (city) =>
              <li key={city.id}> {}
                <img style={{ width: 600, height: 200 }} src={mySubString} />
                <h1>{city.name}</h1>
              </li>
          )}
        </ul>

      </div>
    );
  }
}





const cities = [
  { id: 1, name: 'paris' },
  { id: 2, name: 'amsterdam' },
  { id: 3, name: 'copenhagen' },
  { id: 4, name: 'brussels' },
  { id: 5, name: 'berlin' },
  { id: 6, name: 'london' }
]



export default function App() {

  return (
    <Router>
      <Header />
      <Content />
    </Router>
  );
}
const Header = () => {
  return (


    <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient">
      <div class="container">
       
        <div class="collapse navbar-collapse" id="navbarNav">
          <NavLink to="/all" >
            <img class="logo" style={{ width: 90, height: 50 }} src={require('./img/fns.gif')} />
          </NavLink>

          <form class="form-inline mr-auto" target="_self" >
            <div class="form-group">
              <label for="search-field"></label>
              <SearchBar
                cities={cities}
                placeholder='Search' />
            </div>
          </form>
          <ul class="nav navbar-nav ml-auto">

            <li class="nav-item" role="presentation">  <NavLink to="/all"><a class="nav-link" >Home</a></NavLink></li>
            <li class="nav-item" role="presentation">   <NavLink to="/about"><a class="nav-link" >About</a></NavLink></li>
            <li class="nav-item" role="presentation">   <NavLink to="/login"><a class="nav-link" >Login</a></NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
const Content = () => {
  return (
    <div>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/all">
        <All />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <Login />
      </Route>

    </div>
  );
}
function Home() {
  return (
    // <Pic />
    <Redirect to="/all" />
  );
}

function Login() {
  return <LogInAsAdmin /> 
}
function All() {
  let match = useRouteMatch();
  console.log(match);
  return (
    <div>
      <ul>
        <Switch>
          <Route path={`${match.path}/:cityN`}>
            <DetailCity />
          </Route>
        </Switch>
        {citiesJ.cities.map((u, index) => (
          <NavLink to={`${match.url}/${u.city}`}>
            <li key={index} >
              <h2>{u.city.charAt(0).toUpperCase() + u.city.substring(1)}</h2>
              <img style={{ width: 1200, height: 200 }} src={`${u.picture.large}`} alt="imgOfCity" />
            </li>
          </NavLink>
        ))}
      </ul>

    </div>
  );
}
 
function DetailCity() {

  
  let { cityN } = useParams();
  var c = citiesJ.cities.city = [cityN];
 

  console.log(c);

  function scrol() {
    document.getElementById('frame').contentWindow.scrollTo(10,100);
    
    }

  return (
  
    <div class="infoDiv" onLoad={window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <div >
        <iframe src={`https://www.visitacity.com/en/${cityN}/activities/all-activities`} width="70%" height="500" margin-top='200px' align="right" frameborder="0"  id="frame"></iframe>
        </div>
        <div align="left" >
        <h2>{cityN.charAt(0).toUpperCase() + cityN.substring(1)}</h2>
          <FormExample/>
      </div>
    </div>
     
  );
}
function About() {
  return (
    <div>
      <div>
        <h2>About Fly&See</h2>
        <h4>At Fly&See we do our best to provide you with the most competitive prices to and from your desired destinations, as well as giving you a small guide and overview of sights and acctivities to do when you arrive. </h4>
      </div>
    </div>
  
  );
  
}
