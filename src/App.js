import {Component} from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list-component';
import {SearchBox} from './components/search-box/search-box.component';

class App extends Component{
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())  //convert object to json format
      .then(users => this.setState({monsters: users}))  //use response data to update state
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  render(){
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return(
      <div className='App'>
        {/**if you want to execute something after state change, use setState's callback function
            in order to get instant results:
            onChange={e => this.setState({searchField: e.target.value}, () => console.log(this.state))}
         */}
         <h1 className='myH1'>Monsters Rolodex</h1>
         <h2 className="myH2">We're Fetching data from an api.</h2>
         <h2 className="myH2">Mapping through the array of data to produce monster cards.</h2>
         <h2 className="myH2">Feel free to search our monsters by name.</h2>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />

        <CardList monsters={filteredMonsters}/>
      </div>
    )
  }
}

export default App;
