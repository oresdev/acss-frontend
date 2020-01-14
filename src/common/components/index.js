/**
 * Automatically imports all the modules and exports as a single module object
 */

import Vue from 'vue'

const requireComponent = require.context('../../components', false, /\.vue$/)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = fileName
        .replace(/(\.\/|\.vue)/g, '')
        .replace(/^\w/, c => c.toUpperCase())

    Vue.component(componentName, componentConfig.default || componentConfig)
})
