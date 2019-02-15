import { select, call, takeLatest, put } from 'redux-saga/effects';
import { getLoginFormState } from './login.selectors';
import { loginService } from '../../../../shared/services/Login/login.service';
import {
  loginFetchRequestActionType,
  loginOnChangeAction,
  loginSetAuthTokenAction,
  onLoginErrorAction,
} from './login.actions';

export function* authoriseUserSaga(email, password) {
  try {
    // call login Api endpoint with user username and password
    const loginResponse = yield call(
      [loginService, 'onLogin'],
      email,
      password,
    );

    // set auth token in store
    yield put(loginSetAuthTokenAction(loginResponse.token));

    return true;
  } catch (e) {
    // not authorised
    return false;
  }
}

export function* userLoginSaga() {
  // 1. get the username and password from state.
  const { login } = yield select(getLoginFormState);

  // 2. authorise the user
  const isAuthorised = yield call(
    authoriseUserSaga,
    login.email,
    login.password,
  );

  if (isAuthorised) {
    //3. remove the username and password from store
    yield put(loginOnChangeAction({ name: 'email', value: '' }));
    yield put(loginOnChangeAction({ name: 'password', value: '' }));
  } else {
    // NOT Authorised - incorrect username or password
    yield put(
      onLoginErrorAction({ message: 'incorrect username or password' }),
    );
  }
}

export function* loginSaga() {
  yield takeLatest(loginFetchRequestActionType, userLoginSaga);
}