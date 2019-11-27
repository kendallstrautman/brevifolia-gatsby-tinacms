import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'
import { withPlugin } from 'react-tinacms'
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

import useBlogData from "../static_queries/useBlogData"
import blogListStyles from "../styles/components/bloglist.module.scss"

function BlogList() {
  const blogData = useBlogData()
  function renderBlogData() {
    return (
      <div>
        {blogData
          .filter(blog => blog.node.frontmatter.title !== "")
          .map(blog => {
            return (
              <Link to={`/blog/${blog.node.fields.slug}`} key={blog.node.id}>
                <li className={blogListStyles.li} key={blog.node.fields.slug}>
                  <div className={blogListStyles.list__hero}>
                    <Img 
                      fluid={
                        blog.node.frontmatter.hero_image.childImageSharp.fluid
                      }
                      alt={blog.node.frontmatter.title}
                    />
                  </div>
                  <div className={blogListStyles.list__info}>
                    <h2>{blog.node.frontmatter.title}</h2>
                    <h3>{blog.node.frontmatter.date}</h3>
                    <p>{blog.node.excerpt}</p>
                  </div>
                </li>
              </Link>
            )
          })}
      </div>
    )
  }
  return (
    <section>
      <ul className={blogListStyles.list}>{renderBlogData()}</ul>
    </section>
  )
}

const CreateBlogButton = new RemarkCreatorPlugin( {
    label: 'Add New Post',
    filename: name => {
      //replace all spaces for hyphen
    let slug = name.title.replace(/\s+/g, '-').toLowerCase()

    return `content/posts/${slug}.md`
    },
    fields: [
      // Commented out until we find a solution for previewSrc
      // {
      //   name: "hero",
      //   description: "Pick a good one",
      //   label: "Hero",
      //   component: "image",
      //   // Generate the frontmatter value based on the filename
      //   parse: filename => `/content/images/${filename}`,
      //   // Decide the file upload directory for the image
      //   uploadDir: () => {
      //     return "/content/images/"
      //   },
      //   // Todo: Fix the preview source
      //   previewSrc: (postInfo) => {
      //     return postInfo.hero
      //   },
      // },
      {
        label: 'Title',
        name: 'title',
        component: 'text',
        required: true
      },
      {
        label: 'Date',
        name: 'date',
        component: 'date',
        description: 'The default will be today'
      },
      {
        label: 'Author',
        description: 'Who wrote this, yo?',
        name: 'author',
        component: 'text'
      }
    ],
    frontmatter: (postInfo) => {
      return ({
      title: postInfo.title,
      date: new Date(),
      //choosing a default image so we don't get an error
      hero_image: postInfo.hero ? postInfo.hero : '/content/images/ren-ran-bBiuSdck8tU-unsplash.jpg'})
    },
    body: () => `New post, who dis?`
  })

export default withPlugin(BlogList, CreateBlogButton);
