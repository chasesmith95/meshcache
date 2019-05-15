import React, { Component } from 'react';
import '../App.css';
import * as web3Utils from "../util/web3Utils";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import {DialogTitle, DialogContent } from './ServerInfo';

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
    color: 'white',
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
      contractAddress : '',
      dialogOpen: false,
      hasData:false,

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
    document.body.style.cursor='progress';
    self.setState({hasData: false, name: 'Server ' + serviceId})
    web3Utils.getService(serviceId).then(service => {
      console.log(service);
      self.setState({ service: service[0].toString(),
                      name: service[1],
                      id: service[2],
                      owner: service[3],
                      stake: service[4].toString(),
                      hasData:true
                    });
      document.body.style.cursor='initial';
    }).catch(error => {
      self.setState({ service: '',
        name: '',
        id: serviceId,
        owner: '',
        stake: ''

      });
      document.body.style.cursor='initial';
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

  handleClickOpen = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    var self=this;

    return (

      <div className="App">
            <GridList className={classes.gridList} style={{'marginTop':"100px"}}>

              {this.state.table.map(serviceId => {
                return <GridListTile key={"Server" + serviceId}
                          onClick={() => {
                            self.getService(serviceId);
                            if (!self.state.dialogOpen)
                             self.handleClickOpen();
                          }}
                        onMouseEnter={() => {
                          document.body.style.cursor='pointer';
                        }}
                        onMouseLeave={() => {
                          document.body.style.cursor='initial';
  
                        }}

                          >
                 <Card className={classes.card}>
                  <CardContent>
                    <h4>Server {serviceId} <IconButton className={classes.icon}>
                          <CloudIcon />
                        </IconButton>
                    </h4>
                    
                    {this.state.service === serviceId && this.state.hasData && this.state.service && this.state.node ?
                        <Dialog
                        onClose={this.handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={self.state.dialogOpen}
                        onBackdropClick={() => {
                          console.log(self.state.node);
                          self.handleClose();
  
                        }}
                      >
                        <DialogTitle id="customized-dialog-title" onClose={self.handleClose}>
                        Server {serviceId}
                        </DialogTitle>
                        <DialogContent>
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
                                    {self.state.node && self.state.node.length > 0 && self.state.node.toString().replace(/\W/g, '') ? 
                                      <tr><td style={{width: '50%', textAlign:'right'}}><b>Node:</b></td>
                                        <td style={{width: '50%', textAlign:'left'}}>
                                              {this.state.node.map(address => {
                                            return <span key={address}>
                                            <a href={address} target="_newWindow" >
                                            <font color={'white'} size={'2'}><b>{address}</b></font></a></span>
                                          })}</td>
                                    </tr>
                                        : null}
                                    
                                    <tr><td style={{width: '50%', textAlign:'right'}}><b>Subscribers:</b></td>
                                        <td style={{width: '50%', textAlign:'left'}}></td>
                                    </tr>
                                </tbody>
                              </table>

                            </div>
                            </CardContent>
                            </Card>
                          </DialogContent>
                      </Dialog>
                            : null}
                </CardContent>
                </Card>
                </GridListTile>
              })}
            </GridList>


       

      </div>


    );
  }
}

Server.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Server);
