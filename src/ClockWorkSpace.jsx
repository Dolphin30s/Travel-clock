import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment';

import ClockList from './ClockList';
import Controls from './Controls';


// import './ClockWorkspace.css';

const WorkspaceStyles = styled.div`
    .error-message {
    margin: 0 0 20px 0;
    color: red;
    }
`

export default class ClockWorkSpace extends Component {

    state = {
        selectedCountry: "Afghanistan",
        clockList: ["United Kingdom of Great Britain and Northern Ireland","France", "Italy", "United States of America", "China"],
        _24hrs: false,
        formatString: 'MMMM Do YYYY, h:mm:ss a',
        currentTime: moment().subtract(2, 'Hours'), 
        errorMessage: "",
        interval: {},
    }



    componentDidMount() {
        let int = setInterval( () => {
            this.setState({currentTime: moment().subtract(2, 'Hours')})
        },1000)
        this.setState({interval: int})
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    listUpdateHandler = event => {
        this.setState({selectedCountry: event.target.value})
        this.setState( {errorMessage: ""})
    }

    addButtonClickHandler = event => {
        let _clockList = this.state.clockList;

        if (!_clockList.includes(this.state.selectedCountry)){
            _clockList.push(this.state.selectedCountry)
            this.setState({clockList: _clockList})
        } else {
            this.setState( {errorMessage: "Country already displayed"})
        }
    }

    deleteButtonHandler = (country) => {
        // let _clockList = this.state.clockList;
        console.log(country);
        let _clockList = this.state.clockList.filter( clock => clock !== country)
        this.setState({clockList: _clockList});
    }

    toggle24Handler = (event)=> {
        this.setState( {
            _24hrs: event.target.checked,
            formatString: event.target.checked ? 'MMMM Do YYYY, H:mm:ss' :'MMMM Do YYYY, h:mm:ss a',
        })
        console.log(event.target.checked)
    }




    render() {
        let controlProps = {
            listUpdateHandler: this.listUpdateHandler,
            addButtonClickHandler: this.addButtonClickHandler,
            toggle24Handler: this.toggle24Handler,
        }

        let clockListProps = {
            clockList: this.state.clockList,
            currentTime: this.state.currentTime,
            formatString: this.state.formatString,
            deleteButtonHandler: this.deleteButtonHandler,
        }



        return (
            <WorkspaceStyles>
                <Controls {...controlProps}/>
                <p className="error-message"> {this.state.errorMessage}</p>
                <ClockList {...clockListProps}/>  
            </WorkspaceStyles>
        )
    }
}
