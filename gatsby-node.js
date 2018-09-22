const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, boundActionCreators }) => {
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allOrga {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) { console.log(result.errors) }

      result.data.allOrga.edges.forEach(edge => boundActionCreators.createPage({
        path: edge.node.fields.slug, // required
        component: slash(path.resolve('src/templates/post.js')),
        context: {
          slug: edge.node.fields.slug,
        }
      }))

      resolve()
    })
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === 'File') {
    const folder = node.relativeDirectory
    const fileName = path.parse(node.absolutePath).name
    const slug = `/${path.join(folder, fileName)}/`
    createNodeField({ node, name: `slug`, value: slug })
  } else if (node.internal.type === 'Orga' && typeof node.slug === 'undefined') {
    createNodeField({
      node,
      name: 'slug',
      value: getNode(node.parent).fields.slug,
    })
  }
}
