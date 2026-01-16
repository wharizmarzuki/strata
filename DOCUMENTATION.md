# Project Documentation

This document provides an overview of the features implemented in this project, how to manage them, and the required configuration.

## 1. Content Management (Sanity.io)

The "Announcements" and "Bills" are managed through a headless CMS, Sanity.io. This provides a user-friendly admin panel for content editors.

### Accessing the Admin Panel

1.  Navigate to the `studio` directory: `cd studio`
2.  Start the development server: `npm run dev`
3.  Open your browser to [http://localhost:3333](http://localhost:3333) and log in.

### Content Models

-   **Announcements (`announcement`)**: Used for posting general news and updates.
    -   **Fields**: `Title` (text), `Date` (datetime), `Content` (rich text editor).
-   **Bills (`bill`)**: Used for posting public bill-related notices.
    -   **Fields**: `House Number` (text), `Paid Status` (dropdown), `Duration Unpaid / Notes` (text), `Amount` (number), `Balance` (number).

---

## 2. User-Submitted Forms

The project has two forms that allow users to send information to administrators. Both forms work by sending an email to a pre-defined admin email address.

### Contact Us Form

-   **Page**: `/hubungi-kami`
-   **Functionality**: Submissions are sent as an email.
-   **Recipient Email**: The address is set in the file `app/api/contact/route.ts`.
-   **Requirement**: This feature requires a valid `RESEND_API_KEY` in the `.env.local` file.

### Report/Suggestion Form

-   **Page**: `/cadangan`
-   **Functionality**: Submissions are sent as an email, categorized as either a "Report" or "Suggestion".
-   **Recipient Email**: The address is set in the file `app/api/suggestion/route.ts`.
-   **Requirement**: This feature also uses the `RESEND_API_KEY` from the `.env.local` file.

---

## 3. Environment Variables

To function correctly, the project requires several secret keys to be stored in a `.env.local` file in the project root.

```
# For sending emails from the forms
RESEND_API_KEY="YOUR_API_KEY_FROM_RESEND"

# For connecting the website to the Sanity.io content database
NEXT_PUBLIC_SANITY_PROJECT_ID="7dl7sxre"
NEXT_PUBLIC_SANITY_DATASET="production"
```

**Note**: After changing `.env.local`, you must restart the Next.js development server.

---

## 4. How to Display Content from Sanity

The connection to Sanity is configured in `lib/sanity.client.ts`. When you are ready to build the `/pengumuman` page, you can fetch and display data using a pattern like this.

**Example for a new page at `app/pengumuman/page.tsx`:**

```tsx
import { client } from '../../lib/sanity.client';
import { groq } from 'next-sanity';

// Define the query to fetch announcements
const announcementsQuery = groq`*[_type == "announcement"] | order(date desc)`;

// Define the type for an announcement document (optional but good practice)
interface Announcement {
  _id: string;
  title: string;
  date: string;
  // Add other fields from your schema here
}

export default async function PengumumanPage() {
  // Fetch the data from Sanity
  const announcements: Announcement[] = await client.fetch(announcementsQuery);

  return (
    <div>
      <h1>Pengumuman</h1>
      {announcements.length > 0 ? (
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement._id}>
              <h2>{announcement.title}</h2>
              <p>{new Date(announcement.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements found.</p>
      )}
    </div>
  );
}
```
