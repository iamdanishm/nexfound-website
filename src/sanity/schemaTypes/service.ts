import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Service Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon (Emoji)',
            type: 'string',
            description: 'Enter a single emoji (e.g., 🎨, 💻, 📱)',
            validation: (Rule) => Rule.required().max(2),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
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
                    { title: 'Gold Mix', value: 'from-[#B08D57] via-[#F4E6C0] to-[#1A7F6B]' },
                    { title: 'Emerald Mix', value: 'from-[#1A7F6B] via-[#0D3B66] to-[#B08D57]' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            validation: (Rule) => Rule.required().integer().positive(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            icon: 'icon',
        },
        prepare({ title, subtitle, icon }) {
            return {
                title: `${icon} ${title}`,
                subtitle,
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
