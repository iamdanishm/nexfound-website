import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role/Position',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'quote',
            title: 'Testimonial Quote',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required().max(500),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            options: {
                list: [
                    { title: '5 Stars', value: 5 },
                    { title: '4 Stars', value: 4 },
                    { title: '3 Stars', value: 3 },
                ],
            },
            validation: (Rule) => Rule.required().min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: 'avatar',
            title: 'Avatar Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                },
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
            name: 'project',
            title: 'Related Project',
            type: 'reference',
            to: [{ type: 'project' }],
            description: 'Link to the project this testimonial is about (optional)',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Testimonial',
            type: 'boolean',
            description: 'Show on homepage',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            validation: (Rule) => Rule.integer().positive(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'company',
            media: 'avatar',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: `${title}`,
                subtitle: `${subtitle}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})
