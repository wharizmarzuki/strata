import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bill',
  title: 'Bill',
  type: 'document',
  fields: [
    defineField({
      name: 'houseNumber',
      title: 'House Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Paid Status',
      type: 'string',
      options: {
        list: [
          {title: 'Paid', value: 'paid'},
          {title: 'Unpaid', value: 'unpaid'},
          {title: 'Partially Paid', value: 'partially-paid'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'tunggak',
      title: 'Duration Unpaid / Notes',
      description: 'e.g., "3 months", "outstanding since January"',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'balance',
      title: 'Balance',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'houseNumber',
      subtitle: 'status',
    },
  },
})
