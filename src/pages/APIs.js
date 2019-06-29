import m from 'mithril'
import { environ } from './Environ'

var errorHandler = function(e) {
    document.body.innerHTML = e.message
}

var getProject = function() {
    m.request({
        method: 'GET',
        url: '/api/project',
    }).then(function(data) {
        environ.projects = data
    }).catch(errorHandler)
}

var getKanban = function() {
    m.request({
        method: 'GET',
        url: '/api/list'
    }).then(function(data) {
        environ.kanbans = data
    }).catch(errorHandler)
}

var getCard = function() {
    m.request({
        method: 'GET',
        url: '/api/card'
    }).then(function(data) {
        environ.cards = data
    }).catch(errorHandler)
}

var getAll = function() {
    getProject()
    getKanban()
    getCard()
}

var postProject = function(projectName) {
    var data = {
        name: projectName,
        orderNo: environ.projects.length + 1,
        displayFlag: true
    }
    m.request({
        method: 'POST',
        url: 'api/project',
        data: data
    }).then(function(data) {
        getAll()
    }).catch(errorHandler)
}

var deleteProject = function(projectId) {
    m.request({
        method: 'DELETE',
        url: 'api/project/' + projectId,
    }).then(function(data) {
        environ.currentProjectId = null
        getAll()
    }).catch(errorHandler)
}

var postKanban = function(listName) {
    var data = {
        name: listName,
        orderNo: environ.kanbans.length + 1,
        projectId: environ.currentProjectId
    }
    m.request({
        method: 'POST',
        url: 'api/list',
        data: data
    }).then(function(data) {
        getAll()
    }).catch(errorHandler)
}

var deleteKanban = function(id) {
    m.request({
        method: 'DELETE',
        url: 'api/list/' + id,
    }).then(function() {
        getAll()
    }).catch(errorHandler)
}

var postTaskCard = function(item) {
    item.id = void 0
    item.orderNo = environ.cards.length + 1
    m.request({
        method: 'POST',
        url: 'api/card',
        data: item
    }).then(function(data) {
        getAll()
    }).catch(errorHandler)
}

var putTaskCard = function(item) {
    m.request({
        method: 'PUT',
        url: 'api/card/' + item.id,
        data: item
    }).then(function(data) {
        getAll()
    }).catch(errorHandler)
}

var moveTaskCard = function(id, kanbanId) {
    m.request({
        method: 'POST',
        url: 'api/card/move/' + id + '/' + kanbanId,
    }).then(function(data) {
        getAll()
    }).catch(errorHandler)
}

export { getProject, getKanban, getCard, getAll, postProject, deleteProject, postKanban, deleteKanban, postTaskCard, putTaskCard, moveTaskCard }
