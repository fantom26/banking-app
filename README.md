This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Dwolla note

Payments go through [Dwolla](https://www.dwolla.com), which only supports US customers and US bank accounts. Sign-up therefore needs US address data (2-letter state, SSN last 4, etc.). The app is US-only, and Plaid Link is limited to US institutions.

## Decisions

### Locales: English, Spanish, French

The app is US-only (see the Dwolla note), so the locales target people who live in the US:

- **en** is the default and has unprefixed URLs (`/sign-in`).
- **es** (`/es`): Spanish is the most widely spoken language in the US after English.
- **fr** (`/fr`): French is supported by Plaid Link, and it also covers Canadian French speakers. Plain `fr` was chosen over `fr-CA` to match Plaid's language codes. Serving Canadian customers would take more than a locale: Plaid would need `country_codes: ['CA']`, and payments would need a provider other than Dwolla.

### Formatting

- Amounts are always USD, because Dwolla only moves dollars. Only the formatting follows the locale: `-$1,234.50` (en), `-1234,50 US$` (es), `-1 234,50 $US` (fr).
- Times are rendered in UTC so server and client output match. Plaid's date-only values parse as UTC midnight, so UTC also keeps them on the right day.
- Money and dates go through next-intl's named formats in `app/_i18n/formats.ts`. Don't call `Intl` or `toLocaleString` directly.

## Future ideas

[] add i18n
[] change app branding
[] when the transaction is clicked the information about it will occur in the right sidebar?
[] bank cards could have an animation where user can pick one of them
