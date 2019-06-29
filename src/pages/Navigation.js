import m from 'mithril'
import { environ } from './Environ';
import { getAll, postProject, deleteProject } from './APIs';

function updateAllClicked() {
    getAll()
}

function deleteProjectClicked() {
    deleteProject(environ.currentProjectId)
}

function allowEditListChanged(e) {
    environ.allowEditList = e.target.checked
}

var projectName = ''

function projectNameChanged(e) {
    projectName = e.target.value
}

function submitAddProject() {
    postProject(projectName)
    projectName = ''
}

var view = function() {
    return <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-start">
            <div class="navbar-item">
                <a class="button is-info" onclick={updateAllClicked}>更新</a>
            </div>
            <div class="navbar-item">
                <form class="taskgroup" onsubmit={submitAddProject}>
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="新規プロジェクト" value={projectName} oninput={projectNameChanged}></input>
                        </div>
                        <div class="control">
                            <button type="submit" class="button is-link">追加</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="navbar-item">
                <label class="checkbox">
                    <input type="checkbox" checked={environ.allowEditList} oninput={allowEditListChanged}></input>
                    リストの変更を許可する
                </label>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-danger" onclick={deleteProjectClicked}>プロジェクトの削除</a>
                </div>
            </div>
        </div>
    </nav>
}

export { view }
