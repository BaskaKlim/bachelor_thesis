import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateInnovation, deleteInnovation } from '../actions/innovations';
import InnovationDataService from '../service/innovation.service';
import Card from './atoms/innovations/card';

class InnovationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovations: [],
    };
  }

  componentDidMount() {
    InnovationDataService.getAllInnovations()
      .then((response) => {
        this.setState({ innovations: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { innovations } = this.state;

    return (
      <div>
        <h4>List of Innovations</h4>
        {innovations.length > 0 ? (
          <ul>
            {innovations.map((innovation) => (
              <div key={innovation.id}>
                <Card innovation={innovation} />
              </div>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

  const mapStateToProps = (state) => ({
    innovations: state.innovations,
    });
    
    export default connect(mapStateToProps, { updateInnovation, deleteInnovation })(
    InnovationsList
    );
