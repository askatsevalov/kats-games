import request from '@/utils/request';

export function listGames(params) {
  return request({
    url: '/api/game/',
    method: 'get',
    params,
  });
}

export function getGame(id) {
  return request({
    url: `/api/game/${id}`,
    method: 'get',
  });
}

export function postGame(data) {
  return request({
    url: '/api/game/',
    method: 'post',
    data,
  });
}

export function putGame(data) {
  return request({
    url: `/api/game/${data.id}/`,
    method: 'put',
    data,
  });
}

export function deleteGame(id) {
  return request({
    url: `/api/game/${id}/`,
    method: 'delete',
  });
}
