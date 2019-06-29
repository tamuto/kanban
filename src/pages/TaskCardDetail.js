import m from 'mithril'
import { postTaskCard, putTaskCard } from './APIs';

var modalClass = 'modal'
var item = {}

function openTaskCardDetail(task) {
    item = task
    modalClass = 'modal is-active'
}

function taskNameChanged(e) {
    item.name = e.target.value
}

function descriptionChanged(e) {
    item.description = e.target.value
}

function assignChanged(e) {
    item.assign = e.target.value
}

function deadlineChanged(e) {
    item.deadline = e.target.value
}

function orderNoChanged(e) {
    item.orderNo = e.target.value
}

function saveButtonClicked() {
    if(item.id === void 0) {
        postTaskCard(item)
    } else {
        putTaskCard(item)
    }
    close()
}

function saveDupulicateButtonClicked() {
    item.id = void 0
    postTaskCard(item)
    close()
}

function archiveButtonClicked() {
    item.archiveFlag = true
    putTaskCard(item)
    close()
}

function close() {
    modalClass = 'modal'
}

var view = function() {
    return <div class={modalClass}>
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <input class="input" type="text" value={item.name} oninput={taskNameChanged}></input>
                </p>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">説明</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="説明" value={item.description} oninput={descriptionChanged}></textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">担当</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="説明" value={item.assign} oninput={assignChanged}></input>
                    </div>
                </div>
                <div class="field">
                    <label class="label">期限</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="説明" value={item.deadline} oninput={deadlineChanged}></input>
                    </div>
                </div>
                <div class="field">
                    <label class="label">表示順</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="表示順" value={item.orderNo} oninput={orderNoChanged}></input>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" onclick={saveButtonClicked}>保存</button>
                <button class="button is-warning" onclick={saveDupulicateButtonClicked}>複製して保存</button>
                <button class="button" onclick={close}>キャンセル</button>
                <span style="margin-left: auto"></span>
                <button class="button is-danger" onclick={archiveButtonClicked}>アーカイブ</button>
            </footer>
        </div>
    </div>
}

export { view, openTaskCardDetail }
