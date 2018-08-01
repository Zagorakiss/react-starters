import React from 'react';
// import {Template} from '../Templates/index';
// import {Description} from '../Templates/Description';
import {translate} from 'react-i18next';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const EmailConfirmed = translate('authorization')(props =>
  <div className="login-container">
    <div className="login login_confirm">
      <div className="login__title">{props.t('emailConfirmed.heading')}</div>
      <Container>
        <div className="login__text">
          {props.t('emailConfirmed.text')}
        </div>
        <Link to="/login" className="button login__btn login__btn_big">
          {props.t('emailConfirmed.button')}
        </Link>
        {/* <button type="button" fullWidth link to="/login">
          {props.t('emailConfirmed.button')}
        </button> */}
      </Container>
    </div>
  </div>
)

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
height: 120px;
`
