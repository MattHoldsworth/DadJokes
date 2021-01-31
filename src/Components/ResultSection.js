import React from 'react';
import '../styles/styles.css';
import stan from '../images/stan_mirrored.jpg'

class ResultSection extends React.Component {

    render() {
        return(
            <div>
                { this.props.title === "Short Jokes" &&
                    Object.keys(this.props.jokeResults).map(key => (
                        (this.props.jokeResults[key].joke.split(" ").length - 1) < 10 &&
                        <div className="flex flexRow underline pad20 width50 alignMiddle">
                            <div className="pad20">
                                <img className="imageMed image" src={stan} alt={"Stan"}/>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: this.props.jokeResults[key].joke.replace(this.props.searchTerm, '<b>' + this.props.searchTerm + "</b>")}}/>
                        </div>
                    ))
                }
                { this.props.title === "Medium Jokes" &&
                    Object.keys(this.props.jokeResults).map(key => (
                        (this.props.jokeResults[key].joke.split(" ").length - 1) >= 10 && (this.props.jokeResults[key].joke.split(" ").length - 1) < 20 &&
                        <div className="flex flexRow underline pad20 width50 alignMiddle">
                            <div className="pad20">
                                <img className="imageMed image" src={stan} alt={"Stan"}/>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: this.props.jokeResults[key].joke.replace(this.props.searchTerm, '<b>' + this.props.searchTerm + "</b>")}}/>
                        </div>
                    ))
                }
                { this.props.title === "Long Jokes" &&
                    Object.keys(this.props.jokeResults).map(key => (
                        (this.props.jokeResults[key].joke.split(" ").length - 1) >= 20 &&
                        <div className="flex flexRow underline pad20 width50 alignMiddle">
                            <div className="pad20">
                                <img className="imageMed image" src={stan} alt={"Stan"}/>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: this.props.jokeResults[key].joke.replace(this.props.searchTerm, '<b>' + this.props.searchTerm + "</b>")}}/>
                        </div>
                    ))
                }
            </div>
        )
    }

}

export default ResultSection