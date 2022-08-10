import React, { Component } from 'react'
import Clock from './Clock';
import { v4 as UUID } from 'uuid'
import moment from 'moment'

const countries = require('../public/countries.json');


export default class ClockList extends Component {

    render() {


        function adjustTime( time, offSetString ){
            let _time = moment(time);
            offSetString = offSetString.split(/UTC/)[1]; 
            const [hours, minutes] = offSetString.split(":"); 
            
            _time = _time.add(Number(hours), 'Hours').add(Number(minutes), 'Minutes')
            return _time

        }

        const {clockList, currentTime, formatString, deleteButtonHandler} = this.props;

        let clockComponentList = clockList.map(clock => {
            
            let country_object =  countries.find( country => country.name === clock)
            let timezoneOffSetString =  country_object.timezones[0] 
           let flag_url =  country_object.flag;
           let region = country_object.region
           let capital = country_object.capital
           let population = country_object.population
           let currencyName = country_object.currencies[0].name
           let currencySymbol = country_object.currencies[0].symbol


            

            let clockProps = { 
                country: clock, 
                flag_url, region, population, currencyName, currencySymbol, capital,
                adjustedTime: adjustTime(currentTime, timezoneOffSetString).toDate(),
                adjustedTimeString: adjustTime(currentTime, timezoneOffSetString).format(formatString) , 
                timezone: timezoneOffSetString,
                twentyFourHours: true, 
                digital: true,
                key: UUID(),
                deleteButtonHandler,
            }

            return <Clock {...clockProps}/> 
        })

        return (
            <div>
               {clockComponentList}
            </div>
        )
    }
}
