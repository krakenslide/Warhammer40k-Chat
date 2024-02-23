import React from 'react';
import styled from 'styled-components';

const Welcome = ({currentUser}) => {
  return (
    <Container>
        <img src="https://media.tenor.com/6zI42maYnREAAAAi/space-marine-warhammer40k.gif" alt="Ork" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start messaging</h3>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    color: grey;
    img{
        height: 20rem;
        padding-left: 7rem;
    }
    span{
        color: #29311d
    }
`;

export default Welcome

