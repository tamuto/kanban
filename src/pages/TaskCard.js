import m from 'mithril'
import { environ } from './Environ';
import { openTaskCardDetail } from './TaskCardDetail';

function dragStart(e) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('cardId', e.target.dataset.id)
    e.target.classList.add('dragging')
}

function dragEnd(e) {
    e.target.classList.remove('dragging')
}

var view = function(vnode) {
    return [
        environ.cards.map(function(item) {
            if(item.kanbanListId != vnode.attrs.kanbanListId) {
                return null
            }
            return <div class="card" data-id={item.id} draggable="true" ondragstart={dragStart} ondragend={dragEnd} onclick={function(e) { openTaskCardDetail(item) }}>
                <header class="card-header">
                    <p class="card-header-title">{item.name}</p>
                </header>
                <div class="card-content">
                    {item.description}
                </div>
                <footer class="card-footer">
                    <p class="card-attr">{item.assign}</p>
                    <p class="card-attr">{item.deadline}</p>
                </footer>
            </div>
        })
    ]
}

export { view }
