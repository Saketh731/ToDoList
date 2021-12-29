import React, { Component } from 'react';
import ToDoList from '../../components/ToDoList';
import '../../assets/styles/CoreStyles.css'

class CoreLayout extends Component {
    render() {
        return (
            <ToDoList />
        )
    }
}

export default CoreLayout;