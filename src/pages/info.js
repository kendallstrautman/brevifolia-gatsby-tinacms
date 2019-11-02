import React from "react"
import { graphql } from 'gatsby'
import { useJsonForm } from 'gatsby-tinacms-json'

import Layout from "../components/Layout"
import infoStyles from "../styles/pages/info.module.scss"

export default function Info(props) {

  const formOptions = {
    label: 'Info Page',
    fields: [
      { label:"Color",
        name:"rawJson.background_color",
        description: "Background Color",
        component: "color"
      },
      //TODO - change to html component when available
      { label:"Description",
        name:"rawJson.description",
        description: "Main copy",
        component: "markdown"
      },
      { label:"CTA",
        name:"rawJson.cta",
        description: "Call to action",
        component: "markdown"
      },
      {
        label:"Contact Info",
        name:"rawJson.contact",
        description: "Contact info",
        component: "group",
        fields: [
          {
            label:"Email",
            name:"email",
            description: "Contact email",
            component: "text"
          },
          { label:"Twitter",
            name:"twitter_handle",
            description: "Twitter handle",
            component: "text"
          },
          { label:"Github",
            name:"github_handle",
            description: "Github username",
            component: "text"
          }
        ]
      },
    ]
  }

  const [ infoData ]  = useJsonForm(props.data.dataJson, formOptions)
  
  // const infoData = props.data.dataJson
  console.error(infoData)
  return (
    <Layout page="info" bgColor={infoData.background_color}>
      <section className={infoStyles.info_blurb}>
        <h2>
          <div dangerouslySetInnerHTML={{__html: infoData.description}}></div>
          <div dangerouslySetInnerHTML={{__html: infoData.cta}}></div>
        </h2>
        <ul>
          <li>
            <p>
              <a href={`mailto:${infoData.contact.email}`}>Email: {infoData.contact.email}</a>
            </p>
          </li>
          <li>
            <p>
              <a href={`https://twitter.com/${infoData.contact.twitter_handle}`}>
                Twitter: @{infoData.contact.twitter_handle}
              </a>
            </p>
          </li>
          <li>
            <p>
              <a href={`https://github.com/${infoData.contact.github_handle}`}>Github: {infoData.contact.github_handle}</a>
            </p>
          </li>
        </ul>
      </section>
    </Layout>
  )

}

export const data = graphql`
  query getJsonData {
    dataJson( fileRelativePath: {eq: "/content/data/info.json"} ) {
      background_color
      description
      cta
      contact {
        email
        github_handle
        twitter_handle
      }
      fileRelativePath
      rawJson
    }
  }
`
