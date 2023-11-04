export const storageService = {
    query,  // list
    get,    // get entity
    post,   // add entity
    put,    // update entity
    remove, // delete entity
}



// Right now there is a vulnerability when a user might affect the emails of another user (both see the same emails).
// To solve it we need to arrange the DB so each user will have a different email list.
function query(entityType, delay = 200) {
    let entities = JSON.parse(localStorage.getItem(entityType)).filter(_validateEmailPermissions) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

// Without user validation.
// If we save the list again we don't want to validate user, so the emails of other accounts won't be removed.
function query_all(entityType, delay = 200) {
    let entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    if (!_validateEmailPermissions(newEntity)) throw new Error(`Not a valid email`)
    newEntity = { ...newEntity }
    newEntity.id = _makeId()
    return query_all(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    if (!_validateEmailPermissions(updatedEntity)) throw new Error(`Not a valid email`)
    return query_all(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query_all(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _validateEmailPermissions(email) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || !loggedInUser.email) return false;
    return email.from == loggedInUser.email || email.to == loggedInUser.email
}

