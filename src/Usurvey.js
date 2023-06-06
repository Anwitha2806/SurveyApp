import React,{Component} from "react";
import firebase from "firebase/compat/app"
import "firebase/compat/database"


//var firebase = require('firebase')
var uuid = require('uuid')


const firebaseConfig = {
    apiKey: "AIzaSyCuUf9In5OyRkxLDbuB-n2Snc0TghDKzTY",
    authDomain: "u-survey-ca711.firebaseapp.com",
    databaseURL: "https://u-survey-ca711-default-rtdb.firebaseio.com",
    projectId: "u-survey-ca711",
    storageBucket: "u-survey-ca711.appspot.com",
    messagingSenderId: "23948035483",
    appId: "1:23948035483:web:43864b58a9ee4d572e0d3e",
    measurementId: "G-WT539HHYQW"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

class Usurvey extends Component{

    nameSubmit(event){
        var studentName=this.refs.name.value;
        this.setState({studentName: studentName}, function(){
            console.log(this.state)

        })
    }

    answerSelected(event){
        var answers = this.state.answers
        if(event.target.name==='answer1'){
            answers.answer1 = event.target.value
        }else if (event.target.name==='answer2'){
            answers.answer2 = event.target.value
        }else if (event.target.name==='answer3'){
            answers.answer3 = event.target.value
        }

        this.setState({answers:answers},function(){
            console.log(this.state)
        })
    }

    questionSubmit(){

        firebase.database().ref('Usurvey/'+this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers

        })

        this.setState({isSubmitted:true})

    }

    constructor(props){
        super(props)

        this.state={
            uid : uuid.v1(),
            studentName: '',
            answers :{
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
        }
        this.nameSubmit = this.nameSubmit.bind(this)
        this.answerSelected = this.answerSelected.bind(this)
        this.questionSubmit = this.questionSubmit.bind(this)
    }
    render(){
        var studentName;
        var questions;

        if (this.state.studentName === '' && this.state.isSubmitted === false){
            studentName = <div>
                <h1>Please enter your name</h1>
                <form onSubmit={this.nameSubmit}>
                    <input className="namy" type="text" placeholder="Enter your name" ref="name" />
                </form>
            </div>
            questions = ''
        }else if (this.state.studentName != '' && this.state.isSubmitted === false){
            studentName = <h1>Welcome to the Survey App, {this.state.studentName}</h1>
            questions = <div>
                <h2>Exciting questions here</h2>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What kind of courses do you like the most?</label><br/>
                        <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/>Technology
                        <input type="radio" name="answer1" value="Digital Marketing" onChange={this.answerSelected}/>Digital Marketing
                        <input type="radio" name="answer1" value="Arts" onChange={this.answerSelected}/>Arts

                    </div>
                    <div className="card">
                        <label>What course are you pursuing currently?</label><br/>
                        <input type="radio" name="answer2" value="Graduate" onChange={this.answerSelected}/>Graduate
                        <input type="radio" name="answer2" value="Undergraduate" onChange={this.answerSelected}/>Undergraduate
                        <input type="radio" name="answer2" value="High school" onChange={this.answerSelected}/>High school

                    </div>
                    <div className="card">
                        <label>Do you wish to enroll for online courses?</label><br/>
                        <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected}/>Yes
                        <input type="radio" name="answer3" value="No" onChange={this.answerSelected}/>No
                        <input type="radio" name="answer3" value="Not sure" onChange={this.answerSelected}/>Not sure

                    </div>
                    <input className="feedback-button" type="submit" value="submit"/>
                </form>
            </div>
        }else if (this.state.isSubmitted === true) {
            studentName= <h1>Thank you submitting your feedback, {this.state.studentName}</h1>
        }
        return(
            <div>
                {studentName}
                -------------------------------
                {questions}
            </div>
        )
    }
}
export default Usurvey;