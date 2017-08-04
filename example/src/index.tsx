import 'bootstrap/dist/css/bootstrap.css';

import * as React from "react";
import * as ReactDOM from "react-dom";

import {FormEvent} from "react";
import LoginForm from "./LoginForm";

ReactDOM.render(
    <div id="container" className="container" style={{width: '330px', margin: '2em auto',}}>
        <div className="panel panel-default">
            <div className="panel-heading">
                Login Form
            </div>
            <div className="panel-body">
                <LoginForm/>

            </div>
        </div>
    </div>,
    document.getElementById("content-overlay")
);