import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'

class Deck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id:0,
            cards:[{img:'https://deckofcardsapi.com/static/img/0D.png'}]
        }
        this.fetchCard = this.fetchCard.bind(this)
    }

    async componentDidMount() {
        let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/'
        let res = await axios.get(url)
        this.setState({id:res.data.deck_id})
        console.log(res.data)
    }

    async fetchCard(){
        let url = `https://deckofcardsapi.com/api/deck/${this.state.id}/draw/`
        let res = await axios.get(url)
        res = res.data
        console.log(res)
        let img = res.cards[0].image
        this.setState(st => {
            return {...st,cards:[...st.cards,{img:img}]}
        })
    }

    handleClick = ()=>{
        if(this.state.id != 0){
            this.fetchCard()
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Fetch Card!</button>
                <div>
                    {this.state.cards.map(el =>(
                        <Card img={el.img}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default Deck