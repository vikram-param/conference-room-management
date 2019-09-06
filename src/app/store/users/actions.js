const actions = {

   // Get Users
   GET_USERS: "GET_USERS",
   GET_USERS_SUCCESS_RESULT: "GET_USERS_SUCCESS_RESULT",
   GET_USERS_ERROR_RESULT: "GET_USERS_ERROR_RESULT",

   getUsers: (data) => ({
      type: actions.GET_USERS,
      payload: { data }
   }),
   getUsersSuccess: (saveStatusCode, result) => ({
      type: actions.GET_USERS_SUCCESS_RESULT,
      saveStatusCode,
      result
   }),
   getUsersError: (saveStatusCode, message) => ({
      type: actions.GET_USERS_ERROR_RESULT,
      saveStatusCode,
      message
   }),

   // Add User
   ADD_USER: "ADD_USER",
   ADD_USER_SUCCESS_RESULT: "ADD_USER_SUCCESS_RESULT",
   ADD_USER_ERROR_RESULT: "ADD_USER_ERROR_RESULT",

   addUser: (data) => ({
      type: actions.ADD_USER,
      payload: { data }
   }),
   addUserSuccess: (saveStatusCode, result) => ({
      type: actions.ADD_USER_SUCCESS_RESULT,
      saveStatusCode,
      result
   }),
   addUserError: (saveStatusCode, message) => ({
      type: actions.ADD_USER_ERROR_RESULT,
      saveStatusCode,
      message
   }),

   // Reset Add User Response
   RESET_ADD_USER: "RESET_ADD_USER",

   resetAddUser: () => ({
      type: actions.RESET_ADD_USER
   }),

    //Approve user training
    APPROVE_USER_TRAINING:"APPROVE_USER_TRAINING",
    APPROVE_USER_TRAINING_SUCCESS:"APPROVE_USER_TRAINING_SUCCESS",
    APPROVE_USER_TRAINING_ERROR:"APPROVE_USER_TRAINING_ERROR",

    approveUserTraining: (data) => ({
        type: actions.APPROVE_USER_TRAINING,
        payload: { data }
     }),
     approveUserTrainingSuccess: (saveStatusCode, result) => ({
        type: actions.APPROVE_USER_TRAINING_SUCCESS,
        saveStatusCode,
        result
     }),
     approveUserTrainingError: (saveStatusCode, message) => ({
        type: actions.APPROVE_USER_TRAINING_ERROR,
        saveStatusCode,
        message
     }),

     // Reset Add User Response
     RESET_APPROVE_USER_TRAINING: "RESET_APPROVE_USER_TRAINING",

     resetApproveUserTraining: () => ({
        type: actions.RESET_APPROVE_USER_TRAINING
    }), 
     
}

export default actions;