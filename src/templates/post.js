import React from 'react'

export default function BlogPostTemplate({ data }) {
  const { orga: { html, meta: { title, date } } } = data
  return <div>
    <center>
      <h1>{title}</h1>
      <small>{date}</small>
    </center>
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
