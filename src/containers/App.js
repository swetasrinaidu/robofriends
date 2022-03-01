import React, { Component } from 'react';
import CardList from '../componets/cardlist';
import SearchBox from '../componets/searchBox';
import Scroll from '../componets/scroll';
//import { robots } from './robots';
import './App.css';

const state = {
    robots: [],
    searchfield: ""
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ""
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({ robots: users })
            });
    }
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
        //console.log(event.target.value);
    }
    //console.log(filteredRobots);

    render() {
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0) {
            return <h1> loading </h1>
        } else {


            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>    
                </div>
            );
        }
    }
}


export default App;
