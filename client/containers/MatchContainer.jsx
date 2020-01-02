import React from "react";
import axios from 'axios';
import MatchBtn from "../components/Match/MatchBtn"
import PassBtn from "../components/Match/PassBtn"
import Profile from "../components/Match/Profile";

class MatchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogList: [],
      currentPhoto: 0, 
      pass: false,
      like: false
    };
  }

  componentDidMount() {
    console.log('fetching data');
    this.fetchProfile();
  }

  handlePass = () => {
    this.setState(prevState => ({
      currentPhoto: prevState.currentPhoto += 1,
      dogPhoto: prevState.dogList[this.state.currentPhoto]
    }));
    console.log(this.state.currentPhoto)
  }

  fetchProfile = () => {
    console.log('im in fetchProfile');
    axios.get('/user/getOtherDogs', {
      params: {
        userId: this.props.userId
      }
    })
    .then(res => {
      this.setState(() => ({
        dogList: res.data,
      }))
    })
    .catch(function (error) {
      console.error(error);
    });
  }


  render() {
    console.log('this is match state', this.state);
    return (
      <>
        <Navigation signOut={this.signOut} handleClickMyAccount={this.toMyAccount} toChat ={this.toChat} toMatch={this.toMatch} />
        <Profile dogList={this.state.dogList} currentPhoto={this.state.currentPhoto} />
        <div>
          <PassBtn handlePass={this.handlePass} />
          <MatchBtn likeButton={this.likeButton} />
        </div>
      </>
    )
  }
}

export default MatchContainer;


