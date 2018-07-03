//@flow
import React, { Component } from 'react';


//list item
export const Notification = (props) => {
	const classes = "li-notification priority-"  + props.message.priority.toString();
	return <li className={classes}>{props.message.message}</li>
}

export const Toast = (props) => {
	return <div className="toast-notification priority-1">{props.toast.message}</div>
}
