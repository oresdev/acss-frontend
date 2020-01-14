/**
 * Manage your storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 *
 * Import this instace and then call it // storage.get('name').key or  // storage.set('name', {'key':'value', etc...})
 **/

export default {
    get: name =>
        localStorage.getItem(name)
            ? JSON.parse(atob(localStorage.getItem(name)))
            : false,

    set: (name, object) =>
        localStorage.getItem(name)
            ? localStorage.setItem(
                  name,
                  btoa(
                      JSON.stringify(
                          Object.assign(
                              JSON.parse(atob(localStorage.getItem(name))),
                              object
                          )
                      )
                  )
              )
            : localStorage.setItem(name, btoa(JSON.stringify(object))),

    remove: name => localStorage.removeItem(name),
}
