import { groq } from 'next-sanity'

// Get all featured projects with full image data
export const projectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category->{
      _id,
      title,
      slug,
      description,
      color
    },
    description,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    metrics,
    gradient,
    tags,
    status
  }
`

// Get all featured testimonials with avatar data
export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    name,
    role,
    company,
    quote,
    rating,
    avatar {
      asset->{
        _id,
        url
      },
      alt
    },
    gradient,
    project->{
      _id,
      title,
      slug
    }
  }
`


// Services remain the same (icons are emojis, not images)
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    icon,
    description,
    gradient
  }
`


export const settingsQuery = groq`
  *[_type == "settings"][0]{
    title,
    description,
    hero{
      badgeText,
      mainHeading,
      highlightedText,
      subheading,
      cta{ctaTitle, ctaSubtitle},
      trustIndicators[]{
        value,
        label
      },
    },
    about{
      badgeText,
      mainHeading,
      highlightedText,
      description,
      pillars[]{title, desc},
      teamImage{asset->{_id, url}, alt},
      teamTagline,
      foundedInfo
    },
    cta{
      badgeText,
      mainHeading,
      highlightedText,
      description,
      formTitle,
      quickContactTitle,
      whyChooseTitle,
      whyChoosePoints
    },
    footer{
      description,
      newsletterTitle,
      newsletterDescription,
      footerLinks[]{
        category,
        links[]{label, href}
      }
    },
    testimonialStats[]{value, label},
    contactEmail,
    contactPhone,
    socialLinks,
    seo{
      metaTitle,
      metaDescription,
      ogImage{asset->{_id, url}}
    }
  }
`
