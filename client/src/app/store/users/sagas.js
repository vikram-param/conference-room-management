import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import * as dataAccess from 'utils/ajax';
import { GET_USERS, ADD_USER, APPROVE } from 'constants/api-constants';

const getRequest = async (url, payload) =>
	await dataAccess.get(url, payload);

const postRequest = async (url, payload) =>
	await dataAccess.post(url, payload);

function* getUsers(data) {
	const { payload } = data;
	let url = GET_USERS;
	try {
		console.log("Get Users URL: ", url, " \n\n: payload", payload);
		let response = yield call(getRequest, url, payload);
		console.log('Get Users Response', response);
		response = dataAccess.parsePayload(response);
		if (0 === response.statusCode) {
			yield put(actions.getUsersSuccess(response.statusCode, response.response));
		} else {
			debugger;
			yield put(actions.getUsersError(response.statusCode, response.errMessage));
		}
	} catch (error) {
		yield put(actions.getUsersError(1));
	}
}

function* addUser(data) {
	const { payload } = data;
	let url = ADD_USER;
	try {
		debugger;
		console.log("Add User URL: ", url, " \n\n: payload", payload);
		let response = yield call(postRequest, url, payload);
		console.log('Add User Response', response);
		response = dataAccess.parsePayload(response);
		if (0 === response.statusCode) {
			debugger;
			yield put(actions.addUserSuccess(response.statusCode, response.successMessage));
		} else {
			debugger;
			yield put(actions.addUserError(response.statusCode, response.errMessage));
		}
	} catch (error) {
		yield put(actions.addUserError(1));
	}
}

function* approveUserTraining(data) {
	const { payload } = data;
	let url = APPROVE;
	try {
		debugger;
		console.log("Approve URL: ", url, " \n\n: payload", payload);
		let response = yield call(postRequest, url, payload);
		console.log('Approve user training Response', response);
		response = dataAccess.parsePayload(response);
		if (0 === response.statusCode) {
			debugger;
			yield put(actions.approveUserTrainingSuccess(response.statusCode, response.successMessage));
		} else {
			debugger;
			yield put(actions.approveUserTrainingError(response.statusCode, response.errMessage));
		}
	} catch (error) {
		yield put(actions.approveUserTrainingError(1));
	}
}

export default function* rootSaga() {
	yield all(
		[
			takeEvery(actions.GET_USERS, getUsers),
			takeEvery(actions.ADD_USER, addUser),
			takeEvery(actions.APPROVE_USER_TRAINING, approveUserTraining)
		]);
}