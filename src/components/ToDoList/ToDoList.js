import React, { Component } from 'react';
import './ToDoList.css';

class ToDoList extends Component {

  constructor(props) {
    super(props);
    this.state = { formData: [], currentData: {}, viewData: false, formErrors: [] };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.viewData = this.viewData.bind(this);
    this.editFormData = this.editFormData.bind(this);
    this.deleteFormData = this.deleteFormData.bind(this);
  }

  //Add inital data into local storage
  componentWillMount() {
    document.title = "TodoList"
  }


  handleFormChange(eve) {
    let key = eve.target.type == "radio" ? eve.target.name : eve.target.id;
    let value = eve.target.value;
    this.setState((state, props) => ({
      currentData: { ...state.currentData, [key]: value }
    }));
  }

  validateData(currentData) {
    let formErrors = this.state.formErrors ? this.state.formErrors : [];
    let name = currentData["name"];
    let email = currentData["email"];
    let mobileNo = currentData["mobileNo"];
    let project = currentData["project"];
    let task = currentData["task"];
    let startDate = currentData["startDate"];
    let targetDate = currentData["targetDate"];
    let status = currentData["status"];
    if(name && email && mobileNo && project && task && startDate && targetDate && status ){
      if (!email.match(/[a-zA-Z0-9_][^@.]*@gmail[.](in|com)/)) {
        formErrors.push("Email not in correct format, should be in (abc@gmail.com|in)")
      }
      if (!mobileNo.match(/(0|91)?[7-9][0-9]{9}/)) {
        formErrors.push("Mobile number not in correct format")
      }
    }
    else{
      formErrors.push("All Fields required");
    }
    
    this.setState((state, props) => ({
      formErrors: formErrors
    }));
    if (formErrors.length > 0)
      return false;
    else
      return true;
  }

  handleSave(eve) {
    eve.preventDefault();
    let formData = this.state.formData ? this.state.formData : [];
    let currentData = this.state.currentData ? this.state.currentData : {};
    currentData["Edit/Delete"] = "";
    let validation = this.validateData(currentData);
    if (validation) {
      if (this.state.editForm) {
        formData[this.state.editIndex] = currentData;
        this.setState((state, props) => ({
          currentData: {},
          formData: formData,
          viewData: false,
          editForm: false,
          editIndex: undefined,
        }));
      }
      else {
        if (Object.keys(currentData).length > 0)
          formData.push(currentData);
        this.setState((state, props) => ({
          currentData: {},
          formData: formData,
          viewData: false,
          editForm: false,
          deleteForm: false
        }));
      }
    }
  }

  viewData(eve) {
    eve.preventDefault();
    this.setState((state, props) => ({
      viewData: true
    }));
  }

  editFormData(eve, index) {
    eve.preventDefault();
    this.setState((state, props) => ({
      editForm: true,
      editIndex: index,
      viewData: false,
      currentData: this.state.formData[index] ? this.state.formData[index] : {}
    }));
  }

  deleteFormData(eve, index) {
    eve.preventDefault();
    let formData = this.state.formData ? this.state.formData : [];
    let currentData = this.state.currentData ? this.state.currentData : {};
    currentData["Edit/Delete"] = "";
    delete formData[index]
    this.setState((state, props) => ({
      currentData: {},
      formData: formData,
      viewData: false,
      deleteForm: false,
      deleteIndex: undefined,
    }));
  }


  render() {
    return (
      <div>
        <form className="d-flex flex-column">
          {this.state.formErrors && this.state.formErrors.length > 0 ?
            <div className="mb-3">
              {this.state.formErrors.map((err, index) => {
                return (
                  <p className="text-danger mt-3">{err}</p>
                )
              })
              }
            </div>
            : null}
          <div>
            <input type="text" required id="name" value={this.state.currentData.name ? this.state.currentData.name : ''} onChange={this.handleFormChange} placeholder="Enter Name" />
          </div>
          <div>
            <input type="email" required id="email" value={this.state.currentData.email ? this.state.currentData.email : ''} onChange={this.handleFormChange} placeholder="E-mail ID" pattern="[a-zA-Z0-9_][^@.]*@gmail[.](in|com)" />
            <input type="number" required id="mobileNo" value={this.state.currentData.mobileNo ? this.state.currentData.mobileNo : ''} onChange={this.handleFormChange} placeholder="Mobile number" pattern="/(0|91)?[7-9][0-9]{9}/g" />
          </div>
          <div>
            <input type="text" required id="project" value={this.state.currentData.project ? this.state.currentData.project : ''} onChange={this.handleFormChange} placeholder="Project Name" />
          </div>
          <div>
            <input type="text" required id="task" value={this.state.currentData.task ? this.state.currentData.task : ''} onChange={this.handleFormChange} placeholder="Task Description" />
          </div>
          <div>
            <input type="date" required id="startDate" value={this.state.currentData.startDate ? this.state.currentData.startDate : ''} onChange={this.handleFormChange} placeholder="Start Date" />
            <input type="date" required id="targetDate" value={this.state.currentData.targetDate ? this.state.currentData.targetDate : ''} onChange={this.handleFormChange} placeholder="Target Date" />
          </div>
          <div>
            <p>Task Status: </p>
            <input type="radio" name="status" required value="planned" checked={this.state.currentData.status == "planned" ? true : false} onChange={this.handleFormChange} /> <span>Planned</span>
            <input type="radio" name="status" required value="inProgress" checked={this.state.currentData.status == "inProgress" ? true : false} onChange={this.handleFormChange} /> <span>In-Progress</span>
            <input type="radio" name="status" required value="done" checked={this.state.currentData.status == "done" ? true : false} onChange={this.handleFormChange} /> <span>Done</span>
          </div>
          <div>
            <input type="submit" onClick={this.handleSave} />
          </div>
          <div>
            <button onClick={this.viewData}>View</button>
          </div>
          {this.state.viewData ?
            <table>
              <tr>
                {Object.keys(this.state.formData[0] ? this.state.formData[0] : {}).map((key) => {
                  return (
                    <th>{key.toUpperCase()}</th>
                  )
                })}
              </tr>
              {
                this.state.formData.map((data, index) => {
                  return (
                    <tr>
                      {Object.keys(data).map((key) => {
                        if (key == "Edit/Delete") {
                          return (
                            <td><button onClick={(e) => this.editFormData(e, index)}>Edit</button><button onClick={(e) => this.deleteFormData(e, index)}>Delete</button></td>
                          )
                        }
                        else {
                          return (
                            <td>{data[key]}</td>
                          )
                        }
                      })}
                    </tr>
                  )
                })
              }
            </table>
            : null
          }
        </form>
      </div>
    )
  }
}

export default ToDoList;
