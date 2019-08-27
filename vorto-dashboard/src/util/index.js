function checkDeviceForQuery (device, { searching, query }) {
  if (!searching || !query) {
    return true
  }

  const [serachKeyword, searchQuery] = query.split(':').map(elem => elem.trim())

  /* TODO add more filtering options
    - gt:temperature 5
    - lt:battery 50
    - ...
  */
  switch (serachKeyword) {
    case 'has':
      return Object.keys(device.features)
        .some(feature => {
          const deviceFeature = device.features[feature]
          const definition = deviceFeature.definition

          if (!definition) {
            return false
          }

          if (Array.isArray(definition)) {
            return definition.some(def => def.toLowerCase().includes(searchQuery))
          }

          return definition.toLowerCase().includes(searchQuery)
        })
    default:
      const definition = device.attributes.definition

      if (!definition) {
        return false
      }

      return definition
        .toLowerCase()
        .includes(query)
  }
}

const DONT_DISPLAY_DEVICES_WITH_DEF = [
  'org.eclipse.vorto.Topology:1.0.0',
  'org.eclipse.vorto.Referencable:1.0.0'
]

function checkDeviceDefinition (device) {
  return !DONT_DISPLAY_DEVICES_WITH_DEF.includes(device.attributes.definition)
}

function getRepositoryLink (path) {
  if (Array.isArray(path)) {
    return `https://vorto.eclipse.org/#/details/${path[0]}`
  }

  return `https://vorto.eclipse.org/#/details/${path}`
}

export {
  checkDeviceForQuery,
  getRepositoryLink,
  checkDeviceDefinition
}
