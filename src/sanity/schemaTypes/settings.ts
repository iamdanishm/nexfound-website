import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    fields: [

        // New Hero Object
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'badgeText',
                    title: 'Badge Text',
                    type: 'string',
                    initialValue: 'Crafting Digital Excellence',
                }),
                defineField({
                    name: 'mainHeading',
                    title: 'Main Heading (first line)',
                    type: 'string',
                    initialValue: 'Transform Your',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'highlightedText',
                    title: 'Highlighted Text (second line)',
                    type: 'string',
                    initialValue: 'Digital Presence',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'text',
                    rows: 3,
                    initialValue:
                        'Premium digital service studio crafting exceptional experiences for ambitious brands.',
                }),
                defineField({
                    name: 'cta',
                    title: 'CTA',
                    type: 'object',
                    fields: [
                        { name: 'ctaTitle', type: 'string', title: 'Title', initialValue: "Ready to elevate your brand?" },
                        { name: 'ctaSubtitle', type: 'string', title: 'Subtitle', initialValue: "Let's create something extraordinary together" },
                    ],
                }),

                defineField({
                    name: 'trustIndicators',
                    title: 'Trust Indicators',
                    type: 'array',
                    description: 'KPI counters displayed under the hero',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'value', type: 'string', title: 'Value', initialValue: '50+' },
                                { name: 'label', type: 'string', title: 'Label', initialValue: 'Projects Delivered' },
                            ],
                            preview: {
                                select: { title: 'value', subtitle: 'label' },
                            },
                        },
                    ],
                    initialValue: [
                        { value: '50+', label: 'Projects Delivered' },
                        { value: '98%', label: 'Client Satisfaction' },
                        { value: '15+', label: 'Industry Awards' },
                        { value: '24/7', label: 'Support Available' },
                    ],
                    validation: (Rule) => Rule.min(3).max(6),
                }),
            ],
        }),

        // About section
        defineField({
            name: 'about',
            title: 'About Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'badgeText',
                    title: 'Badge Text',
                    type: 'string',
                    initialValue: 'Who We Are',
                }),
                defineField({
                    name: 'mainHeading',
                    title: 'Main Heading (first line)',
                    type: 'string',
                    initialValue: 'Meet',
                }),
                defineField({
                    name: 'highlightedText',
                    title: 'Highlighted Text (second line)',
                    type: 'string',
                    initialValue: 'Nexfound Studio',
                }),
                defineField({
                    name: 'description',
                    title: 'Description Paragraph',
                    type: 'text',
                    rows: 4,
                    initialValue:
                        "Nexfound is a premium digital studio obsessed with quality, outcomes, and timeless design. We're a cross- disciplinary team blending strategy, creativity, and engineering at every step to ensure our clients' digital presence stands above the rest.",
                }),
                defineField({
                    name: 'pillars',
                    title: 'Brand Pillars',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'desc', type: 'text', title: 'Description', rows: 2 },
                            ],
                            preview: {
                                select: { title: 'title', subtitle: 'desc' },
                            },
                        },
                    ],
                    initialValue: [
                        {
                            title: 'Vision',
                            desc: 'To set the standard for digital excellence, elevating ambitious brands with experiences that inspire and convert.',
                        },
                        {
                            title: 'Method',
                            desc: 'From rapid discovery sprints to precision engineering, every project follows a proven, collaborative framework driven by results.',
                        },
                        {
                            title: 'Promise',
                            desc: 'Exclusivity, transparency, and an unwavering commitment to craft—no shortcuts, no outsourcing, always Nexfound quality.',
                        },
                    ],
                }),
                defineField({
                    name: 'teamImage',
                    title: 'Team/Founder Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
                }),
                defineField({
                    name: 'teamTagline',
                    title: 'Team Tagline',
                    type: 'string',
                    initialValue: 'Driven by Craft. Powered by People.',
                }),
                defineField({
                    name: 'foundedInfo',
                    title: 'Founded Info',
                    type: 'string',
                    initialValue: 'Founded in 2023 · 10+ core members',
                }),
            ],
        }),


        // CTA Section
        defineField({
            name: 'cta',
            title: 'CTA Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'badgeText',
                    title: 'Badge Text',
                    type: 'string',
                    initialValue: "Let's Connect",
                }),
                defineField({
                    name: 'mainHeading',
                    title: 'Main Heading (first line)',
                    type: 'string',
                    initialValue: 'Ready to Build',
                }),
                defineField({
                    name: 'highlightedText',
                    title: 'Highlighted Text (second line)',
                    type: 'string',
                    initialValue: 'Something Extraordinary?',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 3,
                    initialValue:
                        'Transform your vision into reality. Schedule a consultation with our team and discover how we can elevate your digital presence.',
                }),
                defineField({
                    name: 'formTitle',
                    title: 'Form Title',
                    type: 'string',
                    initialValue: 'Get Started Today',
                }),
                defineField({
                    name: 'quickContactTitle',
                    title: 'Quick Contact Title',
                    type: 'string',
                    initialValue: 'Quick Contact',
                }),
                defineField({
                    name: 'whyChooseTitle',
                    title: 'Why Choose Us Title',
                    type: 'string',
                    initialValue: 'Why Nexfound?',
                }),
                defineField({
                    name: 'whyChoosePoints',
                    title: 'Why Choose Us Points',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: [
                        '48-hour response guarantee',
                        'Dedicated project manager',
                        'Transparent pricing model',
                        'Post-launch support included',
                    ],
                    validation: (Rule) => Rule.min(3).max(6),
                }),
            ],
        }),

        // Footer section

        defineField({
            name: 'footer',
            title: 'Footer Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'description',
                    title: 'Footer Description',
                    type: 'text',
                    rows: 3,
                    initialValue:
                        'Premium digital service studio crafting exceptional experiences for ambitious brands that refuse to blend in.',
                }),
                defineField({
                    name: 'newsletterTitle',
                    title: 'Newsletter Title',
                    type: 'string',
                    initialValue: 'Stay Updated',
                }),
                defineField({
                    name: 'newsletterDescription',
                    title: 'Newsletter Description',
                    type: 'text',
                    rows: 2,
                    initialValue:
                        'Subscribe to our newsletter for the latest insights and exclusive content.',
                }),
                defineField({
                    name: 'footerLinks',
                    title: 'Footer Link Groups',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'category', type: 'string', title: 'Category Name' },
                                {
                                    name: 'links',
                                    type: 'array',
                                    title: 'Links',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                { name: 'label', type: 'string', title: 'Label' },
                                                { name: 'href', type: 'string', title: 'Link' },
                                            ],
                                        },
                                    ],
                                },
                            ],
                            preview: {
                                select: { title: 'category' },
                            },
                        },
                    ],
                    initialValue: [
                        {
                            category: 'Services',
                            links: [
                                { label: 'Brand Identity', href: '#services' },
                                { label: 'Web Development', href: '#services' },
                                { label: 'Mobile Apps', href: '#services' },
                                { label: 'Digital Strategy', href: '#services' },
                            ],
                        },
                        {
                            category: 'Company',
                            links: [
                                { label: 'About Us', href: '#about' },
                                { label: 'Our Work', href: '#work' },
                                { label: 'Careers', href: '#careers' },
                                { label: 'Blog', href: '/blog' },
                            ],
                        },
                        {
                            category: 'Resources',
                            links: [
                                { label: 'Case Studies', href: '#work' },
                                { label: 'Testimonials', href: '#testimonials' },
                                { label: 'FAQ', href: '#faq' },
                                { label: 'Support', href: '#support' },
                            ],
                        },
                        {
                            category: 'Legal',
                            links: [
                                { label: 'Privacy Policy', href: '#privacy' },
                                { label: 'Terms of Service', href: '#terms' },
                                { label: 'Cookie Policy', href: '#cookies' },
                                { label: 'Sitemap', href: '#sitemap' },
                            ],
                        },
                    ],
                }),
            ],
        }),

        // testimonial stats

        defineField({
            name: 'testimonialStats',
            title: 'Testimonials Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', type: 'string', title: 'Value' },
                        { name: 'label', type: 'string', title: 'Label' },
                    ],
                    preview: {
                        select: { title: 'value', subtitle: 'label' },
                    },
                },
            ],
            initialValue: [
                { value: '500+', label: 'Happy Clients' },
                { value: '4.9/5', label: 'Average Rating' },
                { value: '99%', label: 'Client Retention' },
                { value: '48h', label: 'Response Time' },
            ],
            validation: (Rule) => Rule.min(3).max(6),
        }),



        // base settings

        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
        }),
        defineField({
            name: 'contactPhone',
            title: 'Contact Phone',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                { name: 'linkedin', type: 'url', title: 'LinkedIn' },
                { name: 'twitter', type: 'url', title: 'Twitter' },
                { name: 'instagram', type: 'url', title: 'Instagram' },
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 },
                {
                    name: 'ogImage',
                    type: 'image',
                    title: 'Open Graph Image',
                    description: '1200x630px recommended',
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings',
            }
        },
    },
})
