import m from 'mithril'
import { environ } from './Environ';
import { postKanban, deleteKanban, moveTaskCard, getAll } from './APIs';
import { openTaskCardDetail } from './TaskCardDetail';

var card = require('./TaskCard')

function dragOver(e) {
    // console.log('item-id' + e.dataTransfer.getData('text/plain'))
    e.preventDefault()
}

function drop(e) {
    var id = e.dataTransfer.getData('cardId')
    if(id === void 0) {
        console.log('b')
        e.preventDefault()
        return
    }
    for(var i = 0; i < e.path.length; i++) {
        var kanbanId = e.path[i].dataset.kanbanId
        if(kanbanId !== void 0) {
            moveTaskCard(id, kanbanId)
            return
        }
    }
    console.log('a')
    e.preventDefault()
}

var listName = ''

function listNameChanged(e) {
    listName = e.target.value
}

function submitAddList() {
    postKanban(listName)
    listName = ''
    return false
}

function deleteList(e) {
   deleteKanban(e.target.dataset.id)
}

function addCardClicked(e) {
    var id = e.target.dataset.id
    openTaskCardDetail({
        name: '',
        description: '',
        assign: '',
        deadline: '',
        orderNo: 0,
        kanbanListId: id
    })
}

var view = function(vnode) {
    return [
        environ.kanbans.map(function(item) {
            if(item.projectId != vnode.attrs.projectId) {
                return null
            }
            return <article class="message taskgroup is-primary" ondragover={dragOver} ondrop={drop} data-kanban-id={item.id}>
                <div class="message-header">
                    <p>{item.name}</p>
                    <a onclick={addCardClicked} data-id={item.id}>カード追加</a>
                    {environ.allowEditList ? <button class="delete" aria-label="delete" onclick={deleteList} data-id={item.id}></button> : null}
                </div>
                <div class="message-body">
                    {m(card, {kanbanListId : item.id})}
                </div>
            </article>
        }),
        environ.allowEditList ? 
            <form class="taskgroup" onsubmit={submitAddList}>
                <div class="field has-addons">
                    <div class="control">
                        <input class="input" type="text" placeholder="新規リスト" value={listName} oninput={listNameChanged}></input>
                    </div>
                    <div class="control">
                        <button type="submit" class="button is-link">追加</button>
                    </div>
                </div>
            </form>
            : null
    ]
}

export { view }
