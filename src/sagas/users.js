import { takeEvery, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
    try {
        const result = yield call(api.getUsers);
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }));
    } catch (e) {
    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action) {
    try {
        yield call(api.createUser, { firstName: action.payload.firstName, lastName: action.payload.lastName });
        yield call(getUsers);
    } catch (event) {
    }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
];

export default usersSagas;
