import React, { Component } from 'react'
import styled from 'styled-components';


const StyledImg = styled.img`
    object-fit: contain;
`

export default class Logo extends Component {
    render() {
        return (
            <StyledImg src="logo.png" alt="Logo" width="45px45px"/>
        )
    }
}
