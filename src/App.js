import React, {Component} from 'react';
import MissionDetails from "./components/MissionDetails";
import querystring from 'querystring';
import './assets/styles/App.css';
import loader from './assets/images/loading.png';

const API_BASE_URL = "https://api.spacexdata.com/v3/launches?";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            filters: {
                limit: 100,
                launch_year: undefined,
                launch_success: undefined,
                land_success: undefined,
            },
        }

    }

    componentDidMount() {
        this.fetchMissionData(this.state.filters);
    }

    fetchMissionData(filters) {
        const URL = API_BASE_URL + querystring.stringify({...filters});
        this.setState({isLoaded: false, filters});
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    data
                });
            });
    }

    updateFilters(type, value) {
        if (this.state.filters[type] === value) {
            value = undefined;
        }

        const filters = {
            ...this.state.filters,
            [type]: value,
        };
        this.fetchMissionData(filters);
    }

    updateLaunchButtonClass = value => {
        let className = "App-filter-button ";
        className += (this.state.filters.launch_year === value.toString() ?
                        "success" : "outline-success");
        return className
    }

    render() {

        const {isLoaded, data} = this.state;
        const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);

        if (!isLoaded) {
            return <div className="App-loader-container">
                <div className="App-loader-box">
                    <img src={loader} alt="loading..."/>
                </div>
            </div>
        } else {

            return (
                <div className="App">
                    <h1 className="App-header">SpaceX Launch Programs</h1>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="card-container">
                                <div className="App-filter-card">
                                    <div className="card-body">
                                        <div className="App-filter-header">
                                            <h5>Filters</h5>
                                        </div>
                                        <p className="App-filter-heading-launch-year">
                                            Launch Year
                                            <hr className="App-filters-hr"/>
                                        </p>

                                        <div className="row">
                                            <div className="App-filter-button-container">
                                                {uniqueLaunchYears.map((year) => {
                                                    return (
                                                        <button
                                                            className={this.updateLaunchButtonClass(year)}
                                                            value={year}
                                                            onClick={(e) =>
                                                                this.updateFilters(
                                                                    "launch_year",
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            {year}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <p className="App-filter-heading">
                                            Successful Launch
                                            <hr className="App-filters-hr"/>
                                        </p>

                                        <div className="App-filter-button-container">
                                            <button
                                                className={this.state.filters.launch_success === "true"
                                                    ? "App-filter-button success" :
                                                    "App-filter-button outline-success"}
                                                onClick={(e) =>
                                                    this.updateFilters(
                                                        "launch_success",
                                                        e.target.value
                                                    )
                                                }
                                                value="true"
                                            >
                                                True
                                            </button>

                                            <button
                                                className={this.state.filters.launch_success === "false"
                                                    ? "App-filter-button success" :
                                                    "App-filter-button outline-success"}
                                                onClick={(e) =>
                                                    this.updateFilters(
                                                        "launch_success",
                                                        e.target.value
                                                    )
                                                }
                                                value="false"
                                            >
                                                False
                                            </button>
                                        </div>

                                        <p className="App-filter-heading">
                                            Successful Landing
                                            <hr className="App-filters-hr"/>
                                        </p>
                                        <div className="App-filter-button-container">
                                            <button
                                                className={this.state.filters.land_success === "true"
                                                    ? "App-filter-button success" :
                                                    "App-filter-button outline-success"}
                                                onClick={(e) =>
                                                    this.updateFilters("land_success", e.target.value)
                                                }
                                                value="true"
                                            >
                                                True
                                            </button>

                                            <button
                                                className={this.state.filters.land_success === "false"
                                                    ? "App-filter-button success" :
                                                    "App-filter-button outline-success"}
                                                onClick={(e) =>
                                                    this.updateFilters("land_success", e.target.value)
                                                }
                                                value="false"
                                            >
                                                False
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mission-container">
                                <div className="row">
                                    {data.map((details) => {
                                        return (
                                            <div className="mission-column">
                                                <MissionDetails details={details}/>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className="App-Developers-name">
                                Developed by : Subrat Kumar Dehury
                            </h5>
                        </div>
                    </div>
                </div>
            );
        }

    }
}
