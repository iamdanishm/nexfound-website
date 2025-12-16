import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'projectCategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true, // Enables image cropping
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    validation: (Rule) => Rule.required(),
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Project Gallery',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'metrics',
            title: 'Project Metrics',
            type: 'object',
            fields: [
                { name: 'conversion', type: 'string', title: 'Conversion Rate' },
                { name: 'users', type: 'string', title: 'Active Users' },
                { name: 'rating', type: 'string', title: 'User Rating' },
            ],
        }),
        defineField({
            name: 'gradient',
            title: 'Gradient Theme',
            type: 'string',
            options: {
                list: [
                    { title: 'Gold to Champagne', value: 'from-[#B08D57] to-[#F4E6C0]' },
                    { title: 'Emerald to Sapphire', value: 'from-[#1A7F6B] to-[#0D3B66]' },
                    { title: 'Champagne to Gold', value: 'from-[#F4E6C0] to-[#B08D57]' },
                    { title: 'Sapphire to Emerald', value: 'from-[#0D3B66] to-[#1A7F6B]' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Technologies/Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'status',
            title: 'Project Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Completed', value: 'completed' },
                    { title: 'In Progress', value: 'in-progress' },
                    { title: 'On Hold', value: 'on-hold' },
                    { title: 'Planning', value: 'planning' },
                ],
            },
            validation: (Rule) => Rule.required(),
            initialValue: 'completed',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            description: 'Show this project on homepage',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category.title',
            media: 'mainImage',
        },
    },
    orderings: [
        {
            title: 'Published Date, New',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
})
