import actions from "./actions";

const initState = {
	users: [],
	addUserResponse: {}
};

export default function reducer(state = initState, action) {
	switch (action.type) {

		// Get Users
		case actions.GET_USERS:
			return {
				...state,
				loading: true
			};
		case actions.GET_USERS_SUCCESS_RESULT:
			return {
				...state,
				loading: false,
				users: action.result
			};
		case actions.GET_USERS_ERROR_RESULT:
			return {
				...state,
				loading: false
			};

		// Add User
		case actions.ADD_USER:
			return {
				...state,
				loading: true
			};
		case actions.ADD_USER_SUCCESS_RESULT:
			return {
				...state,
				loading: false,
				addUserResponse: {
					type: action.type,
					statusCode: action.saveStatusCode,
					message: action.message
				}
			};
		case actions.ADD_USER_ERROR_RESULT:
			return {
				...state,
				loading: false,
				addUserResponse: {
					type: action.type,
					statusCode: action.saveStatusCode,
					message: action.message
				}
			};

		// Reset Add User Response
		case actions.RESET_ADD_USER:
			return {
				...state,
				loading: false,
				addUserResponse: {}
			};

		// approve user training
		case actions.APPROVE_USER_TRAINING:
			return {
				...state,
				loading: true
			};
		case actions.APPROVE_USER_TRAINING_SUCCESS:
			return {
				...state,
				loading: false,
				approveUserTrainingResponse: {
					type: action.type,
					statusCode: action.saveStatusCode,
					message: action.message
				}
			};
		case actions.APPROVE_USER_TRAINING_ERROR:
			return {
				...state,
				loading: false,
				approveUserTrainingResponse: {
					type: action.type,
					statusCode: action.saveStatusCode,
					message: action.message
				}
			};
		
		// Reset Add User Response
		case actions.RESET_APPROVE_USER_TRAINING:
			return {
				...state,
				loading: false,
				approveUserTrainingResponse: {}
			};
			
		default:
			return state;
	}
}