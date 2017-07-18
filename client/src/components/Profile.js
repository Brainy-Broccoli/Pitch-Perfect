import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Image } from 'semantic-ui-react'

var sampleData = [
  {
    name: 'Michael',
    photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
    badges: ['https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg', 'https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg', 'https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg'],
    recent: [
      {
        deck: 'food',
        progress: 6,
        total: 13,
        accuracy: 89 + '%'
      },
      {
        deck: 'travel',
        progress: 8,
        total: 19,
        accuracy: 32 + '%'
      },
      {
        deck: 'food',
        progress: 7,
        total: 18,
        accuracy: 55 + '%'
      }
    ],
    mentor: {
      illegible: true,
      icon: 'https://static3.bigstockphoto.com/4/8/9/small2/98422448.jpg'
    }
  }
]

class Profile extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image style={{height: 241, width: 400}}src={sampleData[0].photo}/>
          {sampleData[0].name}
          <div>
          </div>
        </Grid.Column>
        <Grid.Column width={9}>
          <div>
            {sampleData[0].mentor.illegible ? <img style={{height: 40, width: 40}} src={sampleData[0].mentor.icon}/> : null}
          </div>
          {sampleData[0].badges.map((badge, index) => {
            return (<img key={index} style={{display: 'inline-block', height: 25, width: 25}} src={badge} />)
          })}
          <div>
            {this.props.profile.recent}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

// class Profile extends Component {
//   render() {
//     return (
//       <Grid>
//         <Grid.Column width={4}>
//           <Image src={this.props.profile.photo}/>
//           {this.props.profile.name}
//           <div>
//           </div>
//         </Grid.Column>
//         <Grid.Column width={9}>
//           {this.props.profile.badges}
//           <div>
//             {this.props.profile.mentor}
//           </div>
//           <div>
//             {this.props.profile.recent}
//           </div>
//         </Grid.Column>
//       </Grid>
//     )
//   }
// }

function mapStateToProps(state) {
  // Whatever is returned will show up as props 
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(Profile);