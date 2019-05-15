import React, { Component } from 'react';
import '../App.css';
import * as web3Utils from "../util/web3Utils";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  card: {
    minWidth: 275,
  },
});

class Server extends Component {
  constructor(props) {
    super(props)

    this.state={
      service : "",
      table : [],
      node : [],
      subscribers : "subscribers card",
      name : "{service registry}",
      contractAddress : ''

    }

  }

  componentDidMount() {
    this.getEthData();
    document.title = "Server Registry";

  }

  getEthData=() => {
    var self=this;
    web3Utils.getServices().then(services => {
      var seen={};
      services.map(service => {
        seen[service]=1;
        return service;
      })
      self.setState({table:Object.keys(seen)});
    })

    var contractAddress=web3Utils.getContractAddress();
    self.setState({contractAddress});
  }

  getService=(serviceId) => {
    var self=this;
    self.setState({name: 'Server ' + serviceId})
    web3Utils.getService(serviceId).then(service => {
      console.log(service);
      self.setState({ service: service[0].toString(),
                      name: service[1],
                      id: service[2],
                      owner: service[3],
                      stake: service[4].toString()});
    }).catch(error => {
      self.setState({ service: '',
        name: '',
        id: serviceId,
        owner: '',
        stake: ''

      });
    });
    web3Utils.getBootstraps(serviceId).then(bootstraps => {
      var seen={};
      bootstraps.map(bootstrap => {
        seen[bootstrap]=1;
        return bootstrap;
      })

      self.setState({node:Object.keys(seen)});
    }).catch(error => {
      self.setState({node:[]});
    });
  }

  render() {
    const { classes } = this.props;
    var self=this;

    return (

      <div className="App">
            <GridList className={classes.gridList}>

              {this.state.table.map(serviceId => {
                return <GridListTile key={"Server" + serviceId}
                          onClick={() => {
                            self.getService(serviceId);
                        }}

                          >
                  <GridListTileBar
                    title={"Server " + serviceId}
                    actionIcon={
                      <IconButton className={classes.icon}>
                        <CloudIcon />
                      </IconButton>
                    }
                    onMouseEnter={() => {
                      document.body.style.cursor='pointer';
                    }}
                    onMouseLeave={() => {
                      document.body.style.cursor='initial';

                    }}
                  />
                </GridListTile>
              })}
            </GridList>


        {this.state.service && this.state.node ?
        <Card className={classes.card}>
        <CardContent>
          <div className = "App-stats">
          <table width={'100%'}>
            <tbody>
                <tr>
                     <td style={{width: '50%', textAlign:'right'}}><b>Server:</b></td>
                     <td style={{width: '50%', textAlign:'left'}}> {this.state.service}
                     </td>
                 </tr>
                 <tr>
                     <td style={{width: '50%', textAlign:'right'}}><b>Name:</b></td>
                     <td style={{width: '50%', textAlign:'left'}}>{this.state.name}</td>
                 </tr>
                 <tr><td style={{width: '50%', textAlign:'right'}}><b>Contract Address:</b></td>
                     <td style={{width: '50%', textAlign:'left'}}> {this.state.contractAddress}</td>
                 </tr>
                 <tr><td style={{width: '50%', textAlign:'right'}}><b>Owner:</b></td>
                     <td style={{width: '50%', textAlign:'left'}}>{this.state.owner}</td>
                 </tr>
                 <tr><td style={{width: '50%', textAlign:'right'}}><b>ID:</b> </td>
                     <td style={{width: '50%', textAlign:'left'}}>{this.state.id}</td>
                 </tr>
                 <tr><td style={{width: '50%', textAlign:'right'}}><b>Stake:</b></td>
                     <td style={{width: '50%', textAlign:'left'}}>{this.state.stake}</td>
                 </tr>
                 <tr><td style={{width: '50%', textAlign:'right'}}><b>Node:</b></td>
                     <td style={{width: '50%', textAlign:'left'}}>
                          {this.state.node.map(address => {
                        return <div key={address}><font size={'2'}>
                        <a href={address} target="_newWindow">
                        {address}</a></font></div>
                      })}</td>
                 </tr>
                 <tr><td style={{width: '50%', textAlign:'right'}}><b>Subscribers:</b></td>
                     <td style={{width: '50%', textAlign:'left'}}></td>
                 </tr>
            </tbody>
          </table>

        </div>
        </CardContent>
        </Card>
        : null}

      </div>


    );
  }
}

Server.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Server);
