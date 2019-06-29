import m from 'mithril'
import { environ } from './Environ';

var kanban = require('./Kanban')

function selectProjectClicked(e) {
    environ.currentProjectId = e.target.dataset.id
}

var view = function() {
    return [
        <div class="tabs">
            <ul>
                {environ.projects.map(function(item) {
                    if(environ.currentProjectId == null) {
                        environ.currentProjectId = item.id
                    }
                    return <li class={item.id == environ.currentProjectId ? 'is-active' : ''}>
                        <a onclick={selectProjectClicked} data-id={item.id}>{item.name}</a>
                    </li>
                })}
            </ul>
        </div>,
        environ.projects.map(function(item) {
            return <div class={item.id == environ.currentProjectId ? 'tabContent' : 'tabContent is-hidden'}>
                {m(kanban, { projectId : item.id })}
            </div>
        })
    ]
}

export { view }
