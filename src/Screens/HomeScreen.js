import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Loader from 'react-loader-spinner';
import ResultSection from '../Components/ResultSection';
import '../styles/styles.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Button , IconButton } from '@material-ui/core';
import stan from '../images/stan_mirrored.jpg'

const randomJokeUrl = "https://icanhazdadjoke.com";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const searchJokeUrl = "https://icanhazdadjoke.com/search?term=$";
const resultLimit = 30;

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: true,
            loading: false,
            joke: "",
            jokeId: "",
            jokeResults: [],
            randomOpen: false,
            searchOpen: false,
            searchTerm: "",
            searchDisabled: true,
            shortSelected: false,
            mediumSelected: false,
            longSelected: false,
            error: false,
            errorMessage: ""
        }
    }

    fetchRandomJoke = () => {
        fetch(proxyUrl + randomJokeUrl, {
            headers: {
                Accept: "application/json",
                "User-Agent": "Dad_Jokes mattholdsworth90@gmail.com"
            }
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({
                joke: data.joke,
                randomOpen: true,
                loading: false
            })
        })
        .catch(e => 
            this.setState({
                error: true,
                errorMessage: e
            })
        )
    }

    fetchMultipleJokes = () => {
        var url = proxyUrl + searchJokeUrl + this.state.searchTerm + "&limit=$" + resultLimit
        fetch(url, {
            headers: {
              Accept: "application/json",
              "User-Agent": "Dad_Jokes mattholdsworth90@gmail.com"
            }
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({
                jokeResults: data.results.sort((a, b) => a.joke.length - b.joke.length),
                searchOpen: true,
                shortSelected: true,
                loading: false
            })
        })
        .catch(e => 
            this.setState({
                error: true,
                errorMessage: e
            })
        )
    }

    randomClicked = () => {
        this.setState({
            menuOpen: false,
            loading: true
        });
        this.fetchRandomJoke()
    }

    backClicked = () => {
        this.setState({
            menuOpen: true,
            randomOpen: false,
            searchOpen: false,
            searchDisabled: true,
            searchTerm: "",
            shortSelected: false,
            mediumSelected: false,
            longSelected: false,
            loading: false,
            error: false,
            errorMessage: ""
        })
    }

    onTextChange = (e) => {
        if (e.target.value.trim().length > 0) {
            this.setState({
                searchTerm: e.target.value.trim(),
                searchDisabled: false
            });
        }
    }

    onPressEnter = (e) => {
        if (e.key === 'Enter') {
            this.searchClicked()
        }
    }

    searchClicked = () => {
        this.setState({
            menuOpen: false,
            loading: true
        });
        this.fetchMultipleJokes()
    }

    shortClicked = () => {
        this.setState({
            shortSelected: true,
            mediumSelected: false,
            longSelected: false
        })
    }

    mediumClicked = () => {
        this.setState({
            shortSelected: false,
            mediumSelected: true,
            longSelected: false
        })
    }

    longClicked = () => {
        this.setState({
            shortSelected: false,
            mediumSelected: false,
            longSelected: true
        })
    }
    
    render() {
        return (
            <div className="pad20 background">
                {!this.state.menuOpen ?
                    <div className="marginTop20">
                        <IconButton onClick={this.backClicked} className="floatLeft marginLeft20" aria-label="Back" color="primary">
                            <ArrowBackIcon fontSize="large"/>
                        </IconButton>
                    </div>
                : null}
                <div className="titleUnderline width75 alignMiddle">
                    <h1 className="title">Dad Jokes</h1>
                </div>

                {this.state.menuOpen ?
                    <div className="flex flexCol alignMiddle adjustWidthMobile scrollView pad20">
                        <Button onClick={this.randomClicked} className="marginBottom20" variant="contained" color={"secondary"}>Random</Button>
                        <input placeholder="Enter a search term here..." type="text" className="marginBottom20 marginTop20" onChange={this.onTextChange} onKeyDown={this.onPressEnter}></input>
                        <Button disabled={this.state.searchDisabled} onClick={this.searchClicked} className="marginBottom20" variant="contained" color={this.state.searchDisabled ? "default" : "primary"}>Search</Button>
                    </div>
                : null}

                {this.state.loading ?
                    <Loader className="pad40" type="Puff" color="#f50057" height={100} width={100} />
                : null}

                {this.state.error ?
                    <div>
                        <p>Something went wrong... Please try again later</p>
                        <p>{"Here is the error if you're interested in it: " + this.state.errorMessage}</p>
                    </div>
                : null}

                {this.state.randomOpen && !this.state.loading ?
                    <div className="flex flexRow">
                        <div className="pad20">
                            <img className="imageMed image" src={stan} alt={"Stan"}/>
                        </div>
                        <p>{this.state.joke}</p> 
                    </div>
                : null}

                {this.state.searchOpen && !this.state.loading ? 
                    <div>
                        {this.state.jokeResults.length > 0 ? 
                        <div>
                            <div className="flex flexRow padTop20">
                                <Button className="marginRight10" variant="contained" color={this.state.shortSelected ? "secondary" : "primary"} onClick={this.shortClicked}>Short</Button>
                                <Button className="marginRight10" variant="contained" color={this.state.mediumSelected ? "secondary" : "primary"} onClick={this.mediumClicked}>Medium</Button>
                                <Button variant="contained" color={this.state.longSelected ? "secondary" : "primary"} onClick={this.longClicked}>Long</Button>
                            </div>
                            {this.state.shortSelected &&
                                <ResultSection searchTerm={this.state.searchTerm} jokeResults={this.state.jokeResults} title={"Short Jokes"}/>
                            }
                            {this.state.mediumSelected &&
                                <ResultSection searchTerm={this.state.searchTerm} jokeResults={this.state.jokeResults} title={"Medium Jokes"}/>
                            }
                            {this.state.longSelected &&
                                <ResultSection searchTerm={this.state.searchTerm} jokeResults={this.state.jokeResults} title={"Long Jokes"}/>
                            }
                        </div>
                        : <p>We couldn't find any dad jokes using that term, sorry!</p>}
                    </div>
                : null}

            </div>
        )
    }
}

export default HomeScreen