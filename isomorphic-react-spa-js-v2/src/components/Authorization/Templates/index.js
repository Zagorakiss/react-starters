import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Template = (props) => {
  const options = {
    wide: props.wide
  }
  let icon
  if (props.icon) {
    icon = <IconContainer>
      {props.icon}
    </IconContainer>
  }
  return (
    <Content {...options}>
      {icon}
      <Heading>
        {props.heading}
      </Heading>
      {props.children}
    </Content>
  )
}

Template.propTypes = {
  heading: PropTypes.string.isRequired,
  icon: PropTypes.node,
  children: PropTypes.node,
  wide: PropTypes.bool
}

const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 40px 15px 0;
box-sizing: border-box;
padding-bottom: 45px;
@media (min-width: 600px) {
  padding: 70px 0;
}
width: 100%;
@media (min-width: 500px) {
  ${props => props.wide ? 'width: 100%'
    : 'width: 440px'
  };
}
@media (min-width: 640px) {
  ${props => props.wide && 'width: 640px'};
}
`

const IconContainer = styled.div`
margin-top: 20px;
margin-bottom: 15px;
@media (min-width: 600px) {
  margin-top: 0;
  margin-bottom: 35px;
}
`

const Heading = styled.h1`
margin: 0;
margin-bottom: 30px;
padding: 0;
text-align: center;
line-height: 45px;
font-size: 26px;
@media (min-width: 600px) {
  font-size: 36px;
}
font-weight: 300;
color: var(--charcoal-grey-two);
`
