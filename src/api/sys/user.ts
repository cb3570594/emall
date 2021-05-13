
import type {
  LoginParams,
  LoginResultModel,
  UserId,
  GetUserInfoByUserIdModel,
} from './model/userModel';

export function getPermmisionByUserId(params: UserId) {
  return Promise.resolve(['/', '404', 'Login'])
}

export function getUserInfoById(params?: UserId) {
  return Promise.resolve({

  })
}
