import React from "react";
import Navbar from "./Navbar";
import data from "../mocks/fe_data";
import {ChartistGraph} from "react-chartist";
// {"timestamp": "2017-12-31 23:59:54", "energy": 326085.0, "energy_delta": 15.0, "crypto_balance": 9939.4, "last_crypto_change": 60.6}

class Dashboard extends React.Component {
  state = {
    energy: 0,
    crypto_balance: 0,
    currentIndex: 0,
  };

  componentWillMount() {
    setInterval(() => {
      this.setState(prevState => ({
        energy: data[prevState.currentIndex].energy,
        crypto_balance: data[prevState.currentIndex].crypto_balance,
        currentIndex: prevState.currentIndex + 1,
      }));
    }, 1000);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main-panel">
          <nav className="navbar navbar-default navbar-fixed">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navigation-example-2"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="#">
                  Панель пользователя
                </a>
              </div>
            </div>
          </nav>

          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="header">
                      <h4 className="title">Ключевые показатели</h4>
                    </div>
                    <div className="content table-responsive table-full-width">
                      <table className="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>Текущее потребление энергии</th>
                            <th>Баланс</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{this.state.energy}</td>
                            <td>{this.state.crypto_balance}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="card">
                    <div className="header">
                      <h4 className="title">Динамика потребления</h4>
                    </div>
                    <div className="content">
                      <div id="chartHours" className="ct-chart" />

                      <div className="footer">
                        <div className="legend">
                          <i className="fa fa-circle text-info" /> Open
                          <i className="fa fa-circle text-danger" /> Click
                          <i className="fa fa-circle text-warning" /> Click
                          Second Time
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
