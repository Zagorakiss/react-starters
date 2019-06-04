import * as React from 'react';
import {translate} from 'react-i18next';
import * as _ from 'lodash';
import Popup from './popup';

class Orbits extends React.Component {

    constructor(props) {

        super(props);
        // Создаем объект, ключами которого являются годы с 2009 по нынешний, а значениями - пустые массивы
        const data = {};
        for (let i = 2009, l = (new Date()).getFullYear(); i <= l; i++) {
            data[i.toString()] = {}
        }
        // Размер промежутка между орбитами
        this.gap = 40;
        // Радиус центрального круга
        this.radius = 79;
        this.logos = {};
        this.dict = {};
        this.temp = [];
        // Параметры для заливки точек, которая зависит от значения капитализации проекта поделенной на this.majorMarketcap
        this.marketcapColors = [
            {pct: 0.0,
                color: {
                    r: 0x20,
                    g: 0xD3,
                    b: 0x75
                }
            },
            {pct: 0.5,
                color: {
                    r: 0x1E,
                    g: 0x7B,
                    b: 0x96
                }
            },
            {pct: 1.0,
                color: {
                    r: 0x40,
                    g: 0x11,
                    b: 0x8E
                }
            }
        ];
        // Если капитализация проекта больше или равна это параметру, то показываем логотип проекта вместо точки с заливкой
        this.majorMarketcap = 200000;
        // this.majorMarketcap = 5000;
        this.gate = 150000;
        // this.gate = 1000;
        // Создаем дефолтный стейт с ранее созданным объектом data и пустой хэш-таблицей
        this.defaultState = {
            data,
            hiddenYears: [],
            zoomLevel: {
                actual: 1.0,
                prev: 1.0
            },
            dragData: undefined,
            dragOffset: {
                actual: {
                    x: 0,
                    y: 0
                },
                prev: {
                    x: 0,
                    y: 0
                }
            },
            popup: {
                isActive: false,
                data: {}
            },
            event: 0
        };
        // Создаем стейт
        this.state = this.getStateFromProps(props, this.defaultState, true);

    }

    componentDidMount() {
        // Высчитываем координаты центра canvas
        this.setState({
            mounted: true
        })

    }

    // componentDidUpdate(prevProps, prevState) {
    //     // Если props.data не совпадают (например при фильтрации), сетим новый стейт и перерисовываем canvas
    //     if (!_.isEqual(prevProps.data, this.props.data)) {
    //         this.setState(this.getStateFromProps(this.props, this.state));
    //     }
    // }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(nextProps.data, this.props.data)) {
            this.setState(this.getStateFromProps(nextProps, this.state));
            return false;
        }
        return true;
    }

    getStateFromProps(props, state, isInitial = false) {

        const preparedData = _.cloneDeep(state);

        if (isInitial) {
            Object.keys(props.data)
                .forEach((year, i, years) => {
                    Object.values(props.data[year])
                        .forEach((project, j, projects) => {
                            preparedData.data[year][project.key] = {
                                ...props.data[year][project.key],
                                isActive: true
                            };
                            // this.logos[project.key] = project.logo;
                            // if (i === years.length - 1 && j === projects.length - 1) {
                            //     this.cache.loadImages(this.logos);
                            // }
                        });
                });
        } else {
            Object.keys(preparedData.data)
                .forEach((year) => {
                    let isHiddenYear = true;
                    Object.keys(preparedData.data[year])
                        .forEach((key) => {
                            if (props.data[year][key]) {
                                preparedData.data[year][key] = {
                                    ...props.data[year][key],
                                    isActive: preparedData.data[year][key],
                                    coords: preparedData.data[year][key].coords,
                                    bounds: preparedData.data[year][key].bounds
                                };
                                if (isHiddenYear) {
                                    isHiddenYear = false;
                                }
                            } else {
                                preparedData.data[year][key].isActive = false;
                            }
                        });

                    const yearIndex = preparedData.hiddenYears.indexOf(year);

                    if (isHiddenYear) {
                        if (yearIndex === -1) {
                            preparedData.hiddenYears.push(year);
                        }
                    } else {
                        if (yearIndex > -1) {
                            preparedData.hiddenYears.splice(yearIndex, 1);
                        }
                    }

                    preparedData.event = 3;
                });
        }

        return preparedData;

    }

    drawYears() {
        let newState = _.cloneDeep(this.state);

        this.center = {
            x: this.element.width.baseVal.value / 2,
            y: this.element.height.baseVal.value / 2
        };
        return Object
            .keys(this.state.data)
            .map((year, i, years) => {
                const {zoomLevel} = newState;
                let stroke = ''
                if (this.state.hiddenYears.indexOf(year) !== -1) {
                    stroke = '#45464b00';
                } else if (i === 0 || i === years.length - 1) {
                    stroke = '#7d7bf7';
                } else {
                    stroke = '#45464b';
                }
                const r = (this.radius + this.gap * i) * zoomLevel.actual;
                const cycle = {
                    isLastYear: i === years.length - 1,
                    year,
                    r,
                    entropy: Math.random() * Math.PI
                };
                if (i === 0) {
                    this.temp = [];
                }
                this.temp.push({
                    projects: newState.data[year],
                    cycle,
                    newState
                });
                return (
                    <React.Fragment key={i}>
                        <circle
                            cx={this.center.x + newState.dragOffset.actual.x}
                            cy={this.center.y + newState.dragOffset.actual.y}
                            r={r}
                            fillOpacity="0"
                            stroke={stroke}
                            strokeDasharray="5 5"
                        />
             f           {i === years.length - 1 && this.drawProjects()}
                    </React.Fragment>
                );
            })
    }

    drawProjects() {

        return this.temp.map((item) => {
            const {projects, cycle, newState} = item;
            const {isLastYear, r, entropy} = cycle;
            const {zoomLevel} = newState;

            return Object.values(projects)
                .map((project, i, arr) => {

                    // Находим угол относительно начала координат, на котором будет находиться объект на окружности орбиты
                    const angle = (i / (arr.length / 2)) * Math.PI + entropy;
                    // Узнаем, какого размера будет точка с проектом. Если капитализация больше this.majorMarketcap, то
                    // радиус будет 18 пикселей и вместо точки с заливкой будет отрисовано лого проекта
                    const isMajor = project.marketcap >= this.majorMarketcap / (this.state.zoomLevel.actual / 2);
                    const projectRadius = isMajor ? 18 : 5;

                    let x,
                        y;

                    switch (newState.event) {
                        case 0:
                            x = this.center.x + newState.dragOffset.actual.x + (r * zoomLevel.actual * Math.cos(angle));
                            y = this.center.y + newState.dragOffset.actual.y + (r * zoomLevel.actual * Math.sin(angle));
                            break;
                        case 1:
                            x = (this.dict[project.key].coords.x - this.center.x - newState.dragOffset.prev.x) / newState.zoomLevel.prev * newState.zoomLevel.actual + this.center.x + newState.dragOffset.actual.x;
                            y = (this.dict[project.key].coords.y - this.center.y - newState.dragOffset.prev.y) / newState.zoomLevel.prev * newState.zoomLevel.actual + this.center.y + newState.dragOffset.actual.y;
                            break;
                        case 2:
                        case 3:
                            x = (this.dict[project.key].coords.x - this.center.x - newState.dragOffset.prev.x) + this.center.x + newState.dragOffset.actual.x;
                            y = (this.dict[project.key].coords.y - this.center.y - newState.dragOffset.prev.y) + this.center.y + newState.dragOffset.actual.y;
                            break;
                        default:
                            break;
                    }

                    this.dict[project.key] = {
                        ...project,
                        bounds: [
                            [x - projectRadius, x + projectRadius],
                            [y - projectRadius, y + projectRadius]
                        ],
                        coords: {
                            x,
                            y
                        }
                    };

                    if (project.key === 'FFF') {
                        console.log(project.isActive)
                    }

                    if (project.isActive && project.marketcap > this.gate / this.state.zoomLevel.actual) {
                        if (isMajor) {

                            // Если проект с большой капитализацией, отрисовываем лого проекта
                            const imgSide = projectRadius * 2 - 4; // Вычисляем размеры квадрата с логотипом;
                            // Фон под логотипом
                            return (
                                <React.Fragment key={i}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={projectRadius + 3}
                                        fill={this.getColorForPercentage(1.0)}
                                        filter='url(#blur)'
                                    />
                                    <image
                                        className="clickable"
                                        onClick={() => {
                                            console.log(project);
                                            this.setState({
                                                popup: {
                                                    isActive: true,
                                                    data: project,
                                                    coords: this.dict[project.key].coords
                                                }
                                            });
                                        }}
                                        href={project.logo}
                                        x={x - projectRadius + 2}
                                        y={y - projectRadius + 2}
                                        height={`${(projectRadius * 2) - 4}px`}
                                        width={`${(projectRadius * 2) - 4}px`}
                                    />
                                </React.Fragment>
                            )

                        }
                        // // Если нет, отрисовываем точку с заливкой
                        return (
                            <circle
                                className="clickable"
                                onClick={() => {
                                    this.setState({
                                        popup: {
                                            isActive: true,
                                            data: project,
                                            coords: this.dict[project.key].coords
                                        }
                                    });
                                }}
                                key={i}
                                cx={x}
                                cy={y}
                                r={projectRadius}
                                fill={this.getColorForPercentage(project.marketcap / this.majorMarketcap)}
                            />
                        );

                    }

                });
        })

    }

    shiftProjects() {

        // Сдвигаем проекты с орбит на случайное значение от -3 до 3 пикселей
        let shiftSize = Math.floor(Math.random() * 3) + 1;
        shiftSize *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
        return shiftSize;

    }

    getColorForPercentage(pct) {

        // Метод, который возвращает оттенок цвета в зависимости от процентного значения из аргументов
        // и градиента из this.marketcapColors
        let j = 0;
        for (let i = 0, l = this.marketcapColors.length; i < l; i++) {
            // Определяем, в каком диапазоне лежит значение из аргумента
            if (pct <= this.marketcapColors[i + 1].pct) {
                j = i;
                break;
            }
        }

        const lower = this.marketcapColors[j]; // Нижняя граница диапазона
        const upper = this.marketcapColors[j + 1]; // Верхняя граница диапазона
        const range = upper.pct - lower.pct;
        const rangePct = (pct - lower.pct) / range;
        const pctLower = 1 - rangePct;
        const pctUpper = rangePct;

        const toHex = (key) => {
            const shade = Math.floor(lower.color[key] * pctLower + upper.color[key] * pctUpper);
            return ('0' + parseInt(shade, 10)
                .toString(16)).slice(-2);
        };
        // Возвращает оттенок цвета в HEX
        return `#${toHex('r')}${toHex('g')}${toHex('b')}`;

    }

    handleZoom(level) {
        this.setState((prevState) => {
            const newActualZoomLevel = prevState.zoomLevel.actual + level;
            const isAlright = newActualZoomLevel >= 0.6 && newActualZoomLevel <= 10;
            return {
                zoomLevel: {
                    actual: isAlright ? newActualZoomLevel : prevState.zoomLevel.actual,
                    prev: prevState.zoomLevel.actual
                },
                popup: {
                    isActive: false,
                    data: {}
                },
                event: 1
            }
        });
    }

    maybeDrag(event) {
        event.persist();
        const {dragData} = this.state;
        if (!dragData) {
            this.setState((prevState) => {
                return {
                    dragData: {
                        x: event.clientX,
                        y: event.clientY,
                        dOx: prevState.dragOffset.actual.x,
                        dOy: prevState.dragOffset.actual.y
                    },
                    event: 2
                }
            })
        }
    }

    stopDrag(event) {
        event.persist();
        const {dragData} = this.state;
        if (dragData) {
            this.setState((prevState) => {
                return {
                    dragOffset: {
                        actual: {
                            x: prevState.dragData.dOx + (event.clientX - dragData.x),
                            y: prevState.dragData.dOy + (event.clientY - dragData.y)
                        },
                        prev: prevState.dragOffset.actual
                    },
                    dragData: null
                }
            });
        }
    }

    canvasMove(event) {
        event.persist();
        const {dragData} = this.state;
        if (dragData) {
            this.setState((prevState) => {
                return {
                    dragOffset: {
                        actual: {
                            x: dragData.dOx + (event.clientX - dragData.x),
                            y: dragData.dOy + (event.clientY - dragData.y)
                        },
                        prev: prevState.dragOffset.actual
                    }
                }
            });
        }
    }

    handleClick(event) {
        if (event.type !== 'contextmenu') {
            // Находим координаты клика относительно элемента canvas
            // const rect = this.element.getBoundingClientRect();
            // const clickX = event.clientX - rect.left;
            // const clickY = event.clientY - rect.top;
            // const coords = [clickX, clickY];
            //
            // // Проверяем по хэш-таблице, есть ли в ней проект, множество координат площади которого включает в себя координаты клика
            //
            // Object
            //     .values(this.state.data)
            //     .forEach((projects) => {
            //         Object.values(projects).forEach((project) => {
            //             if (
            //                 coords[0] > project.bounds[0][0] &&
            //                 coords[0] < project.bounds[0][1] &&
            //                 coords[1] > project.bounds[1][0] &&
            //                 coords[1] < project.bounds[1][1] &&
            //                 project.isActive
            //             ) {
            //                 this.setState({
            //                     popup: {
            //                         isActive: true,
            //                         data: project
            //                     }
            //                 });
            //             }
            //         })
            //     });
        } else {
            event.preventDefault();
        }

    }

    handleClose() {
        this.setState({
            popup: {
                isActive: false,
                data: {}
            }
        });
    }

    render() {
        const {popup} = this.state;
        return (
            <div className="orbits">
                <svg
                    ref={(el) => this.element = el}
                    width={window.innerWidth}
                    // height={window.innerHeight - 77}
                    height={window.innerHeight + 200}
                    // height={window.innerWidth}
                    // onClick={(event) => this.handleClick(event)}
                    onMouseDown={(event) => this.maybeDrag(event)}
                    onMouseUp={(event) => this.stopDrag(event)}
                    onMouseMove={(event) => this.canvasMove(event)}
                    // onContextMenu={(event) => this.handleClick(event)}
                >
                    <defs>
                        <filter id="blur">
                            <feGaussianBlur stdDeviation="4" />
                        </filter>
                    </defs>
                    {this.state.mounted && this.drawYears()}
                </svg>


                <div className="zoom">
                    <button
                        className="zoom__btn zoom__btn_in"
                        onClick={() => this.handleZoom(0.2)}
                    >
                        <span className="zoom__icon icon-plus" />
                    </button>
                    <button
                        className="zoom__btn zoom__btn_out"
                        onClick={() => this.handleZoom(-0.2)}
                    >
                        <span className="zoom__icon icon-minus" />
                    </button>
                </div>
                {
                    popup.isActive &&
                    <Popup data={popup.data} handleClose={() => this.handleClose()} coords={popup.coords} />
                }
            </div>
        );
    }
}

export default translate('home')(Orbits);
