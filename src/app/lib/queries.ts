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


// Get all blog posts for listing
export const blogPostsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    content,
    excerpt,
    publishedAt,
    featured,
    author->{
      _id,
      name,
      slug,
      bio,
      avatar {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    tags,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    category->{
      _id,
      title,
      slug,
      color
    }
  }
`

// Get single blog post by slug
export const blogPostQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url
        }
      }
    },
    excerpt,
    publishedAt,
    featured,
    lastUpdated,
    author->{
      _id,
      name,
      slug,
      bio
    },
    tags,
    seo,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    category->{
      _id,
      title,
      slug,
      color
    }
  }
`

// Get related blog posts by category (excluding current post)
export const relatedBlogPostsQuery = groq`
  *[_type == "blog" && category._ref == $categoryId && _id != $currentPostId] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      _id,
      title,
      color
    }
  }
`

// Get other blog posts (excluding current post and category)
export const otherBlogPostsQuery = groq`
  *[_type == "blog" && category._ref != $categoryId && _id != $currentPostId] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      _id,
      title,
      color
    }
  }
`

// Get all blog categories
export const blogCategoriesQuery = groq`
  *[_type == "blogCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
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
