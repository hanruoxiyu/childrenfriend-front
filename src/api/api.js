import request from '../request'

export function zuozi_get() {
  return request({
    url: '/zuozi/zuozi/',
    method: 'get',
  })
}

export function score_get() {
  return request({
    url: '/score/score/',
    method: 'get',
  })
}

export function exam_getById(score_id) {
  return request({
    url: `/exam/exam/${score_id}/`,
    method: 'get',
  })
}

export function reminder_get() {
  return request({
    url: '/reminder/reminder/',
    method: 'get',
  })
}

export function retask_get() {
  return request({
    url: '/retask/retask/',
    method: 'get',
  })
}

export function task_getbyid(task_id) {
  return request({
    url: `/retask/gettask/${task_id}/`,
    method: 'get',
  })
}

export function task_update(task_id,form) {
  return request({
    url: `/retask/updatetask/${task_id}/`,
    method: 'put',
    data:form,
  })
}

export function task_create(form) {
  return request({
    url: '/retask/addtask/',
    method: 'post',
    data: form,
  })
}

export function task_delete(task_id) {
  return request({
    url: `/retask/deletetask/${task_id}`,
    method: 'delete',
  })
}

export function question_get() {
  return request({
    url: '/question/question/',
    method: 'get',
  })
}

export function question_getbyid(question_id) {
  return request({
    url: `/question/getquestion/${question_id}/`,
    method: 'get',
  })
}

export function question_create(form) {
  return request({
    url: '/question/addquestion/',
    method: 'post',
    data: form,
  })
}

export function question_delete(question_id) {
  return request({
    url: `/question/question/${question_id}`,
    method: 'delete',
  })
}

export function question_update(question_id,form) {
  return request({
    url: `/question/updatequestion/${question_id}/`,
    method: 'put',
    data:form,
  })
}

export function qa() {
  return request({
    url: '/knowledge/qa/',
    method: 'get',
  })
}


export function travelLocation() {
  return request({
    url: '/travel/location',
    method: 'get',
  })
}

export function get_travel() {
  return request({
    url: '/travel/travel/',
    method: 'get',
  })
}


