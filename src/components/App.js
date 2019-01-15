import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  

  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
      axios
    .get('https://practiceapi.devmountain.com/api/posts')
    .then(response => {
      console.log(response);
      this.setState({posts: response.data})
    })
  }

  updatePost(id, text) {
    axios
    .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
    .then(res => {
      console.log(res);
      this.setState({posts: res.data})
      
    })
    .catch(error => console.log(error)
    )
  }

  deletePost(id) {
    axios
    .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(results => {
      console.log(results);
      this.setState({posts: results.data})
    })
  }

  createPost(text) {
    axios
    .post(`https://practiceapi.devmountain.com/api/posts`, { text })
    .then(results => {
      console.log(results)
      this.setState({posts: results.data})
    })
  }


  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose
          createPostFn={this.createPost}
          />


          { posts.map(posts => (
                <Post key={posts.id} 
                text= {posts.text}
                date = {posts.date} 
                updatePostFn = {this.updatePost}
                id={posts.id}
                deletePostFn = {this.deletePost}
                />
                ))
          }
          
          
        </section>
      </div>
    );
  }
}

export default App;
