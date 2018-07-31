import React from 'react'
import {Template} from '../Templates/index'
import {Description} from '../Templates/Description'
import {translate} from 'react-i18next'
import styled from 'styled-components'

export const EmailConfirmed = translate('authorization')(props =>
  <Template
    heading={props.t('emailConfirmed.heading')}>
    <Container>
      <Description>
        {props.t('emailConfirmed.text')}
      </Description>
      <button type="button" fullWidth link to="/login">
        {props.t('emailConfirmed.button')}
      </button>
    </Container>
  </Template>
)

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
height: 120px;
`
