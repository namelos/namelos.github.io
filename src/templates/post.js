import React from 'react'
import Link from 'gatsby-link'

export default function BlogPostTemplate({ data }) {
  const { orga: { html, meta: { title, date } } } = data
  return <div>
    <h1>
      <Link to="/">Namelos</Link>
      {' / '}
      {title}
    </h1>

    <br />
    <small>{date}</small>

    <div dangerouslySetInnerHTML={{ __html: html }} />
  </div>
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    orga(fields: { slug: { eq: $slug }}) {
      html
      meta
    }
  }
`
