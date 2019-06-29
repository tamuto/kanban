import m from 'mithril'
import { getAll } from './pages/APIs';

var root = document.body

var navigation = require('./pages/Navigation')
var project = require('./pages/Project')
var taskDetail = require('./pages/TaskCardDetail')

var template = function(page) {
    return {
        onmatch: function(args, requestedPath) {
            return page
        },
        render: function(vnode) {
            return [
                m(navigation),
                vnode,
                m(taskDetail)
            ]
        }
    }
}

getAll()

var routes = {}
routes['/kanban'] = template(project)

m.route(root, '/kanban', routes)
