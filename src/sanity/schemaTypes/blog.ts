import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'Brief description for blog card preview (optional - auto-generated from content if empty)',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Image displayed in blog card and post header',
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                },
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                },
            ],
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'blogCategory' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Add relevant tags for better categorization',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            description: 'Mark this post as featured for homepage/featured sections',
            initialValue: false,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            description: 'Custom SEO settings for this blog post',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Custom title for search engines (defaults to post title if empty)',
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    description: 'Custom description for search engines (defaults to excerpt if empty)',
                },
                {
                    name: 'focusKeyword',
                    title: 'Focus Keyword',
                    type: 'string',
                    description: 'Main keyword this post targets for SEO',
                },
                {
                    name: 'noindex',
                    title: 'No Index',
                    type: 'boolean',
                    description: 'Prevent search engines from indexing this page',
                    initialValue: false,
                },
            ],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Number', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                            {
                                title: 'URL',
                                name: 'link',
                                type: 'object',
                                fields: [
                                    {
                                        title: 'URL',
                                        name: 'href',
                                        type: 'url',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                        {
                            name: 'position',
                            type: 'string',
                            title: 'Image Position',
                            options: {
                                list: [
                                    { title: 'Full Width', value: 'full' },
                                    { title: 'Left (inline)', value: 'left' },
                                    { title: 'Right (inline)', value: 'right' },
                                    { title: 'Center', value: 'center' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'full',
                        },
                    ],
                },
            ],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            publishedAt: 'publishedAt',
        },
        prepare(selection) {
            const { title, publishedAt } = selection
            return {
                title,
                subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date',
            }
        },
    },
})