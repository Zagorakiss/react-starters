import React, {PureComponent} from 'react';
import styled from 'styled-components';
import i18n from 'config/i18n';

const langs = [
  {
    name: 'EN',
    lang: 'en'
  },
  {
    name: 'RUS',
    lang: 'ru'
  }
]

class LangSwitcher extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            langMenuOpened: false,
            currentLang: 'en'
        }
    }

    toggleLangMenu = () => {
        this.setState((prevState) => ({
            langMenuOpened: !prevState.langMenuOpened
        }));
    }

    closeLangMenu = () => {
        setTimeout(() => {
            this.setState(() => ({
                langMenuOpened: false
            }));
        }, 300);
    }

    setLang = (lang) => {
        i18n.changeLanguage(lang);
        this.setState(() => ({
            currentLang: lang
        }));
    }

    componentDidMount() {
        if (process.browser) {
            this.setLang(localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'en');
        }
    }

    render () {
        return (
            <LangsContainer>
                <Trigger
                    onClick={this.toggleLangMenu}
                    onBlur={this.closeLangMenu}
                    tabIndex={0}
                >
                    {this.state.currentLang}
                </Trigger>
                {
                    this.state.langMenuOpened &&
                        <Langs>
                            {langs.map( (item, key) => {
                                return (
                                    <LangsItem
                                        key={key}
                                        onClick={() => this.setLang(item.lang)}
                                    >
                                        {item.name}
                                    </LangsItem>
                                );
                            })}
                        </Langs>
                }
            </LangsContainer>
        )
    }
}

export default LangSwitcher;

const LangsContainer = styled.div`
    position: relative;
`

const Trigger = styled.div`
    // size: 40px;
    display: flex;
    font-size: 14px;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
    cursor: pointer;
    outline: none;
`

const Langs = styled.div`
    display: flex;
	justify-content: space-around;
  	flex-direction: column;
	width: 60px;
	position: absolute;
	top: 30px;
    left: -8px;
	background: #22223b;
	/* padding: 5px; */
	padding: 0;
	border: 1px solid #22223b;
	border-radius: 0px;
	opacity: 1;
	animation-name: fadeIn;
    animation-duration: .3s;
    box-shadow: 0 0px 12px -4px #36353b;
    &::before {
        height: 0;
        width: 0;
        content: '';
        display: block;
        position: absolute;
        top: -7px;
        right: 22px;
        border-bottom: 7px solid #22223b;
        border-right: 7px solid transparent;
        border-left: 7px solid transparent;
    }
`
const LangsItem = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
	width: 100%;
	padding: 25px 6px;
	text-decoration: none;
	color: #20d375;
	font-size: 14px;
    font-weight: 400;
	border-bottom: 1px solid #dddedf0f;
    transition: all .2s ease;
    cursor: pointer;
    z-index: 10;
    &::before {
        z-index: -1;
        content: '';
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
        background: transparent;
        transition: all .2s ease;
    }
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        color: white;
        &::before {
            background: #ea4949;
            width: 36px;
            height: 36px;
            border-radius: 18px;
            top: calc(50% - 18px);
            left: calc(50% - 18px);
        }
    }
    &:active {
        &::before {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            top: calc(50% - 25px);
            left: calc(50% - 25px);
            transition: all .1s ease;
        }
    }
    &_current {
        // color: #20d375;
    }
`