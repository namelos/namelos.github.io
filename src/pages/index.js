import './index.css'
import React from 'react'
import Link from 'gatsby-link'

export default function BlogIndex({ data }) {
  return <div>
    <h1>Blog</h1>
    {data.allOrga.edges.map(({ node }) =>
      <Post {...node} key={node.fields.slug} />)}
  </div>
}

function Post({ meta, fields }) {
  const title = meta.title || fields.slug
  const date = meta.date || 'no date'
  return <div>
    <h3>
      <Link to={fields.slug}>{title}</Link>
    </h3>
    <small>{date}</small>
  </div>
}

export const pageQuery = graphql`
  query IndexQuery {
    allOrga {
      edges {
        node {
          fields {
            slug
          }
          meta
        }
      }
    }
  }
`
